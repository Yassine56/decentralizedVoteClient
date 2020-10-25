import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useRecoilValue } from 'recoil'
import { compaignsList } from '../state/CompaignState'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import SubmitVoteForm from './SubmitVoteForm'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import AddOptionComponent from './AddOptionComponent'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	table: {
		minWidth: 700,
	},
	addIcon: {
		width: '80%',
		height: '80%',
	},
}))

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow)
// const HiddenTableRow = withStyles((theme)=>({
//     hiddenRow: {
// 		'&:nth-of-type(odd)': {
// 			backgroundColor: theme.palette.action.hover,
// 		},
// 		display: 'none',
// 	},
// }))(TableRow)

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

function CompaignDetail({ id }) {
	const compaigns = useRecoilValue(compaignsList)
	let [currentCompaign] = compaigns.filter((el) => el.id == id)
	let voteState = currentCompaign.options.map((el) => {
		return { voted: false, hover: false }
	})
	const [voteButtonState, setVoteButtonState] = useState(voteState)

	const classes = useStyles()

	const handleActionCellMouseEnter = (row, index) => {
		let array = voteButtonState
		array[index] = { ...array[index], hover: true }
		setVoteButtonState([...array])
	}
	const handleActionCellMouseLeave = (row, index) => {
		let array = voteButtonState
		array[index] = { ...array[index], hover: false }
		setVoteButtonState([...array])
	}
	const handleUpVoteClick = (row, index) => {
		let voteState = currentCompaign.options.map((el) => {
			return { voted: false, hover: false }
		})
		let array = voteState
		array[index] = { ...array[index], voted: true }
		setVoteButtonState([...array])
	}
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={1}></Grid>
				<Grid item xs={7}>
					<Typography variant='h4'> {currentCompaign.title}</Typography>
					<Typography variant='caption'> Compaign Title</Typography>

					<Divider />
					<Typography variant='h4'> {currentCompaign.description}</Typography>
					<Typography variant='caption'> Compaign Description</Typography>
					<Grid container spacing={3}>
						<Grid item xs={11}></Grid>
						<Grid item xs={1}>
							<Fab color='primary' aria-label='add' className={classes.addIcon}>
								<AddIcon />
							</Fab>
						</Grid>
					</Grid>
					<Divider />
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label='customized table'>
							<TableHead>
								<TableRow>
									<StyledTableCell>Options</StyledTableCell>
									<StyledTableCell align='right'>Added By</StyledTableCell>
									<StyledTableCell align='right'>
										Number&nbsp;of&nbsp;Votes
									</StyledTableCell>
									<StyledTableCell align='right'>Rounds</StyledTableCell>
									<StyledTableCell align='right'>Vote</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentCompaign.options.map((row, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell component='th' scope='row'>
											{row.label}
										</StyledTableCell>
										<StyledTableCell align='right'>{row.addedBy}</StyledTableCell>
										<StyledTableCell align='right'>
											<Badge badgeContent={row.votes} color='primary'>
												<ThumbUpIcon />
											</Badge>
										</StyledTableCell>
										<StyledTableCell align='right'>
											{currentCompaign.rounds}
										</StyledTableCell>
										<StyledTableCell
											align='right'
											onMouseEnter={() => handleActionCellMouseEnter(row, index)}
											onMouseLeave={() => handleActionCellMouseLeave(row, index)}
											onClick={() => handleUpVoteClick(row, index)}
										>
											<Badge badgeContent={null} color='primary'>
												<ThumbUpIcon
													color={
														voteButtonState[index] &&
														(voteButtonState[index].voted || voteButtonState[index].hover)
															? 'primary'
															: 'disabled'
													}
												/>
											</Badge>
										</StyledTableCell>
									</StyledTableRow>
								))}
								<AddOptionComponent compaign={currentCompaign} />
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={4}>
					<SubmitVoteForm vote={voteButtonState} compaign={currentCompaign} />
				</Grid>
			</Grid>
		</div>
	)
}
export default CompaignDetail
