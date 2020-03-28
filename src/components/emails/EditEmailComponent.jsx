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
            ssl:'',
            status: '',
            campaignS1: '',
            campaignS2: '',
            campaignS3: '',
            lastAccess: '',
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
                let email = res.data[0];
                this.setState(email);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveEmail = (e) => {
        e.preventDefault();
        let email = this.state;
        email.lastAccess = new Date().toISOString();
        
        ApiService.editEmail(email)
            .then(res => {
                this.setState({message : 'Email updated successfully.'});
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
                        <input type="text" placeholder="" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input placeholder="" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>POP Server:</label>
                        <input placeholder="" name="pop" className="form-control" value={this.state.pop} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>POP Port:</label>
                        <input  placeholder="" name="port" className="form-control" value={this.state.port} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>SSL:</label>
                        <select name="ssl" className="form-control" value={this.state.ssl} onChange={this.onChange}>
                            <option value="1">ON</option>
                            <option value="0">OFF</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <select name="status" className="form-control" value={this.state.status} onChange={this.onChange}>
                            <option value="1">Active</option>
                            <option value="0">Disabled</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Campaign S1:</label>
                        <select name="campaignS1" className="form-control" value={this.state.campaignS1} onChange={this.onChange}>
                            <option value="0">OFF</option>
                            <option value="1">ON</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Campaign S2:</label>
                        <select name="campaignS2" className="form-control" value={this.state.campaignS2} onChange={this.onChange}>
                            <option value="0">OFF</option>
                            <option value="1">ON</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Campaign S3:</label>
                        <select name="campaignS3" className="form-control" value={this.state.campaignS3} onChange={this.onChange}>
                            <option value="0">OFF</option>
                            <option value="1">ON</option>
                        </select>
                    </div>

                    <button className="btn btn-success" onClick={this.saveEmail}>Save</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/emails')}>Cancel</button>
                </form>
            </div>
        );
    }
}
export default EditEmailComponent;