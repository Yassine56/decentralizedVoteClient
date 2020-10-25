import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import placeholder1 from '../placeholder1.png'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 40,
	},
	image: {
		height: '100%',
		width: '100%',
	},
})

function CustomCard({ compaign }) {
	const classes = useStyles()
	const history = useHistory()
	const HandleClick = () => {
		history.push(`/compaigns/${compaign.id}`)
	}
	return (
		<Card className={classes.root}>
			<CardActionArea onClick={HandleClick}>
				<CardMedia className={classes.media} title='Compaign' />
				<img className={classes.image} src={placeholder1} />
				<CardMedia />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{compaign.title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{compaign.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary'>
					View
				</Button>
			</CardActions>
		</Card>
	)
}
export default CustomCard
