import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Container, Card, Message, Segment, Step, Divider } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import { Firebase } from '../Firebase'
import { FirebaseAuth } from 'react-firebaseui'
import Axios from 'axios'

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/users/:user_id/profile/',
    signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        Firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/'
};


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }

    }
    componentDidMount() {
        
    }
    handleCustomLogIn(e) {
        e.preventDefault()
        
        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.email).then((user) => {
            console.log(user)

        })
        .catch((error) => {
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            
          })
    }
    handleEmail(e) {
        e.preventDefault()
        this.setState({
            email: e.target.value

        })
    }
    handlePassword(e) {
        e.preventDefault()
        this.setState({
            password: e.target.value

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
        );

    }


    handleCustomLogin(e) {
        e.preventDefault()
    }
    handleSpotifyLogin(e) {
        e.preventDefault()
        this.login()
    }
    render() {
        return (
            <Grid celled='internally'>
                <Container>
                    <Grid columns='equal'>
                        <Grid.Row >
                            <Grid.Column width={5}>
                                
                                    <Card>
                                        <Form size='large' onSubmit={this.handleCustomLogIn.bind(this)}>
                                            <Segment stacked>
                                                <Form.Input
                                                    onChange={this.handleEmail.bind(this)}
                                                    value={this.state.email}
                                                    fluid
                                                    icon='user'
                                                    iconPosition='left'
                                                    placeholder='E-mail address'
                                                />
                                                <Form.Input
                                                    onChange={this.handlePassword.bind(this)}
                                                    value={this.state.password}
                                                    fluid
                                                    icon='lock'
                                                    iconPosition='left'
                                                    placeholder='Password'
                                                    type='password'
                                                />
                                                <Button color='teal' fluid size='large'>Log In</Button>
                                            </Segment>
                                        </Form>
                                    </Card>
                                
                            </Grid.Column>

                            <Grid.Column width={5}>
                                
                                    <Card>
                                        <Image src='/spotify.jpeg' />
                                        <Card.Content>
                                            <Card.Header textAlign='center'>
                                                <Button basic color='green' onClick={this.handleSpotifyLogin.bind(this)}>Log in with Spotify</Button>
                                            </Card.Header>
                                            <Divider horizontal>Or</Divider>
                                            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()}/>
                                        </Card.Content>
                                    </Card>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Container>
            </Grid>
        )
    }
}