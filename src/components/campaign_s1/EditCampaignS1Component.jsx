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
            mixedType:'',
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value == 'List') this.setState({mixedType:''});
    }

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

                <button className="btn btn-success" onClick={this.saveCampaign}>Save</button>
                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => this.props.history.push('/campaign_s1')}>Cancel</button>
            </form>
        </div>
        );
    }


}

export default EditCampaignS1Component;