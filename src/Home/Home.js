import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Intro } from './Intro'
import { Artists } from './Artists'
import { Listeners } from './Listeners'
import { Menu } from './Menu'
import '../css/Home.css'

export default class Home extends Component {
	state = {
		activeChild: 'intro',
		children: ['intro', 'artists', 'listeners'],
		launchMenu: false
	}
	launchMenu(e) {
		e.preventDefault()

		const menuScriptHelper = document.createElement('script')
		const menuScript = document.createElement('script')
		const body = document.querySelector('body')

		menuScriptHelper.src = 'home-menu-helper.js'
		menuScript.src = 'home-menu.js'

		[menuScriptHelper, menuScript].forEach((script) => {
			body.appendChild(script)
		})
		this.setState({launchMenu: true})
	}
	handleNextChild(currentChild) {
		const { children } = this.state
		const currentChildIndex = children.indexOf(currentChild)
		const nextActiveChild = children[currentChildIndex + 1]

		if (nextActiveChild != undefined) {
			this.setState({ activeChild: nextActiveChild })
		} else {

		}
	}
	handlePrevioustChild(currentChild) {
		const { children } = this.state
		const currentChildIndex = children.indexOf(currentChild)
		const previousActiveChild = children[currentChildIndex - 1]

		if (previousActiveChild != undefined) {
			this.setState({ activeChild: previousActiveChild })
		} else {

		}
	}
	render() {
		const { activeChild, launchMenu } = this.state
		const children = [
			{
				name: 'intro',
				component: <Intro title='intro' active={activeChild} />
			},
			{
				name: 'artists',
				component: <Artists title='artists' active={activeChild} />
			},
			{
				name: 'listeners',
				component: <Listeners title='listeners' active={activeChild} />
			}
		]
		const homeMenu = launchMenu ? <Menu /> : null

		return (
			<div id="HOME">
				<svg className="hidden">
					<symbol id="icon-arrow" viewBox="0 0 24 24">
						<title>arrow</title>
						<polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
					</symbol>
					<symbol id="icon-drop" viewBox="0 0 24 24">
						<title>drop</title>
						<path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" /><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
					</symbol>
					<symbol id="icon-menu" viewBox="0 0 24 13">
						<title>menu</title>
						<path d="M.75 1.515h22.498a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM23.248 5.265H8.168a.75.75 0 0 0 0 1.5h15.08a.75.75 0 0 0 0-1.5zM23.248 10.514H4.322a.75.75 0 0 0 0 1.5h18.926a.75.75 0 0 0 0-1.5z" />
					</symbol>
					<symbol id="icon-dot" viewBox="0 0 24 24">
						<title>dot</title>
						<path d="M11.5 9c-.69 0-1.28.244-1.768.732A2.41 2.41 0 0 0 9 11.5c0 .69.244 1.28.732 1.767A2.409 2.409 0 0 0 11.5 14c.69 0 1.28-.244 1.768-.733A2.408 2.408 0 0 0 14 11.5c0-.69-.244-1.28-.732-1.768A2.408 2.408 0 0 0 11.5 9z" />
					</symbol>
					<symbol id="icon-cross" viewBox="0 0 24 24">
						<title>cross</title>
						<path d="M11.449 11.962l-5.1 5.099a.363.363 0 1 0 .513.512L12 12.436l5.137 5.137a.361.361 0 0 0 .513 0 .363.363 0 0 0 0-.512l-5.099-5.1 5.102-5.102a.363.363 0 1 0-.512-.513L12 11.487l-5.141-5.14a.363.363 0 0 0-.513.512l5.103 5.103z" />
					</symbol>
					<symbol id="icon-arrowlong" viewBox="0 0 32 11">
						<title>arrow-long</title>
						<path d="M27.166.183a.619.619 0 0 0-.878 0 .619.619 0 0 0 0 .878l2.735 2.735H.768a.624.624 0 0 0 0 1.248h28.254L26.287 7.77a.619.619 0 0 0 0 .878.617.617 0 0 0 .441.183c.163 0 .32-.061.442-.183l3.796-3.796a.623.623 0 0 0-.005-.878L27.166.183z" />
					</symbol>
					<symbol id="icon-close" viewBox="0 0 24 24">
						<title>close</title>
						<path d="M21 4.565L19.435 3 12 10.435 4.565 3 3 4.565 10.435 12 3 19.435 4.565 21 12 13.565 19.435 21 21 19.435 13.565 12z" />
					</symbol>
					<symbol id="icon-navup" viewBox="0 0 50 50">
						<title>navup</title>
						<path d="M20.259 28.211l5.07-5.03 5.075 5.034a.36.36 0 0 0 .51 0 .356.356 0 0 0 0-.506l-5.323-5.28a.404.404 0 0 0-.135-.084.364.364 0 0 0-.384.08l-5.324 5.28a.356.356 0 0 0 0 .506c.141.14.37.14.51 0z" />
					</symbol>
					<symbol id="icon-navdown" viewBox="0 0 50 50">
						<title>navdown</title>
						<path d="M20.259 22.43l5.07 5.03 5.075-5.034a.36.36 0 0 1 .51 0c.14.14.14.366 0 .506l-5.323 5.28a.404.404 0 0 1-.135.084.364.364 0 0 1-.384-.081l-5.324-5.28a.356.356 0 0 1 0-.505c.141-.14.37-.14.51 0z" />
					</symbol>
					<symbol id="icon-grid" viewBox="0 0 24 24">
						<title>grid</title>
						<path d="M8.982 8.982h5.988v5.988H8.982zM0 0h5.988v5.988H0zM8.982 17.965h5.988v5.988H8.982zM0 8.982h5.988v5.988H0zM0 17.965h5.988v5.988H0zM17.965 0h5.988v5.988h-5.988zM8.982 0h5.988v5.988H8.982zM17.965 8.982h5.988v5.988h-5.988zM17.965 17.965h5.988v5.988h-5.988z" />
					</symbol>
				</svg>
				<main>
					<div className="sections">
						<header className="sections__header">
							<h1 className="title">BlockParty Beta</h1>
						</header>
						<nav className="menu">
							<ul className="menu__inner">
								<li className="menu__item"><Link to='/browse'><span>Browse</span></Link></li>
								<li className="menu__item"><Link to='/login'><span> Log In</span></Link></li>
								<li className="menu__item"><Link to='/logout'><span> Log Out</span></Link></li>
								<li className="menu__item"> <Link to='/users/signup'>Listener Sign Up</Link></li>
								<li className="menu__item"> <Link to='/artists/signup'>Artist Sign Up</Link></li>
							</ul>
							<div className="menu__toggle">
								<span className="menu__toggle-inner menu__toggle-inner--open">
									<svg className="icon icon--menu"><use xlinkHref="#icon-menu"></use></svg>
								</span>
								<span className="menu__toggle-inner menu__toggle-inner--close">
									<svg className="icon icon--close"><use xlinkHref="#icon-close"></use></svg>
								</span>
							</div>
						</nav>

						<div className="facts">
							<div className="facts__toggle">
								<span className="facts__toggle-inner facts__toggle-inner--more">
									<svg className="icon icon--dot"><use xlinkHref="#icon-dot"></use></svg>
									<span className="facts__toggle-text">More</span>
								</span>
								<span className="facts__toggle-inner facts__toggle-inner--less">
									<svg className="icon icon--cross"><use xlinkHref="#icon-cross"></use></svg>
									<span className="facts__toggle-text">Less</span>
								</span>
							</div>
							<button className="button-contentclose">
								<svg className="icon icon--close"><use xlinkHref="#icon-close"></use></svg>
							</button>
						</div>

						<div className="sections__index">
							<span className="sections__index-current">
								<span className="sections__index-inner">01</span>
							</span>
							<span className="sections__index-total">03</span>
						</div>

						<nav className="sections__nav">
							<button className="sections__nav-item sections__nav-item--prev" onClick={this.handlePrevioustChild.bind(this, activeChild)}>
								<svg className="icon icon--navup"><use xlinkHref="#icon-navup"></use></svg>
							</button>
							<button className="sections__nav-item sections__nav-item--next" onClick={this.handleNextChild.bind(this, activeChild)}>
								<svg className="icon icon--navdown"><use xlinkHref="#icon-navdown"></use></svg>
							</button>
						</nav>

						{children.map(child => child.component)}

					</div>
				</main>
			</div>
		)
	}
}



