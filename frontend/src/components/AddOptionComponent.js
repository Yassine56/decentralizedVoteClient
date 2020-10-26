import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { letterAndSpacesOnly, validate } from '../utils/validation'
import { useRecoilState } from 'recoil'
import { compaignsList } from '../state/CompaignState'
import { updateCompaign } from '../actions'
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

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow)

function AddOptionComponent({ compaign }) {
	let [compaigns, setCompaigns] = useRecoilState(compaignsList)

	const classes = useStyles()
	const [formState, setFormState] = useState({
		option: '',
		addedBy: '',
	})
	const [errors, setErrors] = useState({})
	let validations = {
		option: letterAndSpacesOnly,
		addedBy: letterAndSpacesOnly,
	}

	const onAddIconClick = async () => {
		let error = validate(formState, validations)
		if (error) {
			setErrors(error)
			return
		}
		let newOptions = [
			...compaign.options,
			{
				label: formState.option,
				votes: 0,
				addedBy: formState.addedBy,
				voters: [],
			},
		]
		let newCompaigns = [...compaigns]
		let newCompaignIndex = newCompaigns.findIndex((el) => el.id == compaign.id)
		newCompaigns[newCompaignIndex] = {
			...newCompaigns[newCompaignIndex],
			options: [...newOptions],
		}
		// TODO api update Compaign
		const response = await updateCompaign({
			...newCompaigns[newCompaignIndex],
			options: {
				0: [...newCompaigns[newCompaignIndex].options],
			},
		})
		if (response.success) {
			setCompaigns([...newCompaigns])
			setFormState({ option: '', addedBy: '' })
		}
	}
	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value,
		})
	}
	return (
		<StyledTableRow key={100} className={classes}>
			<StyledTableCell component='th' scope='row'>
				<TextField
					label='Add Option'
					variant='filled'
					value={formState.option}
					id='option'
					onChange={handleChange}
					error={errors && errors.option ? true : false}
					helperText={errors && errors.option}
				/>
			</StyledTableCell>
			<StyledTableCell align='right'>
				<TextField
					label='Added By'
					variant='filled'
					value={formState.addedBy}
					id='addedBy'
					onChange={handleChange}
					error={errors && errors.addedBy ? true : false}
					helperText={errors && errors.addedBy}
				/>
			</StyledTableCell>
			<StyledTableCell align='right'></StyledTableCell>
			<StyledTableCell align='right'></StyledTableCell>
			<StyledTableCell align='right'>
				<Fab color='primary' aria-label='add' onClick={onAddIconClick}>
					<AddIcon />
				</Fab>
			</StyledTableCell>
		</StyledTableRow>
	)
}
export default AddOptionComponent
