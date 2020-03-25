import React, { Component } from 'react'
import ApiService from "../../service/UserAgentApiService";
import DataTable from "../Tables/Datatable";
import $ from 'jquery';

class ListUserAgentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
                dtOptions1: {
                    "autoWidth": false,
                    "bAutoWidth": false,
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
                        selector: 'td:not(:nth-child(2),:nth-child(1))'
                    },
                    "search": {
                        "regex": true
                      },
                    order: [[ 2, 'asc' ]],
                    
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    "pageLength": 100,
                    "lengthMenu": [[100, 200, 500, -1], [100, 200, 500, "All"]]

                    // oLanguage: {
                    //     sSearch: '<em class="fa fa-search"></em>',
                        
                        
                    //     info: 'Showing page _PAGE_ of _PAGES_',
                    //     zeroRecords: 'Nothing found',
                    //     infoEmpty: 'No records available',
                    //     infoFiltered: '(filtered from _MAX_ total records)',
                    //     oPaginate: {
                    //         sNext: '<em class="fa fa-caret-right"></em>',
                    //         sPrevious: '<em class="fa fa-caret-left"></em>'
                    //     },
                    //     sLengthMenu: 'Show <select>'+
                    //     '<option value="100">100</option>'+
                    //     '<option value="200">200</option>'+
                    //     '<option value="500">500</option>'+
                    //     '<option value="-1">All</option>'+
                    //     '</select> records per page',
                    // },
                    
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
            imports:{
                agents:'',
            },
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

    reloadAgentList(){
        ApiService.fetchAgents().then(
            res =>{this.setState({agents: res.data, loaded_data: true});}
        )
    }

    deleteAgent(agentId) {
        ApiService.deleteAgent(agentId)
            .then(res => {
                this.setState({message : 'Agent deleted successfully.'});
                // this.setState({agents: this.state.agents.filter(agent => agent.id !== agentId)});
                // window.location.reload(false);
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

    deleteAgents = async() => {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        var i;
        // console.log(selected_ids);
        for(i =0;i<selected_ids.length -1 ;i++){
            ApiService.deleteAgent(parseInt(selected_ids[i]));
        }

        await ApiService.deleteAgent(parseInt(selected_ids[i]));

        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);

        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
    }

    onImportChange = (e) => {
        e.preventDefault();

        var _imports = this.state.imports;
        _imports[e.target.id] = e.target.value;
        this.setState({ imports : _imports});
    }

    importAgents = async() =>{

        $("#load_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#loadAgents").prop('disabled',true);

        var _imports = this.state.imports;

        var agents = _imports.agents.split('\n');

        var agent;
        for(var i=0;i<agents.length;i++){
            agent = {};
            agent['agent'] = agents[i];

            if(i === agents.length - 1)
                await ApiService.addAgent(agent);
            else
                ApiService.addAgent(agent);
        }

        $("#modalClose").click();
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
                <button className="btn btn-primary"  data-toggle="modal" data-target="#defaultModalPrimary" style={{marginBottom:"20px"}}> Import Agents</button>
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteAgents()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Agents</button>

                {/* Import Agents Modal */}
                <div className="modal fade show" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Import Agents</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body m-3">
                                <label>Agent Lines</label>
                                <textarea className="form-control" id="agents" placeholder="Paste agents here..." rows="15" onChange={(e) => this.onImportChange(e)}></textarea>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id = "modalClose" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id = "loadAgents"className="btn btn-primary" onClick={this.importAgents}><div id="load_spin" role="status"/> Import</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Agents Modal */}


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
                                // console.log(this.state.agents)
                                this.state.agents.map( agent =>
                                        <tr key={agent.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success"  onClick={() => this.editAgent(agent.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" id="delete" onClick={() => this.deleteAgent(agent.id)}><i className="fas fa-eraser"></i> </button>
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