import React, { Component } from 'react'
// import SpotifyWebApi from 'spotify-web-api-js'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Segment, Table, Button, Card, Image, Feed, List, Icon } from 'semantic-ui-react'
import {Firebase} from '../../Firebase'
import Axios from 'axios'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_name: '',
            profile_photo: '',
            email: '',
            platforms: []

        }
    }
    componentDidMount() {
        this.getCurrentUser()

    }
    getCurrentUser() {

        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/users/signup' : 'https://block-party-server.herokuapp.com/users/signup'

        const initAuth = () => {
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user)
                    let platforms = user.providerData.map((platform) => platform.providerId)

                    Axios({
                        method: 'post',
                        url: URL,
                        data: {
                            user_name: user.displayName,
                            profile_photo: user.photoURL,
                            email: user.email,
                            platforms: platforms
                        }
                    }).then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            _this.setState({
                                user_name: user.displayName,
                                profile_photo: user.photoURL,
                                email: user.email,
                                platforms: platforms
                            })
                            alert(`Congrats! Welcome to Block Party!`)
                        }
                    }).catch((error) => {
                        console.log(error)
                    })

                } else {
                    // User is signed out.
                    console.log('No user is signed in')
                }
            }, function (error) {
                console.log(error);
            })
        }
        return initAuth()
    }

    render() {
        // {this.state.profile_photo}

        const counter = this.state.counter
        return (
            <div>

                <Container style={{ padding: '5em 0em', marginTop: '40px' }}>
                    <Grid columns={3}>

                        <Grid.Column >
                            <Card>
                                <Card.Content>
                                    <Image floated='right' size='mini' src={this.state.profile_photo} />
                                    <Card.Header>
                                        {this.state.user_name}
                                    </Card.Header>
                                    <Card.Meta>
                                        {this.state.email}
                                    </Card.Meta>
                                    <Card.Description>

                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <List>
                                        {this.state.platforms.map((platform) => (
                                            <List.Item icon='marker' content={platform} />
                                        ))}

                                    </List>
                                </Card.Content>
                            </Card>

                        </Grid.Column>



                    </Grid>
                </Container>
            </div>
        )
    }
}