import axios from 'axios';

const PROXY_API_BASE_URL = 'http://localhost:8080/cruddb/proxies';

class ProxyApiService {

    fetchProxies = async() => {
        let res = await axios.get(PROXY_API_BASE_URL);
        return res;
    }

    fetchProxyById(proxyId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ proxyId + '"}')
        var request = {
            params:params
        }
        return axios.get(PROXY_API_BASE_URL,request);
    }

    deleteProxy(proxyId) {
        return axios.delete(PROXY_API_BASE_URL + '/' + proxyId);
    }

    addProxy(proxy) {
        
        return axios.post(PROXY_API_BASE_URL, proxy);
    }

    editProxy(proxy) {
        // console.log(proxy);
        return axios.patch(PROXY_API_BASE_URL + '/' + proxy.id, proxy,{ headers: { 'Content-Type': 'application/json' }})
        // .then(response =>{console.log(response)}).catch(
        //     error=>{
        //         console.log(error);
        //     }
        //     );
    }

}

export default new ProxyApiService();