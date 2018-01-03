import React, { Component } from 'react'
import Axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Segment, Table, Button, Card, Image, Feed, List, Icon } from 'semantic-ui-react'
import Sound from 'react-sound'

import Amplitude from 'amplitudejs'


const Spotify = new SpotifyWebApi()

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

const FixedMenu = () => (
    <Menu fixed='top' size='large'>
        <Container>
            <Menu.Item className=''><Link to='/'><h1>Block Party</h1></Link></Menu.Item>
            <Menu.Menu position='right'>
                {menu_items}
            </Menu.Menu>
        </Container>
    </Menu>
)
const playlist = [
    {
        url: '/songs/Nikes.mp3',
        cover: 'spotify.jpeg',
        title: 'Nikes',
        artist: {
            name: 'Frank Ocean',
            id: 42
        }
    },
    {
        url: '/songs/Ivy.mp3',
        cover: 'spotify.jpeg',
        title: 'Ivy',
        artist: {
            name: 'Frank Ocean',
            id: 42
        }
    }
]

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_name: '',
            profile_photo: '',
            followers: 0,
            account_tier: '',
            platforms: [],
            top_tracks: [],
            top_artists: [],
            playlist: playlist,
            counter: 0,
            soundIs_: 'STOPPED',
            user_spotify_devices: []
        }
    }
    componentWillMount() {

    }
    syncSpotifyLoginWithBlockPartyAuth(spotify_user_data) {
        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/users/signup' : 'https://block-party-server.herokuapp.com/users/signup'
        
        // Firebase.auth().createUserWithEmailAndPassword(this.state.artist_email, this.state.artist_password)
        //   .then((response) => {
        //     console.log(response)
    
        //     Axios({
        //       method: 'post',
        //       url: URL,
        //       data: {
        //         artist_name: _this.state.artist_name,
        //         email: _this.state.artist_email,
        //         password: _this.state.artist_password
        //       }
        //     }).then((response) => {
        //       console.log(response)
        //       const artist_id = response.data.artist.id
    
        //       localStorage.setItem('artist_id', artist_id)
        //       console.log(localStorage.getItem('artist_id'))
    
        //       _this.sendVerificationEmail(artist_id)
    
        //     }).catch((error) => {
        //       console.log(error)
        //     })
    
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
    
        //   })
    }
    componentDidMount() {

        const hash = this.props.location.hash
        let queries = hash.replace(/^\?/, '').split('&')
        const accessToken = queries[0].replace('#access_token=', '')
        Spotify.setAccessToken(accessToken)

        this.getUserData(accessToken).then((response) => {
            console.log(response)

            const user_name = response.data.display_name
            const profile_photo = response.data.images[0].url
            const followers = response.data.followers.total
            const platforms = ['spotify']
            const account_tier = response.data.product

            const user_data = {
                user_name: user_name,
                profile_photo: profile_photo,
                followers: followers,
                platforms: platforms,
                account_tier: account_tier
            }

            this.syncSpotifyLoginWithBlockPartyAuth(user_data)

            this.setState({
                user_name: user_name,
                profile_photo: profile_photo,
                followers: followers,
                platforms: platforms,
                account_tier: account_tier
            })

        }).catch((err) => {
            console.log(err)
        })
        // opener.document.close()
        this.getUsersListeningData()

    }
    getUserData(accessToken) {
        
        this.setState({
            accessToken: accessToken
        })
        return Axios({ method: 'get', url: 'https://api.spotify.com/v1/me', headers: { 'Authorization': 'Bearer ' + accessToken } })
    }
    getUsersListeningData() {
        const _this = this
        Spotify.getMyTopTracks()
            .then((response) => {
                console.log(response)
                const songs = []
                response.items.splice(0, 10).forEach((song) => {
                    let _song = {}
                    _song.title = song.name
                    _song.artist = song.artists[0].name
                    _song.popularity = song.popularity
                    _song.photo = song.album.images[1].url
                    _song.url = song.preview_url
                    _song.uri = song.uri
                    songs.push(_song)
                })
                // ** Setting the state twice in a series of async calls seems messy
                _this.setState({
                    top_tracks: songs
                })

                Spotify.getMyTopArtists().then((response) => {
                    console.log(response)

                    const artists = []
                    response.items.splice(0, 10).forEach((artist) => {
                        let _artist = {}
                        _artist.title = artist.name
                        _artist.popularity = artist.popularity
                        _artist.followers = artist.followers.total
                        _artist.photo = artist.images[2].url
                        _artist.genres = artist.genres
                        artists.push(_artist)
                    })
                    _this.setState({
                        top_artists: artists
                    })
                }).catch((error) => {
                    console.log(error)
                })

                Spotify.getMyDevices((error, response) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(response)
                        _this.setState({
                            user_spotify_devices: response.devices
                        })
                    }
                })

            }).catch((error) => {
                console.log(error)

                // if (!error.withCredentials) {
                //     alert('Session has timed out please sign in again')
                //     _this.props.history.push('/')
                // }
            })
    }
    getCurrentlyPlaying() {

    }
 
    playSpotifyTrack(track) {
        console.log(track)
        
        
        // transferMyPlayback
        Spotify.play(
           { 
            headers: {'Authorization': `Bearer ${this.state.accessToken}`},
            data: {'uris': [track.uri]}
            })
        
        // this.setState({
        //     soundIs_: 'PLAYING',
        //     playlist: [track],
        //     counter: 0
        // })
    }
    playThatTrack() {
        const counter = this.state.counter
        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? '/mine' : 'https://block-party-server.herokuapp.com/mine'


        this.setState({
            soundIs_: 'PLAYING'
        })
        
        Axios({
            method: 'post',
            url: URL,
            data: {
               artist: _this.state.playlist[counter].artist,
                user_id: _this.state.user_name
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                alert(`Congrats! You're now mining on Block Party with a ${response.data.message}, you've earned ${response.data.transactions[0].amount} BlockNote`)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    pauseThatTrack() {
        this.setState({
            soundIs_: 'PAUSED'
        })
    }
    stopThatTrack() {
        this.setState({
            soundIs_: 'STOPPED'
        })
    }
    nextTrack() {

    }
    prevTrack() {

    }
    render() {
        // onLoading={this.handleSongLoading}
        //                             onPlaying={this.handleSongPlaying}
        //                             onFinishedPlaying={this.handleSongFinishedPlaying}

        const counter = this.state.counter
        return (
            <div>
                <FixedMenu />
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
                                        {this.state.account_tier}
                                    </Card.Meta>
                                    <Card.Description>

                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <List>
                                        <List.Item icon='users' content={`Followers: ${this.state.followers}`} />
                                        <List.Item icon='marker' content='Spotify' />
                                    </List>
                                </Card.Content>
                            </Card>

                        </Grid.Column>

                        <Grid.Column>
                            <Card>
                                <Image src={this.state.soundIs_ != 'PLAYING' ? '/tape-min.jpg' : this.state.playlist[counter].photo} />

                                <Sound
                                    url={this.state.playlist[counter].url}
                                    playStatus={this.state.soundIs_}
                                    playFromPosition={0 /* in milliseconds */}

                                />
                                <Card.Content>
                                    <Card.Header>
                                        <h1>
                                            {this.state.playlist[counter].title}, {this.state.playlist[counter].artist.name}
                                        </h1>
                                    </Card.Header>
                                    <div className="har-loader">
                                        <div className="har-sound-1"></div>
                                        <div className="har-sound-2"></div>
                                        <div className="har-sound-3"></div>
                                        <div className="har-sound-4"></div>
                                        <div className="har-sound-5"></div>
                                        <div className="har-sound-6"></div>
                                        <div className="har-sound-7"></div>
                                        <div className="har-sound-8"></div>
                                        <div className="har-sound-9"></div>
                                    </div>
                                    <Card.Description>
                                        <List>
                                            <Icon name='play' onClick={this.playThatTrack.bind(this)} />
                                            <Icon name='pause' onClick={this.pauseThatTrack.bind(this)} />
                                            <Icon name='stop' onClick={this.stopThatTrack.bind(this)} />
                                        </List>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user' />
                                        22 Likes
                                        </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column>
                            <Header as='h2'>Your Listening Portfolio</Header>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        Top Tracks
                                </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Feed>
                                        {this.state.top_tracks.map((track) => (
                                            <Feed.Event>
                                                <Feed.Label image={track.photo} />
                                                <Feed.Content>
                                                    <Feed.Date>
                                                        <List horizontal>
                                                            <List.Item icon='signal' content={track.popularity} />
                                                            <List.Item icon='play' onClick={this.playSpotifyTrack.bind(this, track)}/>
                                                        </List>
                                                    </Feed.Date>
                                                    <Feed.Summary>
                                                        {track.title} by <a>{track.artist}</a>
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        ))}

                                    </Feed>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        Top Artists
                                </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Feed>
                                        {this.state.top_artists.map((artist) => (
                                            <Feed.Event>
                                                <Feed.Label image={artist.photo} />
                                                <Feed.Content>
                                                    <Feed.Date>
                                                        <List horizontal>
                                                            <List.Item icon='signal' content={artist.popularity} />
                                                            <List.Item icon='signal' content={artist.followers} />
                                                        </List>
                                                    </Feed.Date>
                                                    <Feed.Summary>
                                                        <a>{artist.title}</a> <br />
                                                        <List>
                                                            {artist.genres.splice(0, 3).map((genre) => (
                                                                <List.Item icon='tag' content={genre} />
                                                            ))}

                                                        </List>
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        ))}

                                    </Feed>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}