import React, { Component } from 'react'
import Axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Segment, Table, Button, Card, Image, Feed, List, Icon } from 'semantic-ui-react'
import Sound from 'react-sound'
import {Firebase, MusicRef, PhotoRef} from '../Firebase'

const Spotify = new SpotifyWebApi()


const playlist = [
    {
        url: '/songs/Nikes.mp3',
        cover: 'spotify.jpeg',
        title: 'Nikes',
        artist: 'Frank Ocean',
        artist_id: 42
    },
    {
        url: '/songs/Ivy.mp3',
        cover: 'spotify.jpeg',
        title: 'Ivy',
        artist: 'Frank Ocean',
        artist_id: 42
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
            user_spotify_devices: [],
            userIsSignedIn_: false
        }
    }
    componentWillMount() {
        const isSignedIn = localStorage.getItem('userIsSignedIn?')
        if (isSignedIn) {
            this.setState({userIsSignedIn_: true})
        }
    }
    componentDidMount() {

        const hash = this.props.location.hash
        const queries = hash.replace(/^\?/, '').split('&')
        const accessToken = queries[0].replace('#access_token=', '')

        this.completeUserOnBoard(accessToken)

    }
    completeUserOnBoard(accessToken) {
        Spotify.setAccessToken(accessToken)
        this.getUserData(accessToken).then((response) => {
            console.log(response)

            const user_name = response.data.display_name
            const profile_photo = response.data.images[0].url
            const followers = response.data.followers.total
            const account_tier = response.data.product
            const email = response.data.email
            const spotify_platform = {
                name: 'Spotify',
                id: response.data.id,
                accessToken: accessToken

            }
            const platforms = [spotify_platform]
            const user_data = {
                user_name: user_name,
                profile_photo: profile_photo,
                email: email,
                followers: followers,
                platforms: platforms,
                account_tier: account_tier,
                accessToken: accessToken
            }
            if (!this.state.userIsSignedIn_) {
                this.syncSpotifyLoginWithBlockPartyOnBoard(user_data)
            }

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
        this.getUsersListeningData()
    }
    syncSpotifyLoginWithBlockPartyOnBoard(user_data) {

        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/users/signup' : 'https://block-party-server.herokuapp.com/users/signup'

        Firebase.auth().createUserWithEmailAndPassword(user_data.email, user_data.accessToken)
            .then((response) => {
                _this.sendVerificationEmail(() => {
                    Axios({
                        method: 'post',
                        url: URL,
                        data: {
                            platform: true,
                            platform_user: user_data
                        }
                    }).then((response) => {
                        
                        _this.setState({userIsSignedIn_: true})
                        localStorage.setItem('userIsSignedIn?', true)

                    }).catch((error) => {
                        console.log(error)
                    })
                })
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;

            })
    }
    sendVerificationEmail(callback) {
        const _this = this
        const user = Firebase.auth().currentUser

        user.sendEmailVerification().then(() => {
            callback()
        }).catch((error) => {
            console.log(error)
        })
    }
    getUserData(accessToken) {
        this.setState({ accessToken: accessToken })
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
            })
    }
    getCurrentlyPlaying() {

    }
    playSpotifyTrack(track) {
        console.log(track)

        this.setState({
            soundIs_: 'PLAYING',
            playlist: [track],
            counter: 0
        })
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
 
        const counter = this.state.counter
        let playSignal 
        if (this.state.soundIs_ === 'PLAYING') {
            playSignal = {
                display: 'flex'
            }
        } else {
            playSignal = {
                display: 'none'
            }
        }
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
                                <Card.Content textAlign='center'>
                                    <Card.Header>
                                        <h1>
                                            {this.state.playlist[counter].title}, {this.state.playlist[counter].artist}
                                        </h1>
                                    </Card.Header>
                                    <div className="har-loader" style={playSignal}>
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
                                                            <List.Item icon='play' onClick={this.playSpotifyTrack.bind(this, track)} />
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