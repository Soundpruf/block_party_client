import React, { Component } from 'react'
import { Card, Grid, Menu, Icon, Image } from 'semantic-ui-react'
import { Firebase, MusicRef, PhotoRef } from '../Firebase'
import { Link } from 'react-router-dom'
import FooterPlayer from './Players/FooterPlayer'
import Axios from 'axios'
import Sound from 'react-sound'
import './Pulse.css'


export default class Browse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            activeSong: "",
            test_link: '',
            streaming: false
        }
    }


    componentDidMount() {
        const all_audio = document.querySelectorAll('.card .item-media > audio')
        const songsList = JSON.parse(localStorage.getItem('blockPartySongs'))
        const songs = []

        songsList.forEach((song) => {

            MusicRef.child(song.url).getDownloadURL().then((url) => {

                let enriched_song = song
                const xhr = new XMLHttpRequest()

                xhr.onload = (event) => {

                    const blob = xhr.response
                    enriched_song.blob_url = URL.createObjectURL(blob)
                    songs.push(enriched_song)

                    this.setState({
                        songs: songs
                    })
                }

                xhr.open('GET', url)
                xhr.responseType = 'blob'
                xhr.send()

            })
        })

    }
    handleEndOfStreaming(element) {
        console.log(element)
        this.setState({
            streaming: false
        })
    }
    handlePlay(song, e) {
        console.log(song)
        console.log(e)

        this.setState({
            streaming: true,
            activeSong: song
        })

    }
    handleDuration(element) {

        const _this = this
        const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/mine' : process.env.REACT_APP_STAGING_API + 'mine'
        let counter = 0
        let user = JSON.parse(localStorage.getItem('currentUser'))


        console.log(this.state.activeSong.artist)

        if (this.state.streaming) {
            // setInterval(() => {
            //     counter ++
            //     console.log('Im playing. Counter: ' + counter)
            // }, 1000)

            Axios({
                method: 'post',
                url: URL,
                'data': {
                    'artist_id': _this.state.activeSong.artist.id,
                    'user_id': user.id
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
    }
    handleRef(element) { }

    render() {


        return (
            <div id="Browse">
                <Menu pointing secondary id='SiteNav'>
                    <Menu.Item className='siteLogo'>
                        <Link to='/'>
                            <img src="/images/logo.png" alt="." className="" align='center' height='30px' width='30px' style={{ marginRight: '10px' }} />
                            <span className="hidden-folded inline">Block Party</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item><Link to='/about'><span> About</span></Link></Menu.Item>
                    <Menu.Item><Link to='/browse'><span>Browse</span></Link></Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item><Link to='/login'><span> Log In</span></Link></Menu.Item>
                        <Menu.Item><Link to='/logout'><span> Log Out</span></Link></Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div id="aside" className="app-aside modal fade nav-dropdown">

                    <div className="left navside grey dk" data-layout="column">

                        <div data-flex className="hide-scroll">
                            <nav className="scroll nav-stacked nav-active-primary">

                                <ul className="nav" data-ui-nav>
                                    <li className="nav-header hidden-folded">
                                        <span className="text-xs text-muted">Main</span>
                                    </li>
                                    <li>
                                        <a href="player.html">
                                            <span className="nav-icon">
                                                <Icon name='headphone' />
                                            </span>
                                            <span className="nav-text">Discover</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="browse.html">
                                            <span className="nav-icon">
                                                <Icon name='sort' />
                                            </span>
                                            <span className="nav-text">Browse</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="chart.html">
                                            <span className="nav-icon">
                                                <Icon name='line graph' />
                                            </span>
                                            <span className="nav-text">Charts</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="artist.html">
                                            <span className="nav-icon">
                                                <Icon name='music' />
                                            </span>
                                            <span className="nav-text">Artist</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="modal" data-target="#search-modal">
                                            <span className="nav-icon">
                                                <Icon name='search' />
                                            </span>
                                            <span className="nav-text">Search</span>
                                        </a>
                                    </li>


                                    <li className="nav-header hidden-folded m-t">
                                        <span className="text-xs text-muted">Your collection</span>
                                    </li>
                                    <li>
                                        <a href="profile.html#tracks">
                                            <span className="nav-label">
                                                <b className="label">8</b>
                                            </span>
                                            <span className="nav-icon">
                                                <Icon name='list' />
                                            </span>
                                            <span className="nav-text">Tracks</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="profile.html#playlists">
                                            <span className="nav-icon">
                                                <Icon name='heart' />
                                            </span>
                                            <span className="nav-text">Playlists</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="profile.html#likes">
                                            <span className="nav-icon">
                                                <Icon name='thumbs outline up' />
                                            </span>
                                            <span className="nav-text">Likes</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>



                <div id="content" className="app-content white bg box-shadow-z2" role="main">
                    <div className="app-body" id="view">
                        <div className="page-content">
                            <div className="row-col">
                                <div className="col-lg-9 b-r no-border-md">
                                    <div className="padding">
                                        <div data-ui-jp="jscroll" className="jscroll-loading-center">
                                            <Grid>
                                                <Grid.Row columns={5}>
                                                    {this.state.songs.map((song) => (
                                                        <Grid.Column>
                                                            <Card className="item r">
                                                                <img src={song.artist.photo} />
                                                                <div className="item-media">
                                                                    <audio ref={this.handleRef.bind(this)} controls onPlay={this.handlePlay.bind(this, song)} onPlaying={this.handleDuration.bind(this)} onEnded={this.handleEndOfStreaming.bind(this)} onPause={this.handleEndOfStreaming.bind(this)}>
                                                                        <source src={song.blob_url} type="audio/mp3" />
                                                                        Your browser does not support the audio tag.
                                                                    </audio>
                                                                    <div className="item-overlay center">
                                                                        <button className="btn-playpause">Play</button>
                                                                    </div>
                                                                </div>
                                                                <div className="item-info">
                                                                    <div className="item-overlay bottom text-right">
                                                                        <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                                        <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                                        <div className="dropdown-menu pull-right black lt"></div>
                                                                    </div>
                                                                    <div className="item-title text-ellipsis">
                                                                        <a href="track.detail.html">{song.name}</a>
                                                                    </div>
                                                                    <div className="item-author text-sm text-ellipsis ">
                                                                        <a href="artist.detail.html" className="text-muted">{song.artist.name}</a>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </Grid.Column>

                                                    ))}
                                                </Grid.Row>
                                            </Grid>

                                            <div className="text-center">
                                                <a href="scroll.item.html" className="btn btn-sm white rounded jscroll-next">Show More</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-3 w-xxl w-auto-md">
                                    <div className="padding" data-ui-jp="stick_in_parent">
                                        <h6 className="text text-muted">5 Likes</h6>
                                        <div className="row item-list item-list-sm m-b">
                                            <div className="col-xs-12">
                                                <div className="item r" data-id="item-6" data-src="http://api.soundcloud.com/tracks/236107824/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                                    <div className="item-media ">
                                                        <a href="track.detail.html" className="item-media-content"></a>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title text-ellipsis">
                                                            <a href="track.detail.html">Body on me</a>
                                                        </div>
                                                        <div className="item-author text-sm text-ellipsis ">
                                                            <a href="artist.detail.html" className="text-muted">Rita Ora</a>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="item r" data-id="item-8" data-src="http://api.soundcloud.com/tracks/236288744/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                                    <div className="item-media ">
                                                        <a href="track.detail.html" className="item-media-content"></a>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title text-ellipsis">
                                                            <a href="track.detail.html">Simple Place To Be</a>
                                                        </div>
                                                        <div className="item-author text-sm text-ellipsis ">
                                                            <a href="artist.detail.html" className="text-muted">RYD</a>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="item r" data-id="item-5" data-src="http://streaming.radionomy.com/JamendoLounge">
                                                    <div className="item-media ">
                                                        <a href="track.detail.html" className="item-media-content"></a>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title text-ellipsis">
                                                            <a href="track.detail.html">Live Radio</a>
                                                        </div>
                                                        <div className="item-author text-sm text-ellipsis ">
                                                            <a href="artist.detail.html" className="text-muted">Radionomy</a>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                                    <div className="item-media ">
                                                        <a href="track.detail.html" className="item-media-content"></a>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title text-ellipsis">
                                                            <a href="track.detail.html">Spring</a>
                                                        </div>
                                                        <div className="item-author text-sm text-ellipsis ">
                                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <div className="item r" data-id="item-10" data-src="http://api.soundcloud.com/tracks/237514750/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                                    <div className="item-media ">
                                                        <a href="track.detail.html" className="item-media-content" ></a>
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-title text-ellipsis">
                                                            <a href="track.detail.html">The Open Road</a>
                                                        </div>
                                                        <div className="item-author text-sm text-ellipsis ">
                                                            <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="text text-muted">Go mobile</h6>
                                        <div className="btn-groups">
                                            <a href="" className="btn btn-sm dark lt m-r-xs" >
                                                <span className="pull-left m-r-sm">
                                                    <i className="fa fa-apple fa-2x"></i>
                                                </span>
                                                <span className="clear text-left l-h-1x">
                                                    <span className="text-muted text-xxs">Download on the</span>
                                                    <b className="block m-b-xs">App Store</b>
                                                </span>
                                            </a>
                                            <a href="" className="btn btn-sm dark lt">
                                                <span className="pull-left m-r-sm">
                                                    <i className="fa fa-play fa-2x"></i>
                                                </span>
                                                <span className="clear text-left l-h-1x">
                                                    <span className="text-muted text-xxs">Get it on</span>
                                                    <b className="block m-b-xs m-r-xs">Google Play</b>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="b-b m-y"></div>
                                        <div className="nav text-sm _600">
                                            <a href="#" className="nav-link text-muted m-r-xs">About</a>
                                            <a href="#" className="nav-link text-muted m-r-xs">Contact</a>
                                            <a href="#" className="nav-link text-muted m-r-xs">Legal</a>
                                            <a href="#" className="nav-link text-muted m-r-xs">Policy</a>
                                        </div>
                                        <p className="text-muted text-xs p-b-lg">&copy; Copyright 2016</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterPlayer />

            </div>
        )
    }
}
