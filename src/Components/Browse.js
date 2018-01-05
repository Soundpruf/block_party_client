import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'
import {Firebase, MusicRef, PhotoRef} from '../Firebase'
import Axios from 'axios'
import Sound from 'react-sound'

// const playlist = [
//     {
//         url: '/songs/Nikes.mp3',
//         cover: 'spotify.jpeg',
//         title: 'Nikes',
//         artist: 'Frank Ocean',
//         artist_id: 42
//     },
//     {
//         url: '/songs/Ivy.mp3',
//         cover: 'spotify.jpeg',
//         title: 'Ivy',
//         artist: 'Frank Ocean',
//         artist_id: 42
//     }
// ]


export default class Browse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            activeSong:"",
            test_link:''
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
            <Card.Group itemsPerRow={4}>
                {this.state.songs.map((song) => (
                    <audio controls>
                        <source src={song} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                ))}
            </Card.Group>
        )
    }
}
