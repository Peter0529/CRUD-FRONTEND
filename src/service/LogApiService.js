import axios from 'axios';

const LOG_API_BASE_URL = 'http://localhost:8080/cruddb/logs';

class LogApiService {

    fetchLogs = async() => {
        let res = await axios.get(LOG_API_BASE_URL);
        return res;
    }

    fetchLogById(logId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ logId + '"}')
        var request = {
            params:params
        }
        return axios.get(LOG_API_BASE_URL,request);
    }

    deleteLog(logId) {
        return axios.delete(LOG_API_BASE_URL + '/' + logId);
    }

    addLog(log) {
        return axios.post(LOG_API_BASE_URL, log);
    }

    editLog(log) {
        // console.log(log);
        return axios.patch(LOG_API_BASE_URL + '/' + log.id, log,{ headers: { 'Content-Type': 'application/json' }})
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new LogApiService();