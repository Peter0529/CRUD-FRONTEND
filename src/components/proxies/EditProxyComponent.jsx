import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";
import date_format from "../../service/DateFormat";
class EditProxyComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            proxy: '',
            note: '',
            connection: '',
            type: '',
            country: '',
            campaign_type: '',
            usage_last_hour: '',
            usage_total: '',
            fails: '',
            standby:'',
            last_access:'',
        }
        this.saveProxy = this.saveProxy.bind(this);
        this.loadProxy = this.loadProxy.bind(this);
    }

    componentDidMount() {
        this.loadProxy();
    }

    loadProxy() {
        ApiService.fetchProxyById(window.localStorage.getItem("proxyId"))
            .then((res) => {
                let proxy = res.data[0];
                this.setState(proxy);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveProxy = (e) => {
        e.preventDefault();
        let proxy=this.state;
        proxy.lastAccess = date_format();
        ApiService.editProxy(proxy)
            .then(res => {
                this.setState({message : 'Proxy updated successfully.'});
                this.props.history.push('/proxies');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Proxy</h2>
                <form>

                    <div className="form-group">
                        <label>Proxy:</label>
                        <input type="text" placeholder="" name="proxy" className="form-control" value={this.state.proxy} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Note:</label>
                        <input placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Connection:</label>
                        <select name="connection" className="form-control" value={this.state.connection} onChange={this.onChange}>
                            <option value="HTTP">HTTP</option>
                            <option value="SOCK5">SOCK5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Type:</label>
                        <select name="type" className="form-control" value={this.state.type} onChange={this.onChange}>
                            <option value="PRIVATE">PRIVATE</option>
                            <option value="SHARED">SHARED</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Country:</label>
                        <input placeholder="" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Campaign Type:</label>
                        <select name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Usage Last Hour:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="usageLastHour" className="form-control" value={this.state.usageLastHour} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Usage Total:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="usageTotal" className="form-control" value={this.state.usageTotal} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Fails:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="fails" className="form-control" value={this.state.fails} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Stand By:</label>
                        <select name="standby" className="form-control" value={this.state.standby} onChange={this.onChange}>
                            <option value="0">Available</option>
                            <option value="1">Idle</option>
                        </select>
                    </div>

                    {/* <div className="form-group">
                        <label>Last Access:</label>
                        <input placeholder="" name="lastAccess" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                    </div> */}

                    <button className="btn btn-success" onClick={this.saveProxy}>Save</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/proxies')}>Cancel</button>
                </form>
            </div>
        );
    }
}
export default EditProxyComponent;