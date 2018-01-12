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
            password: '',
            isArtist: false
        }

    }
    componentDidMount() {
        
    }
    handleCustomLogIn(e) {
        e.preventDefault()
        const _this = this
        const LOGIN_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : 'https://block-party-client.herokuapp.com/login'

        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            console.log(user)
            if (!user.isAnonymous) {
                Axios.post(LOGIN_URL, {
                    data: _this.state
                }).then((response) => {
                    console.log(response)
                    if (_this.state.isArtist && response.status === 200) {

                        localStorage.setItem('currentUserLoggedIn', true)
                        localStorage.setItem('currentUser', JSON.stringify(response.data.artist))

                        let artist_id = response.data.artist.id
                        _this.props.history.push(`/artists/${artist_id}/profile`)


                    } else if (!_this.state.isArtist && response.status === 200) {

                        localStorage.setItem('currentUserLoggedIn', true)
                        localStorage.setItem('currentUser', JSON.stringify(response.data.user))

                        let user_id = response.data.user.id
                        _this.props.history.push(`/artists/${user_id}/profile`)

                        
                    }
                }).catch((error) => {
                    console.log(error)
                    alert(error)
                })
            }
        })
        .catch((error) => {
            console.log(error)
            alert(error)            
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
    handleArtistCheckBox() {
        this.setState({
            isArtist: true
        })
    }
    login(callback) {
        const CLIENT_ID = 'e86c9d8c7e084cf494d82947a0ea1252'
        const CLIENT_SECRET = '860af304d691469b9f73ed5cf7201fcc'
        const REDIRECT_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login/callback/' : 'https://block-party-client.herokuapp.com/login/callback/'
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
                            <Grid.Column width={5}></Grid.Column>

                            <Grid.Column width={5}>
                                
                                    <Card>
                                        <Image src='/images/b7.jpg' />
                                        <Form size='large' onSubmit={this.handleCustomLogIn.bind(this)}>
                                                
                                                <Segment stacked>
                                                    <Segment compact style={{margin: 'auto'}}>
                                                        <Checkbox label='Are you an Artist or Musician?' onChange={this.handleArtistCheckBox.bind(this)} />
                                                    </Segment>
                                                    <br />
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
                                        <Card.Content>
                                            <Card.Header textAlign='center'>
                                                <Button basic color='green' onClick={this.handleSpotifyLogin.bind(this)}>Log in with Spotify</Button>
                                            </Card.Header>
                                            <Divider horizontal>Or</Divider>
                                            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()}/>
                                            <Divider horizontal>Or</Divider>
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