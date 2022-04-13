
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
   
    return (
        <>
            <div className='site'>
                <Header/>
                <div className='main'>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default MainLayout
