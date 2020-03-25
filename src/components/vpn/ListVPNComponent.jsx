import React, { Component } from 'react'
import ApiService from "../../service/VPNApiService";
import DataTable from "../../components/Tables/Datatable";
import $ from 'jquery';

class ListVPNComponent extends Component{
    constructor(props){
        super(props);
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
        vpns: [],
        message: null,
        loaded_data:false
        }
        this.deleteVPN = this.deleteVPN.bind(this);
        this.editVPN = this.editVPN.bind(this);
        this.addVPN = this.addVPN.bind(this);
        this.reloadVPNList = this.reloadVPNList.bind(this);
    }

    componentDidMount() {
        this.reloadVPNList();
    }

    reloadVPNList = async() => {
        ApiService.fetchVPNs().then(
            res =>{this.setState({vpns: res.data, loaded_data: true});}
        )
    }

    deleteVPN(vpnId) {
        ApiService.deleteVPN(vpnId)
            .then(res => {
                this.setState({message : 'VPN deleted successfully.'});
                // this.setState({vpns: this.state.vpns.filter(vpn => vpn.id !== vpnId)});
            })
    }

    editVPN(id) {
        window.localStorage.setItem("vpnId", id);
        this.props.history.push('/edit-vpn');
    }

    addVPN() {
        window.localStorage.removeItem("vpnId");
        this.props.history.push('/add-vpn');
    }

    deleteVPNs = async() => {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        var i;
        for(i =0;i<selected_ids.length - 1;i++){
            ApiService.deleteVPN(parseInt(selected_ids[i]));
        }

        await ApiService.deleteVPN(parseInt(selected_ids[i]));
        
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
                <h2 className="text-center">VPN Lists</h2>
                <button className="btn btn-primary" onClick={() => this.addVPN()} style={{marginBottom:"20px"}}> Add VPN</button>
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteVPNs()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected VPNs</button>
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all"/></th>
                                <th>Id</th>
                                <th>Note</th>
                                <th>Host</th>
                                <th>Protocol</th>
                                <th>VPN Site</th>
                                <th>Country</th>
                                <th>Usage Last Hour</th>
                                <th>Usage Life Time</th>
                                <th>Fails</th>
                                <th>Status</th>
                                <th>Last Access</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.vpns.map(
                            vpn =>
                                        <tr key={vpn.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.editVPN(vpn.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" id="delete" onClick={() => this.deleteVPN(vpn.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{vpn.id}</td>
                                            <td>{vpn.note}</td>
                                            <td>{vpn.host}</td>
                                            <td>{vpn.protocol}</td>
                                            <td>{vpn.vpnSite}</td>
                                            <td>{vpn.country}</td>
                                            <td>{vpn.usageLastHour}</td>
                                            <td>{vpn.usageLifetime}</td>
                                            <td>{vpn.fails}</td>
                                            <td>{vpn.currentStatus}</td>
                                            <td>{vpn.lastAccess}</td>
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

export default ListVPNComponent;