import React, { Component } from 'react'
import ApiService from "../../service/DashboardApiService";
import date_format from "../../service/DateFormat";
class AddDashboardComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            hwid:'',
            note:'',
            ip:'',
            campaignType:'',
            lifetimeActivity:'',
            dailyActivity:'',
            lastHourActivity:'',
            status:'',
            owner:'',
            lastAccess:'',
            message:null,
        }
        this.saveDashboard = this.saveDashboard.bind(this);
    }

    saveDashboard = (e) => {
        e.preventDefault();
        let dash = {hwid: this.state.hwid, note: this.state.note, ip: this.state.ip, campaignType: this.state.campaignType,lifetimeActivity:this.state.lifetimeActivity, dailyActivity: this.state.dailyActivity, lastHourActivity:this.state.lastHourActivity,status: this.state.status,owner:this.state.owner,lastAccess:date_format()};
        console.log(dash);
        ApiService.addDashboard(dash)
            .then(res => {
                this.setState({message : 'Dashboard added successfully.'});
                this.props.history.push('/dashboard');
                window.location.reload(false);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Dashboard</h2>
                <form>
                <div className="form-group">
                    <label>HWID:</label>
                    <input type="text" placeholder="" name="hwid" className="form-control" value={this.state.hwid} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Note:</label>
                    <input type="" placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>IP:</label>
                    <input placeholder="" name="ip" className="form-control" value={this.state.ip} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Campaign Type:</label>
                    <input placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>LifeTime Activity:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="lifetimeActivity" className="form-control" value={this.state.lifetimeActivity} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Daily Activity:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="dailyActivity" className="form-control" value={this.state.dailyActivity} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Last Hour Activity:</label>
                    <input  type="number" min="0" step="1" placeholder="integer" name="lastHourActivity" className="form-control" value={this.state.lastHourActivity} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <input placeholder="" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Owner:</label>
                    <input  placeholder="" name="owner" className="form-control" value={this.state.owner} onChange={this.onChange}/>
                </div>

                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                <button className="btn btn-success" onClick={this.saveDashboard}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/dashboard')}>Cancel</button>
            </form>
    </div>
        );
    }

}


export default AddDashboardComponent;