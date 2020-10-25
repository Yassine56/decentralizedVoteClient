import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { letterAndSpacesOnly, validate, validateEmail } from '../utils/validation'
import Button from '@material-ui/core/Button'
import { useRecoilState } from 'recoil'
import { compaignsList } from '../state/CompaignState'

function SubmitVoteForm({ vote, compaign }) {
	const [compaigns, setCompaigns] = useRecoilState(compaignsList)
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
	})
	const [errors, setErrors] = useState({})
	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value,
		})
	}

	let validations = {
		firstName: letterAndSpacesOnly,
		lastName: letterAndSpacesOnly,
		email: validateEmail,
	}

	const handleSubmitVoteClick = () => {
		let error = validate(formState, validations)
		console.log('errors', errors)
		if (error) {
			setErrors(error)
			return
		}
		let votesWithIndex = vote.map((el, index) => {
			return { ...el, index }
		})
		let [votedOptionIndex] = votesWithIndex.filter((el, idx) => el.voted == true)
		console.log('votedOptionIndex', votedOptionIndex)
		// check if option is selected
		if (!votedOptionIndex) {
			setErrors({
				email: 'You have to select an option before submitting a vote',
			})
			return
		}
		// check if user already submitted a vote for an option
		let emails = compaign.options.reduce((acc, curr) => {
			return acc.concat(curr.voters)
		}, [])
		if (emails.includes(formState.email)) {
			setErrors({
				email: 'You have already voted for this compaign',
			})
			return
		}
		let newCompaigns = [...compaigns]
		let newOptions = [...compaign.options]
		newOptions[votedOptionIndex.index] = {
			...newOptions[votedOptionIndex.index],
			votes: newOptions[votedOptionIndex.index].votes + 1,
			voters: [...newOptions[votedOptionIndex.index].voters, formState.email],
		}
		let newCompaign = { ...compaign, options: newOptions }
		let newCompaignIndex = newCompaigns.map((el) => el.id).indexOf(newCompaign.id)
		newCompaigns[newCompaignIndex] = newCompaign
		console.log('newCompaign', newCompaigns)
		setCompaigns(newCompaigns)
		setErrors({})
	}

	return (
		<div>
			<h1>Submit Vote Form</h1>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<TextField
						label='First Name'
						variant='filled'
						value={formState.firstName}
						id='firstName'
						onChange={handleChange}
						error={errors && errors.firstName ? true : false}
						helperText={errors && errors.firstName}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Last Name'
						variant='filled'
						value={formState.lastName}
						id='lastName'
						onChange={handleChange}
						error={errors && errors.lastName ? true : false}
						helperText={errors && errors.lastName}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label='Email'
						variant='filled'
						value={formState.email}
						id='email'
						onChange={handleChange}
						error={errors && errors.email ? true : false}
						helperText={errors && errors.email}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' color='primary' onClick={handleSubmitVoteClick}>
						Submit Vote
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}
export default SubmitVoteForm
