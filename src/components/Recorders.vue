<template>
    <div>
        <div class="recorder-progress">
            <i class="el-icon-phone-outline"></i>
            <el-progress class="progress" :show-text="false"
                         :stroke-width="5" :percentage="parseInt(recordingTime*100/limitTime)"
                         color="#2E70ED">
            </el-progress>
            <span>{{recorderTimeText}}/{{parseInt(limitTime/60)}}:00</span>
            <el-button id='recorder-button' class='button' size="mini" @click="controlRecording">{{recorderText}}
            </el-button>
            <el-button class='button' size="mini">save</el-button>
        </div>
        <div>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://127.0.0.1:8000/recorder/"
                    :on-change="handleChange"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
                <div slot="tip" class="el-upload__tip">tips here</div>
            </el-upload>

        </div>

    </div>

</template>

<script>
    import Recorder from "recorder-js";    // 引入录音插件
    var recorder;
    var timer;
    var blob;
    export default {
        name: 'Recorders',
        data: () => {
            return {
                isRecording: false,
                recordingTime: 0,
                limitTime: 5 * 60,
                fileList: []
            }
        },
        computed: {
            recorderText: function () {
                return this.isRecording ? 'stop' : 'start';
            },
            recorderTimeText: function () {
                if (this.recordingTime > 60) {
                    let minutes = parseInt(this.recordingTime / 60);
                    let seconds = this.recordingTime % 60;
                    return minutes + ':' + seconds;
                } else {
                    return this.recordingTime < 10 ? '00:0' + this.recordingTime : '00:' + this.recordingTime;
                }

            },
        },
        methods: {
            initRecorder: function () {
                let audioContext = new (window.AudioContext || window.webkitAudioContext)();
                recorder = new Recorder(audioContext, {
                    // An array of 255 Numbers
                    // You can use this to visualize the audio stream
                    // If you use react, check out react-wave-stream
                    // onAnalysed: data => console.log(data),
                });

                navigator.mediaDevices.getUserMedia({audio: true})
                    .then(stream => recorder.init(stream))
                    .catch(err => console.log('Uh oh... unable to get stream...', err));
            },
            controlRecording: function () {
                if (!this.isRecording) {
                    this.startRecording();
                } else {
                    this.stopRecording();
                }
            },
            startRecording: function () {
                recorder.start().then(() => {
                    this.isRecording = true;
                    timer = setInterval(() => {
                        this.recordingTime++;
                        if (this.recordingTime >= this.limitTime) {
                            this.stopRecording();
                        }
                    }, 1000)
                })
            },
            stopRecording: function () {
                recorder.stop()
                    .then(({blob, buffer}) => {
                        // blob:binary files;buffer: AudioBuffer
                        this.isRecording = false;
                        clearInterval(timer);
                        this.recordingTime = 0;
                        console.log('blob', blob);
                        console.log('buffer', buffer);

                        let formData = new FormData();
                        formData.set('file', blob, 'recorder.wav')
                        this.$http.sendRecorder(formData).then(res => {
                            console.log(res);
                        })
                            .catch(err => console.log(err));
                    });
            },
            downloadRecording: function () {
                Recorder.download(blob, 'my-audio-file'); // downloads a .wav file
            },

            // file upload
            submitUpload() {
                this.$refs.upload.submit();
                // this.$http.sendRecorder();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleChange(file) {
                console.log('handle change');
                console.log(file);
                this.chunkUpload(file);
            },
            async chunkUpload(file) {
                let chunkSize = 1024 * 1024;
                let chunks = Math.ceil(file.size / chunkSize);
                // let partFiles=[]
                for (let i = 0; i < chunks; i++) {
                    let fname_part = `${file.name}_part_${i + 1}`;
                    let end = (i + 1) * chunkSize <= file.size ? (i + 1) * chunkSize : file.size;
                    let file_part = file.raw.slice(i * chunkSize, end)
                    let formData = new FormData();
                    formData.set('file', file_part, fname_part)
                    // partFiles.push(formData)
                    await this.$http.sendRecorder(formData)
                }
                // this.$http.sendPartFiles(partFiles,file).then((res)=>{
                //     console.log(res);
                // })
                this.$http.mergeFile(file).then(res=>{
                    console.log(res);
                });

            }
        },

        mounted: function () {
            this.initRecorder();
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .recorder-progress {
        margin: auto;
        display: flex;
        justify-content: start;
        align-items: center;

        .progress {
            margin: 0 5px 0 5px;
            width: 300px;
        }

        .button {
            margin-left: 10px;
        }
    }

</style>
