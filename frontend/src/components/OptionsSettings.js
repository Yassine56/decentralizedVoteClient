import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { letterAndSpacesOnly, validate } from '../utils/validation'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '80%',
		},
	},
	container: {
		flexGrow: 1,
		width: '100%',
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
	},
}))

function OptionsSettings({ formState, setFormState }) {
	const classes = useStyles()
	const [chipData, setChipData] = useState(formState[1].options)
	const [title, setTitle] = useState('')
	const [errors, setErrors] = useState({})

	const handleDelete = (chipToDelete, index) => () => {
		setChipData((chips) => chips.filter((chip, idx) => idx !== index))
	}
	const handleAddOption = () => {
		let errors = validate({ title }, { title: letterAndSpacesOnly })
		if (errors) {
			setErrors(errors)
			return
		}
		setChipData([...chipData, { label: title }])
		setFormState({
			...formState,
			1: {
				options: [...chipData, { label: title }],
			},
		})
		setTitle('')
	}
	const handleOnChange = (e) => {
		setTitle(e.target.value)
		console.log('title', title)
	}

	console.log('formstate again', formState)
	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<Grid container spacing={3} className={classes.container}>
				<Grid item xs={4}>
					<Divider orientation='vertical' flexItem />
					<Paper component='ul' className={classes.root}>
						{chipData.map((data, index) => {
							let icon
							return (
								<li key={index}>
									<Chip
										icon={icon}
										label={data.label}
										onDelete={handleDelete(data, index)}
										className={classes.chip}
									/>
								</li>
							)
						})}
					</Paper>
					<Divider orientation='vertical' flexItem />
				</Grid>
				<Grid item xs={8}>
					<Grid container spacing={3} className={classes.container}>
						<Grid item xs={6}>
							<TextField
								error={errors && errors.title ? true : false}
								label='Title'
								id='title'
								variant='filled'
								value={title}
								onChange={handleOnChange}
								helperText={errors && errors.title}
							/>
						</Grid>
						<Grid item xs={6} className={classes.section3}>
							<Button onClick={handleAddOption} color='primary'>
								Add Option
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}
export default OptionsSettings
