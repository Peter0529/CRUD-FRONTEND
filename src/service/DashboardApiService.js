import axios from 'axios';
import * as BASE  from './Base.js';
const DASHBOARD_API_BASE_URL = BASE.URL + '/dashboard';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class DashboardApiService {

    fetchDashboards = async() => {
        let res = await axios.get(DASHBOARD_API_BASE_URL);
        return res;
    }

    fetchDashboardById(dashId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ dashId + '"}')
        var request = {
            params:params
        }
        return axios.get(DASHBOARD_API_BASE_URL,request);
    }

    deleteDashboard(dashId) {
        return axios.delete(DASHBOARD_API_BASE_URL + '/' + dashId);
    }

    addDashboard(dash) {
        return axios.post(DASHBOARD_API_BASE_URL, dash);
    }

    editDashboard(dash) {
        // console.log(dash);
        return axios.patch(DASHBOARD_API_BASE_URL + '/' + dash.id, dash,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new DashboardApiService();