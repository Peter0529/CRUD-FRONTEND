import axios from 'axios';
import * as BASE  from './Base.js';
const VPN_API_BASE_URL = BASE.URL + '/vpn';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class VPNApiService {

    fetchVPNs = async() => {
        let res = await axios.get(VPN_API_BASE_URL);
        return res;
    }

    fetchVPNById(vpnId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ vpnId + '"}')
        var request = {
            params:params
        }
        return axios.get(VPN_API_BASE_URL,request);
    }

    deleteVPN(vpnId) {
        return axios.delete(VPN_API_BASE_URL + '/' + vpnId);
    }

    addVPN(vpn) {
        return axios.post(VPN_API_BASE_URL, vpn);
    }

    editVPN(vpn) {
        // console.log(vpn);
        return axios.patch(VPN_API_BASE_URL + '/' + vpn.id, vpn,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }
}

export default new VPNApiService();