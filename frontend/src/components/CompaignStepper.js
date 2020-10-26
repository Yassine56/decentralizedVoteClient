import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CompaignSettings from './CompaignSettings'
import OptionsSettings from './OptionsSettings'
import ReviewAndFinish from './ReviewAndFinish'
import { useRecoilState } from 'recoil'
import { compaignsList } from '../state/CompaignState'
import { createCompaign } from '../actions'

import { letterAndSpacesOnly, numbersOnly, validate } from '../utils/validation'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

function getSteps() {
	return ['Compaign settings', 'Add Options', 'Review and Finish']
}

function getStepContent(step, formState, setFormState, errors) {
	switch (step) {
		case 0:
			return (
				<CompaignSettings
					errors={errors}
					formState={formState}
					setFormState={setFormState}
				/>
			)
		case 1:
			return (
				<OptionsSettings
					errors={errors}
					formState={formState}
					setFormState={setFormState}
				/>
			)
		case 2:
			return <ReviewAndFinish formState={formState} />
		default:
			return 'Unknown step'
	}
}

function CompaignStepper({ handleClose }) {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())
	const [formState, setFormState] = useState({
		0: {
			title: '',
			description: '',
			rounds: 0,
			organizer: '',
		},
		1: {
			options: [],
		},
	})
	const [errors, setErrors] = useState({})
	const [compaigns, setCompaigns] = useRecoilState(compaignsList)
	const steps = getSteps()

	const isStepOptional = (step) => {
		return step === 1
	}

	const isStepSkipped = (step) => {
		return skipped.has(step)
	}

	let stepValidation = {
		0: {
			title: letterAndSpacesOnly,
			description: letterAndSpacesOnly,
			rounds: numbersOnly,
			organizer: letterAndSpacesOnly,
		},
	}

	const validateActiveStep = (activeStep) => {
		return (
			stepValidation[activeStep] &&
			validate(formState[activeStep], stepValidation[activeStep])
		)
	}

	const handleNext = (activeStep) => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}
		let errors = validateActiveStep(activeStep)
		if (errors) {
			setErrors(errors)
			return
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped(newSkipped)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.")
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values())
			newSkipped.add(activeStep)
			return newSkipped
		})
	}

	const handleSave = async () => {
		//api call and save to global state
		let response = await createCompaign({
			title: formState[0].title,
			description: formState[0].description,
			rounds: formState[0].rounds,
			organizer: formState[0].organizer,
			options: {
				0: formState[1].options.map((option) => {
					return {
						label: option.label,
						votes: 0,
						voters: [],
						addedBy: formState[0].organizer + ' (organizer)',
					}
				}),
			},
		})
		if (response.success) {
			setCompaigns([...compaigns, response.response])
			handleClose()
		}
	}

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {}
					const labelProps = {}
					if (isStepOptional(index)) {
						labelProps.optional = <Typography variant='caption'>Optional</Typography>
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button onClick={handleSave} className={classes.button}>
							Save
						</Button>
					</div>
				) : (
					<div>
						<div className={classes.instructions}>
							{getStepContent(activeStep, formState, setFormState, errors)}
						</div>
						<div>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
								Back
							</Button>
							{isStepOptional(activeStep) && (
								<Button
									variant='contained'
									color='primary'
									onClick={handleSkip}
									className={classes.button}
								>
									Skip
								</Button>
							)}

							<Button
								variant='contained'
								color='primary'
								onClick={() => handleNext(activeStep)}
								className={classes.button}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default CompaignStepper
