import axios from 'axios';
import * as BASE  from './Base.js';
const USER_AGENT_API_BASE_URL = BASE.URL + '/useragents';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class UserAgentApiService {

    fetchAgents = async() => {
        let res = await axios.get(USER_AGENT_API_BASE_URL);
        return res;
    }

    fetchAgentById(agentId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ agentId + '"}')
        var request = {
            params:params
        }
        return axios.get(USER_AGENT_API_BASE_URL,request);
    }

    deleteAgent(agentId) {
        return axios.delete(USER_AGENT_API_BASE_URL + '/' + agentId);
    }

    addAgent(agent) {
        return axios.post(USER_AGENT_API_BASE_URL, agent);
    }

    editAgent(agent) {
        // console.log(dash);
        return axios.patch(USER_AGENT_API_BASE_URL + '/' + agent.id, agent,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new UserAgentApiService();