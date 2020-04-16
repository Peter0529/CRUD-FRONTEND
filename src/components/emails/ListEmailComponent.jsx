import React, { Component} from 'react'
import ApiService from "../../service/EmailApiService";
import DataTable from "../Tables/Datatable";
import $ from 'jquery';
import date_format from "../../service/DateFormat";

import * as BASE  from '../../service/Base.js';
const EMAIL_API_BASE_URL = BASE.URL + '/datatable/emails';

class ListEmailComponent extends Component {
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
                        "url": EMAIL_API_BASE_URL,
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
                        {"data":'email',"orderable": "false"},
                        {"data":'password',"orderable": "false"},
                        {"data":'pop',"orderable": "false"},
                        {"data":'port',"orderable": "false"},
                        {"data":'ssl',"orderable": "false"},
                        {"data":'status',"orderable": "false"},
                        {"data":'fails',"orderable": "false"},
                        {"data":'campaignS1',"orderable": "false"},
                        {"data":'campaignS2',"orderable": "false"},
                        {"data":'campaignS3',"orderable": "false"},
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
                                $(td).find("#bt_email_edit").click(e => {
                                   
                                   this.editEmail($(td).find("#bt_email_edit").data("id"));
                                });
                                $(td).find("#bt_email_delete").click(e => {
                                    this.deleteEmail($(td).find("#bt_email_delete").data("id"));
                                 });
                              },
                            render: function ( data, type, row ) {
                                return '<button class="btn btn-success" id="bt_email_edit" data-id="' + data.id + '"><i class="fas fa-edit"></i></button>' + 
                                '<button class="btn btn-danger" id="bt_email_delete" data-id="' + data.id + '"><i class="fas fa-eraser"></i></button>';
                            }
                        },

                        //SSL column
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:7,
                            render: function ( data, type, row ) {
                                if(data === '1')
                                    return '<span class="badge badge-info">SSL</span>';
                                else
                                    return '<span class="badge badge-warning">None</span>';
                            }
                        },

                        // Status column

                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:8,
                            render: function ( data, type, row ) {
                                if(data === '1')
                                    return '<span class="badge badge-success">Active</span>';
                                else
                                    return '<span class="badge badge-danger">Disabled</span>';
                            }
                        },

                        // CampaignS1 column
                        
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:10,
                            render: function ( data, type, row ) {
                                if(data === '1')
                                    return '<span class="badge badge-success">ON</span>';
                                else
                                    return '<span class="badge badge-danger">OFF</span>';
                            }
                        },

                        // CampaignS2 column
                        {
                            data:null,
                            defaultContent:'',
                            orderable: false,
                            targets:11,
                            render: function ( data, type, row ) {
                                if(data === '1')
                                    return '<span class="badge badge-success">ON</span>';
                                else
                                    return '<span class="badge badge-danger">OFF</span>';
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
                    oLanguage: {sProcessing: '<div class="spinner-border text-primary mr-2" role="status"></div>',
                    }
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
                        '<option value="100">100</option>' + 
                        '<option value="200">200</option>' + 
                        '<option value="500">500</option>' + 
                        '<option value="-1">All</option>' + 
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
            emails: [],
            message: null,
            loaded_data:false,
            import_campaign:"s1",
            import_file:" ",
            imported_email_count:0
        }
        this.deleteEmail = this.deleteEmail.bind(this);
        this.editEmail = this.editEmail.bind(this);
        // this.addEmail = this.addEmail.bind(this);
        this.reloadEmailList = this.reloadEmailList.bind(this);
    }
    componentDidMount() {
        this.reloadEmailList();
        
    }

    reloadEmailList = async() => {
        // ApiService.fetchEmails().then(
        //     res =>{this.setState({emails: res.data, loaded_data: true})}
        // )
        this.setState({loaded_data: true});
    }

    deleteEmail(emailId) {
        return ApiService.deleteEmail(emailId)
            .then(res => {
                this.setState({message : 'Email deleted successfully.'});
                // this.setState({emails: this.state.emails.filter(email => email.id !== emailId)});
                window.location.reload(false);
                // console.log(this.state.emails);
            })

    }

    editEmail(id) {
        window.localStorage.setItem("emailId", id);
        this.props.history.push('/edit-email');
    }

    addEmails = async(e) =>{
        // window.localStorage.removeItem("emailId");
        // this.props.history.push('/add-email');
        
        var splits,lines;
        var reader = new FileReader();

        var camp = this.state.import_campaign;
        var counted = 0;
        
        $("#load_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#loadEmails").prop('disabled',true);

        reader.readAsText(this.state.import_file);
        await new Promise((resolve,reject)=> 
            reader.onload = async function(e) {

                var i;
                // const sleep = (milliseconds) => {
                //     return new Promise(resolve => setTimeout(resolve, milliseconds))
                //   }
                
                // Use reader.result
                lines = reader.result.split('\n');

                // daniel.seely3115@cabinmail.com,yrncpZE%(21,mail.cabinmail.com,995,1,1,0,0,0
                // jeffrey.pena2598@hight.fun,zgxnmDM%=06,mail.hight.fun,995,1

                var sended = 0;
                var emails=[];
                for(i=0;i<lines.length;i++){
                    splits = lines[i].split(",");

                    if(splits.length >= 2){

                        splits[1] = splits[1].split("\r")[0];
                        if(typeof splits[2] === 'undefined') splits[2] = '';
                        if(typeof splits[3] === 'undefined') splits[3] = '';
                        if(typeof splits[4] === 'undefined') splits[4] = '';
                        if(typeof splits[5] === 'undefined') splits[5] = '1';
                        splits[6] = '0';
                        splits[7] = '0';
                        splits[8] = '0';

                        if(camp === "s1") splits[6] = '1';
                        if(camp === "s2") splits[7] = '1';
                        if(camp === "s3") splits[8] = '1';

                        emails.push({
                            email: splits[0],
                            password: splits[1],
                            pop: splits[2],
                            port: splits[3],
                            ssl:splits[4],
                            status: splits[5],
                            campaignS1: splits[6],
                            campaignS2: splits[7],
                            campaignS3: splits[8],
                            lastAccess: date_format(),
                            fails:0,
                        })
                    }
                }

                for(i=0;i<emails.length;i++){
                    if(i % 1000 == 0 || i ==  emails.length - 1)
                        await ApiService.addEmail(emails[i]).then(res =>{
                            counted++;
                            $("#loadEmails").html(counted + "/" + emails.length);
                        });
                    else
                        ApiService.addEmail(emails[i]).then(res =>{
                            counted++;
                            $("#loadEmails").html(counted + "/" + emails.length);
                        });
                }

                // await ApiService.addEmail(emails[i]);

                resolve(true);
            }
        );
        
        // this.reloadEmailList();
        window.location.reload(false);
    }

    deleteEmails = async() => {
        var i;
        var counted = 0;
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

        if(selected_ids.length > 0){
            for(i =0;i<selected_ids.length;i++){
                if(i % 1000 == 0 || i ==  selected_ids.length - 1)
                    await ApiService.deleteEmail(parseInt(selected_ids[i])).then(res =>{
                        counted++;
                        if(counted < selected_ids.length)
                            $("#delete_selected").html(counted + "/" + selected_ids.length);
                        else
                            $("#delete_selected").html('Delete Selected Emails');
                    });
                else
                    ApiService.deleteEmail(parseInt(selected_ids[i])).then(res =>{
                        counted++;
                        $("#delete_selected").html(counted + "/" + selected_ids.length);
                    });
            }

            // await ApiService.deleteEmail(parseInt(selected_ids[i]));
            
        }
        
        $("#delete_selected").html('Delete Selected Emails')
        window.localStorage.removeItem("selected_ids");
        window.location.reload(false);

        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
        
    }

    onImportChange = (e) => {
        e.preventDefault();
        
        if(e.target.name === "import_file")
            this.setState({import_file:e.target.files[0]});
        else
            this.setState({ import_campaign : e.target.value});
    }

    
    
    render() {
        //const isLoaded = this.state.is_loaded;
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Email List</h2>
                {/* <input type="file" className="fileSelect btn btn-primary" onChange={(e) => this.addEmails(e)} style={{marginBottom:"20px"}} /> */}
                {/* <input type="file" Style="display:none;" id="file" name="file" accept=".csv,text/csv,.txt" onChange={(e) => this.addEmails(e)}/> */}
                {/* <button className="btn btn-primary" id="loadEmails" value="loadEmails" style={{marginBottom:"20px"}} onClick={()=>document.getElementById('file').click()}><div id="load_spin" role="status"/> Import Emails</button> */}

                <button className="btn btn-primary" data-toggle="modal" data-target="#defaultModalPrimary" style={{marginBottom:"20px"}}> Import Emails</button>
                
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteEmails()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Emails</button>
                
                <div class="form-group row col-sm-12">
                        <label class="col-form-label text-sm-left">Show Emails for </label>
                        <div class="col-sm-1">
                            <select id="filter_campaign" class="form-control">
                                <option value="all">All</option>
                                <option value="s1">S1</option>
                                <option value="s2">S2</option>
                                <option value="s3">S3</option>
                            </select>
                        </div>
                </div>

                {/* Import Emails Import Modal */}
                <div className="modal fade show" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Import Emails</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body m-3">
                                
                                <input type="file" Style="display:block;" style={{marginBottom:"20px"}} id="import_file" name="import_file" accept=".csv,text/csv,.txt" onChange={(e) => this.onImportChange(e)}/>
                                {/* <button className="btn btn-info" id="loadEmails" value="loadEmails" style={{marginBottom:"20px"}} onClick={()=>document.getElementById('file').click()}><div id="load_spin" role="status"/> Import From File</button> */}
                                
                                <div className="form-group row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Select Campaign</label>
                                        <select id="import_campaign" className="form-control" onChange={(e) => this.onImportChange(e)}>
                                            <option value="s1">S1</option>
                                            <option value="s2">S2</option>
                                            <option value="s3">S3</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id = "modalClose" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id = "loadEmails"className="btn btn-primary" onClick={(e) => this.addEmails(e)}><div id="load_spin" role="status"/> Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Emails Import Modal */}

                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                    <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>POP</th>
                                <th>POP Port</th>
                                <th>SSL</th>
                                <th>Status</th>
                                <th>Fails</th>
                                <th id="dt_s1">S1</th>
                                <th id="dt_s2">S2</th>
                                <th id="dt_s3">S3</th>
                                <th>Last Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                this.state.emails.map(
                                email =>
                                        <tr key={email.id}>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-success"  onClick={() => this.editEmail(email.id)}><i className="fas fa-edit"></i> </button>
                                                <button className="btn btn-danger" id="delete" onClick={() => this.deleteEmail(email.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{email.id}</td>
                                            <td>{email.email}</td>
                                            <td>{email.password}</td>
                                            <td>{email.pop}</td>
                                            <td>{email.port}</td>
                                            7<td>{email.ssl === '1' ? (<span class="badge badge-info">SSL</span>):(<span class="badge badge-warning">None</span>)}</td>
                                            <td>{email.fails}</td>
                                            8<td>{email.status === '1' ? (<span class="badge badge-success">Active</span>):(<span class="badge badge-danger">Disabled</span>)}</td>
                                            9<td>{email.campaignS1 === '1' ? (<span class="badge badge-success">ON</span>):(<span class="badge badge-danger">OFF</span>)}</td> 
                                            10<td>{email.campaignS2 === '1' ? (<span class="badge badge-success">ON</span>):(<span class="badge badge-danger">OFF</span>)}</td>
                                            11<td>{email.campaignS3 === '1' ? (<span class="badge badge-success">ON</span>):(<span class="badge badge-danger">OFF</span>)}</td>
                                            <td>{email.lastAccess}</td>
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

export default ListEmailComponent;