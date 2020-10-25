import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function ButtonAppBar() {
	const classes = useStyles()
	let history = useHistory()
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Button onClick={() => history.push('/home')} color='inherit'>
						Home
					</Button>
					<Button
						onClick={() => history.push('/compaigns')}
						color='inherit'
						className={classes.title}
					>
						Campaigns
					</Button>

					<Button onClick={() => history.push('/login')} color='inherit'>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
