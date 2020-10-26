export const createCompaign = async (newCompaign) => {
	try {
		const res = await fetch('/api/compaigns', {
			method: 'POST',
			body: JSON.stringify(newCompaign),
			headers: { 'Content-Type': 'application/json' },
		})
		let response = await res.json()
		return response
	} catch (err) {
		return {
			success: false,
			response: 'Internal Server Error',
		}
	}
}
export const updateCompaign = async (compaign) => {
	try {
		const res = await fetch(`/api/compaigns/${compaign.id}`, {
			method: 'PATCH',
			body: JSON.stringify(compaign),
			headers: { 'Content-Type': 'application/json' },
		})
		let response = await res.json()
		return response
	} catch (err) {
		return {
			success: false,
			response: 'Internal Server Error',
		}
	}
}
export const listCompaigns = async () => {
	try {
		const res = await fetch(`/api/compaigns`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
		let response = await res.json()
		return response
	} catch (err) {
		return {
			success: false,
			response: 'Internal Server Error',
		}
	}
}
