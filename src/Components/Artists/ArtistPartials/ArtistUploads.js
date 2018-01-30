import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Label, Segment, Button, Image, Icon } from 'semantic-ui-react'
import { Firebase, MusicRef, PhotoRef } from '../../../Firebase'
import Axios from 'axios'
import Dropzone from 'react-dropzone'
import '../../Pulse.css'


export default class ArtistUploads extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: ['pop', 'rap', 'jazz'],
            bio: '',
            songs: [],
            uploadedSongName: '',
            uploadedSong: {},
            uploadedSongPhoto: ''
        }
        this.handleSongNameInput = this.handleSongNameInput.bind(this)
        this.handleSongSubmit = this.handleSongSubmit.bind(this)
    }
    handleSongSubmit(e) {
        e.preventDefault()
        const _this = this
        let artist = JSON.parse(localStorage.getItem('currentUser'))
        const URL = process.env.NODE_ENV === 'development' ? `http://localhost:5000/artists/${artist.id}/songs/add` : `https://block-party-staging-server.herokuapp.com/` + `artists/${artist.id}/songs/add`

        Axios({
            method: 'post',
            url: URL,
            data: {
                artist: _this.state.artist_name,
                song: this.state.uploadedSong
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })

    }
    onDrop(music_files) {

        const _this = this
        music_files.forEach((file) => {

            // This creates the file path and reference in our Google Cloud Storage database
            let musicFileRef = MusicRef.child(`/${_this.state.uploadedSongName}`)

            let artist = JSON.parse(localStorage.getItem('currentUser'))
            console.log(artist)
            let song = {}

            song.name = this.state.uploadedSongName
            song.url = file.name
            song.photo = this.state.uploadedSongPhoto ? this.state.uploadedSongPhoto : this.state.profile_photo,
                song.artist = {
                    name: artist.artist_name,
                    id: artist.id,
                    photo: this.state.profile_photo,
                    wallet_address: artist.wallet_address
                }
            musicFileRef.put(file).then((snapshot) => {
                console.log(snapshot)

                _this.setState({
                    uploadedSong: song
                }, () => {
                    console.log("file uploaded!")
                })
            })
        })
    }
    onSongPhotoDrop(songPhoto) {
        console.log(songPhoto)
    }
    handleSongNameInput(e) {
        this.setState({ uploadedSongName: e.target.value })
    }
    render() {


        return (
            <div id="ArtistUploads">
                <Segment inverted color='red' tertiary className="artist_upload upload_music" raised>
                    <Form size='large' onSubmit={this.handleSongSubmit}>
                        <Input labelPosition='left' fluid type='text' placeholder='...'>
                            <Label basic><Icon name='music' /> Song Name:</Label>
                            <input value={this.state.uploadedSongName} onChange={this.handleSongNameInput} />
                        </Input>
                        <Input labelPosition='left' fluid type='text' placeholder='...'>
                            <Label basic><Icon name='music' /> Song File:</Label>
                            <Dropzone className="dropzone--song" onDrop={this.onDrop.bind(this)}></Dropzone>
                        </Input>
                        <Input labelPosition='left' fluid type='text' placeholder='...'>
                            <Label basic><Icon name='image' /> Song Photo:</Label>
                            <Dropzone className="dropzone--song" onDrop={this.onSongPhotoDrop.bind(this)}></Dropzone>
                        </Input>

                        <Button.Group floated='right' style={{ padding: '10px 40px' }}>
                            <Button compact size='medium' className="button button-cancel">Cancel</Button>
                            <Button.Or />
                            <Button compact size='medium' className="button button-upload" type='submit'>Save</Button>
                        </Button.Group>
                    </Form>
                </Segment>
            </div>
        )
    }
}