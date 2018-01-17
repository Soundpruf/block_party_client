import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { UTILS } from '../../../Utils/index'
import { List, Input, Menu, Segment, Feed, Image, Icon } from 'semantic-ui-react'
import ChartistGraph from 'react-chartist'
import {renderGenreChartData} from '../../../Data/chartData'

const TopGenres = (props) => {
    const data = props.genre_data
    console.log(data)
    const labels = Object.keys(data.narrow_genre_data)
    const series = Object.values(data.narrow_genre_data)
    const chart_data = renderGenreChartData({
        labels:labels,
        series: series
    })
    
    return (
        <div>
            <ChartistGraph className={'ct-chart'} data={chart_data} type={'Pie'} />
        </div>
    )
}

const Streams = (props) => {
    let stream_data = props.stream_data
    return (
        <Feed>
            {Object.keys(stream_data).map((stream_object) => (
                <Feed.Event>
                    <Feed.Label>
                        <Icon name='headphone' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            You've streamed {UTILS.convertTime(stream_data[stream_object].userTimeListened)} minutes of <a>{stream_object}</a>.
                        <Feed.Date>Since [last listened]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra images>
                            <Link to='/'><Image circular={true} size='small' src={stream_data[stream_object].photo} />   </Link>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            ))}
        </Feed>
    )
}
const TopArtists = (props) => (
    <Feed>
        {console.log(props)}
        {props.top_artists.map((artist) => (
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
        {props.top_tracks.map((track) => (
            <Feed.Event>
                <Feed.Label image={track.photo} />
                <Feed.Content>
                    <Feed.Date>
                        <List horizontal>
                            <List.Item icon='signal' content={track.popularity} />
                            <List.Item icon='play' />
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
        const { streams, top_artists, top_tracks } = this.props
        const stream_data = streams.length > 0 ? UTILS.aggregateTotalListens(streams) : []
        const setActiveSection = (active_section) => {
            if (active_section === 'streams') {
                return <Streams stream_data={stream_data} />
            } else if (active_section === 'top_tracks') {
                return <TopTracks top_tracks={top_tracks} />
            } else if (active_section === 'top_artists') {
                return <TopArtists top_artists={top_artists} />
            }
        }
        const section = setActiveSection(activeItem)
        console.log(top_artists)
        const genre_data = UTILS.analyzeUserGenres(top_artists)
        
        return (
            <div>
                <TopGenres genre_data={genre_data} />
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