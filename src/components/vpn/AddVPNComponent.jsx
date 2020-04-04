import React, { Component } from 'react'
import ApiService from "../../service/VPNApiService";
import date_format from "../../service/DateFormat";
class AddVPNComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            note:'',
            host:'',
            protocol:'',
            vpnSite:'',
            country:'',
            usageLastHour:'',
            usageLifetime:'',
            fails:'',
            currentStatus:'',
            lastAccess:'',
            message:null,
        }
        this.saveVPN = this.saveVPN.bind(this);
    }
    saveVPN = (e) => {
        e.preventDefault();
        let vpn = {note: this.state.note, host: this.state.host, protocol: this.state.protocol, vpnSite: this.state.vpnSite, country: this.state.country, usageLastHour: this.state.usageLastHour,usageLifetime:this.state.usageLifetime,fails:this.state.fails,currentStatus:this.state.currentStatus,lastAccess:date_format()};
        ApiService.addVPN(vpn)
            .then(res => {
                this.setState({message : 'VPN added successfully.'});
                this.props.history.push('/vpns');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    render() {
        return(
            <div>
                <h2 className="text-center">Add VPN</h2>
                <form>
                <div className="form-group">
                    <label>Note:</label>
                    <input type="text" placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Host:</label>
                    <input type="" placeholder="" name="host" className="form-control" value={this.state.host} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Protocol:</label>
                    <input placeholder="" name="protocol" className="form-control" value={this.state.protocol} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>VPN Site:</label>
                    <input placeholder="" name="vpnSite" className="form-control" value={this.state.vpnSite} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Country:</label>
                    <input placeholder="" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Usage Last Hour:</label>
                    <input placeholder="" name="usageLastHour" className="form-control" value={this.state.usageLastHour} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Usage LifeTime:</label>
                    <input  placeholder="" name="usageLifetime" className="form-control" value={this.state.usageLifetime} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Fails:</label>
                    <input placeholder="" name="fails" className="form-control" value={this.state.fails} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Current Status:</label>
                    <input  placeholder="" name="currentStatus" className="form-control" value={this.state.currentStatus} onChange={this.onChange}/>
                </div>
                
                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                <button className="btn btn-success" onClick={this.saveVPN}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/vpns')}>Cancel</button>
            </form>
    </div>
        );
    }
}

export default AddVPNComponent;