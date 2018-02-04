import React from 'react'
import{ RecentlyJoinedArtists } from './RecentlyJoinedArtists'

export const Intro = (props) => (
  <section className={`section ${props.active === props.title ? 'section--current' : ''}`} id="Intro">
    <div className="section__content">
      <h2 className="section__title">BlockParty</h2>
      <p className="section__description"><span className="section__description-inner">The world’s first streaming economy presents a custom media exchange platform that rewards artists and their listeners alike every time their content is played. <br /> Remember when Kings Of Leon was cool? Remember when they looked like Porny Southern Mechanics? So do we. What if every artist you got in on before they broke big paid you a share of their success? I mean you invested your ears. Now invest your mine.</span></p>
    </div>
    <div className="section__img">
      <div className="section__img-inner">
        <video autoPlay loop>
          <source src="/drumkit.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
      </video>
      </div>
    </div>
    <div className="section__more">
      <div className="section__more-inner section__more-inner--bg1">
        <span className="section__more-text">Want to know more?</span>
        <a href="#" className="section__more-link">
          <span className="section__more-linktext">Sign up for exclusive access to our beta</span>
          <svg className="icon icon--arrowlong"><use xlinkHref="#icon-arrowlong"></use></svg>
        </a>
      </div>
    </div>
    <div className="section__expander"></div>
    <ul className="section__facts">
      <li className="section__facts-item">
        <h3 className="section__facts-title">White Paper</h3>
        <span className="section__facts-detail">$ingle, our cryptocurrency</span>
      </li>
      <li className="section__facts-item">
        <h3 className="section__facts-title">Partnerships</h3>
        <span className="section__facts-detail">From indie labels and unsigned artists to top performers</span>
      </li>
      <li className="section__facts-item">
        <h3 className="section__facts-title">Coinbase Exchange Platform</h3>
        <span className="section__facts-detail">Check the current market price</span>
      </li>
      <li className="section__facts-item section__facts-item--clickable" data-gallery="gallery1">
        <div className="section__facts-img">
          <svg className="icon icon--grid"><use xlinkHref="#icon-grid"></use></svg>
        </div>
        <h3 className="section__facts-title">Recently Signed Artists</h3>
        <span className="section__facts-detail">Check it out</span>
      </li>
    </ul>
      <RecentlyJoinedArtists />
  </section>
)