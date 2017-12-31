import React, { Component } from 'react'
import Axios from 'axios'
import Firebase from '../Firebase'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import {    
    Container, 
    Step, 
    Grid, 
    Button, 
    Card, 
    Icon, 
    Image,
    Header,
    List,
    Menu,
    Segment,
    Divider,
    Visibility,
    Form, 
    Message,
    Checkbox
} from 'semantic-ui-react'

const site_routes = [
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/users/dashboard/:user_id',
        name: 'Dashboard'
    },
    {
        path: '/listen',
        name: 'Listen'
    }
]
const menu_items = site_routes.map((route) => (<Menu.Item className=''><Link to={`${route.path}`}>{route.name}</Link></Menu.Item>))
const FirebaseUI = require('firebaseui')
const UI = new FirebaseUI.auth.AuthUI(Firebase.auth())

const uiConfig = {
    signInSuccessUrl: '/users/:user_id/profile/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      Firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/'
  };

     
export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_email: '',
            user_password: '',
            is_listener: false,
            showLoader: false
        }

    }
    componentDidMount() {
        UI.start('#firebaseui-auth-container', uiConfig)

    }    
    handleListenertCheckBox(e) {
        e.preventDefault()

        this.setState({
            is_listener: true
        })
    }
    handleCustomSignUp(e) {
        e.preventDefault()
        
        // this.initAuth()
    }
    launchLoader(e) {
        e.preventDefault()
        this.setState({
            showLoader: true
        })
    }
    handleSpotifyLogin(e) {
        e.preventDefault()
        this.login()
    }
    handleUserName(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            user_name: e.target.value
        })
    }
    handleUserEmail(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            user_email: e.target.value
        })
    }

    handleUserPassword(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            user_password: e.target.value
        })
    }

    login(callback) {
        const CLIENT_ID = 'e86c9d8c7e084cf494d82947a0ea1252'
        const CLIENT_SECRET = '860af304d691469b9f73ed5cf7201fcc'
        const REDIRECT_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback/' : 'https://block-party-client.herokuapp.com/callback/'
        const scopes = [
            'user-read-currently-playing',
            'ugc-image-upload',
            'streaming',
            'playlist-read-private',
            'user-library-read',
            'user-read-private',
            'user-top-read'
        ]

        const getLoginURL = (the_scopes) => {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(the_scopes.join(' ')) +
                '&response_type=token';
        }
        const url = getLoginURL(scopes)
        let width = 450
        let height = 730
        let left = (window.width / 2) - (width / 2)
        let top = (window.height / 2) - (height / 2)

        const _win = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        )
        
    }
    render() {
        let LOADER
        if(this.state.showLoader) {
            LOADER = <Loader />
        }
        return (
            <div>
                {LOADER}
                 <Container>
                
                    <Menu inverted pointing secondary size='large' id="mainNav">
                        {menu_items}
                        <Menu.Menu position='right'>
                            <Menu.Item className='item'>
                                <Link to='/login'>Login</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/signup'>Sign up</Link>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                
                <Step.Group>
                    <Step active>
                        <Icon name='sign in' />
                        <Step.Content>
                            <Step.Title>Sign Up</Step.Title>
                            <Step.Description>Create and Account and Connect a Streaming Platform of your Choice</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step>
                        <Icon name='credit card alternative' />
                        <Step.Content>
                            <Step.Title>Create a Wallet</Step.Title>
                            <Step.Description>A 100% secure destination for your Payouts</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='hand spock' />
                        <Step.Content>
                            <Step.Title>Confirm</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>

                <Divider />

                <Grid columns='equal'>
                    <Grid.Row stretched>
                        <Grid.Column width={5}></Grid.Column>
                        
                        <Grid.Column width={5}>
                            <Segment stacked>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Sign Up here. We'll handle the details later
                                </Header>
                                <Card>
                                <Image src='spotify.jpeg' />
                                <Card.Content>
                                    <Card.Header>
                                        <Button basic color='green' onClick={this.handleSpotifyLogin.bind(this)}>Sign Up with Spotify</Button>
                                    </Card.Header>
                                    <Divider horizontal>Or</Divider>
                                    <div id='firebaseui-auth-container' onClick={this.launchLoader.bind(this)}></div>
                                </Card.Content>
                            
                            </Card>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>


            </div>
        )
    }
}

// <Grid.Column width={5}>
//                                 <Card>
//                                     <Form size='medium' onSubmit={this.handleCustomSignUp.bind(this)}>
//                                         <Segment stacked>
//                                             <Header as='h2' color='teal' textAlign='center'>
//                                             Sign Up here. We'll handle the details later
//                                         </Header>
//                                             <Form.Input
//                                                 onChange={this.handleUserName.bind(this)}
//                                                 value={this.state.user_name}
//                                                 fluid
//                                                 icon='user'
//                                                 iconPosition='left'
//                                                 placeholder='User Name or Group Name'
//                                             />
//                                             <Form.Input
//                                                 onChange={this.handleUserEmail.bind(this)}
//                                                 value={this.state.user_email}
//                                                 fluid
//                                                 icon='user'
//                                                 iconPosition='left'
//                                                 placeholder='E-mail address'
//                                             />
//                                             <Form.Input
//                                                 onChange={this.handleUserPassword.bind(this)}
//                                                 value={this.state.user_password}
//                                                 fluid
//                                                 icon='lock'
//                                                 iconPosition='left'
//                                                 placeholder='Password'
//                                                 type='password'
//                                             />
//                                             <Segment compact>
//                                                 <Checkbox value={this.state.is_listener} label='Are you an Artist or Musician?' onChange={this.handleListenertCheckBox.bind(this)}/>
//                                             </Segment>
                            
//                                             <Button color='teal' fluid size='large'>Create Account</Button>
//                                         </Segment>
//                                     </Form>
//                                 </Card>
//                         </Grid.Column>