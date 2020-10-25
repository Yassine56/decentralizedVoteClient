import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import background from '../assets/background.png'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundImage: `url(${background})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 100%',
		width: '100%',
		height: '100vh',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}))

function Home() {
	const classes = useStyles()
	return <div className={classes.root}></div>
}
export default Home
