import React, { Component } from 'react'
import ApiService from "../../service/UserAgentApiService";

class AddUserAgentComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            agent:'',
            message:null,
        }
        this.saveAgent = this.saveAgent.bind(this);
    }

    saveAgent = (e) => {
        e.preventDefault();
        let agent = this.state;
        ApiService.addAgent(agent)
            .then(res => {
                this.setState({message : 'Agent added successfully.'});
                this.props.history.push('/useragents');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add UserAgent</h2>
                <form>
                <div className="form-group">
                    <label>Agent:</label>
                    <input type="text" placeholder="" name="agent" className="form-control" value={this.state.agent} onChange={this.onChange}/>
                </div>

                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                <button className="btn btn-success" onClick={this.saveAgent}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/useragents')}>Cancel</button>
            </form>
    </div>
        );
    }
}

export default AddUserAgentComponent;