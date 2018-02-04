import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { UTILS } from '../../../Utils/index'
import { List, Input, Menu, Segment, Feed, Image, Icon, Grid } from 'semantic-ui-react'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { renderChartData } from '../../../Data/chartData'
import PlatformBrief from './PlatformBrief'

const TopGenresChart = (props) => {
    const data = props.narrow_genre_data
    const labels = data.map((g_data) => g_data.name)
    const chart = new Chartist.Pie('.genre-chart', {
        series: data,
        labels: labels

    }, {
            chartPadding: 50,
            labelOffset: 50,
            labelDirection: 'explode',
            donut: true,
            width: 400,
            height: 400,
            // donutWidth: 500,
            donutSolid: true,
            // startAngle: 270,
            // total: 500,
            showLabel: true
        })

    return <div className="genre-chart"></div>
}
const TopArtistsChart = (props) => {
    const data = props.data
    const labels = data.map((artist_data) => artist_data.name)
    const chart = new Chartist.Pie('.artist-chart', {
        series: data,
        labels: labels

    }, {
            chartPadding: 50,
            labelOffset: 50,
            labelDirection: 'explode',
            donut: true,
            width: 400,
            height: 400,
            // donutWidth: 500,
            donutSolid: true,
            // startAngle: 270,
            // total: 200,
            showLabel: true
        })

    return <div className="artist-chart"></div>
}


const Streams = (props) => {
    const { stream_data, narrow_genre_data, analyzedStreamedData } = props
    return (
        <Grid columns={2} divided>
            <Grid.Row>
                <Grid.Column className="stream-column">
                    <Feed>
                        {Object.keys(stream_data).map((stream_object) => (
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon name='headphone' />
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        You've streamed {UTILS.convertTime(stream_data[stream_object].userTimeListened)} minutes of <a>{stream_object}</a>.
                                        <Feed.Date>Since {props.last_updated}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra images>
                                        <Link to='/'><Image circular={true} size='small' src={stream_data[stream_object].photo} />   </Link>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>
                        ))}
                    </Feed>
                </Grid.Column>
                <Grid.Column className="stream-column">
                    <div className="chart_container">
                        <h2 className="chart-data__header--genre">Genres</h2>
                        <TopGenresChart narrow_genre_data={narrow_genre_data} />
                        <h2 className="chart-data__header--artist">Artists</h2>
                        <TopArtistsChart data={analyzedStreamedData} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    )
}
const TopArtists = (props) => (
    <Feed>
        {props.top_artists.map((artist) => (
            <Feed.Event>
                <Feed.Label>
                    <Icon name='music' />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <a>{artist.title}</a> <br />
                        <Feed.Date>
                            <List horizontal>
                                <List.Item content={'Popularity: ' + artist.popularity} />
                                <List.Item content={'Followers: ' + artist.followers} />
                            </List>
                        </Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra images>
                        <Link to='/'><Image circular={true} size='small' src={artist.photo} /></Link>
                    </Feed.Extra>
                    <br />
                    <List horizontal>
                        {artist.genres.splice(0, 3).map((genre) => (
                            <List.Item icon='tag' content={genre} />
                        ))}
                    </List>
                </Feed.Content>
            </Feed.Event>
        ))}
    </Feed>
)

const TopTracks = (props) => (
    <Feed>
        {props.top_tracks.map((track) => (
            <Feed.Event>
                <Feed.Label>
                    <Icon name='music' />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Date>
                        <List horizontal>
                            <List.Item icon='signal' content={'Popularity: ' + track.popularity} />
                        </List>
                    </Feed.Date>
                    <Feed.Summary>
                        {track.title} by <a>{track.artist}</a>
                    </Feed.Summary>
                    <Feed.Extra images>
                        <Link to='/'><Image circular={true} size='small' src={track.photo} /></Link>
                        <Icon name='play' />
                    </Feed.Extra>
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
        const { last_updated } = this.props
        const menu_items = Object.keys(this.props)
        const { streams, top_artists, top_tracks } = this.props
        const stream_data = streams.length > 0 ? UTILS.aggregateTotalListens(streams) : []
        const narrow_genre_data = UTILS.analyzeUserGenres(top_artists).narrow_genre_data
        const analyzedStreamedData = streams.length > 0 ? UTILS.analyzeTopArtistListens(stream_data) : []

        const setActiveSection = (active_section) => {
            if (active_section === 'streams') {
                return <Streams stream_data={stream_data} narrow_genre_data={narrow_genre_data} analyzedStreamedData={analyzedStreamedData} last_updated={last_updated} />
            } else if (active_section === 'top_tracks') {
                return <TopTracks top_tracks={top_tracks} />
            } else if (active_section === 'top_artists') {
                return <TopArtists top_artists={top_artists} />
            }
        }
        const section = setActiveSection(activeItem)



        return (
            <div>
                <PlatformBrief />
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