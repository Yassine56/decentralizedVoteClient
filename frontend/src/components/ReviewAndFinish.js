import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
	container: {
		flexGrow: 1,
		width: '100%',
	},
}))

function ReviewAndFinish({ formState }) {
	const classes = useStyles()

	console.log('review and finish', formState)

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.container}>
				<Grid item xs={6}>
					<Paper elevation={3}>
						<h2>Title: {formState[0].title}</h2>
						<h4>Description: {formState[0].description}</h4>
						<h4>Organizer: {formState[0].organizer}</h4>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={3}>
						<h2>Options:</h2>
						<ol>
							{formState[1].options.map((option, index) => (
								<li key={index}>{option.label}</li>
							))}
						</ol>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}
export default ReviewAndFinish
