export const letterAndSpacesOnly = (testString) => {
	let regex = /^[a-zA-Z\s]*$/
	return {
		res: testString.match(regex),
		message: 'Mandatory filed, should contain letters and spaces only',
	}
}
export const numbersOnly = (testString) => {
	let regx = new RegExp('^[0-9]*$')
	return {
		res: testString.match(regx),
		message: 'Mandatory filed, should contain numbers only',
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
