import React from 'react'
import CustomCard from './CustomCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { compaignsList } from '../state/CompaignState'
import { useRecoilValue } from 'recoil'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
})

function CompaignCards() {
	const classes = useStyles()
	const compaigns = useRecoilValue(compaignsList)
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{compaigns.map((compaign, index) => (
					<Grid item xs={3} key={index}>
						<CustomCard compaign={compaign} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}
export default CompaignCards
