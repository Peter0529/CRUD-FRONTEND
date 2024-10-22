import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";
import DataTable from "../Tables/Datatable";
import $ from 'jquery';
import date_format from "../../service/DateFormat";

import * as BASE  from '../../service/Base.js';
const PROXY_API_BASE_URL = BASE.URL + '/datatable/proxies';

class ListProxyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
                dtOptions1: {
                    "autoWidth": false,
                    "bAutoWidth": false,
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    "processing": true,
                    "serverSide": true,
                    "deferRender":true, 
                    'scrollCollapse': true,
                    'searching': {"regex":true},
                    "ajax": {
                        "url": PROXY_API_BASE_URL,
                        'contentType': 'application/json',
                        'type': 'POST',
                        'data': function(d) {
                        return JSON.stringify(d);
                        },
                        "dataSrc": "data",
                        "dataType": 'json',
                        // "type": "GET",
                        "beforeSend": function(xhr){
                           xhr.setRequestHeader("Authorization",
                              "Basic " + BASE.token);
                        },
                    },
                    "columns": [
                        {},
                        {},
                        {"data":'id',"orderable": "false"},
                        {"data":'note',"orderable": "false"},
                        {"data":'proxy',"orderable": "false"},
                        {"data":'connection',"orderable": "false"},
                        {"data":'type',"orderable": "false"},
                        {"data":'country',"orderable": "false"},
                        {"data":'campaignType',"orderable": "false"},
                        {"data":'usageLastHour',"orderable": "false"},
                        {"data":'usageTotal',"orderable": "false"},
                        {"data":'fails',"orderable": "false"},
                        {"data":'standby',"orderable": "false"},
                        {"data":'lastAccess',"orderable": "false"},
                    ],
                    
                    responsive: {details: {
                        type: 'column'
                    }},
                    columnDefs: [
                        {
                            data:null,
                            defaultContent:'',
                            className: 'control',
                            orderable: false,
                            targets:   0
                        },

                        //Action button
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:1,
                            createdCell: (td, cellData, rowData, row, col) => {
                                $(td).find("#bt_proxy_edit").click(e => {
                                   
                                   this.editProxy($(td).find("#bt_proxy_edit").data("id"));
                                });
                                $(td).find("#bt_proxy_delete").click(e => {
                                    this.deleteProxy($(td).find("#bt_proxy_delete").data("id"));
                                 });
                              },
                            render: function ( data, type, row ) {
                                return '<button class="btn btn-success" id="bt_proxy_edit" data-id="' + data.id + '"><i class="fas fa-edit"></i></button>' + 
                                '<button class="btn btn-danger" id="bt_proxy_delete" data-id="' + data.id + '"><i class="fas fa-eraser"></i></button>';
                            }
                        },

                        //SSL column
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:5,
                            render: function ( data, type, row ) {
                                return '<span class="badge badge-primary">' + data +'</span>';
                            }
                        },

                        // Status column

                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:6,
                            render: function ( data, type, row ) {
                                return '<span class="badge badge-secondary">' + data +'</span>';
                            }
                        },

                        // CampaignS1 column
                        
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:8,
                            render: function ( data, type, row ) {
                                return '<span class="badge badge-info">' + data +'</span>';
                            }
                        },

                        // CampaignS2 column
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:12,
                            render: function ( data, type, row ) {
                                if(data === '0')
                                    return '<span class="badge badge-success">Available</span>';
                                else
                                    return '<span class="badge badge-danger">Idle</span>';
                            }
                        },

                        // CampaignS3 column
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:12,
                            render: function ( data, type, row ) {
                                if(data === '1')
                                    return '<span class="badge badge-success">ON</span>';
                                else
                                    return '<span class="badge badge-danger">OFF</span>';
                            }
                        },


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
                    "lengthMenu": [[100, 200, 500, -1], [100, 200, 500, "All"]],
                    oLanguage: {sProcessing: '<div class="spinner-border text-primary mr-2" role="status"></div>',}

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
            proxies: [],
            imports:{
                proxies:'',
                note:'',
                country:'US',
                type:'PRIVATE',
                connection:'HTTP',
                campaignType:'S1',
                usageLastHour:0,
                usageTotal:0,
                fails:0,
                standby:0,
            },
            message: null,
            loaded_data:false
        }
        this.deleteProxy = this.deleteProxy.bind(this);
        this.editProxy = this.editProxy.bind(this);
        this.addProxy = this.addProxy.bind(this);
        this.reloadProxyList = this.reloadProxyList.bind(this);
    }
    componentDidMount() {
        this.reloadProxyList();
    }

    reloadProxyList = async() => {
        // ApiService.fetchProxies().then(
        //     res =>{this.setState({proxies: res.data, loaded_data: true})}
        // )
        this.setState({loaded_data: true});
    }

    deleteProxy(proxyId) {
        ApiService.deleteProxy(proxyId)
            .then(res => {
                this.setState({message : 'Proxy deleted successfully.'});
                // this.setState({proxies: this.state.proxies.filter(proxy => proxy.id !== proxyId)});
                window.location.reload(false);
            })

    }

    editProxy(id) {
        window.localStorage.setItem("proxyId", id);
        this.props.history.push('/edit-proxy');
    }

    addProxy() {
        window.localStorage.removeItem("proxyId");
        this.props.history.push('/add-proxy');
    }

    deleteProxies = async() =>{
        var counted = 0;
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        if(selected_ids.length > 0){
            for(var i =0;i<selected_ids.length;i++){
                if(i % 1000 == 0 || i ==  selected_ids.length - 1)
                    await ApiService.deleteProxy(parseInt(selected_ids[i])).then(res =>{
                        counted++;
                        $("#delete_selected").html(counted + "/" + selected_ids.length);
                    });
                else
                    ApiService.deleteProxy(parseInt(selected_ids[i])).then(res =>{
                        counted++;
                        $("#delete_selected").html(counted + "/" + selected_ids.length);
                    });
            }
        }

        window.localStorage.removeItem("selected_ids");
        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
        window.location.reload(false);
    }


    importProxies = async() =>{

        $("#load_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#loadProxies").prop('disabled',true);

        var _imports = this.state.imports;
        var counted = 0;
        var proxies = _imports.proxies.split('\n');

        var proxy = {};
        for(var i=0;i<proxies.length;i++){
            
            proxy = {};
            proxy['note'] = _imports.note;
            proxy['proxy'] = proxies[i];
            proxy['connection'] = _imports.connection;
            proxy['type'] = _imports.type;
            proxy['country'] = _imports.country;
            proxy['campaignType'] = _imports.campaignType;
            proxy['lastAccess'] = date_format();
            proxy['usageLastHour'] = _imports.usageLastHour;
            proxy['usageTotal'] = _imports.usageTotal;
            proxy['fails'] = _imports.fails;
            proxy['standby'] = _imports.standby;

            
            if(i % 1000 == 0 || i ==  proxies.length - 1)
                await ApiService.addProxy(proxy).then(res =>{
                    counted++;
                    $("#loadProxies").html(counted + "/" + proxies.length);
                });
            else
                ApiService.addProxy(proxy).then(res =>{
                    counted++;
                    $("#loadProxies").html(counted + "/" + proxies.length);
                });
        }

        $("#modalClose").click();
        window.location.reload(false);

    }

    onImportChange = (e) => {
        e.preventDefault();

        var _imports = this.state.imports;
        _imports[e.target.id] = e.target.value;
        this.setState({ imports : _imports});
    }

    render() {
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Proxy List</h2>
                {/* <input type="file" Style="display:none;" id="file" name="file" accept=".csv,text/csv,.txt" onChange={(e) => this.addProxies(e)}/> */}
                <button className="btn btn-primary" data-toggle="modal" data-target="#defaultModalPrimary" style={{marginBottom:"20px"}}> Import Proxies</button>

                {/* <button className="btn btn-primary" onClick={() => this.addProxy()} style={{marginBottom:"20px"}}> Add Proxy</button> */}
                <button className="btn btn-secondary" id = "delete_selected" onClick={() => this.deleteProxies()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Proxies</button>

                {/* Import Proxies Modal */}
                <div className="modal fade show" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Import Proxies</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body m-3">
                                <label>IP:PORT</label>
                                <textarea className="form-control" id="proxies" placeholder="Paste proxies here..." rows="15" onChange={(e) => this.onImportChange(e)}></textarea>

                                <div className="form-group">
                                    <label className="form-label">Note</label>
                                    <input type="text" id="note" className="form-control" placeholder="Note" onChange={(e) => this.onImportChange(e)}/>
                                </div>

                                <div className="form-group row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Country</label>
                                        <select id="country" className="form-control" onChange={(e) => this.onImportChange(e)}>
                                            <option value="US">US</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Connection</label>
                                        <select id="connection" className="form-control" onChange={(e) => this.onImportChange(e)}>
                                            <option value="HTTP">HTTP</option>
                                            <option value="SOCK5">SOCK5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Type</label>
                                        <select id="type" className="form-control" onChange={(e) => this.onImportChange(e)}>
                                            <option value="PRIVATE">PRIVATE</option>
                                            <option value="SHARED">SHARED</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Campaign</label>
                                        <select id="campaignType" className="form-control" onChange={(e) => this.onImportChange(e)}>
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id = "modalClose" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id = "loadProxies"className="btn btn-primary" onClick={this.importProxies}><div id="load_spin" role="status"/> Import</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Proxies Modal */}

                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th>Id</th>
                                <th>Proxy</th>
                                <th>Note</th>
                                <th>Connection</th>
                                <th>Type</th>
                                <th>Country</th>
                                <th>Campaign</th>
                                <th>UsageLastHour</th>
                                <th>UsageTotal</th>
                                <th>Fails</th>
                                <th>StandBy</th>
                                <th>LastAccess</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                this.state.proxies.map(
                                proxy =>
                                        <tr key={proxy.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.editProxy(proxy.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" id="delete" onClick={() => this.deleteProxy(proxy.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{proxy.id}</td>
                                            <td>{proxy.proxy}</td>
                                            <td>{proxy.note}</td>
                                            <td><span class="badge badge-primary">{proxy.connection}</span></td>
                                            <td><span class="badge badge-secondary">{proxy.type}</span></td>
                                            <td>{proxy.country}</td>
                                            <td><span class="badge badge-info">{proxy.campaignType}</span></td>
                                            <td>{proxy.usageLastHour}</td>
                                            <td>{proxy.usageTotal}</td>
                                            <td>{proxy.fails}</td>
                                            <td>{proxy.standby === '0' ? (<span class="badge badge-success">Available</span>):(<span class="badge badge-danger">Idle</span>)}</td>
                                            <td>{proxy.lastAccess}</td>
                                        </tr>
                                )
                            } */}
                        </tbody>
                    </table>
                </DataTable>
                </div>)}
            </div>
        );
    }

}

export default ListProxyComponent;