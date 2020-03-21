import React, { Component } from 'react'
import ApiService from "../../service/LogApiService";
import DataTable from "../../components/Tables/Datatable";

class ListLogComponent extends Component {
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
            logs: [],
            message: null,
            loaded_data:false
        }
        this.deleteLog = this.deleteLog.bind(this);
        this.editLog = this.editLog.bind(this);
        this.addLog = this.addLog.bind(this);
        this.reloadLogList = this.reloadLogList.bind(this);
    }
    componentDidMount() {
        this.reloadLogList();
    }

    reloadLogList = async() => {
        ApiService.fetchLogs().then(
            res =>{this.setState({logs: res.data, loaded_data: true});}
        )
    }

    deleteLog(logId) {
        ApiService.deleteLog(logId)
            .then(res => {
                this.setState({message : 'Log deleted successfully.'});
                // this.setState({logs: this.state.logs.filter(log => log.id !== logId)});
                window.location.reload(false);
            })

    }

    editLog(id) {
        window.localStorage.setItem("logId", id);
        this.props.history.push('/edit-log');
    }

    addLog() {
        window.localStorage.removeItem("logId");
        this.props.history.push('/add-log');
    }

    deleteLogs() {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        
        for(var i =0;i<selected_ids.length;i++){
            this.deleteLog(parseInt(selected_ids[i]));
            
        }

        window.localStorage.removeItem("selected_ids");
        window.location.reload(false);
    }

    render() {
        //const isLoaded = this.state.is_loaded;
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Log List</h2>
                <button className="btn btn-primary" onClick={() => this.addLog()} style={{marginBottom:"20px"}}> Add Log</button>
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteLogs()} style={{marginBottom:"20px",marginLeft:"20px"}}> Delete Selected Logs</button>
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th>Id</th>
                                <th>HWID</th>
                                <th>IP</th>
                                <th>Campaign</th>
                                <th>XPath</th>
                                <th>Error</th>
                                <th>Proxy</th>
                                <th>Link</th>
                                <th>Last Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.logs.map(
                                log =>
                                        <tr key={log.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.editLog(log.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" onClick={() => this.deleteLog(log.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{log.id}</td>
                                            <td>{log.hwid}</td>
                                            <td>{log.ip}</td>
                                            <td>{log.campaign}</td>
                                            <td>{log.xpath}</td>
                                            <td>{log.error}</td>
                                            <td>{log.proxy}</td>
                                            <td>{log.link}</td>
                                            <td>{log.lastAccess}</td>
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

export default ListLogComponent;