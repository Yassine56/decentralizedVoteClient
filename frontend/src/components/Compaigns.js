import React, { useState, useEffect } from 'react'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CompaignCards from './CompaignCards'
import CompaignCreation from './CompaignCreation'
import { useParams } from 'react-router-dom'
import CompaignDetail from './CompaignDetail'
import { useRecoilState } from 'recoil'
import { compaignsList } from '../state/CompaignState'
import { listCompaigns } from '../actions'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		cursor: 'menu-context',
	},
	paperClick: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		cursor: 'pointer',
	},
}))

function Compaigns() {
	const [compaigns, setCompaigns] = useRecoilState(compaignsList)
	useEffect(() => {
		const callListCompaigns = async () => {
			const response = await listCompaigns()
			if (response.success) {
				setCompaigns(response.response)
			}
		}
		callListCompaigns()
	}, [])
	const classes = useStyles()
	const [curserPointer, setCurserPointer] = useState(false)
	const [open, setOpen] = useState(false)
	let { id } = useParams()
	const handleOpen = () => {
		setOpen(true)
	}
	function handleClose() {
		setOpen(false)
	}
	const handleCurserChange = () => {
		setCurserPointer(!curserPointer)
	}

	return (
		<div>
			{id ? (
				<CompaignDetail id={id} />
			) : (
				<div>
					<h1>Compaigns</h1>
					<div className={classes.root}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={6}
								onMouseEnter={handleCurserChange}
								onMouseLeave={handleCurserChange}
								className={curserPointer ? classes.paper : classes.paperClick}
							>
								<Paper
									onMouseEnter={handleCurserChange}
									onMouseLeave={handleCurserChange}
									className={curserPointer ? classes.paper : classes.paperClick}
									onClick={handleOpen}
								>
									Create New Compaign
								</Paper>
								<CompaignCreation open={open} handleClose={handleClose} />
							</Grid>
							<Grid item xs={9}>
								<Divider />
							</Grid>

							<Grid item xs={6}></Grid>
							<Grid item xs={1}></Grid>
							<Grid item xs={6}>
								<Typography> Select a Compaign</Typography>
							</Grid>
							<Grid item xs={12}>
								<CompaignCards />
							</Grid>
						</Grid>
					</div>
				</div>
			)}
		</div>
	)
}
export default Compaigns
