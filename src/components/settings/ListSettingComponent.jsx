import React, { Component } from 'react'
import ApiService from "../../service/SettingApiService";
import DataTable from "../Tables/Datatable";

class ListSettingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                this.setState({settings: this.state.settings.filter(setting => setting.id !== settingId)});
                // window.location.reload(false);
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

    deleteSettings = async() => {
        var selected_ids = JSON.parse(window.localStorage.getItem("selected_ids"));
        
        
        for(var i =0;i<selected_ids.length;i++){
            ApiService.deleteSetting(parseInt(selected_ids[i]));
        }
        
        window.localStorage.removeItem("selected_ids");
        // window.location.reload(false);
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
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>Campaign Type</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="campaignType" className="form-control" value={this.state.setting.campaignType} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>API Key</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="apiKey" className="form-control" value={this.state.setting.apiKey} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>Captcha Key</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="captchaKey" className="form-control" value={this.state.setting.captchaKey} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>Captcha Timeout</label>
                                                            <div className="col-sm-8">
                                                                <input type="number" min="0" name="captchaTimeout" className="form-control" value={this.state.setting.captchaTimeout} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>Captcha Retries</label>
                                                            <div className="col-sm-8">
                                                                <input type="number" min="0" name="captchaRetries" className="form-control" value={this.state.setting.captchaRetries} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>API Status</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="apiStatus" className="form-control" value={this.state.setting.apiStatus} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 1 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath1Desc" className="form-control" value={this.state.setting.xpath1Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 1</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath1" className="form-control" value={this.state.setting.xpath1} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 2 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath2Desc" className="form-control" value={this.state.setting.xpath2Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 2</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath2" className="form-control" value={this.state.setting.xpath2} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 3 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath3Desc" className="form-control" value={this.state.setting.xpath3Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 3</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath3" className="form-control" value={this.state.setting.xpath3} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 4 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath4Desc" className="form-control" value={this.state.setting.xpath4Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 4</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath4" className="form-control" value={this.state.setting.xpath4} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 5 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath5Desc" className="form-control" value={this.state.setting.xpath5Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 5</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath5" className="form-control" value={this.state.setting.xpath5} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 6 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath6Desc" className="form-control" value={this.state.setting.xpath6Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 6</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath6" className="form-control" value={this.state.setting.xpath6} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 7 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath7Desc" className="form-control" value={this.state.setting.xpath7Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 7</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath7" className="form-control" value={this.state.setting.xpath7} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 8 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath8Desc" className="form-control" value={this.state.setting.xpath8Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 8</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath8" className="form-control" value={this.state.setting.xpath8} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 9 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath9Desc" className="form-control" value={this.state.setting.xpath9Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 9</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath9" className="form-control" value={this.state.setting.xpath9} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 10 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath10Desc" className="form-control" value={this.state.setting.xpath10Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 10</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath10" className="form-control" value={this.state.setting.xpath10} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 11 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath11Desc" className="form-control" value={this.state.setting.xpath11Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 11</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath11" className="form-control" value={this.state.setting.xpath11} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 12 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath12Desc" className="form-control" value={this.state.setting.xpath12Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 12</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath12" className="form-control" value={this.state.setting.xpath12} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 13 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath13Desc" className="form-control" value={this.state.setting.xpath13Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 13</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath13" className="form-control" value={this.state.setting.xpath13} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 14 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath14Desc" className="form-control" value={this.state.setting.xpath14Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 14</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath14" className="form-control" value={this.state.setting.xpath14} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 15 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath15Desc" className="form-control" value={this.state.setting.xpath15Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 15</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath15" className="form-control" value={this.state.setting.xpath15} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 16 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath16Desc" className="form-control" value={this.state.setting.xpath16Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 16</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath16" className="form-control" value={this.state.setting.xpath16} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 17 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath17Desc" className="form-control" value={this.state.setting.xpath17Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 17</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath17" className="form-control" value={this.state.setting.xpath17} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 18 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath18Desc" className="form-control" value={this.state.setting.xpath18Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 18</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath18" className="form-control" value={this.state.setting.xpath18} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 19 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath19Desc" className="form-control" value={this.state.setting.xpath19Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 19</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath19" className="form-control" value={this.state.setting.xpath19} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 20 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath20Desc" className="form-control" value={this.state.setting.xpath20Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 20</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath20" className="form-control" value={this.state.setting.xpath20} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right"  style={{"font-weight": "bold"}}>XPath 21 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath21Desc" className="form-control" value={this.state.setting.xpath21Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 21</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath21" className="form-control" value={this.state.setting.xpath21} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 22 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath22Desc" className="form-control" value={this.state.setting.xpath22Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 22</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath22" className="form-control" value={this.state.setting.xpath22} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 23 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath23Desc" className="form-control" value={this.state.setting.xpath23Desc} onChange={this.onChange}  style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 23</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath23" className="form-control" value={this.state.setting.xpath23} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 24 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath24Desc" className="form-control" value={this.state.setting.xpath24Desc} onChange={this.onChange} style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 24</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath24" className="form-control" value={this.state.setting.xpath24} onChange={this.onChange} />
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-4 text-sm-right" style={{"font-weight": "bold"}}>XPath 25 Description</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath25Desc" className="form-control" value={this.state.setting.xpath25Desc} onChange={this.onChange} style={{"font-weight": "bold"}}/>
                                                            </div>
                                                        <label className="col-form-label col-sm-4 text-sm-right">XPath 25</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name="xpath25" className="form-control" value={this.state.setting.xpath25} onChange={this.onChange} />
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