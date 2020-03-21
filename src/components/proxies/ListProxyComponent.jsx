import React, { Component } from 'react'
import ApiService from "../../service/ProxyApiService";
import DataTable from "../Tables/Datatable";

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

    deleteProxies(){
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        
        for(var i =0;i<selected_ids.length;i++){
            this.deleteProxy(parseInt(selected_ids[i]));
            
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
                <h2 className="text-center">Proxy List</h2>
                <button className="btn btn-primary" onClick={() => this.addProxy()} style={{marginBottom:"20px"}}> Add Proxy</button>
                <button className="btn btn-secondary" id = "delete_selected" onClick={() => this.deleteProxies()} style={{marginBottom:"20px",marginLeft:"20px"}}> Delete Selected Proxies</button>
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