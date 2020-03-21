import React, { Component } from 'react'
import ApiService from "../../service/CampaignS1ApiService";

class EditCampaignS1Component extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            note:'',
            note2:'',
            url:'',
            name:'',
            tracks:'',
            campaignType:'',
            country:'',
            totalPlays:'',
            totalFollows:'',
            totalReups:'',
            totalHighlights:'',
            totalFavorites:'',
            perHourPlays:'',
            perDayPlays:'',
            perHourMixed:'',
            perDayMixed:'',
            lastHour:'',
            lastDay:'',
            played:'',
            followed:'',
            reuped:'',
            highlighted:'',
            favorited:'',
            startDate:'',
            endDate:'',
            status:'',
            fails:'',
            lastAccess:'',
        }
        this.saveCampaign = this.saveCampaign.bind(this);
        this.loadCampaign = this.loadCampaign.bind(this);
    }

    componentDidMount() {
        this.loadCampaign();
    }

    loadCampaign() {
        ApiService.fetchCampaignById(window.localStorage.getItem("campS1Id"))
            .then((res) => {
                let camp = res.data[0];
                this.setState(camp);
                })
   }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveCampaign = (e) => {
        e.preventDefault();

        
        let camp = this.state;

        camp.lastAccess = new Date().toISOString();
        ApiService.editCampaign(camp)
            .then(res => {
                this.setState({message : 'Campaign updated successfully.'});
                this.props.history.push('/campaign_s1');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Campaign</h2>
                <form>

                    <div className="form-group">
                        <label>Note:</label>
                        <input type="text" placeholder="" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Note2:</label>
                        <input placeholder="" name="note2" className="form-control" value={this.state.note2} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>URL:</label>
                        <input placeholder="" name="url" className="form-control" value={this.state.url} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input  placeholder="" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Tracks:</label>
                        <input placeholder="" name="tracks" className="form-control" value={this.state.tracks} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Campaign Type:</label>
                        <input placeholder="" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Country:</label>
                        <input placeholder="" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Total Plays:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalPlays" className="form-control" value={this.state.totalPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Total Follows:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalFollows" className="form-control" value={this.state.totalFollows} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Total Reups:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalReups" className="form-control" value={this.state.totalReups} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Total Highlights:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalHighlights" className="form-control" value={this.state.totalHighlights} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Total Favorites:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalFavorites" className="form-control" value={this.state.totalFavorites} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Per Hour Plays:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="perHourPlays" className="form-control" value={this.state.perHourPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Per Day Plays:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="perDayPlays" className="form-control" value={this.state.perDayPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Per Hour Mixed:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="perHourMixed" className="form-control" value={this.state.perHourMixed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Per Day Mixed:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="perDayMixed" className="form-control" value={this.state.perDayMixed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Hour:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="lastHour" className="form-control" value={this.state.lastHour} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Day:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="lastDay" className="form-control" value={this.state.lastDay} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Played:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="played" className="form-control" value={this.state.played} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Followed:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="followed" className="form-control" value={this.state.followed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Reuped:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="reuped" className="form-control" value={this.state.reuped} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Highlighted:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="highlighted" className="form-control" value={this.state.highlighted} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Favorited:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="favorited" className="form-control" value={this.state.favorited} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Start Date:</label>
                        <input type = "date" name="startDate" className="form-control" value={this.state.startDate} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>End Date:</label>
                        <input type = "date" name="endDate" className="form-control" value={this.state.endDate} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Fails:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="fails" className="form-control" value={this.state.fails} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <input placeholder="" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveCampaign}>Save</button>
                </form>
            </div>
        );
    }


}

export default EditCampaignS1Component;