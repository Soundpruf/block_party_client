import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import Firebase from '../../Firebase'
import Axios from 'axios'

export default class ArtistSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      is_artist: false,
      artist_email: '',
      artist_password: '',
      artist_name: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const _this = this
    const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/artists/signup' : 'https://block-party-server.herokuapp.com/artists/signup'
    Firebase.auth().createUserWithEmailAndPassword(this.state.artist_email, this.state.artist_password)
      .then((response) => {
        console.log(response)

        Axios({
          method: 'post',
          url: URL,
          data: {
            artist_name: _this.state.artist_name,
            email: _this.state.artist_email,
            password: _this.state.artist_password
          }
        }).then((response) => {
            console.log(response)
            const artist_id = response.data.artist.id

            localStorage.setItem('artist_id', artist_id)
            console.log(localStorage.getItem('artist_id'))
            
            _this.sendVerificationEmail(artist_id)

        }).catch((error) => {
          console.log(error)
        })

      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;

      })
  }
  sendVerificationEmail(artist_id) {

    const _this = this
    let user = Firebase.auth().currentUser

    user.sendEmailVerification().then(() => {
      console.log('email sent')
      _this.props.history.push(`${artist_id}/profile`)
    }).catch((error) => {
      console.log(error)
    })
    
  }
  handleArtistCheckBox(e) {
    e.preventDefault()

    console.log(e.target)
    this.setState({
      is_artist: true
    })
  }
  handleArtistEmail(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_email: e.target.value
    })
  }
  handleArtistPassword(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_password: e.target.value
    })
  }
  handleArtistName(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_name: e.target.value
    })
  }
  render() {

    return (
      <div id='ArtistSignUp'>
        <Header
          as='h1'
          content='Block Party'
          textAlign='center'
          inverted
          style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em', color: 'white' }}
        />
        <Header as='h2' color='teal' textAlign='center'>
          Join the first streaming platform to put you first. Take your music back and your career to the next level
        </Header>

        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>

            <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
              <Segment stacked>
                <Header as='h2' color='teal' textAlign='center'>
                  Sign Up here. We'll handle the details later
            </Header>
                <Form.Input
                  onChange={this.handleArtistName.bind(this)}
                  value={this.state.artist_name}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Artist Name or Group Name'
                />
                <Form.Input
                  onChange={this.handleArtistEmail.bind(this)}
                  value={this.state.artist_email}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  onChange={this.handleArtistPassword.bind(this)}
                  value={this.state.artist_password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Segment compact>
                  <Checkbox value={this.state.is_artist} label='Are you an Artist or Musician?' onChange={this.handleArtistCheckBox.bind(this)} />
                </Segment>

                <Button color='teal' fluid size='large'>Create Account</Button>
              </Segment>
            </Form>
            <Message>
              <Header as='h2' color='teal' textAlign='center'>
                <em> With Streaming payouts that blow Spotify out of the water!</em>
              </Header>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
} 