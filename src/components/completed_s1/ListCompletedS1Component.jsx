import React, { Component } from 'react'
import ApiService from "../../service/CompletedS1ApiService";
import DataTable from "../../components/Tables/Datatable";
import $ from 'jquery';
import date_format from "../../service/DateFormat";
class ListCompletedS1Component extends Component {
    constructor(props) {
        super(props)
        this.state = {
                dtOptions1: {
                    "autoWidth": false,
                    "bAutoWidth": false,
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    responsive: {
                        details: {
                            renderer: function ( api, rowIdx, columns ) {
                                var data = $.map( columns, function ( col, i ) {
                                    var col_header = api.column(i + 1).header();
                                    return col.hidden ?
                                        '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'" title="'+col_header.getAttribute("title")+'">'+
                                            '<td>'+col.title+':'+'</td> '+
                                            '<td>'+col.data+'</td>'+
                                        '</tr>' :
                                        '';
                                } ).join('');
                                
                                return data ?
                                    $('<table/>').append( data ) :
                                    false;
                            }
                        }
                    },

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
                    order: [[ 30, 'desc' ]], // order by based on last access
                    
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
            unread_count:0,
            read_count:0,
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
            res =>{
                let count = 0,count1 = 0;
                this.setState({campaigns: res.data, loaded_data: true});
                for(var i = 0;i < res.data.length;i++)
                    if(res.data[i].checked === '0') count += 1;
                    else count1 +=1;
                this.setState({unread_count:count,read_count:count1});

            }
        )
    }

    deleteCampaign(campId) {
        ApiService.deleteCampaign(campId)
            .then(res => {
                this.setState({message : 'Campaign deleted successfully.'});
                // this.setState({campaigns: this.state.campaigns.filter(camp => camp.id !== campId)});
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

    deleteCampaigns = async() => {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        $("#delete_spin").addClass("spinner-border spinner-border-sm text-dark mr-2");
        $("#delete_selected").prop('disabled',true);
        
        if(selected_ids.length > 0){
            var i;
            for(i =0;i<selected_ids.length - 1;i++){
                ApiService.deleteCampaign(parseInt(selected_ids[i]));
                
            }

            await ApiService.deleteCampaign(parseInt(selected_ids[i]));
        }

        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);

        $("#delete_spin").removeClass();
        $("#delete_selected").prop('disabled',false);
    }

    checkCampaign = async(e,id) => {
        var camp;
        camp = this.state.campaigns.filter(camp => camp.id === id)[0];
        camp.checked= "1";
        camp.lastAccess = date_format();
        e.preventDefault();
        $(e.target.parentNode.parentNode).removeClass();
        await ApiService.editCampaign(camp);
        let count = this.state.unread_count;
        this.setState({unread_count:count - 1})
    }

    render() {
        //const isLoaded = this.state.is_loaded;
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                <h2 className="text-center">Completed Campaign S1 List <span class="badge badge-info">{this.state.unread_count} unchecked campaigns</span></h2> 
                
                {/* <button className="btn btn-primary" onClick={() => this.addCampaign()} style={{marginBottom:"20px"}}> Add Campaign</button> */}
                <button className="btn btn-secondary" id = "delete_selected" name="delete_selected" onClick={() => this.deleteCampaigns()} style={{marginBottom:"20px"}}><div id="delete_spin" role="status"/> Delete Selected Campaigns</button>
                
                <DataTable options={this.state.dtOptions1}>
                    <table className="table table-striped" id="datatables-reponsive" width="100%" >
                        <thead>
                            <tr>
                            <th title=""></th>
                                <th title=""><input type="checkbox" id="select_all" name="select_all" /></th>
                                <th title="" className="hidden">Id</th>
                                <th title="Note">Note</th>
                                <th title="Note2">Note2</th>
                                <th title="URL">URL</th>
                                <th title="Name">Name</th>
                                <th title="Tracks">Tracks</th>
                                <th title="Country">Country</th>
                                <th title="Type">Type</th>
                                <th title="Mixed Type">M.Type</th>
                                <th title="Total Plays">TP</th>
                                <th title="Total Follows">TFo</th>
                                <th title="Total Reups">TR</th>
                                <th title="Total Highlights">TH</th>
                                <th title="Total Favorites">TFa</th>
                                <th title="Per Hour Plays">PHP</th>
                                <th title="Per Day Plays">PDP</th>
                                <th title="Per Hour Mixed">PHM</th>
                                <th title="Per Day Mixed">PDM</th>
                                <th title="Last Hour">LH</th>
                                <th title="Last Day">LD</th>
                                <th title="Played">Pl</th>
                                <th title="Followed">Fo</th>
                                <th title="Reuped">Re</th>
                                <th title="Highlighted">Hi</th>
                                <th title="Favorited">Fa</th>
                                <th title="Fails">Fails</th>
                                <th title="Start Date">SDate</th>
                                <th title="End Date">EDate</th>
                                <th title="Status">Status</th>
                                <th title="Last Access Time">lastAccess</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.campaigns.map(
                                camp =>
                                        <tr key={camp.id}className= { camp.checked === '0' ? "table-primary" : ""}>
                                            <td></td>
                                            <td>
                                                { camp.checked === '0' ? <button className="btn btn-info" onClick={(e) => this.checkCampaign(e,camp.id)}><i className="fas fa-check"></i> </button> : ""}
                                                <button className="btn btn-danger" id="delete" onClick={(e) => this.deleteCampaign(camp.id)}><i className="fas fa-eraser"></i> </button>
                                            </td>
                                            <td>{camp.id}</td>
                                            <td>{camp.note}</td>
                                            <td>{camp.note2}</td>
                                            <td>{camp.url}</td>
                                            <td>{camp.name}</td>
                                            <td>{camp.tracks}</td>
                                            <td>{camp.country}</td>
                                            <td><span class="badge badge-primary">{camp.campaignType}</span></td>
                                            <td><span class="badge badge-info">{camp.mixedType}</span></td>
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
                                            <td>{camp.status === 'ON' ? (<span class="badge badge-success">ON</span>):(<span class="badge badge-danger">OFF</span>)}</td>
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