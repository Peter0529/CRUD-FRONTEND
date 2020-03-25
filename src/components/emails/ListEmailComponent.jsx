import React, { Component } from 'react'
import ApiService from "../../service/EmailApiService";
import DataTable from "../Tables/Datatable";
import $ from 'jquery';


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
            emails: [],
            message: null,
            loaded_data:false
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
        ApiService.fetchEmails().then(
            res =>{this.setState({emails: res.data, loaded_data: true});}
        )
    }

    deleteEmail(emailId) {
        return ApiService.deleteEmail(emailId)
            .then(res => {
                this.setState({message : 'Email deleted successfully.'});
                // this.setState({emails: this.state.emails.filter(email => email.id !== emailId)});
                // window.location.reload(false);
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
        
        var splits,lines,email;
        var reader = new FileReader();


        
        $("#load_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#loadEmails").prop('disabled',true);

        reader.readAsText(e.target.files[0]);
        const result = await new Promise((resolve,reject)=> 
            reader.onload = async function(e) {

                var i;
                // const sleep = (milliseconds) => {
                //     return new Promise(resolve => setTimeout(resolve, milliseconds))
                //   }
                
                // Use reader.result
                lines = reader.result.split('\n');

                // daniel.seely3115@cabinmail.com,yrncpZE%(21,mail.cabinmail.com,995,1,1,0,0,0
                // jeffrey.pena2598@hight.fun,zgxnmDM%=06,mail.hight.fun,995,1

                var emails=[];
                for(i=0;i<lines.length;i++){
                    splits = lines[i].split(",");

                    if(splits.length >= 5){

                        if(typeof splits[5] === 'undefined') splits[5] = '1';
                        if(typeof splits[6] === 'undefined') splits[6] = '0';
                        if(typeof splits[7] === 'undefined') splits[7] = '0';
                        if(typeof splits[8] === 'undefined') splits[8] = '0';

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
                            lastAccess: new Date().toISOString(),
                        })
                    }
                }

                
                for(i=0;i<emails.length - 1;i++){
                    ApiService.addEmail(emails[i]);
                }

                await ApiService.addEmail(emails[i]);

                resolve(true);
            }
        );
        
        // this.reloadEmailList();
        window.location.reload(false);
    }

    deleteEmails = async() => {
        var i;
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);

            for(i =0;i<selected_ids.length - 1;i++){

                ApiService.deleteEmail(parseInt(selected_ids[i]));
            }

            await ApiService.deleteEmail(parseInt(selected_ids[i]));
        
        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);

        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
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
                <input type="file" Style="display:none;" id="file" name="file" accept=".csv,text/csv,.txt" onChange={(e) => this.addEmails(e)}/>
                <button className="btn btn-primary" id="loadEmails" value="loadEmails" style={{marginBottom:"20px"}} onClick={()=>document.getElementById('file').click()}><div id="load_spin" role="status"/> Import Emails</button>
                
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteEmails()} style={{marginBottom:"20px",marginLeft:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Emails</button>
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
                                <th>Fails</th>
                                <th>Status</th>
                                <th>S1</th>
                                <th>S2</th>
                                <th>S3</th>
                                <th>Last Access</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
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
                                            <td>{email.ssl}</td>
                                            <td>{email.fails}</td>
                                            <td>{email.status}</td>
                                            <td>{email.campaignS1}</td> 
                                            <td>{email.campaignS2}</td>
                                            <td>{email.campaignS3}</td>
                                            <td>{email.lastAccess}</td>
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

export default ListEmailComponent;