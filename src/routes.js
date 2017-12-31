import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import SignUp from './Components/SignUp'
import Listen from './Components/Listen'
import ArtistSignUp from './Components/Artists/ArtistSignUp'
import Profile from './Components/Artists/Profile'
import ArtistProfile from './Components/Artists/ArtistProfile'


const site_routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		name: 'Home'
	},
	{
		path: '/users/dashboard/:user_id',
		component: Dashboard,
		name: 'Dashboard'
	},
	{
		path: '/signup',
		exact: true,
		component: SignUp,
		name: 'SignUp'
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		name: 'Login'
	},
	{
		path: '/artists/signup',
		exact: true,
		component: ArtistSignUp,
		name: 'Artist Sign Up'
	},
	{
		path: '/artists/:id/profile',
		exact: true,
		component: ArtistProfile,
		name: 'Artist Profile'
	},
	{
		path: '/users/:id/profile',
		exact: true,
		component: Profile,
		name: 'Profile'
	},
	{
		path: '/listen',
		exact: true,
		component: Listen,
		name: 'Listen'
	}, {
		path: '/callback',
		exact: true,
		component: Dashboard,
		name: 'callback'
	},
	{
		path: '/__/auth/handler',
		exact: true,
		component: Profile,
		name: 'Profile'
	}




]
export default (
	<div>
		{site_routes.map((route, i) => (
			<Route exact={route.exact} key={route.name} path={route.path} render={(props) => (
				<route.component key={i} {...props} />
			)} />
		))}
	</div>

)
