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
                            提升个人能力及心态
                        </div>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="answer">
                <!--                    进度条-->
                <div class="steps">
                    <el-steps :active="questionIdx" process-status="wait">
                        <el-step :title="`题目${idx+1}`" :status="stepStatus(answered.judgeResult,idx)"
                                 v-for="(answered,idx) in hasAnswered" :key="idx">
                        </el-step>
                    </el-steps>
                </div>
                <!--                    提示文字-->
                <div class="tips">
                    <p>接到商机话务</p>
                    <p>本步骤要求时长5分钟以内，以开始录音和结束录音的时间计算！</p>
                    <p>请点击播放按钮，听录音，播放完成后，点击开始录音进行回答。</p>
                </div>
                <!--答题区域-->
                <div class="answer-group">
                    <div class="left"></div>
                    <div class="middle">
                        <p class="middle-title">开始接到商机话务</p>
                        <p class="middle-question">题目{{questionIdx+1}}：请听以下录音，并回答</p>
                        <div class="middle-quesiton-detail">
                            <!--                            用户-->
                            <div style="display: flex;">
                                <div class="icon-group">
                                    <i class="el-icon-s-custom icon"></i>
                                    <p class="annotate">用户</p>
                                </div>
                                <div>
                                    <p class="text">{{question.question?question.question:''}}</p>

                                </div>

                            </div>
                            <video ref="questionPlayer" :src="filePath(question.q_path)"
                                   controls="controls" style="height: 30px;width: 100%;margin-top: 10px"
                                   autoplay="autoplay"></video>

                            <!--客服-->
                            <div style="font-size: 50px;margin-top: 20px;display: flex;">
                                <div class="icon-group">
                                    <i class="el-icon-s-check icon"></i>
                                    <p class="annotate">客服</p>
                                </div>
                                <i class="el-icon-microphone" style="line-height: 50px;"
                                   v-show="currentPlaying=='answer'&&microShow"></i>
                            </div>
                            <video ref="answerPlayer" :src="filePath(question.a_path)"
                                   controls="controls"
                                   style="display: none;height: 30px;width: 100%;margin-top: 10px"></video>

                        </div>
                        <div class="button-group">
                            <el-button size="medium"
                                       :disabled="questionList.length==0||isRecording"
                                       @click="nextQuestion">
                                跳过问题{{countDown>0?`(${countDown}s)`:''}}
                            </el-button>
                            <el-button size="medium" type="warning" @click="play()">重新播放</el-button>
                        </div>
                    </div>
                    <div class="right">
                        <p class="right-title">答题区</p>
                        <div class="recorder-bar">
                            <i v-show="!isRecording" class="iconfont icon-24gf-play"></i>
                            <i v-show="isRecording" class="iconfont icon-sound"></i>
                            <el-progress class="progress" :show-text="false"
                                         :stroke-width="10" :percentage="parseInt(answered.stopTime*100/limitTime)"
                                         color="#2E70ED">
                            </el-progress>
                            <span>{{recorderTimeText}}/{{parseInt(limitTime/60)}}:00</span>
                        </div>
                        <video :src="answered.audioUrl" controls="controls" class="player"></video>
                        <div class="right-button-group">
                            <el-button size="medium" :type="isRecording?'warning':'primary'"
                                       :disabled="currentPlaying!=''"
                                       @click="controlRecording">{{isRecording?'重新回答':'开始回答'}}
                            </el-button>
                            <el-button :disabled="!isRecording" size="medium" type="success" @click="submitRecording">
                                提交回答
                            </el-button>
                        </div>
                    </div>
                </div>
                <!--                    判定区域-->
                <div class="judge-group">
                    <p class="title">判定区</p>
                    <div class="judge-result">
                        <!--                        父div会显示loading-->
                        <div v-show="answered.judgeResult!=undefined">
                            <div class="time-tips">
                                <span class="time-tip">要求时限：5:00</span>
                                <span class="time-tip">当前用时：{{recorderTimeText}}</span>
                            </div>
                            <p class="result">本次练习，您回答
                                <span style="color: red;">{{answered.judgeResult}}</span></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {BASE_URL, STATIC_FILES} from "../config";
    import Recorder from "@/utils/recorder/recorder";

    var audioContext;
    var recorder;
    var timer;
    let countDownTimer;

    export default {
        name: "SimulExam",
        data: () => {
            return {
                currentPlaying: '',
                microShow:false,
                // question
                questionList: [],
                questionIdx: -1,
                hasAnswered: [], // 是否已经作答
                countDown: 0,
                // recording
                isRecording: false,
                limitTime: 5 * 60,
                // upload
                chunkSend: false,

            }
        },

        mounted() {
            setInterval(() => {
                this.microShow = !this.microShow; // flash
            }, 500);
            // get
            this.getQuestion();
        },
        computed: {
            question() {
                return this.questionIdx > -1 ? this.questionList[this.questionIdx] : '';
            },
            answered() {
                return this.questionIdx > -1 ? this.hasAnswered[this.questionIdx] : {};
            },
            recorderTimeText: function () {
                return this.formatTime(this.answered.stopTime);
            },

        },

        methods: {
            //css
            checkerIconStyle(type) {
                let opacity = this.currentPlaying == type ? '1' : '0.3';
                let color = this.currentPlaying == type ? 'red' : 'black';
                return {
                    opacity: opacity,
                    color: color,
                }
            },
            // questions
            getQuestion() {
                return this.$http.getQuestionList().then(res => {
                    this.questionList = res.data;
                    // console.log(this.questionList);
                    for (let i = 0; i < res.data.length; i++) {
                        this.hasAnswered.push({
                            stopTime: 0,
                            judgeResult: undefined,
                            audioFile: undefined,
                            audioUrl: undefined,
                        });
                    }
                    this.nextQuestion();
                });
            },
            nextQuestion() {
                this.questionIdx++;
                this.countDown = 0;
                clearInterval(countDownTimer);

                // alert warning
                if (this.questionIdx == this.questionList.length) {
                    // alert
                    this.$refs.answerPlayer.pause();
                    this.$refs.questionPlayer.pause();
                    this.$alert('本轮对话，训练结束').then(() => {
                        this.questionIdx = -1; // reset questionIdx
                        this.nextQuestion();
                    });
                } else {
                    this.playQuestion();
                }
            },
            resetQuestion() {
                // called when answer again,to clear history
                this.answered.stopTime = 0;
                this.answered.judgeResult = undefined;
                clearInterval(countDownTimer);
                this.countDown = 0;
            },
            stepStatus(judgeResult, idx) {
                if (judgeResult == '正确') {
                    return 'success';
                } else if (judgeResult == '错误') {
                    return 'error';
                } else {
                    // undefined? highlight current question
                    return idx == this.questionIdx ? 'process' : 'wait';
                }
            },
            filePath(path) {
                return BASE_URL + STATIC_FILES + path;
            },
            // recording
            formatTime: function (time) {
                if (time > 60) {
                    let minutes = parseInt(time / 60);
                    let seconds = time % 60;
                    return minutes + ':' + seconds;
                } else {
                    return time < 10 ? '00:0' + time : '00:' + time;
                }
            },
            //play
            play() {
                this.playQuestion();
            },

            playQuestion() {
                this.$refs.answerPlayer.pause();
                // this.$refs.question.pause();
                let questionPlayer = this.$refs.questionPlayer;
                let fpath = this.filePath(this.question.q_path);
                if (fpath) {
                    this.currentPlaying = "question";
                    questionPlayer.src = fpath;
                    questionPlayer.play();
                    questionPlayer.onended = () => {
                        // settimeout
                        this.currentPlaying = "";
                        setTimeout(this.playAnswer(), 2000)
                    }
                }
            },
            playAnswer() {
                let answerPlayer = this.$refs.answerPlayer;
                let fpath = this.filePath(this.question.a_path);
                if (fpath) {
                    answerPlayer.src = fpath;
                    this.currentPlaying = "answer";
                    answerPlayer.play();
                    answerPlayer.onended = () => {
                        this.currentPlaying = '';
                        // settimer ,auto next question when ended playing
                        // this.countDown = 5;
                        // countDownTimer = setInterval(() => {
                        //     this.countDown--;
                        //     if (this.countDown == 0) {
                        //         this.nextQuestion();
                        //     }
                        // }, 1000);

                    };
                }
            },
            //recorder
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
            controlRecording: function () {
                if (this.isRecording) {
                    this.restartRecording();
                } else {
                    this.startRecording();
                }

            },
            startRecording: function () {
                if (recorder == undefined) {
                    this.initRecorder().then(() => {
                        this.startRecording();
                    });
                } else {
                    return recorder.start().then(() => {
                        this.isRecording = true;
                        this.resetQuestion();
                        timer = setInterval(() => {
                            this.answered.stopTime++;
                            if (this.stopTime >= this.limitTime) {
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
                    .then(({blob, fileUrl}) => {
                        // blob:binary files;buffer: AudWioBuffer;file_url
                        console.log('stop recording');
                        this.isRecording = false;
                        clearInterval(timer);
                        this.answered.audioFile = blob;
                        this.answered.audioUrl = fileUrl;  //update file_url
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
            submitRecording: function () {
                this.stopRecording().then(() => {
                    this.uploadRecording();
                });
            },
            uploadRecording: function () {
                // file:size,name,is_chunk
                let res;
                let audioFile = this.answered.audioFile;
                let loading = this.$loading({target: '.judge-result'})
                if (this.chunkSend) {
                    let file = {
                        name: 'recorder.wav', size: audioFile.size,
                        file: audioFile
                    }
                    res = this.chunkUpload(file);
                } else {
                    let answer = this.question.answer;
                    res = this.$http.judgeAnswer(audioFile, answer);
                }
                res.then(data => {
                    loading.close();
                    this.answered.judgeResult = data.data.answer == true ? "正确" : "错误";
                    // set the timer to next question
                    this.countDown = 5;
                    countDownTimer = setInterval(() => {
                        this.countDown--;
                        if (this.countDown == 0) {
                            this.nextQuestion();
                        }
                    }, 1000)
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

<style lang="scss" scoped>


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
            margin-top: 20px;
            height: 900px;
            display: flex;
            justify-content: left;
            /*课程*/
            .course {
                width: 230px;
                height: 100%;
                border-right: 1px solid rgba(233, 233, 233, 1);

                .course-title {
                    padding: 2px 2px 2px 20px;
                    height: 40px;
                    line-height: 40px;
                    font-weight: bold;
                }

                .el-menu-item {
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
                padding: 0px 20px 0px 20px;
                height: 100%;

                .steps {
                    margin-top: 20px;
                }

                .tips {
                    margin: 20px 0px;
                    padding: 16px 24px 16px 64px;
                    background: rgb(230, 247, 255);

                    p {
                        height: 28px;
                    }
                }

                .answer-group {
                    height: 330px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: left;

                    .left, .middle, .right {
                        border: 1px solid rgba(233, 233, 233, 1);

                    }

                    .left {
                        width: 53px;
                        background: rgb(243, 243, 243);

                    }

                    .middle {
                        padding: 20px 35px;
                        width: 720px;
                        margin-right: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                        .middle-title {
                            color: #3a8ee6;
                            height: 28px;
                            line-height: 28px;
                            margin-bottom: 10px;
                        }

                        .middle-question {
                            height: 40px;
                            line-height: 40px;
                        }

                        .middle-quesiton-detail {
                            height: 200px;
                            margin-bottom: 5px;
                            font-size: 20px;

                            .icon-group {
                                margin-right: 10px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: flex-start;

                                .icon {
                                    font-size: 35px;
                                }

                                .annotate {
                                    font-size: 5px;
                                }

                            }

                            .text {
                                line-height: 40px;
                            }
                        }

                        .button-group {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            height: 36px;

                            .count-down {
                                height: 100%;
                                line-height: 36px;
                                margin-right: 20px;
                                /*text-align: center;*/
                                font-size: 14px;
                                font-weight: bold;
                                color: red;
                            }
                        }
                    }

                    .right {
                        padding: 20px 35px;
                        width: 380px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .right-title {
                            padding: 0px 20px;
                            height: 35px;
                            line-height: 35px;
                            border: 1px solid rgba(233, 233, 233, 1);
                            background: rgb(243, 243, 243);

                        }

                        .recorder-bar {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .progress {
                                width: 100%;
                                margin: 0px 5px;
                            }
                        }

                        .player {
                            height: 50px;
                            display: none;
                        }

                        .right-button-group {
                            display: flex;
                            justify-content: space-around;
                        }
                    }
                }

                .judge-group {
                    padding: 20px 45px;
                    border: 1px solid rgba(233, 233, 233, 1);

                    .title {
                        padding: 0px 30px 0px 20px;
                        background: rgb(243, 243, 243);
                        height: 36px;
                        line-height: 36px;

                    }

                    .judge-result {
                        height: 170px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;

                        .time-tip {
                            font-size: 20px;
                            margin-right: 40px;
                            height: 40px;
                            line-height: 40px;
                            color: red;
                            font-weight: bold;
                        }

                        .result {
                            height: 20px;
                            line-height: 20px;
                            font-size: 16px;

                        }
                    }
                }
            }
        }
    }

</style>
