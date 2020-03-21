import React, { Component } from 'react'
import ApiService from "../../service/UserAgentApiService";

class EditUserAgentComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            agent: '',
        }
        this.saveAgent = this.saveAgent.bind(this);
        this.loadAgent = this.loadAgent.bind(this);
    }

    componentDidMount() {
        this.loadAgent();
    }

    loadAgent() {
        ApiService.fetchAgentById(window.localStorage.getItem("agentId"))
            .then((res) => {
                let agent = res.data[0];
                this.setState(agent);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveAgent = (e) => {
        e.preventDefault();
        let agent = this.state;
        
        ApiService.editAgent(agent)
            .then(res => {
                this.setState({message : 'Agent updated successfully.'});
                this.props.history.push('/useragents');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Agent</h2>
                <form>

                    <div className="form-group">
                        <label>Agent:</label>
                        <input type="text" placeholder="" name="agent" className="form-control" value={this.state.agent} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveAgent}>Save</button>
                </form>
            </div>
        );
    }
}
export default EditUserAgentComponent;