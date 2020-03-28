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
            tracks:0,
            campaignType:'Track2',
            country:'US',
            totalPlays:'0',
            totalFollows:'0',
            totalReups:'0',
            totalHighlights:'0',
            totalFavorites:'0',
            perHourPlays:'0',
            perDayPlays:'0',
            perHourMixed:'0',
            perDayMixed:'0',
            lastHour:'0',
            lastDay:'0',
            played:'0',
            followed:'0',
            reuped:'0',
            highlighted:'0',
            favorited:'0',
            startDate:'',
            endDate:'',
            status:'ON',
            fails:'0',
            lastAccess:'',
            mixedType:'',
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

                    <div className="form-group col-md-6">
                        <label>URL:</label>
                        <input placeholder="URL" name="url" className="form-control" value={this.state.url} onChange={this.onChange}/>
                    </div>

                </div>

                <div className="form-row">
                
                    <div className="form-group col-md-3">
                        <label>Name:</label>
                        <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-2">
                        <label>Country:</label>
                        {/* <input placeholder="Country" name="country" className="form-control" value={this.state.country} onChange={this.onChange}/> */}
                        <select name="country" className="form-control" value={this.state.country} onChange={this.onChange}>
                            <option value="US">US</option>
                        </select>
                    </div>

                    <div className="form-group col-md-2">
                        <label>Tracks:</label>
                        <input type="number" min="0" step="1" placeholder="integer" name="tracks" className="form-control" value={this.state.tracks} onChange={this.onChange}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="campaignType">Campaign Type:</label>
                        {/* <input placeholder="Campaign Type" name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}/> */}
                        <select name="campaignType" className="form-control" value={this.state.campaignType} onChange={this.onChange}>
                            <option value="Track2">Track2</option>
                            <option value="List">List</option>
                            <option value="Album">Album</option>
                            <option value="SearchTrack">SearchTrack</option>
                            <option value="SearchList">SearchList</option>
                            <option value="SearchAlbum">SearchAlbum</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="mixedType">Mixed Type:</label>
                        <select name="mixedType" className="form-control" value={this.state.mixedType} onChange={this.onChange}>
                            <option value=""></option>
                            {this.state.campaignType === "Track2" ? (<option value="Reup">Reup</option>):(<></>)}
                            {this.state.campaignType === "Track2" ? (<option value="Highlight">Highlight</option>):(<></>)}
                            {this.state.campaignType === "Track2" ? (<option value="Favorite">Favorite</option>):(<></>)}
                            {this.state.campaignType === "Track2" ? (<option value="Follow">Follow</option>):(<></>)}
                        </select>
                    </div>
                </div>
                <div className="row col-md-2">
                    <label>Limits</label>
                </div>
                <div className="form-row border">
                    <div className="form-group col-md-1">
                        <label>Total Plays:</label>
                        <input  type="number" min="0" step="1" default="0" name="totalPlays" className="form-control" value={this.state.totalPlays} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-1">
                        <label>Total Follows:</label>
                        <input type="number" min="0" step="1" default="0"name="totalFollows" className="form-control" value={this.state.totalFollows} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Reups:</label>
                        <input  type="number" min="0" step="1" default="0" name="totalReups" className="form-control" value={this.state.totalReups} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Highlights:</label>
                        <input  type="number" min="0" step="1" default="0" name="totalHighlights" className="form-control" value={this.state.totalHighlights} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>Total Favorites:</label>
                        <input  type="number" min="0" step="1" default="0" name="totalFavorites" className="form-control" value={this.state.totalFavorites} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerHourPlays:</label>
                        <input  type="number" min="0" step="1" default="0" name="perHourPlays" className="form-control" value={this.state.perHourPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerDayPlays:</label>
                        <input  type="number" min="0" step="1" default="0" name="perDayPlays" className="form-control" value={this.state.perDayPlays} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerHourMixed:</label>
                        <input  type="number" min="0" step="1" default="0" name="perHourMixed" className="form-control" value={this.state.perHourMixed} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-1">
                        <label>PerDayMixed:</label>
                        <input  type="number" min="0" step="1" default="0" name="perDayMixed" className="form-control" value={this.state.perDayMixed} onChange={this.onChange}/>
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
                            <option value="ON">ON</option>
                            <option value="OFF">OFF</option>
                        </select>
                    </div>
                </div>

                {/* <div className="form-group">
                    <label>Last Access:</label>
                    <input  placeholder="" name="last_access" className="form-control" value={this.state.lastAccess} onChange={this.onChange}/>
                </div> */}

                
                    <button className="btn btn-success" onClick={this.saveCampaign}>Save</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/campaign_s1')}>Cancel</button>
                
            </form>
        </div>
        );
    }
}

export default AddCampaignS1Component;