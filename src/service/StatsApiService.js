import axios from 'axios';
import * as BASE  from './Base.js';
const STATS_API_BASE_URL = BASE.URL + '/stats_s1';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class StatsApiService {

    fetchStats = async() => {
        let res = await axios.get(STATS_API_BASE_URL);
        return res;
    }

    fetchStateById(stateId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ stateId + '"}')
        var request = {
            params:params
        }
        return axios.get(STATS_API_BASE_URL,request);
    }

    deleteState(stateId) {
        return axios.delete(STATS_API_BASE_URL + '/' + stateId);
    }

    addState(stateId) {
        return axios.post(STATS_API_BASE_URL, stateId);
    }

    editState(state) {
        // console.log(email);
        return axios.patch(STATS_API_BASE_URL + '/' + state.id, state,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }

}

export default new StatsApiService();