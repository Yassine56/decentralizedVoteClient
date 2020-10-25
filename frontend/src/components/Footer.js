import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useHistory } from 'react-router-dom'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	root: {
		left: '0',
		bottom: '0',
		right: '0',
		position: 'relative',
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}))

function Footer() {
	let history = useHistory()
	const classes = useStyles()
	const [state, setState] = React.useState({
		bottom: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = (anchor) => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{['home', 'compaigns'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText onClick={() => history.push(`/${text}`)} primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	)

	return (
		<div className={classes.root}>
			{
				<React.Fragment key={'bottom'}>
					<Grid container spacing={3}>
						<SwipeableDrawer
							anchor={'bottom'}
							open={state['bottom']}
							onClose={toggleDrawer('bottom', false)}
							onOpen={toggleDrawer('bottom', true)}
						>
							{list('bottom')}
						</SwipeableDrawer>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<ExpandLessIcon onMouseEnter={toggleDrawer('bottom', true)} />
							</Paper>
						</Grid>
					</Grid>
				</React.Fragment>
			}
		</div>
	)
}
export default Footer
