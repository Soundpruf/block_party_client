import React, {Component} from 'react'
import bodymovin from 'bodymovin'

export default class Loader extends Component {
    componentDidMount(){
        var animData = {
            wrapper: document.querySelector('#Loader'),
            animType: 'svg',
            loop: true,
            prerender: true,
            autoplay: true,
            path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json'
        };
        var anim = bodymovin.loadAnimation(animData);
        anim.setSpeed(3.4);
    
    
    
    }
    render() {
        return (
            <div id="Loader"></div>
        )
    }

}