import React, { Component } from 'react'
import ApiService from "../../service/CompletedS1ApiService";
import DataTable from "../../components/Tables/Datatable";

class ListCompletedS1Component extends Component {
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
            campaigns: [],
            message: null,
            loaded_data:false
        }
        this.deleteCampaign = this.deleteCampaign.bind(this);
        this.editCampaign = this.editCampaign.bind(this);
        this.addCampaign = this.addCampaign.bind(this);
        this.reloadCampaignList = this.reloadCampaignList.bind(this);
    }
    componentDidMount() {
        this.reloadCampaignList();
    }

    reloadCampaignList = async() => {
        ApiService.fetchCampaigns().then(
            res =>{this.setState({campaigns: res.data, loaded_data: true});}
        )
    }

    deleteCampaign(campId) {
        ApiService.deleteCampaign(campId)
            .then(res => {
                this.setState({message : 'Campaign deleted successfully.'});
                this.setState({campaigns: this.state.campaigns.filter(camp => camp.id !== campId)});
                // window.location.reload(false);
            })

    }

    editCampaign(id) {
        window.localStorage.setItem("campS1Id", id);
        this.props.history.push('/edit-camps1');
    }

    addCampaign() {
        window.localStorage.removeItem("campId");
        this.props.history.push('/add-camps1');
    }

    deleteCampaigns() {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        
        for(var i =0;i<selected_ids.length;i++){
            this.deleteCampaign(parseInt(selected_ids[i]));
            
        }

        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);
    }

    render() {
        //const isLoaded = this.state.is_loaded;
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Completed Campaign S1 List</h2>
                {/* <button className="btn btn-primary" onClick={() => this.addCampaign()} style={{marginBottom:"20px"}}> Add Campaign</button> */}
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteCampaigns()} style={{marginBottom:"20px",marginLeft:"20px"}}> Delete Selected Campaigns</button>
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                                <th></th>
                                <th><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th className="hidden">Id</th>
                                <th>Note</th>
                                <th>Note2</th>
                                <th>URL</th>
                                <th>Name</th>
                                <th>Tracks</th>
                                <th>Country</th>
                                <th>Type</th>
                                <th>TP</th>
                                <th>TFo</th>
                                <th>TR</th>
                                <th>TH</th>
                                <th>TFa</th>
                                <th>PHP</th>
                                <th>PDP</th>
                                <th>PHM</th>
                                <th>PDM</th>
                                <th>LH</th>
                                <th>LD</th>
                                <th>Pl</th>
                                <th>Fo</th>
                                <th>Re</th>
                                <th>Hi</th>
                                <th>Fa</th>
                                <th>Fails</th>
                                <th>SDate</th>
                                <th>EDate</th>
                                <th>Status</th>
                                <th>lastAccess</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.campaigns.map(
                                camp =>
                                        <tr key={camp.id}>
                                            <td></td>
                                            <td>
                                                {/* <button className="btn btn-success" onClick={() => this.editCampaign(camp.id)}><i className="fas fa-edit"></i> </button> */}
                                                <button className="btn btn-danger" onClick={() => this.deleteCampaign(camp.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{camp.id}</td>
                                            <td>{camp.note}</td>
                                            <td>{camp.note2}</td>
                                            <td>{camp.url}</td>
                                            <td>{camp.name}</td>
                                            <td>{camp.tracks}</td>
                                            <td>{camp.campaignType}</td>
                                            <td>{camp.country}</td>
                                            <td>{camp.totalPlays}</td>
                                            <td>{camp.totalFollows}</td>
                                            <td>{camp.totalReups}</td>
                                            <td>{camp.totalHighlights}</td>
                                            <td>{camp.totalFavorites}</td>
                                            <td>{camp.perHourPlays}</td>
                                            <td>{camp.perDayPlays}</td>
                                            <td>{camp.perHourMixed}</td>
                                            <td>{camp.perDayMixed}</td>
                                            <td>{camp.lastHour}</td>
                                            <td>{camp.lastDay}</td>
                                            <td>{camp.played}</td>
                                            <td>{camp.followed}</td>
                                            <td>{camp.reuped}</td>
                                            <td>{camp.highlighted}</td>
                                            <td>{camp.favorited}</td>
                                            <td>{camp.fails}</td>
                                            <td>{camp.startDate}</td>
                                            <td>{camp.endDate}</td>
                                            <td>{camp.status}</td>
                                            <td>{camp.lastAccess}</td>
                                            
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

export default ListCompletedS1Component;