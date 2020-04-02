import React, { Component } from 'react'
import ApiService from "../../service/SettingApiService";
import dateFormat from "dateformat";
class AddSettingComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            campaignType:'',
            apiKey:'',
            captchaKey:'',
            captchaTimeout:'',
            captchaRetries:'',
            apiStatus:'',
            xpath1:'',
            xpath1Desc:'',
            xpath2:'',
            xpath2Desc:'',
            xpath3:'',
            xpath3Desc:'',
            xpath4:'',
            xpath4Desc:'',
            xpath5:'',
            xpath5Desc:'',
            xpath6:'',
            xpath6Desc:'',
            xpath7:'',
            xpath7Desc:'',
            xpath8:'',
            xpath8Desc:'',
            xpath9:'',
            xpath9Desc:'',
            xpath10:'',
            xpath10Desc:'',
            xpath11:'',
            xpath11Desc:'',
            xpath12:'',
            xpath12Desc:'',
            xpath13:'',
            xpath13Desc:'',
            xpath14:'',
            xpath14Desc:'',
            xpath15:'',
            xpath15Desc:'',
            xpath16:'',
            xpath16Desc:'',
            xpath17:'',
            xpath17Desc:'',
            xpath18:'',
            xpath18Desc:'',
            xpath19:'',
            xpath19Desc:'',
            xpath20:'',
            xpath20Desc:'',
            xpath21:'',
            xpath21Desc:'',
            xpath22:'',
            xpath22Desc:'',
            xpath23:'',
            xpath23Desc:'',
            xpath24:'',
            xpath24Desc:'',
            xpath25:'',
            xpath25Desc:'',
            message:null,
        }
        this.saveSetting = this.saveSetting.bind(this);
    }

    saveSetting = (e) => {
        e.preventDefault();
        // let setting = {campaignType: this.state.campaignType, apiKey: this.state.apiKey, captchaKey: this.state.captchaKey, captchaTimeout: this.state.captchaTimeout, captchaRetries: this.state.captchaRetries, apiStatus: this.state.apiStatus,xpath1:this.state.xpath1,xpath2:this.state.xpath2
        //     ,xpath3:this.state.xpath3,xpath4:this.state.xpath4,xpath5:this.state.xpath5,xpath6:this.state.xpath6,xpath7:this.state.xpath7,xpath8:this.state.xpath8,xpath9:this.state.xpath9,xpath10:this.state.xpath10,xpath11:this.state.xpath11,xpath12:this.state.xpath12,xpath13:this.state.xpath13,xpath14:this.state.xpath14,
        //     xpath15:this.state.xpath15,xpath16:this.state.xpath16,xpath17:this.state.xpath17,xpath18:this.state.xpath18,xpath19:this.state.xpath19,xpath20:this.state.xpath20
        //     ,xpath1Desc:this.state.xpath1Desc,xpath2Desc:this.state.xpath2Desc
        //     ,xpath3Desc:this.state.xpath3,xpath4Desc:this.state.xpath4Desc,xpath5Desc:this.state.xpath5Desc,xpath6Desc:this.state.xpath6Desc,xpath7Desc:this.state.xpath7Desc,xpath8Desc:this.state.xpath8Desc,xpath9Desc:this.state.xpath9Desc,xpath10Desc:this.state.xpath10Desc,xpath11Desc:this.state.xpath11,xpath12Desc:this.state.xpath12Desc,xpath13Desc:this.state.xpath13Desc,xpath14Desc:this.state.xpath14Desc,
        //     xpath15Desc:this.state.xpath15Desc,xpath16Desc:this.state.xpath16Desc,xpath17Desc:this.state.xpath17Desc,xpath18Desc:this.state.xpath18Desc,xpath19Desc:this.state.xpath19Desc,xpath20Desc:this.state.xpath20Desc};

        let setting = this.state;
        setting.lastAccess = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris'})).toISOString();
        ApiService.addSetting(setting)
            .then(res => {
                this.setState({message : 'Setting added successfully.'});
                this.props.history.push('/setting');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Setting</h2>
                <form>
                <div className="form-group">
                    <label>Campaign Type:</label>
                    <input type="text" placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>API Key:</label>
                    <input type="note" placeholder="" name="apiKey" className="form-control" value={this.state.apiKey} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Captcha Key:</label>
                    <input placeholder="" name="captchaKey" className="form-control" value={this.state.captchaKey} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Captcha Timeout:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="captchaTimeout" className="form-control" value={this.state.captchaTimeout} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Captcha Retries:</label>
                    <input type="number" min="0" step="1" placeholder="integer" name="captchaRetries" className="form-control" value={this.state.captchaRetries} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>API Status:</label>
                    <input placeholder="" name="apiStatus" className="form-control" value={this.state.apiStatus} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 1:</label>
                    <input  placeholder="" name="xpath1" className="form-control" value={this.state.xpath1} onChange={this.onChange}/>
                </div>
                
                <div className="form-group">
                    <label>XPath 1 Description:</label>
                    <input  placeholder="" name="xpath1Desc" className="form-control" value={this.state.xpath1Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 2:</label>
                    <input placeholder="" name="xpath2" className="form-control" value={this.state.xpath2} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 2 Description:</label>
                    <input  placeholder="" name="xpath2Desc" className="form-control" value={this.state.xpath2Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 3:</label>
                    <input  placeholder="" name="xpath3" className="form-control" value={this.state.xpath3} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 3 Description:</label>
                    <input  placeholder="" name="xpath3Desc" className="form-control" value={this.state.xpath3Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 4:</label>
                    <input placeholder="" name="xpath4" className="form-control" value={this.state.xpath4} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 4 Description:</label>
                    <input  placeholder="" name="xpath4Desc" className="form-control" value={this.state.xpath4Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 5:</label>
                    <input placeholder="" name="xpath5" className="form-control" value={this.state.xpath5} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 5 Description:</label>
                    <input  placeholder="" name="xpath5Desc" className="form-control" value={this.state.xpath5Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 6:</label>
                    <input placeholder="" name="xpath6" className="form-control" value={this.state.xpath6} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 6 Description:</label>
                    <input  placeholder="" name="xpath6Desc" className="form-control" value={this.state.xpath6Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 7:</label>
                    <input placeholder="" name="xpath6" className="form-control" value={this.state.xpath7} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 7 Description:</label>
                    <input  placeholder="" name="xpath7Desc" className="form-control" value={this.state.xpath7Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 8:</label>
                    <input placeholder="" name="xpath6" className="form-control" value={this.state.xpath8} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 8 Description:</label>
                    <input  placeholder="" name="xpath8Desc" className="form-control" value={this.state.xpath8Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 9:</label>
                    <input placeholder="" name="xpath9" className="form-control" value={this.state.xpath9} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 9 Description:</label>
                    <input  placeholder="" name="xpath9Desc" className="form-control" value={this.state.xpath9Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 10:</label>
                    <input placeholder="" name="xpath10" className="form-control" value={this.state.xpath10} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 10 Description:</label>
                    <input  placeholder="" name="xpath10Desc" className="form-control" value={this.state.xpath10Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 11:</label>
                    <input placeholder="" name="xpath11" className="form-control" value={this.state.xpath11} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 11 Description:</label>
                    <input  placeholder="" name="xpath11Desc" className="form-control" value={this.state.xpath11Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 12:</label>
                    <input placeholder="" name="xpath12" className="form-control" value={this.state.xpath12} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 12 Description:</label>
                    <input  placeholder="" name="xpath12Desc" className="form-control" value={this.state.xpath12Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 13:</label>
                    <input placeholder="" name="xpath13" className="form-control" value={this.state.xpath13} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 13 Description:</label>
                    <input  placeholder="" name="xpath13Desc" className="form-control" value={this.state.xpath13Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 14:</label>
                    <input placeholder="" name="xpath14" className="form-control" value={this.state.xpath14} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 14 Description:</label>
                    <input  placeholder="" name="xpath14Desc" className="form-control" value={this.state.xpath14Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 15:</label>
                    <input placeholder="" name="xpath15" className="form-control" value={this.state.xpath15} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 15 Description:</label>
                    <input  placeholder="" name="xpath15Desc" className="form-control" value={this.state.xpath15Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 16:</label>
                    <input placeholder="" name="xpath16" className="form-control" value={this.state.xpath16} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 16 Description:</label>
                    <input  placeholder="" name="xpath16Desc" className="form-control" value={this.state.xpath16Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 17:</label>
                    <input placeholder="" name="xpath17" className="form-control" value={this.state.xpath17} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 17 Description:</label>
                    <input  placeholder="" name="xpath17Desc" className="form-control" value={this.state.xpath17Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 18:</label>
                    <input placeholder="" name="xpath18" className="form-control" value={this.state.xpath18} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 18 Description:</label>
                    <input  placeholder="" name="xpath18Desc" className="form-control" value={this.state.xpath18Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 19:</label>
                    <input placeholder="" name="xpath19" className="form-control" value={this.state.xpath19} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 19 Description:</label>
                    <input  placeholder="" name="xpath19Desc" className="form-control" value={this.state.xpath19Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 20:</label>
                    <input placeholder="" name="xpath20" className="form-control" value={this.state.xpath20} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 20 Description:</label>
                    <input  placeholder="" name="xpath20Desc" className="form-control" value={this.state.xpath20Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 21:</label>
                    <input placeholder="" name="xpath21" className="form-control" value={this.state.xpath21} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 21 Description:</label>
                    <input placeholder="" name="xpath21Desc" className="form-control" value={this.state.xpath21Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 22:</label>
                    <input placeholder="" name="xpath22" className="form-control" value={this.state.xpath22} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 22 Description:</label>
                    <input placeholder="" name="xpath22Desc" className="form-control" value={this.state.xpath22Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 23:</label>
                    <input placeholder="" name="xpath23" className="form-control" value={this.state.xpath23} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 23 Description:</label>
                    <input placeholder="" name="xpath23Desc" className="form-control" value={this.state.xpath23Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 24:</label>
                    <input placeholder="" name="xpath24" className="form-control" value={this.state.xpath24} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 24 Description:</label>
                    <input placeholder="" name="xpath24Desc" className="form-control" value={this.state.xpath24Desc} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 25:</label>
                    <input placeholder="" name="xpath20" className="form-control" value={this.state.xpath25} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>XPath 25 Description:</label>
                    <input placeholder="" name="xpath25Desc" className="form-control" value={this.state.xpath25Desc} onChange={this.onChange}/>
                </div>                
                <button className="btn btn-success" onClick={this.saveSetting}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/setting')}>Cancel</button>
            </form>
    </div>
        );
    }
}

export default AddSettingComponent;