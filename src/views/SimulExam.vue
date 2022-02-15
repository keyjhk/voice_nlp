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
                    <el-steps :active="questionIdx" finish-status="success">
                        <el-step :title="`题目${idx}`" v-for="(idx) in questionList.length" :key="idx"></el-step>
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
                        <!--                        题目详情-->
                        <div class="middle-question-group">
                            <div class="middle-quesiton-detail">

                                <!--                                    用户-->
                                <div :style="checkerIconStyle('question')"
                                     style="display: flex;">
                                    <div class="icon-group">
                                        <i class="el-icon-s-custom icon"></i>
                                        <p class="annotate">用户</p>
                                    </div>
                                    <span class="text">{{question.question?question.question:''}}</span>
                                </div>


                                <div :style="checkerIconStyle('answer')"
                                     style="font-size: 50px;margin-top: 20px;display: flex;">
                                    <div class="icon-group">
                                        <i class="el-icon-s-check icon"></i>
                                        <p class="annotate">客服</p>
                                    </div>
                                    <i class="el-icon-microphone" style="line-height: 50px;"
                                       v-show="currentPlaying=='answer'&&microShow"></i>
                                </div>
                            </div>
                            <video ref="questionPlayer" src="" controls="controls" class="player"></video>
                            <video ref="answerPlayer" src=""
                                   controls="controls" class="player"></video>

                            <div class="button-group">
                                <el-button type="primary"
                                           @click="startTrain"
                                           v-show="questionList.length==0">开始训练
                                </el-button>

                                <el-button v-show="questionList.length>0"
                                           @click="reAnswer"
                                           type="danger">重新开始
                                </el-button>
                                <el-button v-show="questionList.length>0"
                                           @click="nextQuestion">
                                    跳过问题{{countDown>0?`(${countDown}s)`:''}}
                                </el-button>
                            </div>
                        </div>

                    </div>

                </div>
                <!--                    判定区域-->
                <div class="judge-group">
                    <p class="title">判定区</p>
                    <div class="judge-result">
                        <div class="time-tips">
                            <span class="time-tip">要求时限：5:00</span>
                            <span class="time-tip">当前用时：5:00</span>
                        </div>
                        <p class="result">本次练习，您回答</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {BASE_URL, STATIC_FILES} from "@/config";

    var countDownTimer;
    export default {
        name: "SimulExam",
        data: () => {
            return {
                questionList: [],
                questionIdx: -1,
                countDown: 0,
                currentPlaying: '',
                microShow: false, // control micro-icon flash
            }
        },
        mounted() {
            setInterval(() => {
                this.microShow = !this.microShow; // flash
            }, 500);

        },
        computed: {
            question() {
                return this.questionIdx > -1 ? this.questionList[this.questionIdx] : {}
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
            // train
            startTrain() {
                this.getQuestion().then(() => {
                    this.nextQuestion();
                });
            },
            getQuestion() {
                return this.$http.getQuestionList().then(res => {
                    this.questionList = res.data;
                });
            },
            nextQuestion() {
                this.questionIdx++;
                // clear current timer
                if (countDownTimer) {
                    this.countDown = 0;
                    clearInterval(countDownTimer);
                }
                // alert warning
                if (this.questionIdx == this.questionList.length) {
                    // alert
                    this.$refs.answerPlayer.pause();
                    this.$refs.questionPlayer.pause();
                    this.$alert('本轮对话，训练结束').then(() => {
                        this.reAnswer();
                    });
                } else {
                    this.playQuestion();
                }
            },
            reAnswer() {
                this.questionIdx = -1; // reset questionIdx
                this.nextQuestion();
            },
            play() {
                this.playQuestion();
            },
            filePath(path) {
                return BASE_URL + STATIC_FILES + path;
            },
            playQuestion() {
                this.$refs.answerPlayer.pause();
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
                        // settimer ,auto next question when ended playing
                        this.countDown = 5;
                        this.currentPlaying = '';
                        countDownTimer = setInterval(() => {
                            this.countDown--;
                            if (this.countDown == 0) {
                                this.nextQuestion();
                            }
                        }, 1000);

                    };
                }
            }
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
                        /*width: 1100px;*/
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .middle-title {
                            color: #3a8ee6;
                            height: 28px;
                            line-height: 28px;
                            margin-bottom: 10px;
                        }

                        .middle-question {
                            height: 40px;
                            line-height: 40px;
                            font-size: 20px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }

                        middle-question-group {

                        }

                        .middle-quesiton-detail {
                            height: 150px;
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

                        .player {
                            height: 50px;
                            display: none;
                        }

                        .button-group {
                            display: flex;
                            justify-content: flex-end;
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
                        /*display: flex;*/
                        visibility: hidden;
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

<style lang="scss">
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
</style>
