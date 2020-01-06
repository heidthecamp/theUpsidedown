import axios from 'axios';

const baseURL = 'https://api.upsidedown.heidthecamp.com/upsidedown';
export class UpsidedownService {

    postMessage(contents: string): Promise<boolean>{
        
        return axios.post(baseURL,{"content":contents})
            .then(res => {
                console.log(res);
                return true;
            })
            .catch(err => {
                console.error(err);
                return false;
            })
    }
}