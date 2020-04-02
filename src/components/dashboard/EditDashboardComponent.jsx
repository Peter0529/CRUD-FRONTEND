import React, { Component } from 'react'
import ApiService from "../../service/DashboardApiService";
import dateFormat from "dateformat";
class EditDashboardComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
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
        }
        this.saveDashboard = this.saveDashboard.bind(this);
        this.loadDashboard = this.loadDashboard.bind(this);
    }

    componentDidMount() {
        this.loadDashboard();
    }

    loadDashboard() {
        ApiService.fetchDashboardById(window.localStorage.getItem("dashId"))
            .then((res) => {
                let dash = res.data[0];
                this.setState({
                id: dash.id,
                hwid: dash.hwid,
                note:dash.note,
                ip:dash.ip,
                campaignType:dash.campaignType,
                lifetimeActivity:dash.lifetimeActivity,
                dailyActivity:dash.dailyActivity,
                lastHourActivity:dash.lastHourActivity,
                status:dash.status,
                owner:dash.owner,
                lastAccess:dash.lastAccess,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    saveDashboard = (e) => {
        e.preventDefault();
        let dash = {id: this.state.id, hwid: this.state.hwid, note: this.state.note, ip: this.state.ip, campaignType: this.state.campaignType, lifetimeActivity: this.state.lifetimeActivity,dailyActivity:this.state.dailyActivity
            , lastHourActivity: this.state.lastHourActivity, status: this.state.status, owner: this.state.owner,lastAccess:new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris'})).toISOString()};
        ApiService.editDashboard(dash)
            .then(res => {
                this.setState({message : 'Dashboard updated successfully.'});
                this.props.history.push('/dashboard');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Dashboard</h2>
                <form>

                    <div className="form-group">
                        <label>HWID:</label>
                        <input type="text" placeholder="" name="hwid" className="form-control" defaultValue={this.state.hwid}/>
                    </div>

                    <div className="form-group">
                        <label>Note:</label>
                        <input placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>IP:</label>
                        <input placeholder="" name="ip" className="form-control" value={this.state.ip} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Campaign Type:</label>
                        <input  placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
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
                        <input type="number" min="0" step="1" placeholder="integer" name="lastHourActivity" className="form-control" value={this.state.lastHourActivity} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <input placeholder="" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Owner:</label>
                        <input placeholder="" name="owner" className="form-control" value={this.state.owner} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveDashboard}>Save</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/dashboard')}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default EditDashboardComponent;