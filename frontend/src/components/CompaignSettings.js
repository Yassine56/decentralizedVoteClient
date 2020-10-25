import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

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
	textArea: {
		width: '100%',
	},
}))

function CompaignSettings({ formState, setFormState, errors }) {
	const classes = useStyles()

	const handleOnChange = (e) => {
		setFormState({
			...formState,
			0: {
				...formState[0],
				[e.target.id]: e.target.value,
			},
		})
		console.log('formstate ', formState)
	}

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<Grid container spacing={3} className={classes.container}>
				<Grid item xs={4}>
					<TextField
						error={errors && errors.title ? true : false}
						label='Title'
						id='title'
						variant='filled'
						value={formState[0].title}
						onChange={handleOnChange}
						helperText={errors && errors.title}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label='Organizer'
						id='organizer'
						variant='filled'
						value={formState[0].organizer}
						onChange={handleOnChange}
						error={errors && errors.organizer ? true : false}
						helperText={errors && errors.organizer}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label='Rounds'
						id='rounds'
						variant='filled'
						value={formState[0].rounds}
						onChange={handleOnChange}
						error={errors && errors.rounds ? true : false}
						helperText={errors && errors.rounds}
					/>
				</Grid>
				<Grid item xs={7}>
					<TextField
						id='standard-multiline-flexible'
						label='Description'
						id='description'
						multiline
						className={classes.textArea}
						rowsMax={10}
						variant='filled'
						onChange={handleOnChange}
						value={formState[0].description}
						error={errors && errors.description ? true : false}
						helperText={errors && errors.description}
					/>
				</Grid>
			</Grid>
		</form>
	)
}
export default CompaignSettings
