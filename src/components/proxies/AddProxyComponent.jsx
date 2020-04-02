import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";
import dateFormat from "dateformat";
class AddProxyComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            proxy: '',
            note: '',
            connection: '',
            type: '',
            country: '',
            campaignType: '',
            usageLastHour: '',
            usageTotal: '',
            fails: '',
            standby:'',
            lastAccess:'',
            message:null,
        }
        this.saveProxy = this.saveProxy.bind(this);
    }

    saveProxy = (e) => {
        e.preventDefault();
        let proxy = this.state;
        proxy.lastAccess = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris'})).toISOString();
        ApiService.addProxy(proxy)
            .then(res => {
                this.setState({message : 'Proxy added successfully.'});
                this.props.history.push('/proxies');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Proxy</h2>
                <form>
                <div className="form-group">
                    <label>Proxy:</label>
                    <input type="text" placeholder="" name="proxy" className="form-control" value={this.state.proxy} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Note:</label>
                    <input type="note" placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Connection:</label>
                    <input placeholder="" name="connection" className="form-control" value={this.state.connection} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Type:</label>
                    <input placeholder="" name="type" className="form-control" value={this.state.type} onChange={this.onChange}/>
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
                    <input  type="number" min="0" step="1" placeholder="integer" name="usageLastHour" className="form-control" value={this.state.usageLastHour} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Usage Total:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="usageTotal" className="form-control" value={this.state.usageTotal} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Fails:</label>
                    <input  type="number" min="0" step="1" placeholder="integer" name="fails" className="form-control" value={this.state.fails} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Stand By:</label>
                    <input  type="number" min="0" step="1" placeholder="integer" name="standby" className="form-control" value={this.state.standby} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveProxy}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/proxies')}>Cancel</button>
            </form>
    </div>
        );
    }
}

export default AddProxyComponent;