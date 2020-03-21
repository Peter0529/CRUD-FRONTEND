import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";

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
        proxy.lastAccess = new Date().toISOString();
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
                        <input placeholder="" name="connection" className="form-control" value={this.state.connection} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Type:</label>
                        <input  placeholder="" name="type" className="form-control" value={this.state.type} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Country:</label>
                        <input placeholder="" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Campaign Type:</label>
                        <input placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
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
                        <input type="number" min="0" step="1" placeholder="integer" name="standby" className="form-control" value={this.state.standby} onChange={this.onChange}/>
                    </div>

                    {/* <div className="form-group">
                        <label>Last Access:</label>
                        <input placeholder="" name="lastAccess" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                    </div> */}

                    <button className="btn btn-success" onClick={this.saveProxy}>Save</button>
                </form>
            </div>
        );
    }
}
export default EditProxyComponent;