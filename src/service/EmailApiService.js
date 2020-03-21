import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/cruddb/emails';

class EmailApiService {

    fetchEmails = async() => {
        let res = await axios.get(USER_API_BASE_URL);
        return res;
    }

    fetchEmailById(emailId) {
        
        var params = new URLSearchParams();
        params.append("filter",'{"property":"id","operator":"eq","value":"'+ emailId + '"}')
        var request = {
            params:params
        }
        return axios.get(USER_API_BASE_URL,request);
    }

    deleteEmail(emailId) {
        return axios.delete(USER_API_BASE_URL + '/' + emailId);
    }

    addEmail(email){
        return axios.post(USER_API_BASE_URL, email);
    }

    editEmail (email)  {
        // console.log(email);
        return axios.patch(USER_API_BASE_URL + '/' + email.id, email,{ headers: { 'Content-Type': 'application/json' } })
        //.then(response =>{console.log(response)}).catch(error=>{console.log(error);});
    }

}

export default new EmailApiService();