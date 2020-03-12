import React,{ Component } from 'react';

import SideBar from '../components/sidebar';
import Footer from '../components/footer';
import NavBar from '../components/navbar';

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