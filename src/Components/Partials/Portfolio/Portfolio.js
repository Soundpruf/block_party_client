import React, {Component} from 'react'
import { UTILS } from '../../../Utils/index'
import { List, Input, Menu, Segment, Feed } from 'semantic-ui-react'

const Streams = (props) => (
    <Feed>
        {Object.keys(props).map((stream) => (
            <Feed.Event>
                <Feed.Label>
                    <img src={stream.artist} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.

          <Feed.Date>3 days ago</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        ))}
    </Feed>
)
const TopArtists = (props) => (
    <Feed>
        {console.log(props)}
        {props.map((artist) => (
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
)

const TopTracks = (props) => (
    <Feed>
        {props.map((track) => (
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
)

export default class Portfolio extends Component {
    state = { activeItem: 'streams' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    

    render() {
        const { activeItem } = this.state
        const menu_items = Object.keys(this.props)
        const {streams, top_artists, top_tracks } = this.props
        const stream_data = UTILS.aggregateTotalListens(streams)
        console.log(stream_data)
        const setActiveSection = (active_section) => {
           if  (active_section === 'streams') {
            return <Streams streams={stream_data} /> 
           } else if (active_section === 'top-tracks') {
               return <TopTracks top_tracks={top_tracks} />
           } else {
            return <TopArtists top_artists={top_artists} />
           }
        }
        const section = setActiveSection(activeItem)
        console.log(section)

        return (
            <div>
                <Menu attached='top' tabular>
                    {menu_items.map((item) => (
                        <Menu.Item name={item} active={activeItem === item} onClick={this.handleItemClick} />
                    ))}
                    
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input transparent icon={{ name: 'search', link: true }} placeholder='Search users...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment stacked attached='bottom'>
                    {section}
                </Segment>
            </div>
        )
    }
}