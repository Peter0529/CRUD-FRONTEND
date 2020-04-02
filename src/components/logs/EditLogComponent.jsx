import React, { Component } from 'react'
import ApiService from "../../service/LogApiService";
import dateFormat from "dateformat";
class EditLogComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            hwid: '',
            ip: '',
            campaign: '',
            xpath: '',
            error: '',
            proxy: '',
            link: '',
            lastAccess: '',
        }
        this.saveLog = this.saveLog.bind(this);
        this.loadLog = this.loadLog.bind(this);
    }

    componentDidMount() {
        this.loadLog();
    }

    loadLog() {
        ApiService.fetchLogById(window.localStorage.getItem("logId"))
            .then((res) => {
                let log = res.data[0];
                this.setState(log);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveLog = (e) => {
        e.preventDefault();
        let log = this.state;
        log.lastAccess = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris'})).toISOString();
        ApiService.editLog(log)
            .then(res => {
                this.setState({message : 'Log updated successfully.'});
                this.props.history.push('/logs');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Log</h2>
                <form>

                    <div className="form-group">
                        <label>HWID:</label>
                        <input type="text" placeholder="" name="hwid" className="form-control" value={this.state.hwid} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>IP:</label>
                        <input placeholder="" name="ip" className="form-control" value={this.state.ip} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Campaign:</label>
                        <input placeholder="" name="campaign" className="form-control" value={this.state.campaign} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath:</label>
                        <input  placeholder="" name="xpath" className="form-control" value={this.state.xpath} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Error:</label>
                        <input placeholder="" name="error" className="form-control" value={this.state.error} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Proxy:</label>
                        <input placeholder="" name="proxy" className="form-control" value={this.state.proxy} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Link:</label>
                        <input placeholder="" name="link" className="form-control" value={this.state.link} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveLog}>Save</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/logs')}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default EditLogComponent;