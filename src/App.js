import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import routes from './routes'
import './App.css'
import {
  Menu
} from 'semantic-ui-react'

class App extends Component {
    state= {activeItem: 'Home'}

  render() {
    const { activeItem } = this.state
    return (
      <BrowserRouter>
          <div>
          <Menu pointing secondary>
                    <Menu.Item active={activeItem === 'Home'}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/about'><span> About</span></Link>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item><Link to='/login'><span> Log In</span></Link></Menu.Item>
                    </Menu.Menu>
                </Menu>
            {routes}
          </div>
		  </BrowserRouter>
    );
  }
}

export default App;
