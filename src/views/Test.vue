<template>
    <div>
        <div class="title-group">
            <p class="title">模拟练习</p>
        </div>
        <div class="person-score-group">
            <p class="person-title">客服代表岗位模拟训练</p>
            <div class="person-info">
                <div class="avatar">
                    <img class="image" src="../images/正式考试/u524.svg" alt="">
                    <p class="name">张某某</p>
                </div>
                <table>
                    <tr class="info-item">
                        <td class="field">编号</td>
                        <td class="content">8447466</td>
                        <td class="field">部门</td>
                        <td class="content">西安电信公司</td>
                    </tr>
                    <tr class="info-item">
                        <td class="field">手机号码</td>
                        <td class="content">8447466</td>
                    </tr>
                    <tr class="info-item">
                        <td class="field">性别</td>
                        <td class="content">男</td>
                    </tr>
                    <tr class="info-item">
                        <td class="field">生日</td>
                        <td class="content"></td>
                    </tr>
                    <tr class="info-item">
                        <td class="field">城市</td>
                        <td class="content">西安</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    import Recorder from "recorder-js";    // 引入录音插件
    var recorder;
    var timer;
    var _blob;
    export default {
        name: "Test",
        data: () => {
            return {
                boardShow:false,
                isRecording: false,
                isReplaying:false,
                hasRecord:false,
                recordingTime: 0,
                stopTime:0, // the time stopped
                limitTime: 5 * 60,
                chunkSend: false,
                submitted:false,
                file_url:undefined,
                judgeResult:undefined,

            }
        },
        mounted() {
            this.initRecorder();
        },
        computed: {
            recorderTimeText: function () {
                return this.formatTime(this.recordingTime);
            },
        },
        methods: {
            formatTime:function(time){
                if (time > 60) {
                    let minutes = parseInt(time / 60);
                    let seconds = time % 60;
                    return minutes + ':' + seconds;
                } else {
                    return time < 10 ? '00:0' + time : '00:' + time;
                }
            },
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
            startRecording: function () {
                return recorder.start().then(() => {
                    this.isRecording = true;
                    this.stopTime=0;
                    timer = setInterval(() => {
                        this.recordingTime++;
                        if (this.recordingTime >= this.limitTime) {
                            this.stopRecording();
                        }
                    }, 1000)
                })
            },
            stopRecording: function () {
                return recorder.stop()
                    .then(({blob, buffer}) => {
                        // blob:binary files;buffer: AudioBuffer
                        this.isRecording = false;
                        clearInterval(timer);
                        this.stopTime=this.recordingTime;
                        this.recordingTime = 0;
                        _blob=blob;
                        console.log(blob,buffer);
                    });
            },
            restartRecording:function(){
                if(this.isRecording){
                    console.log('重新开始');
                    this.stopRecording().then(()=>{
                        this.startRecording();
                    });
                }

            },
            replayRecording:function(){
                var player=this.$refs.recorderPlayer;
                player.src=URL.createObjectURL(_blob);
                player.addEventListener(
                    "loadeddata",
                    function() {
                        player.controls = "controls";
                        player.play();//开始播放
                    },
                    false
                );

            },
            downloadRecording: function () {
                Recorder.download(_blob, 'my-audio-file'); // downloads a .wav file
            },
            saveRecording:function(){
                if(_blob){
                    this.hasRecord=true;
                    this.boardShow=false;
                }
            },
            uploadRecording:function(){
                // file:size,name,is_chunk
                this.submitted=true;
                var res;
                if(this.chunkSend){
                    let file={name: 'recorder.wav', size: _blob.size, file: _blob}
                    res=this.chunkUpload(file);
                }
                else{
                    let formData = new FormData();
                    formData.set('file', _blob, 'recorder.wav')
                    res=this.$http.sendRecorder(formData);
                }
                res.then(data=>{
                    data=data.data;
                    console.log('data:',data);
                    this.file_url=data.url;
                    let judge=(data.judge==true?'正确':'错误');
                    console.log(judge,data.url);
                    this.judgeResult=judge;
                })
            },
            async chunkUpload(file) {
                // file {name,size,file} ,for chunk
                let chunkSize = 1024 * 1024;
                let chunks = Math.ceil(file.size / chunkSize);
                file.chunks = chunks; //
                for (let i = 0; i < chunks; i++) {
                    let fname_part = `${file.name}_part_${i + 1}`;
                    let end = (i + 1) * chunkSize <= file.size ? (i + 1) * chunkSize : file.size;
                    let file_part = file.file.slice(i * chunkSize, end)
                    let formData = new FormData();
                    formData.set('file', file_part, fname_part)
                    formData.set('is_chunk', true)
                    await this.$http.sendRecorder(formData)
                }
                return this.$http.mergeFile(file);
            },

        }
    }
</script>

<style lang="scss">
    @import "../files/模拟练习新/styles.css";

    .title-group{
        margin-top: 75px;
        border-bottom: 1px solid    #333333;
        padding: 15px 0px;
        .title{
            height: 25px;
            line-height: 25px;
            text-align: left;

            padding: 2px 2px 2px 10px;
            border-left: 4px solid rgba(0, 121, 254, 1);
            font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
            font-weight: 700;
            font-style: normal;
            font-size: 16px;
            color: #999999;
        }
    }

    .person-score-group{
        border: 1px solid rgba(0,0,0,0.5);
        margin-top: 30px;
        padding: 25px 30px;

        .person-title{
            font-weight: bold;
            margin-bottom: 25px;
        }
        .person-info{
            display: flex;
            justify-content: left;
            .avatar{
                /*width: 240px;*/
                padding: 20px 30px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                flex-direction: column;
                .image{
                    width: 100px;
                    height: 100px;
                }
                .name{
                    width: 75px;
                    height: 25px;
                    color:white;
                    background: rgb(255,169,76);
                    text-align: center;
                    border-radius: 5px;
                }
            }
            .info-item{
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-collapse: collapse;
                .field{
                    width: 70px;
                    background: #CCCCCC;
                }
                .content{
                    width: 135px;
                }
            }
        }
    }

    .recorder-board {
        width: 600px;
        position: fixed;
        z-index: 100;
        left: 30%;
        top: 20%;
        background: white;
        border: 2px solid grey;

        .board-top {
            height: 20px;
            padding: 10px;
            color: #333333;
            background: rgba(242, 242, 242, 1);
            border-bottom: 1px solid grey;
            border-radius: 3px;
            font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
            font-weight: 700;
            font-style: normal;
            font-size: 16px;
            text-align: left;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
        }

        .board-middle {
            border-bottom: 1px solid grey;
            padding: 65px 60px;

            .recorder-bar {
                height: 60px;
                padding: 0px 15px;
                border: 1px solid grey;
                border-radius: 5px;
                box-shadow: 1px 1px 1px #888888;
                display: flex;
                justify-content: space-around;
                align-items: center;

                .play {

                }

                .progress {
                    width: 270px;
                    margin-left: 15px;
                    margin-right: 20px;
                }
            }

        }

        .board-foot {
            height: 40px;
            padding: 30px 60px;
            display: flex;
            justify-content: space-around;

            .button {
                margin-right: 15px;
            }
        }
    }

    .judge-text{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .videoplayer{
        width: 250px;
        height: 50px;
        position: absolute;
        left: -30px;
        top:50px
    }
</style>
