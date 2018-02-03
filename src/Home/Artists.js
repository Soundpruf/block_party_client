import React from 'react'

export const Artists = (props) => (
  <section className={`section ${props.active === props.title ? 'section--current' : ''}`}>
    <div className="section__content">
      <h2 className="section__title">Artists</h2>
      <p className="section__description"><span className="section__description-inner">You're getting paid again</span></p>
    </div>
    <div className="section__img">
      <div className="section__img-inner"></div>
    </div>
    <div className="section__more">
      <div className="section__more-inner section__more-inner--bg2">
        <span className="section__more-text">Want to know more?</span>
        <a href="#" className="section__more-link">
          <span className="section__more-linktext">Sign up for the beta!</span>
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
        <img src="img/thumb1.jpg" alt="Some image" />
        <svg className="icon icon--grid"><use xlinkHref="#icon-grid"></use></svg>
      </div>
      <h3 className="section__facts-title">Recently Signed Artists</h3>
      <span className="section__facts-detail">Check it out</span>
    </li>
  </ul>
    <div className="section__gallery" id="gallery2">
      <h3 className="section__gallery-item section__gallery-item--title">More impressions</h3>
      <a className="section__gallery-item" href="#"><img src="img/thumb5.jpg" alt="Some image" /></a>
      <a className="section__gallery-item" href="#"><img src="img/thumb6.jpg" alt="Some image" /></a>
      <a className="section__gallery-item" href="#"><img src="img/thumb1.jpg" alt="Some image" /></a>
      <a className="section__gallery-item" href="#"><img src="img/thumb2.jpg" alt="Some image" /></a>
      <a className="section__gallery-item" href="#"><img src="img/thumb3.jpg" alt="Some image" /></a>
      <a className="section__gallery-item" href="#"><img src="img/thumb4.jpg" alt="Some image" /></a>
    </div>
  </section>
)