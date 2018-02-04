import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import routes from './routes'
// import './Components/Pulse.css'
import './App.css'


class App extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {}
    componentDidMount() {}

    render() {
        return (
            <BrowserRouter>
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        )
    }
}

export default App
