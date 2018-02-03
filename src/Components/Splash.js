import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Splash.css'

export const Splash = (props) => (
  <div id="Splash">
    <div className="splash--inner">
      <div className="splash_logo">
        Block Party
    </div>
      <div className="splash_svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" />
        </svg>
      </div>
      <div className="splash_minimize">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" />
        </svg>
      </div>
    </div>
    <div className="text">
      <div className="footer-logo-container">
        <img src="/images/logo.png" alt=""/>
      </div>
      <p>
        The world's first streaming economy
        <br />
        Brought to you by Liam Ellis and Alex Nordenson
      </p>
      <button onClick={(e)=>{e.preventDefault(); return props.enterSite()}}>Enter</button>
    </div>
  </div>

)