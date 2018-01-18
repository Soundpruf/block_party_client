import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Word, randomBetween, Slideshow } from '../wordFx'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'



export default class Home extends Component {
    state = { activeItem: 'Home' }

    componentWillMount() {

    }
    componentDidMount() {

        const slideshow = new Slideshow(document.querySelector('.slideshow'))


    }

    render() {
        const square = { width: 175, height: 175, color: 'white' }
        return (
            <div>
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
                <div className="slideshow" id="splash">
                    <div className="slide">
                        <div className="slide__bg slide__bg--6"></div>
                        <h1 className="word word--6">BLOCK PARTY</h1>

                        <div id="signUpMenu">
                            <h3>The first Music Streaming Community on the Block</h3>
                            <p>With the advent of Blockchain technology we've created a platform where every second you listen to your favorite artist you're mining on the block. Here's what's incredible: It pays you and your artist.</p>
                        </div>

                    </div>
                </div>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="brief-info">
                                <h2 className="">Music Listeners</h2>
                                <p className="text-muted text-md m-b-lg">Help break your favorite bands</p>
                                <p className=""> Remember when Kings Of Leon was cool? Remember when they looked like Porny Southern Mechanics? So do we. What if every artist you got in on before they broke big paid you a share of their success?         I mean you invested your ears. Now invest your mine.</p>

                                <Header as='h3' icon>
                                    <Icon name='sound' />
                                    Sign up as an
                                        <Header.Subheader>
                                        <Link to='/users/signup'>Listener</Link>
                                    </Header.Subheader>
                                </Header>
                            </div>

                        </Grid.Column>
                        <Grid.Column>
                            <div className="brief-info">
                                <h2 className="">Music Makers</h2>
                                <p className="text-muted text-md m-b-lg">You're getting paid again</p>
                                <p>BlockParty is the first music platform that can honestly say it puts the Artist first.</p>
                                <Header as='h3' icon>
                                    <Icon name='music' />
                                    Sign up as an
                                        <Header.Subheader color='white'>
                                        <Link to='/artists/signup'>Artists</Link>
                                    </Header.Subheader>
                                </Header>
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
 

                <Segment inverted vertical style={{ padding: '5em 0em' }} id="footer">
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About' />
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services' />
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>Footer Header</Header>
                                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        )
    }
}



// <Visibility
// onBottomPassed={this.showFixedMenu}
// onBottomVisible={this.hideFixedMenu}
// once={false}
// >
// <Segment
//     inverted
//     textAlign='center'
//     id="splash"
//     style={{ minHeight: 800, padding: '1em 0em' }}
//     vertical
// >
//     <Container text>

//         <Header
//             as='h1'
//             content='Block Party'
//             inverted
//             style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em', color: 'black' }}
//         />
//         <Header
//             as='h2'
//             content='The first streaming platform on the Block'
//             inverted
//             style={{ fontSize: '1.7em', fontWeight: 'normal', color: 'black' }}
//         />
//         <div id="signUpMenu">
//             <Button>
//                 <Link to='/artists/signup'>Artists</Link>
//             </Button>
//             <Button>
//                 <Link to='/signup'>Listeners</Link>
//             </Button>
//         </div>
//     </Container>
// </Segment>
// </Visibility>

// <Segment style={{ padding: '5em 0' }} vertical>
// <Grid celled='internally' columns='equal' stackable>
//     <Grid.Row textAlign='left'>
//         <Grid.Column style={{ padding: '5em', }} className="artist_first">
//             <Header className="title_bg" as='h3' style={{ fontSize: '2em' }}>Artist First</Header>
//             <Image
//                 bordered
//                 rounded
//                 size='medium'
//                 src='neon-min.jpg' />

//             <p style={{ margin: '20px' }}>BlockParty is the first music platform that can honestly say it puts the Artist first.</p>
//             <Button size='huge'>Check Us Out</Button>
//         </Grid.Column>
//         <Grid.Column style={{ padding: '5em', }} className="listen_and_earn">
//             <Header className="title_bg" as='h3' style={{ fontSize: '2em' }}>Listen and Earn</Header>
//             <Image
//                 bordered
//                 rounded
//                 size='medium'
//                 src='headphones-min.jpg' />

//             <p style={{ margin: '20px' }}>
//                 With the advent of Blockchain technology we've created a platform where every second you listen to your favorite artist you're mining on the block. Here's what's incredible: It pays you and your artist.
//         Remember when Kings Of Leon was cool? Remember when they looked like Porny Southern Mechanics? So do we. What if every artist you got in on before they broke big paid you a share of their success?
//         I mean you invested your ears. Now invest your mine.
//     </p>
//         </Grid.Column>
//     </Grid.Row>
// </Grid>
// </Segment>
// <Segment style={{ padding: '0em' }} vertical>
// <Grid celled='internally' columns='equal' stackable>
//     <Grid.Row textAlign='center'>
//         <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>"This will change the game"</Header>
//             <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
//         </Grid.Column>
//         <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>"Oh Fuck"</Header>
//             <p style={{ fontSize: '1.33em' }}><Icon name='spy' /><b>The</b> Record Labels</p>
//         </Grid.Column>
//     </Grid.Row>
// </Grid>
// </Segment>

//