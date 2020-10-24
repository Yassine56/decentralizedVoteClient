import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}))

function Home() {
	const classes = useStyles()
	return (
		<div>
			<h1>Home</h1>
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>xs=12</Paper>
					</Grid>
					<Grid item xs={12}>
						<br />
					</Grid>
					<Grid item xs={12}>
						<br />
					</Grid>
					<Grid item xs={12}>
						<br />
					</Grid>
					<br />
					<br />
					<br />
					<Grid item xs={6}>
						<Paper className={classes.paper}>xs=6</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper className={classes.paper}>xs=6</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>xs=3</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>xs=3</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>xs=3</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>xs=3</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
export default Home
