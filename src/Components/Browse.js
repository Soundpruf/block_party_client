import React, { Component } from 'react'
import { Card, Grid, Menu, Icon } from 'semantic-ui-react'
import { Firebase, MusicRef, PhotoRef } from '../Firebase'
import Axios from 'axios'
import Sound from 'react-sound'
import './Pulse.css'


export default class Browse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            activeSong: "",
            test_link: ''
        }
    }


    componentDidMount() {
        let songsList = JSON.parse(localStorage.getItem('blockPartySongs'))
        console.log(songsList)

        const songs = []
        songsList.forEach((song) => {
            console.log(song)
            MusicRef.child(song).getDownloadURL().then((url) => {


                const xhr = new XMLHttpRequest()
                xhr.onload = (event) => {

                    const blob = xhr.response


                    console.log(blob)

                    const link = URL.createObjectURL(blob)
                    console.log(link)
                    songs.push(link)

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
    playSong(song) {
        this.setState({
            activeSong: song
        })
    }

    render() {
        // <a onClick={this.playSong.bind(this, song)}>SONG DOWNLOAD</a>
        //     <Sound
        //     url={this.state.activeSong}
        //     playStatus={this.state.soundIs_}
        //     playFromPosition={0 /* in milliseconds */}

        // />

        return (
            <div id="Browse">

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
                                                                <div className="item-media">
                                                                    <audio controls>
                                                                        <source src={song} type="audio/mp3" />
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
                                                                        <a href="track.detail.html">I Wanna Be In the Cavalry</a>
                                                                    </div>
                                                                    <div className="item-author text-sm text-ellipsis ">
                                                                        <a href="artist.detail.html" className="text-muted">Jeremy Scott</a>
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
                                    <div className="padding"  data-ui-jp="stick_in_parent">
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
            <div className="app-footer app-player grey bg">
                    <div className="playlist"></div>
                </div>
        </div>
                    )
    }
}
