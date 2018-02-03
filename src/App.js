import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {Splash} from './Components/Splash'
import routes from './routes'
// import './Components/Pulse.css'
import './App.css'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            removeSplash: false
        }
    }

    componentWillMount() {}
    componentDidMount() {}

    removeSplash() {
        const splash = document.getElementById('Splash')
        splash.style.display = 'none'
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Splash enterSite={this.removeSplash.bind(this)}/>
                    {routes}
                </div>
            </BrowserRouter>
        )
    }
}

export default App
