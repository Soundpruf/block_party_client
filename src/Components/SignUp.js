import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import {    
    Container, 
    Step, 
    Grid, 
    Button, 
    Card, 
    Icon, 
    Image,
    Divider,
    Header,
    List,
    Menu,
    Segment,
    Visibility,
    Form, 
    Message
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




export default class SignUp extends Component {
    constructor(props) {
        super(props)


    }
    componentDidMount() {

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
        );

    }


    handleCustomSignUp(e) {
        e.preventDefault()
    }
    handleSpotifyLogin(e) {
        e.preventDefault()
        this.login()
    }
    render() {
        return (

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
                            <Step.Description>This will be the 100% secure destination for your BlockNote Payouts</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='hand spock' />
                        <Step.Content>
                            <Step.Title>Confirm</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <Grid columns='equal'>
                    <Grid.Row stretched>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={6}>
                            <Card.Group>
                                <Card>
                                    <Image src='spotify.jpeg' />
                                    <Card.Content>
                                        <Card.Header>
                                            Sign In With Spotify
                                </Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green' onClick={this.handleSpotifyLogin.bind(this)}>Sign In</Button>
                                            <Button basic color='red'>Already Registered?</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Image src='https://images.unsplash.com/photo-1502179752592-b1d28abbb841?auto=format&fit=crop&w=1600&q=80' />
                                    <Card.Content>
                                        <Card.Header>
                                            Join the Block Party
                                </Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green' onClick={this.handleCustomSignUp.bind(this)}>Sign Up</Button>
                                            <Button basic color='red'>Already Registered?</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>

                        <Grid.Column width={2}></Grid.Column>

                    </Grid.Row>
                </Grid>
            </Container>


        )
    }
}