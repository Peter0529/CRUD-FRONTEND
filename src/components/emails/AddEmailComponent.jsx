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
            campaignS1: '',
            campaignS2: '',
            campaignS3: '',
            lastAccess:'',
            message:null,
        }
        this.saveEmail = this.saveEmail.bind(this);
    }

    saveEmail = (e) => {
        e.preventDefault();
        let email = this.state;
        email.lastAccess = new Date().toISOString();
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
                    <input type="text" placeholder="" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="" placeholder="" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>POP Server:</label>
                    <input placeholder="" name="pop" className="form-control" value={this.state.pop} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>POP Port:</label>
                    <input placeholder="" name="port" className="form-control" value={this.state.port} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>SSL:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="ssl" className="form-control" value={this.state.ssl} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S1:</label>
                    <input  type="number" min="0" step="1" placeholder="integer" name="campaignS1" className="form-control" value={this.state.campaignS1} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S2:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="campaignS2" className="form-control" value={this.state.campaignS2} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign S3:</label>
                    <input  type="number" min="0" step="1" placeholder="integer" name="campaignS3" className="form-control" value={this.state.campaignS3} onChange={this.onChange}/>
                </div>

                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                <button className="btn btn-success" onClick={this.saveEmail}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/emails')}>Cancel</button>
            </form>
    </div>
        );
    }
}

export default AddEmailComponent;