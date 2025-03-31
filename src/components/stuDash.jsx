import React from 'react';
import Topbarnew from './Topbarnew';
import Sidebarnew from './sidebarnew'; 
import Footer from './Footer'; 

function StuDash() {
  return (
    <div>
      <Sidebarnew /> 
      <Topbarnew />
      <div className="content">
        <h1>Student Dashboard</h1>
        <p>Welcome, Student! You have limited access.</p>
      </div>
      <Footer />
    </div>
  );
}

export default StuDash;
