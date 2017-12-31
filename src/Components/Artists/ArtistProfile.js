import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Segment, Table, Button, Card, Image, Feed, List, Icon } from 'semantic-ui-react'
import Firebase from '../../Firebase'
import Axios from 'axios'
import OnboardArtist from './ArtistPartials/OnboardArtist'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
        

        }
    }
    componentDidMount() {
        this.getCurrentArtist()

    }
    componentWillMount() {

    }
    getCurrentArtist() {

        const _this = this
        const artist_id = localStorage.getItem('artist_id')
        console.log(artist_id)
        const URL = process.env.NODE_ENV === 'development' ? `http://localhost:5000/artists/${artist_id}/onboard` : `https://block-party-server.herokuapp.com/artists/${artist_id}/onboard`

        Axios.get(URL).then((response) => {
            console.log(response)
            this.setState(response.data)
        }).catch((error) => {
            console.log(error)
        })

    }

    render() {
        
        const counter = this.state.counter
        return (
            <div>

                <Container style={{ padding: '5em 0em', marginTop: '40px' }}>
                    <OnboardArtist />
                </Container>
            </div>
        )
    }
}