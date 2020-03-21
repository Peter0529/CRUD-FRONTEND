import React, { Component } from 'react'
import ApiService from "../../service/VPNApiService";

class EditVPNComponent extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            id:'',
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
        this.loadVPN = this.loadVPN.bind(this);
    }

    componentDidMount() {
        this.loadVPN();
    }

    loadVPN() {
        ApiService.fetchVPNById(window.localStorage.getItem("vpnId"))
            .then((res) => {
                let vpn = res.data[0];
                this.setState({
                id: vpn.id,
                note:vpn.note,
                host:vpn.host,
                protocol:vpn.protocol,
                vpnSite:vpn.vpnSite,
                country:vpn.country,
                usageLastHour:vpn.usageLastHour,
                usageLifetime:vpn.usageLifetime,
                fails:vpn.fails,
                currentStatus:vpn.currentStatus,
                lastAccess:vpn.lastAccess
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    saveVPN = (e) => {
        e.preventDefault();
        let vpn = {id: this.state.id, note: this.state.note, host: this.state.host, protocol: this.state.protocol, vpnSite: this.state.vpnSite, country: this.state.country,usageLastHour:this.state.usageLastHour
            , usageLifetime: this.state.usageLifetime, fails: this.state.fails, currentStatus: this.state.currentStatus,lastAccess:new Date().toISOString()};
        ApiService.editVPN(vpn)
            .then(res => {
                this.setState({message : 'VPN updated successfully.'});
                this.props.history.push('/vpns');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit VPN</h2>
                <form>

                    <div className="form-group">
                        <label>Note:</label>
                        <input type="text" placeholder="" name="note" className="form-control" defaultValue={this.state.note}/>
                    </div>

                    <div className="form-group">
                        <label>Host:</label>
                        <input placeholder="" name="host" className="form-control" value={this.state.host} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Protocol:</label>
                        <input placeholder="" name="protocol" className="form-control" value={this.state.protocol} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>VPN Site:</label>
                        <input  placeholder="" name="vpnSite" className="form-control" value={this.state.vpnSite} onChange={this.onChange}/>
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
                        <label>Usage Life Time:</label>
                        <input placeholder="" name="usageLifetime" className="form-control" value={this.state.usageLifetime} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Fails:</label>
                        <input placeholder="" name="fails" className="form-control" value={this.state.fails} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Current Status:</label>
                        <input placeholder="" name="currentStatus" className="form-control" value={this.state.currentStatus} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveVPN}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditVPNComponent;