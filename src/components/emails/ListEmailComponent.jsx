import React, { Component } from 'react'
import ApiService from "../../service/EmailApiService";

class ListEmailComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emails: [],
            message: null
        }
        this.deleteEmail = this.deleteEmail.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.reloadEmailList = this.reloadEmailList.bind(this);
    }

    componentDidMount() {
        this.reloadEmailList();
    }

    reloadEmailList() {
        ApiService.fetchEmails()
            .then((res) => {
                this.setState({emails: res.data})
            });
    }

    deleteEmail(emailId) {
        ApiService.deleteEmail(emailId)
            .then(res => {
                this.setState({message : 'Email deleted successfully.'});
                this.setState({emails: this.state.emails.filter(email => email.id !== emailId)});
            })

    }

    editEmail(id) {
        window.localStorage.setItem("emailId", id);
        this.props.history.push('/edit-email');
    }

    addEmail() {
        window.localStorage.removeItem("emailId");
        this.props.history.push('/add-email');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Email Lists</h2>
                <button className="btn btn-primary" onClick={() => this.addEmail()}> Add Email</button>
                
                <table className="table table-striped" id="datatables-reponsive" >
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>POP</th>
                            <th>POP Port</th>
                            <th>SSL</th>
                            <th>Status</th>
                            <th>Campaigns S1</th>
                            <th>Campaigns S2</th>
                            <th>Campaigns S3</th>
                            <th>Last Access</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.emails.map(
                        email =>
                                    <tr key={email.id}>
                                        <td>{email.id}</td>
                                        <td>{email.email}</td>
                                        <td>{email.password}</td>
                                        <td>{email.pop}</td>
                                        <td>{email.port}</td>
                                        <td>{email.ssl}</td>
                                        <td>{email.status}</td>
                                        <td>{email.campaign_s1}</td>
                                        <td>{email.campaign_s2}</td>
                                        <td>{email.campaign_s3}</td>
                                        <td>{email.last_access}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.editEmail(email.id)}><i className="fas fa-check"></i> </button>
                                            <button className="btn btn-danger" onClick={() => this.deleteEmail(email.id)}><i className="fas fa-times"></i> </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListEmailComponent;