import axios from "axios";
import {BASE_URL} from "@/config";

class Http {
    constructor() {
        this.axios = axios.create(
            {
                baseURL: BASE_URL,
                timeout: 1000,
            }
        );

        this.axios.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            return Promise.reject(error);
        });

    }

    example(data) {
        return this.axios.post('message/', data);
    }

    sendRecorder(formdata) {
        // formdata
        return this.axios({
            url: 'recorder/',
            data: formdata,
            method: 'post',
            headers: {"Content-Type": "multipart/form-data"}
        });
    }

    sendPartFiles(partFiles, file) {
        this.axios.all(partFiles.map(this.sendRecorder)).then(
            axios.spread(() => {
                // wait all requests done
                return this.mergeFile(file);
            })
        )
    }

    mergeFile(data) {
        return this.axios.put('recorder/', data)
    }

}


export default new Http()

