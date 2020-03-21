import React, { Component } from 'react'
import ApiService from "../../service/UserAgentApiService";
import DataTable from "../Tables/Datatable";

class ListUserAgentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
                dtOptions1: {
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    responsive: {details: {
                        type: 'column'
                    }},
                    columnDefs: [ 
                        {
                            className: 'control',
                            orderable: false,
                            targets:   0
                        },
                        // {
                        //     orderable: false,
                        //     className: 'select-checkbox',
                        //     type:'checkbox',
                        //     targets:2
                        // },
                        {
                            orderable: false,
                            targets:1
                        }
                    ],
                    select: {
                        style:    'multi',
                        // selector: 'td:first-child'
                    },
                    "search": {
                        "regex": true
                      },
                    order: [[ 2, 'asc' ]],
                    
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    "pageLength": 100,

                    oLanguage: {
                        sSearch: '<em class="fa fa-search"></em>',
                        
                        
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em class="fa fa-caret-right"></em>',
                            sPrevious: '<em class="fa fa-caret-left"></em>'
                        },
                        sLengthMenu: 'Show <select>'+
                        '<option value="100">100</option>'+
                        '<option value="200">200</option>'+
                        '<option value="500">500</option>'+
                        '<option value="-1">All</option>'+
                        '</select> records per page',
                    },
                    
                },
                dtOptions2: {
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    responsive: true,
                    "pageLength": 100,
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    oLanguage: {
                        sSearch: '<em class="fa fa-search"></em>',
                        sLengthMenu: 'Show <select>'+
                        '<option value="100">100</option>'+
                        '<option value="200">200</option>'+
                        '<option value="500">500</option>'+
                        '<option value="-1">All</option>'+
                        '</select> records per page',
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em class="fa fa-caret-right"></em>',
                            sPrevious: '<em class="fa fa-caret-left"></em>'
                        },
                    },
                    
                    // Datatable Buttons setup
                    dom: 'Bfrtip',
                    buttons: [
                        { extend: 'copy', className: 'btn-info' },
                        { extend: 'csv', className: 'btn-info' },
                        { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
                        // { extend: 'pdf', className: 'btn-info', title: $('title').text() },
                        { extend: 'print', className: 'btn-info' }
                    ]
                },
                dtOptions3: {
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    responsive: true,
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    oLanguage: {
                        sSearch: '<em class="fa fa-search"></em>',
                        sLengthMenu: '_MENU_ records per page',
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found - sorry',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em class="fa fa-caret-right"></em>',
                            sPrevious: '<em class="fa fa-caret-left"></em>'
                        },
                        
                    },
                    // Datatable key setup
                    keys: true
                },
            agents: [],
            message: null,
            loaded_data:false
        }
        this.deleteAgent = this.deleteAgent.bind(this);
        this.editAgent = this.editAgent.bind(this);
        this.addAgent = this.addAgent.bind(this);
        this.reloadAgentList = this.reloadAgentList.bind(this);
    }
    componentDidMount() {
        this.reloadAgentList();
    }

    reloadAgentList = async() => {
        ApiService.fetchAgents().then(
            res =>{this.setState({agents: res.data, loaded_data: true});}
        )
    }

    deleteAgent(agentId) {
        ApiService.deleteAgent(agentId)
            .then(res => {
                this.setState({message : 'Agent deleted successfully.'});
                // this.setState({emails: this.state.emails.filter(email => email.id !== emailId)});
                window.location.reload(false);
            })

    }

    editAgent(id) {
        window.localStorage.setItem("agentId", id);
        this.props.history.push('/edit-agent');
    }

    addAgent() {
        window.localStorage.removeItem("agentId");
        this.props.history.push('/add-agent');
    }

    deleteAgents() {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        console.log(selected_ids);
        for(var i =0;i<selected_ids.length;i++){
            this.deleteAgent(parseInt(selected_ids[i]));
            
        }

        window.localStorage.removeItem("selected_ids");
        window.location.reload(false);
    }
    render() {
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Agent List</h2>
                <button className="btn btn-primary" onClick={() => this.addAgent()} style={{marginBottom:"20px"}}> Add Agent</button>
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteAgents()} style={{marginBottom:"20px",marginLeft:"20px"}}> Delete Selected Agents</button>
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th>Id</th>
                                <th>Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.agents.map(
                                agent =>
                                        <tr key={agent.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success"  onClick={() => this.editAgent(agent.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" onClick={() => this.deleteAgent(agent.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{agent.id}</td>
                                            <td>{agent.agent}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </DataTable>
                </div>)}
            </div>
        );
    }

}

export default ListUserAgentComponent;