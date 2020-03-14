import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/cruddb/emails';

class EmailApiService {

    fetchEmails() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchEmailById(emailId) {
        return axios.get(USER_API_BASE_URL + '?filter={"property":"id","operator":"eq","value":"'+ emailId + '"}');
    }

    deleteEmail(emailId) {
        return axios.delete(USER_API_BASE_URL + '/' + emailId);
    }

    addEmail(email) {
        return axios.post(""+USER_API_BASE_URL, email);
    }

    editEmail(email) {
        return axios.put(USER_API_BASE_URL + '/' + email.id, email);
    }

}

export default new EmailApiService();