import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
// import LogRocket from 'logrocket'

// LogRocket.init('mattbu/block-party')
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
