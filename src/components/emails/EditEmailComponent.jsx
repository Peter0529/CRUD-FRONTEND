import React, { Component } from 'react'
import ApiService from "../../service/EmailApiService";

class EditEmailComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            email: '',
            password: '',
            pop: '',
            port: '',
            status: '',
            campaign_s1: '',
            campaign_s2: '',
            campaign_s3: '',
            last_access: '',
        }
        this.saveEmail = this.saveEmail.bind(this);
        this.loadEmail = this.loadEmail.bind(this);
    }

    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        ApiService.fetchEmailById(window.localStorage.getItem("emailId"))
            .then((res) => {
                let email = res.data.result;
                this.setState({
                id: email.id,
                email: email.email,
                password: email.password,
                pop: email.pop,
                port: email.port,
                status: email.status,
                campaign_s1:email.campaign_s1,
                campaign_s2:email.campaign_s2,
                campaign_s3:email.campaign_s3,
                last_access:email.last_access,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveEmail = (e) => {
        e.preventDefault();
        let email = {id: this.state.id, email: this.state.email, password: this.state.password, pop: this.state.pop, port: this.state.port, status: this.state.status
            , campaign_s1: this.state.campaign_s1, campaign_s2: this.state.campaign_s2, campaign_s3: this.state.campaign_s3};
        ApiService.editEmail(email)
            .then(res => {
                this.setState({message : 'Email added successfully.'});
                this.props.history.push('/emails');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Email</h2>
                <form>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" placeholder="email" name="email" className="form-control" readonly="true" defaultValue={this.state.email}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>POP Server:</label>
                        <input placeholder="Pop Server" name="pop" className="form-control" value={this.state.pop} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>POP Port:</label>
                        <input  placeholder="Port" name="pop_port" className="form-control" value={this.state.port} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <input placeholder="status" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveEmail}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditEmailComponent;