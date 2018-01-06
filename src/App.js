import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import routes from './routes'
import './Components/Pulse.css'
import './App.css'
import {
    Menu
} from 'semantic-ui-react'

class App extends Component {
    state = { activeItem: 'Home' }

    componentWillMount() {

        let songsList = localStorage.getItem('blockPartySongs')
        console.log(songsList)

        if (songsList) {
            console.log(songsList)
        } else {
            localStorage.setItem('blockPartySongs', JSON.stringify([]))
        }

    }

    render() {
        const { activeItem } = this.state
        return (
            <BrowserRouter>
                <div>
                    <Menu pointing secondary id='SiteNav'>
                        <Menu.Item active={activeItem === 'Home'} className='siteLogo'>
                            <Link to='/'>  
                                <img src="/images/logo.png" alt="." className="" align='center' height='30px' width='30px' style={{marginRight: '10px'}}/>
                                <span className="hidden-folded inline">Block Party</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/about'><span> About</span></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/browse'><span>Browse</span></Link>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item><Link to='/login'><span> Log In</span></Link></Menu.Item>
                            <Menu.Item><Link to='/logout'><span> Log Out</span></Link></Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    {routes}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
