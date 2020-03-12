import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class SideBar extends Component{
    render(){
        return(
            <nav id="sidebar" className="sidebar">
			<div className="sidebar-content ">
				<a className="sidebar-brand" href="index.html">
          <i className="align-middle" data-feather="box"></i>
          <span className="align-middle">ADMIN CRUD</span>
        </a>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Features
					</li>
					<li className="sidebar-item active">
						<a href="#dashboards" className="sidebar-link">
              				<i className="align-middle" data-feather="layout"></i> 
							  <span className="align-middle">Dashboards</span>
							  <span className="sidebar-badge badge badge-secondary">Home</span>
            			</a>
					</li>
					<li>
						<a href="#pages" className="sidebar-link">
              				<i className="align-middle" data-feather="sliders"></i> 
							  <span className="align-middle">Settings</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#auth" className="sidebar-link">
              				<i className="align-middle" data-feather="users"></i> 
							  <span className="align-middle">Emails</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#layouts" className="sidebar-link">
              				<i className="align-middle" data-feather="monitor"></i> 
							  <span className="align-middle">Proxies</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#documentation" className="sidebar-link">
              				<i className="align-middle" data-feather="book-open"></i> 
							<span className="align-middle">VPN</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Campaigns
					</li>
					<li className="sidebar-item">
						<a href="#ui"  className="sidebar-link">
              				<i className="align-middle" data-feather="grid"></i> 
							  <span className="align-middle">Campaigns S1</span>
							  <span class="sidebar-badge badge badge-info">AUDIOMACK</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#icons" className="sidebar-link">
              				<i className="align-middle" data-feather="heart"></i> <span className="align-middle">Campaigns S2</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#forms" className="sidebar-link ">
              				<i className="align-middle" data-feather="check-square"></i> 
							  <span className="align-middle">Campaigns S3</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Completed Campaigns
					</li>
					<li className="sidebar-item">
						<a className="sidebar-link" href="tables-bootstrap.html">
              				<i className="align-middle" data-feather="list"></i> 
							  <span className="align-middle">Completed Campaigns S1</span>
            			</a>
					</li>

					<li className="sidebar-item">
						<a href="#form-plugins" className="sidebar-link">
              				<i className="align-middle" data-feather="check-square"></i> 
							  <span className="align-middle">Completed Campaigns S2</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a href="#datatables" className="sidebar-link">
              				<i className="align-middle" data-feather="list"></i> 
							  <span className="align-middle">Completed Campaigns S3</span>
            			</a>
					</li>
					<li className="sidebar-header">
						Monitoring
					</li>
					<li className="sidebar-item">
						<a href="#charts"  className="sidebar-link">
              				<i className="align-middle" data-feather="pie-chart"></i> 
							  <span className="align-middle">LOG</span>
            			</a>
					</li>
					<li className="sidebar-item">
						<a className="sidebar-link" href="notifications.html">
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
