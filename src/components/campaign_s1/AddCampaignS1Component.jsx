import React, { Component } from 'react'
import ApiService from "../../service/CampaignS1ApiService";

class AddCampaignS1Component extends Component{

    constructor(props){
        super(props);
        this.state ={
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
            status:'on',
            fails:'',
            lastAccess:'',
            message:null,
        }
        this.saveCampaign = this.saveCampaign.bind(this);
    }

    saveCampaign = (e) => {
        e.preventDefault();
        let camp = this.state;
        camp.lastAccess = new Date().toISOString();
        console.log(camp);
        ApiService.addCampaign(camp)
            .then(res => {
                this.setState({message : 'Campaign added successfully.'});
                this.props.history.push('/campaign_s1');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Campaign</h2>
                <form>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Note:</label>
                        <input type="text" placeholder="Note" name="note" className="form-control" value={this.state.note} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label>Note2:</label>
                        <input type="" placeholder="Note2" name="note2" className="form-control" value={this.state.note2} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label>URL:</label>
                        <input placeholder="URL" name="url" className="form-control" value={this.state.url} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label>Name:</label>
                        <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Campaign Type:</label>
                        <input placeholder="Campaign Type" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-2">
                        <label>Country:</label>
                        <input placeholder="Country" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-2">
                        <label>Tracks:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="tracks" className="form-control" value={this.state.tracks} onChange={this.onChange}/>
                    </div>
                </div>

                <div className="row col-md-2">
                    <label>Limits</label>
                </div>
                <div className="form-row border">
                    <div className="form-group col-md-1">
                        <label>Total Plays:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="totalPlays" className="form-control" value={this.state.totalPlays} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-1">
                        <label>Total Follows:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="totalFollows" className="form-control" value={this.state.totalFollows} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Reups:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="totalReups" className="form-control" value={this.state.totalReups} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Highlights:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="totalHighlights" className="form-control" value={this.state.totalHighlights} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Favorites:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="totalFavorites" className="form-control" value={this.state.totalFavorites} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerHourPlays:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="perHourPlays" className="form-control" value={this.state.perHourPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerDayPlays:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="perDayPlays" className="form-control" value={this.state.perDayPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerHourMixed:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="perHourMixed" className="form-control" value={this.state.perHourMixed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerDayMixed:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="perDayMixed" className="form-control" value={this.state.perDayMixed} onChange={this.onChange}/>
                    </div>

                </div>

                {/* <div className="form-row">
                    <div className="form-group col-md-1">
                        <label>Played:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="played" className="form-control" value={this.state.played} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Followed:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="followed" className="form-control" value={this.state.followed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Reuped:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="reuped" className="form-control" value={this.state.reuped} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Highlighted:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="highlighted" className="form-control" value={this.state.highlighted} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Favorited:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="favorited" className="form-control" value={this.state.favorited} onChange={this.onChange}/>
                    </div>                    

                    <div className="form-group col-md-1">
                    </div>

                    <div className="form-group col-md-1">
                        <label>Last Day:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="lastDay" className="form-control" value={this.state.lastDay} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Last Hour:</label>
                        <input  type="number" min="0" step="1" placeholder="integer" name="lastHour" className="form-control" value={this.state.lastHour} onChange={this.onChange}/>
                    </div>

                </div> */}
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label>Start Date:</label>
                        <input  type="date" name="startDate" className="form-control" value={this.state.startDate} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label>End Date:</label>
                        <input  type="date" name="endDate" className="form-control" value={this.state.endDate} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label>Status:</label>
                        {/* <input type="select" name="status" className="form-control" value={this.state.status} onChange={this.onChange}/> */}
                        <select name="status" className="form-control" value = {this.state.status} onChange={this.onChange}>
                            <option value="on">ON</option>
                            <option value="off">OFF</option>
                        </select>
                    </div>
                </div>

                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                <button className="btn btn-success" onClick={this.saveCampaign}>Save</button>
            </form>
        </div>
        );
    }
}

export default AddCampaignS1Component;