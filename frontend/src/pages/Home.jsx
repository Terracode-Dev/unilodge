import React from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Hsection from '../components/Hsection';

function HomePage(){
    return (
        <div>
           <Hero /> 
           <Hsection/>
           <Footer />
        </div>
    )
}

export default HomePage;
