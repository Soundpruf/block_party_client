import React, { Component } from 'react'
import Axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Sidebar, Segment, Table, Button, Card, Image, Feed, List, Icon, Sticky, Rail } from 'semantic-ui-react'
import Sound from 'react-sound'
import { Firebase, MusicRef, PhotoRef } from '../Firebase'
import Loader from './Loader'
import Portfolio from './Partials/Portfolio/Portfolio'



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
            recent_tracks: [],
            playlist: playlist,
            counter: 0,
            soundIs_: 'STOPPED',
            user_spotify_devices: [],
            signInFlow: false,
            loginFlow: false,
            visible: true,
            spotifySynced: false,
            user_streams: [],
            contextRef: {}
        }
    }
    componentWillMount() {
        const paths = this.props.location.pathname.split('/')
        const hash = this.props.location.hash
        const queries = hash.replace(/^\?/, '').split('&')
        const accessToken = queries[0].replace('#access_token=', '')
        if (paths.includes('login')) {
            this.setState({
                loginFlow: true
            })

        } else if (paths.includes('signup')) {
            this.setState({
                signInFlow: true
            })
        }
        this.completeUserOnBoard(accessToken)
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

        if (prevState === this.state) {

        } else if (this.state.email != undefined) {
            const user_data = {
                user_name: this.state.user_name,
                profile_photo: this.state.profile_photo,
                email: this.state.email,
                followers: this.state.followers,
                platforms: this.state.platforms,
                account_tier: this.state.account_tier,
                accessToken: this.state.accessToken
            }
            if (this.state.loginFlow && !this.state.spotifySynced) {
                this.syncSpotifyLoginFlowWithBlockPartyOnBoard(user_data)
                // This line is so that I dont call the spotify recent tracks and database api's multiple times while the comopnent updates
                this.setState({ spotifySynced: true })
            } else if (this.state.signInFlow && !this.state.spotifySynced) {
                this.syncSpotifySignUpFlowWithBlockPartyOnBoard(user_data)
                // This line is so that I dont call the spotify recent tracks and database api's multiple times while the comopnent updates
                this.setState({ spotifySynced: true })
            }
        }
    }
    completeUserOnBoard(accessToken) {
        Spotify.setAccessToken(accessToken)
        this.getUserData(accessToken).then((response) => {

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
            this.setState({
                user_name: user_name,
                email: email,
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
    getUserData(accessToken) {
        this.setState({ accessToken: accessToken })
        return Axios({ method: 'get', url: 'https://api.spotify.com/v1/me', headers: { 'Authorization': 'Bearer ' + accessToken } })
    }
    getUsersListeningData() {
        const _this = this
        Spotify.getMyTopTracks()
            .then((response) => {
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
                    const artists = []
                    response.items.forEach((artist) => {
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
                    Spotify.getMyRecentlyPlayedTracks((error, response) => {
                        if (error) {
                            console.log(error)
                        } else {
                            const recent_tracks = []
                            response.items.forEach((recent_song) => {
                                let artist = recent_song.track.artists[0]
                                let _song = {
                                    name: recent_song.track.name,
                                    popularity: recent_song.track.popularity,
                                    spotify_id: recent_song.track.id,
                                    played_at: recent_song.played_at,
                                    duration: recent_song.track.duration_ms,
                                    artist: {
                                        name: artist.name,
                                        spotify_id: artist.id,
                                        photo: recent_song.track.album.images[2]
                                    }
                                }
                                recent_tracks.push(_song)
                            })
                            this.setState({
                                recent_tracks: recent_tracks
                            })
                        }
                    })
                    // ** GET-MY-TOP-ARTISTS: CATCH **
                }).catch((error) => {
                    console.log(error)
                })
                // ** GET-MY-TOP-TRACKS: CATCH **
            }).catch((error) => {
                console.log(error)
            })
    }

    // ---------- IF the user is logging in because they already exist in the database -------------- /**/
    syncSpotifyLoginFlowWithBlockPartyOnBoard(user_data) {
        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API + 'login' : process.env.REACT_APP_STAGING_API + 'login'
        Axios.post(URL, {
            data: {
                platform: true,
                spotify_login: true,
                platform_user: user_data
            }
        }).then((response) => {

            localStorage.setItem('currentUserLoggedIn', true)
            localStorage.setItem('currentUser', JSON.stringify(response.data.user))
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            console.log('log in flow user')
            console.log(currentUser)
            this.addRecentlyStreamedData(currentUser)

            if (process.env.NODE_ENV === 'development') {
                console.log('not executing Firebase sign in method')
            } else {
                Firebase.auth().signInWithEmailAndPassword(response.data.user.email, response.data.user.password)
                    .then((response) => {
                        console.log(response)
                    }).catch((error) => {
                        console.log(error)
                    })
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    // ---------- IF the user is signing up for the first time and going to be redirected to the dashboard -------------- /**/
    syncSpotifySignUpFlowWithBlockPartyOnBoard(user_data) {
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/users/signup' : process.env.REACT_APP_STAGING_API + 'users/signup'
        const _this = this
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
                        localStorage.setItem('currentUserLoggedIn', true)
                        localStorage.setItem('currentUser', JSON.stringify(response.data.new_user))
                        const currentUser = JSON.parse(localStorage.getItem('currentUser'))

                        console.log('sign in flow user')
                        console.log(currentUser)

                        this.addRecentlyStreamedData(currentUser)

                    }).catch((error) => {
                        console.log(error)
                    })
                })
            })
            .catch((error) => {
                console.log(error)
                if (error.code === "auth/email-already-in-use") {

                }
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
    addRecentlyStreamedData(currentUser) {
        console.log('running #addRecentlyStreamedData')
        const ADD_ARTIST = process.env.NODE_ENV === 'development' ? `http://localhost:5000/users/${currentUser.id}/stream/add-artists` : process.env.REACT_APP_STAGING_API + `users/${currentUser.id}/stream/add-artists`

        Axios.post(ADD_ARTIST, {
            data: {
                recent_tracks: this.state.recent_tracks
            }
        }).then((response) => {
            let streams = response.data
            this.setState({
                user_streams: streams
            })
        }).catch((err) => {
            console.log(err)
        })

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
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/mine' : process.env.REACT_APP_STAGING_API + 'mine'


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

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    handleContextRef = contextRef => {
        console.log(contextRef)
        this.setState({ contextRef: contextRef })
    }

    render() {
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
        const { visible, counter, top_tracks, top_artists, user_streams, contextRef } = this.state

        return (
            <div id='Dashboard' ref={this.handleContextRef}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='wide' visible={visible} icon='labeled' vertical inverted id='SideBarDashboard'>
                        <Menu.Item name='home'>
                            <Card>
                                <Card.Content>
                                    <Image floated='left' size='mini' src={this.state.profile_photo} />
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
                        </Menu.Item>
                        <Menu.Item name='Home'>
                            <Icon name='bar graph' />
                            Home
                            </Menu.Item>
                        <Menu.Item name='line graph'>
                            <Icon name='headphone' />
                            Browse
                            </Menu.Item>
                        <Menu.Item name='line graph'>
                            <Icon name='line graph' />
                            Trending
                            </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher >
                        <Container>
                            <Portfolio streams={user_streams} top_tracks={top_tracks} top_artists={top_artists} bank={'bank'} breakList={'break list'}/>
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}


// OLD PLAYER

// <Grid.Column>
// <Card>
//     <Image src={this.state.soundIs_ != 'PLAYING' ? '/tape-min.jpg' : this.state.playlist[counter].photo} />

//     <Sound
//         url={this.state.playlist[counter].url}
//         playStatus={this.state.soundIs_}
//         playFromPosition={0 /* in milliseconds */}

//     />
//     <Card.Content textAlign='center'>
//         <Card.Header>
//             <h1>
//                 {this.state.playlist[counter].title}, {this.state.playlist[counter].artist}
//             </h1>
//         </Card.Header>
//         <div className="har-loader" style={playSignal}>
//             <div className="har-sound-1"></div>
//             <div className="har-sound-2"></div>
//             <div className="har-sound-3"></div>
//             <div className="har-sound-4"></div>
//             <div className="har-sound-5"></div>
//             <div className="har-sound-6"></div>
//             <div className="har-sound-7"></div>
//             <div className="har-sound-8"></div>
//             <div className="har-sound-9"></div>
//         </div>
//         <Card.Description>
//             <List>
//                 <Icon name='play' onClick={this.playThatTrack.bind(this)} />
//                 <Icon name='pause' onClick={this.pauseThatTrack.bind(this)} />
//                 <Icon name='stop' onClick={this.stopThatTrack.bind(this)} />
//             </List>
//         </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//         <a>
//             <Icon name='user' />
//             22 Likes
//         </a>
//     </Card.Content>
// </Card>
// </Grid.Column>