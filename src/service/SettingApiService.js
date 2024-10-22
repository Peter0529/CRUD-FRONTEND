import axios from 'axios';
import * as BASE  from './Base.js';

const SETTING_API_BASE_URL = BASE.URL + '/settings';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class EmailApiService {

    fetchSettings = async() => {
        let res = await axios.get(SETTING_API_BASE_URL);
        return res;
    }

    fetchSettingById(settingId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ settingId + '"}')
        var request = {
            params:params
        }
        return axios.get(SETTING_API_BASE_URL,request);
    }

    deleteSetting(settingId) {
        return axios.delete(SETTING_API_BASE_URL + '/' + settingId);
    }

    addSetting(setting) {
        return axios.post(SETTING_API_BASE_URL, setting);
    }

    editSetting(setting) {
        // console.log(email);
        return axios.patch(SETTING_API_BASE_URL + '/' + setting.id, setting,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }

}

export default new EmailApiService();