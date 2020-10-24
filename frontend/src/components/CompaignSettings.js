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
		container: {
			flexGrow: 1,
			width: '100%',
		},
	},
}))

function CompaignSettings({ formState, setFormState }) {
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
						label='Title'
						id='title'
						variant='filled'
						value={formState.title}
						onChange={handleOnChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label='Organizer'
						id='organizer'
						variant='filled'
						value={formState.organizer}
						onChange={handleOnChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label='Rounds'
						defaultValue={formState.rounds}
						id='rounds'
						variant='filled'
						value={formState.rounds}
						onChange={handleOnChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						id='standard-multiline-flexible'
						label='Description'
						id='description'
						multiline
						rowsMax={10}
						variant='filled'
						error
						value={formState.description}
					/>
				</Grid>
			</Grid>
		</form>
	)
}
export default CompaignSettings
