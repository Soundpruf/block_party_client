import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import bodymovin from 'bodymovin'
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

    componentDidMount() {
        var animData = {
            wrapper: document.querySelector('#Loader'),
            animType: 'svg',
            loop: true,
            prerender: true,
            autoplay: true,
            path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json'
        };
        var anim = bodymovin.loadAnimation(animData);
        anim.setSpeed(1);
    }

    render() {
        const square = { width: 175, height: 175 }

        return (
            <div>
                <div className="dotstyle dotstyle-smalldotstroke">
                    <ul>
                        <li className="current"><Link to='/'>
                            <span> Home</span>
                        </Link></li>
                        <li className="current"><Link to='/about'>
                            <span> About</span>
                        </Link></li>
                        <li className="current"><Link to='/login'>
                            <span> Log In</span>
                        </Link></li>
                        <li className="current"><Link to='/signup'>
                            <span> Sign Up</span>
                        </Link></li>
                    </ul>
                </div>
                <div id="splash">
                    <div className='site_intro'>
                        <div className="header_content">
                            <h1>Block Party</h1>
                            <h3>The first Music Streaming Community on the Block</h3>
                        </div>
                        <svg id="logoAnimation" width="100" height="100" viewBox="0 0 300 300">
                            <defs>
                                <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse"
                                    x1="0" y1="300" x2="300" y2="0">
                                    <stop offset="0%">
                                        <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="100%">
                                        <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
                                    </stop>
                                </linearGradient>
                                <clipPath id="clip">
                                    <rect className="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
                                    <rect className="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
                                </clipPath>
                            </defs>
                            <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
                        </svg>

                    </div>

                    <div id="signUpMenu">
                        <Segment circular inverted style={square}>
                            <Header as='h2' inverted>
                                <Header.Subheader>
                                    Sign up as a
                            </Header.Subheader>
                                <Link to='/artists/signup'>Artists</Link>
                            </Header>
                        </Segment>
                        <Segment circular inverted style={square}>
                            <Header as='h2' inverted>
                                <Header.Subheader>
                                    Sign up as a
                            </Header.Subheader>
                                <Link to='/signup'>Listeners</Link>
                            </Header>
                        </Segment>

                    </div>
                </div>
                <Divider />

                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>"This will change the game"</Header>
                                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>"Oh Fuck"</Header>
                                <p style={{ fontSize: '1.33em' }}><Icon name='spy' /><b>The</b> Record Labels</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment inverted vertical style={{ padding: '5em 0em' }}>
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