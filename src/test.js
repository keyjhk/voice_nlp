import Recorder from "recorder-js";    // 引入录音插件

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
    onAnalysed: data => {
        // console.log("recorder data",data)
    }
});

navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => recorder.init(stream)).catch(err => console.log("Uh oh... unable to get stream...", err));
//载入这段dom的时候调用，获取设备及权限

recorder.start().then(() => {
    this.Recordingbtn = "保存录音";     //开始录音后按钮文字变化
    this.Recordingnum = 0;
    this.Recordingtime = "0:00";
    this.Recordingtage = 0;
    this.Recordingint = window.setInterval(function () {
        this.Recordingnum++;
        this.Recordingtime =
            parseInt(this.Recordingnum / 60) +
            ":" +
            (this.Recordingnum % 60 < 10
                ? "0" + (this.Recordingnum % 60)
                : this.Recordingnum % 60);
        this.Recordingtage = parseFloat((self.Recordingnum / 18).toFixed(2));
    }, 1000);  //计时换算
});  //开始录音流程

window.clearInterval(this.Recordingint);    //录音完成清除定时
recorder.stop().then(({blob, buffer}) => {
    this.Recordingbtn = "开始录音";    //停止录音后按钮文字变化
    blob = blob;
    let formData = new FormData();
    formData.append("type", "20");
    formData.append("file", blob, "file.wav");
    this.loading3 = true;
    this.loading3t = "音频上传中，请稍后";
    /* //此处调用接口（参数为formData）保存录音并返回一个audioUrl，用以本地播放 //  */
    Recorder.download(blob, 'my-audio-file');  //将音频文件下载到本地

//听录音
    this.loading2 = true;
    let audiodom = document.getElementById("audio");
    audiodom.src = window.SITE_CONFIG["baseUrl"] + row.audioUrl;
    audio.addEventListener(
        "loadeddata",
        function () {
            audiodom.controls = "controls";
            this.loading2 = false;
            // audiodom.play();//开始播放
        },
        false
    )
})
