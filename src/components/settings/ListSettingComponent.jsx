import React, { Component } from 'react'
import ApiService from "../../service/SettingApiService";
import DataTable from "../Tables/Datatable";

class ListSettingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
                dtOptions1: {
                    
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    responsive: true,
                    columnDefs: [ {
                        orderable: false,
                        className: 'select-checkbox',
                        targets:0
                    } ],
                    select: {
                        style:    'multi',
                        // selector: 'td:first-child'
                    },
                    "search": {
                        "regex": true
                      },
                    order: [[ 1, 'asc' ]],

                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    "pageLength": 100,

                    oLanguage: {
                        sSearch: '<em className="fa fa-search"></em>',
                        
                        
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em className="fa fa-caret-right"></em>',
                            sPrevious: '<em className="fa fa-caret-left"></em>'
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
                        sSearch: '<em className="fa fa-search"></em>',
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
                            sNext: '<em className="fa fa-caret-right"></em>',
                            sPrevious: '<em className="fa fa-caret-left"></em>'
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
                        sSearch: '<em className="fa fa-search"></em>',
                        sLengthMenu: '_MENU_ records per page',
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found - sorry',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em className="fa fa-caret-right"></em>',
                            sPrevious: '<em className="fa fa-caret-left"></em>'
                        },
                        
                    },
                    // Datatable key setup
                    keys: true
                },
            setting: {},
            current_setting_id:1,//Campaign S1
            message: null,
            loaded_data:false
        }
        this.deleteSetting = this.deleteSetting.bind(this);
        this.editSetting = this.editSetting.bind(this);
        this.addSetting = this.addSetting.bind(this);
        this.reloadSetting = this.reloadSetting.bind(this);
    }
    componentDidMount() {
        this.reloadSetting(this.state.current_setting_id);
        
    }

    reloadSetting = async(id) => {
        ApiService.fetchSettingById(id).then(
            res =>{this.setState({setting: res.data[0], loaded_data: true});}
        )
    }

    deleteSetting(settingId) {
        ApiService.deleteSetting(settingId)
            .then(res => {
                this.setState({message : 'Setting deleted successfully.'});
                // this.setState({proxies: this.state.proxies.filter(proxy => proxy.id !== proxyId)});
                window.location.reload(false);
            })
    }

    editSetting(id) {
        window.localStorage.setItem("settingId", id);
        this.props.history.push('/edit-setting');
    }

    addSetting() {
        window.localStorage.removeItem("settingId");
        this.props.history.push('/add-setting');
    }

    deleteSettings(){
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        
        for(var i =0;i<selected_ids.length;i++){
            this.deleteSetting(parseInt(selected_ids[i]));
        }
        
        window.localStorage.removeItem("selected_ids");
        window.location.reload(false);
    }

    onChange = (e) =>{
        const st = this.state.setting;
        st[e.target.name] = e.target.value;
        this.setState({setting : st});}
    
    saveSettings(){
        console.log(this.state.setting);
        ApiService.editSetting(this.state.setting)
            .then(res => {
                this.setState({message : 'Setting updated successfully.'});
                this.props.history.push('/setting');
            });
    }

    onChangeCurrentSettingID = (id) => {this.setState({current_setting_id:id});this.reloadSetting(id);}

    render() {
        return (
            <div >
                {this.state.loaded_data === false ? (
                    <div>Loading...</div>
                ) : (
                    <div >
                {/* <h1 className="h3 mb-3">Settings</h1> */}
                <button className="btn btn-info" onClick={() => this.saveSettings()} style={{marginBottom:"20px"}}> Save Settings</button>
                <div className="row">
                    <div className="col-md-3 col-xl-2">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Campaign Settings</h5>
                            </div>

                            <div className="list-group list-group-flush" role="tablist">
									<a className="list-group-item list-group-item-action active" data-toggle="list" href="#campaign_setting" role="tab" onClick={this.onChangeCurrentSettingID.bind(this,1)}>
                                        Campaign S1
                                    </a>
									<a className="list-group-item list-group-item-action" data-toggle="list" href="#campaign_setting" role="tab" onClick={this.onChangeCurrentSettingID.bind(this,2)}>
                                        Campaign S2
                                    </a>
									<a className="list-group-item list-group-item-action" data-toggle="list" href="#campaign_setting" role="tab" onClick={this.onChangeCurrentSettingID.bind(this,3)}>
                                        Campaign S3
                                    </a>
                                    {/* <a className="list-group-item list-group-item-action" data-toggle="list" href="#useragents" role="tab" onClick={this.onChangeCurrentSettingID.bind(this,4)}>
                                        User Agents
                                    </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-xl-10">
                        <div className="tab-content">

                            
                            <div className="tab-pane fade active show" id="campaign_setting" role="tabpanel">
                                <div className="card">
                                    <div className="card-header">  
                                        <h5 className="card-title mb-0">Campaign S{this.state.current_setting_id}</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
											<div className="row">
												<div className="col-md-4">
													<div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">Campaign Type</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="campaignType" className="form-control" value={this.state.setting.campaignType} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">API Key</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="apiKey" className="form-control" value={this.state.setting.apiKey} onChange={this.onChange} />
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">Captcha Key</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="captchaKey" className="form-control" value={this.state.setting.captchaKey} onChange={this.onChange} />
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">Captcha Timeout</label>
                                                            <div className="col-sm-8">
                                                                <input type="number" min="0" name="captchaTimeout" className="form-control" value={this.state.setting.captchaTimeout} onChange={this.onChange} />
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">Captcha Retries</label>
                                                            <div className="col-sm-8">
                                                                <input type="number" min="0" name="captchaRetries" className="form-control" value={this.state.setting.captchaRetries} onChange={this.onChange} />
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">API Status</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="apiStatus" className="form-control" value={this.state.setting.apiStatus} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 1 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath1Desc" className="form-control" value={this.state.setting.xpath1Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 1</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath1" className="form-control" value={this.state.setting.xpath1} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 2 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath2Desc" className="form-control" value={this.state.setting.xpath2Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 2</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath2" className="form-control" value={this.state.setting.xpath2} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 3 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath3Desc" className="form-control" value={this.state.setting.xpath3Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 3</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath3" className="form-control" value={this.state.setting.xpath3} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 4 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath4Desc" className="form-control" value={this.state.setting.xpath4Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 4</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath4" className="form-control" value={this.state.setting.xpath4} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 5 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath5Desc" className="form-control" value={this.state.setting.xpath5Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 5</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath5" className="form-control" value={this.state.setting.xpath5} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 6 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath6Desc" className="form-control" value={this.state.setting.xpath6Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 6</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath6" className="form-control" value={this.state.setting.xpath6} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 7 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath7Desc" className="form-control" value={this.state.setting.xpath7Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 7</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath7" className="form-control" value={this.state.setting.xpath7} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 8 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath8Desc" className="form-control" value={this.state.setting.xpath8Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 8</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath8" className="form-control" value={this.state.setting.xpath8} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 9 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath9Desc" className="form-control" value={this.state.setting.xpath9Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 9</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath9" className="form-control" value={this.state.setting.xpath9} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 10 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath10Desc" className="form-control" value={this.state.setting.xpath10Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 10</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath10" className="form-control" value={this.state.setting.xpath10} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 11 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath2Desc" className="form-control" value={this.state.setting.xpath11Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 11</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath11" className="form-control" value={this.state.setting.xpath11} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 12 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath12Desc" className="form-control" value={this.state.setting.xpath12Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 12</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath12" className="form-control" value={this.state.setting.xpath12} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 13 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath13Desc" className="form-control" value={this.state.setting.xpath13Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 13</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath13" className="form-control" value={this.state.setting.xpath13} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 14 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath14Desc" className="form-control" value={this.state.setting.xpath14Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 14</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath14" className="form-control" value={this.state.setting.xpath14} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 15 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath15Desc" className="form-control" value={this.state.setting.xpath15Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 15</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath15" className="form-control" value={this.state.setting.xpath15} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 16 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath16Desc" className="form-control" value={this.state.setting.xpath16Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 16</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath16" className="form-control" value={this.state.setting.xpath16} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 17 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath17Desc" className="form-control" value={this.state.setting.xpath17Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 17</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath17" className="form-control" value={this.state.setting.xpath17} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 18 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath18Desc" className="form-control" value={this.state.setting.xpath18Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 18</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath18" className="form-control" value={this.state.setting.xpath18} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 19 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath19Desc" className="form-control" value={this.state.setting.xpath19Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 19</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath19" className="form-control" value={this.state.setting.xpath19} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 20 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath20Desc" className="form-control" value={this.state.setting.xpath20Desc} onChange={this.onChange} />
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 20</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath20" className="form-control" value={this.state.setting.xpath20} onChange={this.onChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default ListSettingComponent;