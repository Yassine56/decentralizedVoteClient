export const letterAndSpacesOnly = (testString) => {
	let regex = /^[a-zA-Z\s]*$/
	return {
		res: testString && testString.match(regex),
		message: 'Mandatory field, should contain letters and spaces only',
	}
}
export const numbersOnly = (testString) => {
	let regx = new RegExp('^[0-9]*$')
	return {
		res: testString && testString.toString().match(regx),
		message: 'Mandatory field, should contain numbers only',
	}
}

export const validateEmail = (testString) => {
	let regx = /\S+@\S+\.\S+/
	console.log('testString.match(regx)', testString.match(regx))
	return {
		res: testString && testString.match(regx),
		message: 'Mandatory field, must enter a valid email address',
	}
}

export const validate = (formState, validations) => {
	let keys = Object.keys(formState)
	let errors
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		console.log('key', key)
		let test = validations[key](formState[key])
		if (!test.res) {
			errors = {
				...errors,
				[key]: test.message,
			}
		}
	}
	return errors
}
