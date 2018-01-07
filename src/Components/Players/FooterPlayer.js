import React, {Component} from 'react'
import Sound from 'react-sound'
import Axios from 'axios'
import {List, Icon } from 'semantic-ui-react'

export default class FooterPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
           activeSong: '',
            soundIs_: 'STOPPED',
            counter: 0
 
        }
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
        // <h1>
        //     {this.state.playlist[counter].title}, {this.state.playlist[counter].artist}
        // </h1>
        return (

            <div id="FooterPlayer" className="app-footer app-player grey bg">
                 
                <Sound
                    url={this.state.activeSong ? this.state.activeSong.url : null}
                    playStatus={this.state.soundIs_}
                    playFromPosition={0 /* in milliseconds */}

                />
                <List>
                    <Icon name='play' onClick={this.playThatTrack.bind(this)} />
                    <Icon name='pause' onClick={this.pauseThatTrack.bind(this)} />
                    <Icon name='stop' onClick={this.stopThatTrack.bind(this)} />
                </List>
                <div className="playlist">
                    
                </div>
            </div>
            
        )
    }
}