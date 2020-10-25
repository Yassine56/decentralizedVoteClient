import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Compaigns from './components/Compaigns'
import Footer from './components/Footer'
import { RecoilRoot } from 'recoil'

function App() {
	return (
		<RecoilRoot>
			<Router>
				<Header />
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/login' component={Login} />
					<Route path='/compaigns' component={Compaigns} exact />
					<Route path='/compaigns/:id' component={Compaigns} exact />
					<Route path='/home' component={Home} />
				</Switch>
				<Footer />
			</Router>
		</RecoilRoot>
	)
}
export default App
