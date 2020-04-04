import axios from 'axios';
import * as BASE  from './Base.js';
const CAMPAIGN_S1_API_BASE_URL = BASE.URL + '/campaign_s1';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;
axios.defaults.headers.post['Content-Type'] = "application/json";

class CampaignS1ApiService {

    fetchCampaigns = async() => {
        let res = await axios.get(CAMPAIGN_S1_API_BASE_URL)
          
        return res;
        // fetch(CAMPAIGN_S1_API_BASE_URL, {
        //     method:'GET',
        //     headers: new Headers({
        //         "Content-Type":"application/json",
        //         "Authorization": `Basic ${BASE.token}`
        //     }),
            
        //     }).then(response => {
        //     if (!response.ok) console.log(response);
        //     return response.json();
        //     })
        
    }

    fetchCampaignById(campId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ campId + '"}')
        var request = {
            params:params
        }
        return axios.get(CAMPAIGN_S1_API_BASE_URL,request);
    }

    deleteCampaign(campId) {
        return axios.delete(CAMPAIGN_S1_API_BASE_URL + '/' + campId);
    }

    addCampaign(camp) {
        return axios.post(CAMPAIGN_S1_API_BASE_URL, camp);
    }

    editCampaign(camp) {
        // console.log(dash);
        return axios.patch(CAMPAIGN_S1_API_BASE_URL + '/' + camp.id, camp)
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new CampaignS1ApiService();