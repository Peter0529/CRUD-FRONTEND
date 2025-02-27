import React, { Component } from 'react';

class SideBar extends Component{
	constructor(props){
		super(props);
		this.state={
			[props.active]:'active'
		}

		// this.onClickHandle = this.onClickHandle.bind(this);
	}

	componentDidMount(){
	}
	

    render(){
        return(
            <nav id="sidebar" className="sidebar">
			<div className="sidebar-content ">
				<a className="sidebar-brand" href="/">
          <i className="align-middle" data-feather="box"></i>
          <span className="align-middle">ADMIN CRUD</span>
        </a>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Features
					</li>
					<li className={"sidebar-item " + this.state.dashboard}>
						<a href="/" className="sidebar-link" >
              				<i className="align-middle" data-feather="layout"></i> 
							  <span className="align-middle">Dashboards</span>
							  <span className="sidebar-badge badge badge-secondary">Home</span>
            			</a>
					</li>
					<li className={"sidebar-item " + this.state.setting}>
						<a href="/setting" className="sidebar-link">
              				<i className="align-middle" data-feather="sliders"></i> 
							  <span className="align-middle">Settings</span>
            			</a>
					</li>
					<li className={"sidebar-item " + this.state.agent}>
						<a href="/useragents" className="sidebar-link">
              				<i className="align-middle" data-feather="sliders"></i> 
							  <span className="align-middle">User Agents</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.email}>
						<a href="/emails" className="sidebar-link">
              				<i className="align-middle" data-feather="users"></i> 
							  <span className="align-middle">Emails</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.proxy}>
						<a href="/proxies" className="sidebar-link">
              				<i className="align-middle" data-feather="monitor"></i> 
							  <span className="align-middle">Proxies</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.vpn}>
						<a href="/vpns" className="sidebar-link">
              				<i className="align-middle" data-feather="book-open"></i> 
							<span className="align-middle">VPN</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Campaigns
					</li>
					<li className={"sidebar-item "  + this.state.campaign_s1}>
						<a href="/campaign_s1"  className="sidebar-link">
              				<i className="align-middle" data-feather="grid"></i> 
							  <span className="align-middle">Campaigns S1</span>
							  <span className="sidebar-badge badge badge-info">AUDIOMACK</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.campaign_s2}>
						<a href="/campaign_s2" className="sidebar-link">
              				<i className="align-middle" data-feather="heart"></i> <span className="align-middle">Campaigns S2</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.campaign_s3}>
						<a href="/campaign_s3" className="sidebar-link ">
              				<i className="align-middle" data-feather="check-square"></i> 
							  <span className="align-middle">Campaigns S3</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Completed Campaigns
					</li>
					<li className={"sidebar-item "  + this.state.completed_s1}>
						<a className="sidebar-link" href="/completed_s1">
              				<i className="align-middle" data-feather="list"></i> 
							  <span className="align-middle">Completed Campaigns S1</span>
            			</a>
					</li>

					<li className={"sidebar-item "  + this.state.completed_s2}>
						<a href="/completed_s2" className="sidebar-link">
              				<i className="align-middle" data-feather="check-square"></i> 
							  <span className="align-middle">Completed Campaigns S2</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.completed_s3}>
						<a href="/completed_s3" className="sidebar-link">
              				<i className="align-middle" data-feather="list"></i> 
							  <span className="align-middle">Completed Campaigns S3</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Monitoring
					</li>
					<li className={"sidebar-item "  + this.state.log}>
						<a href="/logs"  className="sidebar-link">
              				<i className="align-middle" data-feather="pie-chart"></i> 
							  <span className="align-middle">LOG</span>
            			</a>
					</li>
					<li className={"sidebar-item "  + this.state.stats}>
						<a className="sidebar-link" href="/stats">
              				<i className="align-middle" data-feather="bell"></i> 
							  <span className="align-middle">STATS</span>
            			</a>
					</li>
				</ul>
			</div>
		</nav>
        )
    }
} export default SideBar;
