import React, { Component } from 'react'
import ApiService from "../../service/EmailApiService";

class AddEmailComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            pop: '',
            port: '',
            ssl: '',
            status: '',
            campaign_s1: '',
            campaign_s2: '',
            campaign_s3: '',
            last_access:'',
            message:null,
        }
        this.saveEmail = this.saveEmail.bind(this);
    }

    saveEmail = (e) => {
        e.preventDefault();
        let email = {email: this.state.email, password: this.state.password, pop: this.state.pop, port: this.state.port, ssl: this.state.ssl, status: this.state.status,campaign_s1:this.state.campaign_s1,campaign_s2:this.state.campaign_s2,campaign_s3:this.state.campaign_s3};
        ApiService.addEmail(email)
            .then(res => {
                this.setState({message : 'Email added successfully.'});
                this.props.history.push('/emails');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Email</h2>
                <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>POP Server:</label>
                    <input placeholder="POP Server" name="pop" className="form-control" value={this.state.pop} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>POP Port:</label>
                    <input placeholder="Port" name="port" className="form-control" value={this.state.port} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>SSL:</label>
                    <input placeholder="ssl" name="ssl" className="form-control" value={this.state.ssl} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <input placeholder="status" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S1:</label>
                    <input  placeholder="campaign s1" name="campaign_s1" className="form-control" value={this.state.campaign_s1} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S2:</label>
                    <input placeholder="campaign s2" name="campaign_s2" className="form-control" value={this.state.campaign_s2} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S3:</label>
                    <input  placeholder="campaign s3" name="campaign_s3" className="form-control" value={this.state.campaign_s3} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="datetime" name="last_access" className="form-control" value={this.state.last_access} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveEmail}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddEmailComponent;