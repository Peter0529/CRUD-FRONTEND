import axios from 'axios';
import * as BASE  from './Base.js';
const COMPLETED_S1_API_BASE_URL = BASE.URL + '/campaign_s1';
// const COMPLETED_S1_API_BASE_URL = 'http://www.dashon.net:8080/cruddb/campaign_s1';

class CampaignS1ApiService {

    fetchCampaigns = async() => {
        var params = new URLSearchParams();
        params.append("filter",'{"property":"status","operator":"eq","value":"OFF"}')
        var request = {
            params:params
        }
        let res = await axios.get(COMPLETED_S1_API_BASE_URL,request);
        return res;
    }

    fetchCampaignById(campId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ campId + '"}')
        var request = {
            params:params
        }
        return axios.get(COMPLETED_S1_API_BASE_URL,request);
    }

    deleteCampaign(campId) {
        return axios.delete(COMPLETED_S1_API_BASE_URL + '/' + campId);
    }

    addCampaign(camp) {
        return axios.post(COMPLETED_S1_API_BASE_URL, camp);
    }

    editCampaign(camp) {
        // console.log(dash);
        return axios.patch(COMPLETED_S1_API_BASE_URL + '/' + camp.id, camp,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new CampaignS1ApiService();