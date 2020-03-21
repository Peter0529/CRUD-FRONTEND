import React, { Component } from 'react'
import ApiService from "../../service/SettingApiService";

class EditSettingComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
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
        }
        this.saveSetting = this.saveSetting.bind(this);
        this.loadSetting = this.loadSetting.bind(this);
    }

    componentDidMount() {
        this.loadSetting();
    }

    loadSetting() {
        ApiService.fetchSettingById(window.localStorage.getItem("settingId"))
            .then((res) => {
                let setting = res.data[0];
                this.setState(setting);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveSetting = (e) => {
        e.preventDefault();
        
        let setting = this.state;
        setting.lastAccess = new Date().toISOString();
        ApiService.editSetting(setting)
            .then(res => {
                this.setState({message : 'Setting updated successfully.'});
                this.props.history.push('/setting');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Setting</h2>
                <form>

                    <div className="form-group">
                        <label>Campaign Type:</label>
                        <input type="text" placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>API Key:</label>
                        <input placeholder="" name="apiKey" className="form-control" value={this.state.apiKey} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Captcha Key:</label>
                        <input placeholder="" name="captchaKey" className="form-control" value={this.state.captchaKey} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Captcha Timeout:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="captchaTimeout" className="form-control" value={this.state.captchaTimeout} onChange={this.onChange}/>
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
                        <input placeholder="" name="xpath1" className="form-control" value={this.state.xpath1} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 1 Description:</label>
                        <input placeholder="" name="xpath1Desc" className="form-control" value={this.state.xpath1Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 2:</label>
                        <input placeholder="" name="xpath2" className="form-control" value={this.state.xpath2} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 2 Description:</label>
                        <input placeholder="" name="xpath2Desc" className="form-control" value={this.state.xpath2Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 3:</label>
                        <input placeholder="" name="xpath3" className="form-control" value={this.state.xpath3} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 3 Description:</label>
                        <input placeholder="" name="xpath3Desc" className="form-control" value={this.state.xpath3Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 4:</label>
                        <input placeholder="" name="xpath4" className="form-control" value={this.state.xpath4} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 4 Description:</label>
                        <input placeholder="" name="xpath4Desc" className="form-control" value={this.state.xpath4Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 5:</label>
                        <input placeholder="" name="xpath5" className="form-control" value={this.state.xpath5} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 5 Description:</label>
                        <input placeholder="" name="xpath5Desc" className="form-control" value={this.state.xpath5Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 6:</label>
                        <input placeholder="" name="xpath6" className="form-control" value={this.state.xpath6} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 6 Description:</label>
                        <input placeholder="" name="xpath6Desc" className="form-control" value={this.state.xpath6Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 7:</label>
                        <input placeholder="" name="xpath7" className="form-control" value={this.state.xpath7} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 7 Description:</label>
                        <input placeholder="" name="xpath7Desc" className="form-control" value={this.state.xpath7Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 8:</label>
                        <input placeholder="" name="xpath8" className="form-control" value={this.state.xpath8} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 8 Description:</label>
                        <input placeholder="" name="xpath8Desc" className="form-control" value={this.state.xpath8Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 9:</label>
                        <input placeholder="" name="xpath9" className="form-control" value={this.state.xpath9} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 9 Description:</label>
                        <input placeholder="" name="xpath9Desc" className="form-control" value={this.state.xpath9Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 10:</label>
                        <input placeholder="" name="xpath10" className="form-control" value={this.state.xpath10} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 10 Description:</label>
                        <input placeholder="" name="xpath10Desc" className="form-control" value={this.state.xpath10Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 11:</label>
                        <input placeholder="" name="xpath11" className="form-control" value={this.state.xpath11} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 11 Description:</label>
                        <input placeholder="" name="xpath11Desc" className="form-control" value={this.state.xpath11Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 12:</label>
                        <input placeholder="" name="xpath12" className="form-control" value={this.state.xpath12} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 12 Description:</label>
                        <input placeholder="" name="xpath12Desc" className="form-control" value={this.state.xpath12Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 13:</label>
                        <input placeholder="" name="xpath13" className="form-control" value={this.state.xpath13} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 13 Description:</label>
                        <input placeholder="" name="xpath13Desc" className="form-control" value={this.state.xpath13Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 14:</label>
                        <input placeholder="" name="xpath14" className="form-control" value={this.state.xpath14} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 14 Description:</label>
                        <input placeholder="" name="xpath14Desc" className="form-control" value={this.state.xpath14Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 15:</label>
                        <input placeholder="" name="xpath15" className="form-control" value={this.state.xpath15} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 15 Description:</label>
                        <input placeholder="" name="xpath15Desc" className="form-control" value={this.state.xpath15Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 16:</label>
                        <input placeholder="" name="xpath16" className="form-control" value={this.state.xpath16} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 16 Description:</label>
                        <input placeholder="" name="xpath16Desc" className="form-control" value={this.state.xpath16Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 17:</label>
                        <input placeholder="" name="xpath17" className="form-control" value={this.state.xpath17} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 17 Description:</label>
                        <input placeholder="" name="xpath17Desc" className="form-control" value={this.state.xpath17Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 18:</label>
                        <input placeholder="" name="xpath18" className="form-control" value={this.state.xpath18} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 18 Description:</label>
                        <input placeholder="" name="xpath18Desc" className="form-control" value={this.state.xpath18Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 19:</label>
                        <input placeholder="" name="xpath19" className="form-control" value={this.state.xpath19} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 19 Description:</label>
                        <input placeholder="" name="xpath19Desc" className="form-control" value={this.state.xpath19Desc} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 20:</label>
                        <input placeholder="" name="xpath20" className="form-control" value={this.state.xpath20} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>XPath 20 Description:</label>
                        <input placeholder="" name="xpath20Desc" className="form-control" value={this.state.xpath20Desc} onChange={this.onChange}/>
                    </div>

                    {/* <div className="form-group">
                        <label>Last Access:</label>
                        <input placeholder="" name="lastAccess" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                    </div> */}

                    <button className="btn btn-success" onClick={this.saveSetting}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditSettingComponent