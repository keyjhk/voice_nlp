<template>
    <div class="mainer">
        <div class="exam-card">
            <div class="card-title">客服代表岗位模拟训练</div>

            <div class="left-right">
                <div class="card-left">
                    <!--                    名片-->
                    <div class="card">
                        <img src="../images/正式考试/u524.svg" class="image">
                        <div class="name">张某某</div>
                    </div>
                    <!--                    信息描述-->
                    <div class="description">
                        <el-descriptions :column="2" border size="medium">
                            <el-descriptions-item label="编号" class="label"></el-descriptions-item>
                            <el-descriptions-item label="部门"></el-descriptions-item>
                            <el-descriptions-item label="手机号码"></el-descriptions-item>
                            <el-descriptions-item label="性别"></el-descriptions-item>
                            <el-descriptions-item label="生日"></el-descriptions-item>
                            <el-descriptions-item label="城市"></el-descriptions-item>
                        </el-descriptions>

                    </div>
                </div>
                <div class="tip">
                    <p class="score">60</p>
                    <p class="text">综合得分</p>
                </div>
                <div class="tip">
                    <p class="score">200</p>
                    <p class="text">完成训练次数</p>
                </div>
            </div>

        </div>

        <div class="course-answer">
            <div class="course">
                <p class="course-title">课程切换</p>
                <el-menu default-active="2"
                         text-color="#FFFFFF"
                         active-text-color="#409EFF"
                         class="course-menu">
                    <el-menu-item index="1">
                            <span slot="title">
                                <i class="el-icon-caret-right" style="color: white"></i>
                                公司介绍</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                            <span slot="title">
                                <i class="el-icon-caret-right" style="color: white"></i>
                                承接来话流程</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                            <span slot="title">
                                <i class="el-icon-caret-right" style="color: white"></i>
                                确保服务质量</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                            <span slot="title">
                                <i class="el-icon-caret-right" style="color: white"></i>
                                开展营销工作</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                            <span slot="title">
                                <i class="el-icon-caret-right" style="color: white"></i>
                                支持流程优化</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <div slot="title" class="title">
                            <i class="el-icon-caret-right" style="color: white"></i>
                            提升个人能力及心态</div>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="answer">
                <!--                    进度条-->
                <div class="steps">
                    <el-steps :active="1" finish-status="success">
                        <el-step title="步骤1"></el-step>
                        <el-step title="步骤2"></el-step>
                        <el-step title="步骤3"></el-step>
                        <el-step title="步骤4"></el-step>
                        <el-step title="步骤5"></el-step>
                    </el-steps>
                </div>
                <!--                    提示文字-->
                <div class="tips">
                    <p>步骤1：开始接到商机话务</p>
                    <p>本步骤要求时长5分钟以内，以开始录音和结束录音的时间计算！</p>
                    <p>请点击播放按钮，听录音，播放完成后，点击开始录音进行回答。</p>
                </div>
                <!--答题区域-->
                <div class="answer-group">
                    <div class="left"></div>
                    <div class="middle">
                        <p class="middle-title">开始接到商机话务</p>
                        <p class="middle-question">题目1：请听以下录音，并回答</p>
                        <p class="middle-quesiton-detail"></p>
                        <div class="button-group">
                            <el-button size="medium">跳过问题</el-button>
                            <el-button size="medium" type="danger">结束考试</el-button>
                        </div>
                    </div>
                    <div class="right">
                        <p class="right-title">答题区</p>
                        <div class="recorder-bar">
                            <i v-show="!isRecording" class="iconfont icon-24gf-play" ></i>
                            <i v-show="isRecording" class="iconfont icon-sound"></i>
                            <el-progress class="progress" :show-text="false"
                                         :stroke-width="10" :percentage="parseInt(recordingTime*100/limitTime)"
                                         color="#2E70ED">
                            </el-progress>
                            <span>{{recorderTimeText}}/{{parseInt(limitTime/60)}}:00</span>
                        </div>
                        <video :src="audioUrl" controls="controls" class="player"></video>
                        <div class="right-button-group">
                            <el-button size="medium" :type="isRecording?'warning':'primary'"
                                       @click="controlRecording">{{isRecording?'重新回答':'开始回答'}}</el-button>
                            <el-button :disabled="!isRecording" size="medium" type="success" @click="stopRecording">提交回答</el-button>
                        </div>
                    </div>
                </div>
                <!--                    判定区域-->
                <div class="judge-group">
                    <p class="title">判定区</p>
                    <div class="judge-result">
                        <div class="time-tips">
                            <span class="time-tip">要求时限：5:00</span>
                            <span class="time-tip">当前用时：{{recorderTimeText}}</span>
                        </div>
                        <p class="result">本次练习，您回答{{judgeResult}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Recorder from "@/utils/recorder/recorder";

    var audioContext;
    var recorder;
    var timer;
    var audioFile;

    export default {
        name: "JoinExam",
        data: () => {
            return {
                // question
                question: '',
                isPlayingQuestion: false,
                // recording
                isRecording: false,
                recordingTime: 0,
                stopTime: 0, // the time stopped
                limitTime: 5 * 60,
                audioFile:undefined,
                audioUrl: undefined,  // blob
                // upload
                chunkSend: false,
                submitted: false,
                judgeResult: undefined,

            }
        },
        mounted() {
        },
        computed: {
            recorderTimeText: function () {
                return this.formatTime(this.recordingTime);
            },
        },
        methods: {
            formatTime: function (time) {
                if (time > 60) {
                    let minutes = parseInt(time / 60);
                    let seconds = time % 60;
                    return minutes + ':' + seconds;
                } else {
                    return time < 10 ? '00:0' + time : '00:' + time;
                }
            },

            initRecorder() {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('init audio', audioContext.state);
                recorder = new Recorder(audioContext, {
                    // An array of 255 Numbers
                    // You can use this to visualize the audio stream
                    // If you use react, check out react-wave-stream
                    onAnalysed: data => {
                        // console.log(data);
                        data;
                    }
                });
                return navigator.mediaDevices.getUserMedia({audio: true})
                    .then(stream => {
                        recorder.init(stream);
                        console.log('recorder init successfully')
                    })
                    .catch(err => console.log('Uh oh... unable to get stream...', err));

            },
            controlRecording:function(){
                if(this.isRecording){
                    this.restartRecording();
                }else {
                    this.startRecording();
                }

            },
            startRecording: function () {
                if(recorder==undefined){
                    this.initRecorder().then(()=>{
                        this.startRecording();
                    });
                }
                else{
                    return recorder.start().then(() => {
                        this.isRecording = true;
                        this.stopTime = 0;
                        this.recordingTime = 0;
                        timer = setInterval(() => {
                            this.recordingTime++;
                            if (this.recordingTime >= this.limitTime) {
                                this.stopRecording();
                            }
                        }, 1000)
                    }).catch(err => {
                        console.log(err)
                    });
                }

            },
            stopRecording: function () {
                return recorder.stop()
                    .then(({blob,fileUrl}) => {
                        // blob:binary files;buffer: AudWioBuffer;file_url
                        console.log('stop recording');
                        this.isRecording = false;
                        clearInterval(timer);
                        this.stopTime = this.recordingTime;
                        this.audioFile = blob;
                        this.audioUrl = fileUrl;  //update file_url
                    }).catch(err => {
                        console.log(err);
                    });
            },
            restartRecording: function () {
                if (this.isRecording) {
                    this.stopRecording().then(() => {
                        this.startRecording();
                    });
                }

            },

            uploadRecording: function () {
                // file:size,name,is_chunk
                this.submitted = true;
                let res;
                if (this.chunkSend) {
                    let file = {name: 'recorder.wav', size: audioFile.size, file: audioFile}
                    res = this.chunkUpload(file);
                } else {
                    let formData = new FormData();
                    formData.set('file', audioFile, 'recorder.wav')
                    res = this.$http.sendRecorder(formData);
                }
                res.then(data => {
                    data = data.data;
                    console.log('data:', data);
                    let judge = (data.judge == true ? '正确' : '错误');
                    console.log(judge, data.url);
                    this.judgeResult = judge;
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
            getQuestion: function () {
                this.$http.getQuestion().then(res => {
                    let question = res.data.text;
                    this.question = question;
                })
            },
        }
    }
</script>

<style lang="scss">
    @import "../files/模拟练习新/styles.css";

    * {
        font-size: 12px;
    }

    .border {
        background-color: rgba(233, 233, 233, 1);
        height: 2px;
    }

    .header {
        height: 50px;
        margin-top: 20px;

        .title {
            padding: 2px 2px 2px 10px;
            margin-bottom: 10px;
            border-left: 4px solid rgba(0, 121, 254, 1);
            line-height: 16px;

        }
    }

    .mainer {
        margin-top: 10px;

        .exam-card {
            padding: 40px;
            border: 2px solid rgba(233, 233, 233, 1);

            .card-title {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                margin-bottom: 20px;
                font-weight: bold;
            }

            .left-right {
                display: flex;
                justify-content: left;
                align-items: flex-start;

                .card-left {
                    border: 1px solid rgba(233, 233, 233, 1);
                    display: flex;
                    justify-content: left;
                    height: 270px;
                    margin-right: 100px;

                    .card {
                        width: 295px;
                        height: 100%;
                        border-right: 1px solid rgba(233, 233, 233, 1);

                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;

                        .image {
                            width: 80px;
                        }

                        .name {
                            width: 80px;

                            text-align: center;
                            color: white;
                            background-color: rgb(255, 169, 76);
                            border-radius: 10px;
                        }
                    }

                    .description {
                        height: 100%;
                        text-align: center;
                        display: flex;

                        .el-descriptions-item__cell {
                            height: 90px;
                            text-align: center;
                        }

                        .el-descriptions-item__label {
                            width: 143px;
                        }

                        .el-descriptions-item__content {
                            width: 115px;
                        }

                    }


                }

                .tip {
                    width: 130px;
                    text-align: center;

                    .score {
                        height: 42px;
                        line-height: 42px;
                        color: red;
                    }

                    .text {
                        height: 36px;
                        line-height: 36px;
                    }
                }
            }

        }

        .course-answer {
            border: 2px solid rgba(233, 233, 233, 1);
            margin-top:20px;
            height: 900px;
            display: flex;
            justify-content: left;
            /*课程*/
            .course {
                width: 230px;
                height: 100%;
                border-right:1px solid rgba(233, 233, 233, 1) ;
                .course-title{
                    padding: 2px 2px 2px 20px;
                    height: 40px;
                    line-height: 40px;
                    font-weight: bold;
                }

                .el-menu-item{
                    width: 100%;
                    height: 50px;
                    margin-top: 20px;
                    background-image: url("../images/模拟练习新/u979.svg");
                    background-repeat: no-repeat;
                    color: white;
                }

            }

            /*答题*/
            .answer {
                width: 1000px;
                padding:0px 20px 0px 20px;
                height: 100%;
                .steps{
                    margin-top: 20px;
                }
                .tips{
                    margin:20px 0px ;
                    padding: 16px 24px 16px 64px;
                    background:  rgb(230,247,255);
                    p{
                        height: 28px;
                    }
                }

                .answer-group{
                    height: 330px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: left;
                    .left,.middle,.right{
                        border: 1px solid rgba(233, 233, 233, 1);

                    }
                    .left{
                        width: 53px;
                        background: rgb(243,243,243);

                    }
                    .middle{
                        padding: 20px 35px;
                        width: 720px;
                        margin-right: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .middle-title{
                            color: #3a8ee6;
                            height: 28px;
                            line-height: 28px;
                            margin-bottom: 10px;
                        }
                        .middle-question{
                            height: 40px;
                            line-height: 40px;
                        }
                        .middle-quesiton-detail{
                            height: 200px;
                            margin-bottom: 5px;
                        }
                        .button-group{
                            display: flex;
                            justify-content: flex-end;
                        }
                    }
                    .right{
                        padding: 20px 35px;
                        width: 380px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .right-title{
                            padding: 0px 20px;
                            height: 35px;
                            line-height: 35px;
                            border: 1px solid rgba(233, 233, 233, 1);
                            background: rgb(243,243,243);

                        }
                        .recorder-bar{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .progress{
                                width: 100%;
                                margin: 0px 5px;
                            }
                        }

                        .player{
                            height: 50px;
                            display:none;
                        }

                        .right-button-group{
                            display: flex;
                            justify-content: space-around;
                        }
                    }
                }

                .judge-group{
                    padding: 20px 45px;
                    border: 1px solid rgba(233, 233, 233, 1);
                    .title{
                        padding:0px 30px 0px 20px ;
                        background: rgb(243,243,243);
                        height: 36px;
                        line-height: 36px;

                    }
                    .judge-result{
                        height: 170px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        .time-tip{
                            font-size: 20px;
                            margin-right: 40px;
                            height: 40px;
                            line-height: 40px;
                            color: red;
                            font-weight: bold;
                        }
                        .result{
                            height: 20px;
                            line-height: 20px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }

    .footer {
        height: 100px;
        text-align: center;
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

    .judge-text {
        color: red;
        font-weight: bold;
        font-size: 16px;
    }

    .videoplayer {
        width: 250px;
        height: 50px;
        position: absolute;
        left: -30px;
        top: 50px
    }

    .question {
        width: 450px;
        position: absolute;
        left: 15px;
        top: 50px;
        font-weight: bold;
        font-size: 15px;
    }
</style>
