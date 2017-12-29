import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'

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
handleArtistName(e){
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
           
            <Form size='large'>
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
                  <Checkbox value={this.state.is_artist} label='Are you an Artist or Musician?' onChange={this.handleArtistCheckBox.bind(this)}/>
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