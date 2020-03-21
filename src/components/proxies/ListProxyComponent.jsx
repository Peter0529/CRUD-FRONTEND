import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";
import DataTable from "../Tables/Datatable";
import $ from 'jquery';

class ListProxyComponent extends Component {
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
            proxies: [],
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
        ApiService.fetchProxies().then(
            res =>{this.setState({proxies: res.data, loaded_data: true})}
        )
    }

    deleteProxy(proxyId) {
        ApiService.deleteProxy(proxyId)
            .then(res => {
                this.setState({message : 'Proxy deleted successfully.'});
                this.setState({proxies: this.state.proxies.filter(proxy => proxy.id !== proxyId)});
                // window.location.reload(false);
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
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        for(var i =0;i<selected_ids.length;i++){
            await ApiService.deleteProxy(parseInt(selected_ids[i]));
            
        }
        
        window.localStorage.removeItem("selected_ids");
        window.location.reload(false);
        
        
    }

    addProxies = async(e) =>{
        // window.localStorage.removeItem("emailId");
        // this.props.history.push('/add-email');
        
        var splits,lines,proxy;
        var reader = new FileReader();


        
        $("#load_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#loadProxies").prop('disabled',true);

        reader.readAsText(e.target.files[0]);
        const result = await new Promise((resolve,reject)=> 
            reader.onload = async function(e) {

                // const sleep = (milliseconds) => {
                //     return new Promise(resolve => setTimeout(resolve, milliseconds))
                //   }
                
                // Use reader.result
                lines = reader.result.split('\n');

                

                
                for(var i=0;i<lines.length;i++){
                    splits = lines[i].split(",");

                    if(splits.length >= 5){

                        if(typeof splits[5] === 'undefined') splits[5] = '1';
                        if(typeof splits[6] === 'undefined') splits[6] = '0';
                        if(typeof splits[7] === 'undefined') splits[7] = '0';
                        if(typeof splits[8] === 'undefined') splits[8] = '0';

                        proxy={
                            email: splits[0],
                            password: splits[1],
                            pop: splits[2],
                            port: splits[3],
                            ssl:splits[4],
                            status: splits[5],
                            campaignS1: splits[6],
                            campaignS2: splits[7],
                            campaignS3: splits[8],
                            lastAccess: new Date().toISOString(),
                        }
                        const res = await ApiService.addProxy(proxy);
                    }
                }
                resolve(true);
            }
        );
        
        window.location.reload(false);
    }

    showImportModal = () =>{

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
                <button className="btn btn-primary" id="loadProxies" value="loadProxies"  data-toggle="modal" data-target="#defaultModalPrimary" style={{marginBottom:"20px"}} onClick={()=>this.showImportModal}><div id="load_spin" role="status"/> Import Proxies</button>

                {/* <button className="btn btn-primary" onClick={() => this.addProxy()} style={{marginBottom:"20px"}}> Add Proxy</button> */}
                <button className="btn btn-secondary" id = "delete_selected" onClick={() => this.deleteProxies()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Proxies</button>

                {/* Import Proxies Modal */}
                <div class="modal fade show" id="defaultModalPrimary" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Import Proxies</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body m-3">
                                <label>IP:PORT</label>
                                <textarea class="form-control" id="textarea_proxies" placeholder="Paste proxies here..." rows="15"></textarea>

                                <div class="form-group">
                                    <label class="form-label">Note</label>
                                    <input type="text" id="note" class="form-control" placeholder="Note"/>
                                </div>

                                <div className="form-group row">
                                    <div class="form-group col-md-6">
                                        <label for="inputState">Country</label>
                                        <select id="country" class="form-control">
                                            <option value="US">US</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputState">Connection</label>
                                        <select id="connection" class="form-control">
                                            <option value="HTTP">HTTP</option>
                                            <option value="SOCK5">SOCK5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div class="form-group col-md-6">
                                        <label for="inputState">Type</label>
                                        <select id="type" class="form-control">
                                            <option value="PRIVATE">PRIVATE</option>
                                            <option value="SHARED">SHARED</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputState">Campaigns</label>
                                        <select id="campaigns" class="form-control">
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
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
                                <th>Campaign Type</th>
                                <th>Usage Last Hour</th>
                                <th>Usage Total</th>
                                <th>Fails</th>
                                <th>Stand By</th>
                                <th>Last Access</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.proxies.map(
                                proxy =>
                                        <tr key={proxy.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.editProxy(proxy.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" onClick={() => this.deleteProxy(proxy.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{proxy.id}</td>
                                            <td>{proxy.proxy}</td>
                                            <td>{proxy.note}</td>
                                            <td>{proxy.connection}</td>
                                            <td>{proxy.type}</td>
                                            <td>{proxy.country}</td>
                                            <td>{proxy.campaignType}</td>
                                            <td>{proxy.usageLastHour}</td>
                                            <td>{proxy.usageTotal}</td>
                                            <td>{proxy.fails}</td>
                                            <td>{proxy.standby}</td>
                                            <td>{proxy.lastAccess}</td>
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

export default ListProxyComponent;