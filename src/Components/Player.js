import React, {Component} from 'react'
import Sound from 'react-sound'

export default class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
           activeSong: '',
            soundIs_: 'STOPPED',
 
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
        return (
            <Card>
            <Image src={this.state.soundIs_ != 'PLAYING' ? '/tape-min.jpg' : ''} />

            <Sound
                url={this.active}
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
        )
    }
}