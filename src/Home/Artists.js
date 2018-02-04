import React from 'react'
import { Link } from 'react-router-dom'
import{ RecentlyJoinedArtists } from './RecentlyJoinedArtists'

export const Artists = (props) => (
  <section className={`section ${props.active === props.title ? 'section--current' : ''}`}>
    <div className="section__content">
      <h2 className="section__title">Artists</h2>
      <p className="section__description"><span className="section__description-inner">You're getting paid again</span></p>
    </div>
    <div className="section__img">
    <div className="section__img-inner">
        <video autoPlay loop>
          <source src="/musicianVid.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
      </video>
      </div>
    </div>
    <div className="section__more">
      <div className="section__more-inner section__more-inner--bg2">
        <span className="section__more-text">Want to know more?</span>
          <Link to='/artists/signup' className="section__more-link">
            <span className="section__more-linktext">Sign up for the beta!</span>
            <svg className="icon icon--arrowlong"><use xlinkHref="#icon-arrowlong"></use></svg>
          </Link>
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