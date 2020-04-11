import axios from 'axios';
import * as BASE  from './Base.js';
const EMAIL_API_BASE_URL = BASE.URL + '/emails';
axios.defaults.headers.common['authorization'] = `Basic ${BASE.token}`;

class EmailApiService {

    fetchEmails = async() => {
        let res = await axios.get(EMAIL_API_BASE_URL);
        return res;
    }

    fetchEmailById(emailId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ emailId + '"}')
        var request = {
            params:params
        }
        return axios.get(EMAIL_API_BASE_URL,request);
    }

    deleteEmail(emailId) {
        return axios.delete(EMAIL_API_BASE_URL + '/' + emailId);
    }

    addEmail(email){
        return axios.post(EMAIL_API_BASE_URL, email);
    }
    
    editEmail (email)  {
        // console.log(email);
        return axios.patch(EMAIL_API_BASE_URL + '/' + email.id, email,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }

}

export default new EmailApiService();