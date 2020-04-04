import React, { Component } from 'react'
import ApiService from "../../service/DashboardApiService";
import DataTable from "../../components/Tables/Datatable";
import $ from 'jquery';

class ListDashboardComponent extends Component {
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
            dashboards: [],
            message: null,
            loaded_data:false
        }
        this.deleteDashboard = this.deleteDashboard.bind(this);
        this.editDashboard = this.editDashboard.bind(this);
        this.addDashboard = this.addDashboard.bind(this);
        this.reloadDashboardList = this.reloadDashboardList.bind(this);
    }

    componentDidMount() {
        this.reloadDashboardList();
    }

    reloadDashboardList = async() => {
        ApiService.fetchDashboards().then(
            res =>{this.setState({dashboards: res.data, loaded_data: true});}
        )
    }

    deleteDashboard(dashId) {
        ApiService.deleteDashboard(dashId)
            .then(res => {
                this.setState({message : 'Dashboard deleted successfully.'});
                // this.setState({dashboards: this.state.dashboards.filter(dash => dash.id !== dashId)});
                // window.location.reload(false);
            })
    }

    editDashboard(id) {
        window.localStorage.setItem("dashId", id);
        this.props.history.push('/edit-dashboard');
    }

    addDashboard() {
        window.localStorage.removeItem("dashId");
        this.props.history.push('/add-dashboard');
    }

    deleteDashboards = async() => {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        if(selected_ids.length > 0){
            var i;
            for(i =0;i<selected_ids.length - 1;i++){
                ApiService.deleteDashboard(parseInt(selected_ids[i]));
                
            }

            await ApiService.deleteDashboard(parseInt(selected_ids[i]));
        }

        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);

        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
    }

    render() {
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Dashboard List</h2>
                <button className="btn btn-primary" onClick={() => this.addDashboard()} style={{marginBottom:"20px"}}> Add Dashboard</button>
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteDashboards()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Dashboards</button>
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th>Id</th>
                                <th>HWID</th>
                                <th>Note</th>
                                <th>IP</th>
                                <th>Campaign Type</th>
                                <th>Lifetime Activity</th>
                                <th>Daily Activity</th>
                                <th>Last Hour Activity</th>
                                <th>Status</th>
                                <th>Owner</th>
                                <th>Last Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dashboards.map(
                                dash =>
                                        <tr key={dash.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.editDashboard(dash.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" id="delete" onClick={() => this.deleteDashboard(dash.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{dash.id}</td>
                                            <td>{dash.hwid}</td>
                                            <td>{dash.note}</td>
                                            <td>{dash.ip}</td>
                                            <td>{dash.campaignType}</td>
                                            <td>{dash.lifetimeActivity}</td>
                                            <td>{dash.dailyActivity}</td>
                                            <td>{dash.lastHourActivity}</td>
                                            <td>{dash.status}</td>
                                            <td>{dash.owner}</td>
                                            <td>{dash.lastAccess}</td>
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

export default ListDashboardComponent;