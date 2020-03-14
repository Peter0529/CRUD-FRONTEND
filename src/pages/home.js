import React,{ Component } from 'react';

import SideBar from '../components/layout/sidebar';
import Footer from '../components/layout/footer';
import NavBar from '../components/layout/navbar';

class Home extends Component{
    render(){
        return(
            <div className="wrapper">
                <SideBar/>
                <div className="main">
                    <NavBar/>
                    <main className="content"></main>
                    <Footer />
                </div>
            </div>
        );
    }
} export default Home;