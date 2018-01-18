import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import anime from 'animejs'
import charming from 'charming'
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
        const script = document.createElement('script')
        script.src = 'js/wordFx.js'
        document.querySelector('body').appendChild(script)
    }
    componentDidMount() {
        

        // class Slideshow {
        //     constructor(el) {
        //         this.DOM = {};
        //         this.DOM.el = el;
        //         this.DOM.slides = Array.from(document.querySelectorAll('.slide'));
        //         this.DOM.bgs = Array.from(document.querySelectorAll('.slide__bg'));
        //         this.DOM.words = Array.from(document.querySelector('.word'));
        //         this.slidesTotal = this.DOM.slides.length;
        //         this.current = 0;
        //         this.words = [];
        //         this.DOM.words.forEach((word, pos) => {
        //             this.words.push(new Word(word, effects[pos].options));
        //         });

        //         this.isAnimating = true;
        //         this.words[this.current].show(effects[this.current].show).then(() => this.isAnimating = false);
        //     }
        //     show(direction) {
        //         if (this.isAnimating) return;
        //         this.isAnimating = true;

        //         let newPos;
        //         let currentPos = this.current;
        //         if (direction === 'next') {
        //             newPos = currentPos < this.slidesTotal - 1 ? currentPos + 1 : 0;
        //         }
        //         else if (direction === 'prev') {
        //             newPos = currentPos > 0 ? currentPos - 1 : this.slidesTotal - 1;
        //         }

        //         this.DOM.slides[newPos].style.opacity = 1;
        //         this.DOM.bgs[newPos].style.transform = 'none';
        //         anime({
        //             targets: this.DOM.bgs[currentPos],
        //             duration: 600,
        //             easing: [0.2, 1, 0.3, 1],
        //             translateY: ['0%', direction === 'next' ? '-100%' : '100%'],
        //             complete: () => {
        //                 this.DOM.slides[currentPos].classList.remove('slide--current');
        //                 this.DOM.slides[currentPos].style.opacity = 0;
        //                 this.DOM.slides[newPos].classList.add('slide--current');
        //                 this.words[newPos].show(effects[newPos].show).then(() => this.isAnimating = false);
        //             }
        //         });

        //         this.words[newPos].hide();
        //         this.words[this.current].hide(effects[currentPos].hide).then(() => {

        //             this.current = newPos;
        //         });
        //     }
        // }




        // const effects = [
        //     {
        //         options: {
        //             shapeColors: ['#fff', '#dedede', '#8c8c8c', '#545454', '#000', '#dc2e2e']
        //         },
        //         hide: {
        //             lettersAnimationOpts: {
        //                 duration: 200,
        //                 delay: (t, i, total) => (total - i - 1) * 20,
        //                 easing: 'easeOutExpo',
        //                 opacity: {
        //                     value: [1, 0],
        //                     duration: 100,
        //                     delay: (t, i, total) => (total - i - 1) * 20,
        //                     easing: 'linear'
        //                 },
        //                 scale: [1, 0]
        //             }
        //         },
        //         show: {
        //             lettersAnimationOpts: {
        //                 duration: 400,
        //                 delay: (t, i) => i * 60,
        //                 easing: 'easeInExpo',
        //                 opacity: [0, 1],
        //                 scale: [0, 1]
        //             },
        //             shapesAnimationOpts: {
        //                 duration: 700,
        //                 delay: (t, i) => i * 40,
        //                 easing: 'easeOutExpo',
        //                 translateX: () => [0, anime.random(-20, 20)],
        //                 translateY: () => [0, anime.random(-400, 400)],
        //                 scale: () => [randomBetween(0.2, 0.6), randomBetween(0.2, 0.6)],
        //                 rotate: () => [0, anime.random(-16, 16)],
        //                 opacity: [
        //                     { value: 1, duration: 1, easing: 'linear' },
        //                     { value: 0, duration: 700, easing: 'easeOutQuad' }
        //                 ]
        //             }
        //         }
        //     }
        // ]
        // const slideshow = new Slideshow(document.querySelector('.slideshow'));
        // document.querySelector('.slidenav__item--prev').addEventListener('click', () => slideshow.show('prev'));
        // document.querySelector('.slidenav__item--next').addEventListener('click', () => slideshow.show('next'));
        // document.addEventListener('keydown', (ev) => {
        //     const keyCode = ev.keyCode || ev.which;
        //     if (keyCode === 37) {
        //         slideshow.show('prev');
        //     }
        //     else if (keyCode === 39) {
        //         slideshow.show('next');
        //     }
        // });
    }

    render() {
        const square = { width: 175, height: 175, color: 'white' }
        return (
            <div>
                <Menu pointing secondary id='SiteNav'>
                        <Menu.Item className='siteLogo'>
                            <Link to='/'>  
                                <img src="/images/logo.png" alt="." className="" align='center' height='30px' width='30px' style={{marginRight: '10px'}}/>
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
                <div className="slide" id="splash">
                    <div className="slide__bg slide__bg--6"></div>
                    <div className="p-a-lg site-intro">
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
                            <rect className="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
                        </svg>



                        <h1 className="word word--6">Block Party</h1>
                        <h3>The first Music Streaming Community on the Block</h3>
                        <div id="signUpMenu">

                            <Header as='h2' icon>
                                <Icon name='music' />
                                Sign up as an
                        <Header.Subheader color='white'>
                                    <Link to='/artists/signup'>Artists</Link>
                                </Header.Subheader>
                            </Header>

                            <Header as='h2' icon>
                                <Icon name='sound' />
                                Sign up as an
                        <Header.Subheader>
                                    <Link to='/users/signup'>Listener</Link>
                                </Header.Subheader>
                            </Header>
                        </div>

                    </div>
                </div>


                <div className="row-col">
                    <div className="col-sm-6">
                        <div className="black cover cover-gd brief" style={{ backgroundImage: 'url(/images/b1.jpg)' }}>
                            <div className="p-a-lg text-center">
                                <h3 className="">Music Listeners</h3>
                                <p className="text-muted text-md m-b-lg">Help break your favorite bands</p>
                                <Link to='/artists/signup' className="btn circle white m-b-lg p-x-md">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 black lt">
                        <div className="black cover cover-gd brief" style={{ backgroundImage: 'url(/images/b7.jpg)' }}>
                            <div className="p-a-lg text-center">
                                <h3 className="">Music Makers</h3>
                                <p className="text-muted text-md m-b-lg">Artists are getting paid again</p>
                                <Link to='/users/signup' className="btn circle white m-b-lg p-x-md">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-col dark-white">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="p-a-lg text-center">
                            <h3 className="display-4 m-y-lg">BlockParty is the first music platform that can honestly say it puts the Artist first.</h3>
                            <p className="text-muted text-md m-b-lg">With the advent of Blockchain technology we've created a platform where every second you listen to your favorite artist you're mining on the block. Here's what's incredible: It pays you and your artist. Remember when Kings Of Leon was cool? Remember when they looked like Porny Southern Mechanics? So do we. What if every artist you got in on before they broke big paid you a share of their success?         I mean you invested your ears. Now invest your mine.</p>
                            <a className="btn circle btn-outline b-black m-b-lg p-x-md">Learn More</a>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>


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