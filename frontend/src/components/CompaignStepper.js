import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CompaignSettings from './CompaignSettings'

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
	return ['Compaign settings', 'Add Candidates', 'Review and Finish']
}

function getStepContent(step, formState, setFormState) {
	switch (step) {
		case 0:
			return <CompaignSettings formState={formState} setFormState={setFormState} />
		case 1:
			return 'What is an ad group anyways?'
		case 2:
			return 'This is the bit I really care about!'
		default:
			return 'Unknown step'
	}
}

function CompaignStepper() {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())
	const [formState, setFormState] = useState({
		0: {
			title: '',
			description: '',
			rounds: 1,
			organizer: '',
		},
		1: {
			candidates: [],
		},
	})
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
		let errors = validate(formState[activeStep], stepValidation[activeStep])
		console.log('errors', errors)
	}

	const handleNext = (activeStep) => {
		validateActiveStep(activeStep)
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
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

	const handleReset = () => {
		setActiveStep(0)
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
						<Button onClick={handleReset} className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<div className={classes.instructions}>
							{getStepContent(activeStep, formState, setFormState)}
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
