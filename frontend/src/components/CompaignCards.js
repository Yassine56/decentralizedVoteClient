import React from 'react'
import CustomCard from './CustomCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
})

function CompaignCards() {
	const classes = useStyles()
	const array = [1, 2, 3, 4, 5]

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{array.map((el) => (
					<Grid item xs={3} key={el}>
						<CustomCard />
					</Grid>
				))}
			</Grid>
		</div>
	)
}
export default CompaignCards
