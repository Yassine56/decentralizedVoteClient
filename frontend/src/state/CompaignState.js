import { atom } from 'recoil'
export const compaignsList = atom({
	key: 'compaignsList',
	default: [
		{
			id: 0,
			title: 'test title',
			description: 'test description',
			organizer: 'test organizer',
			options: [
				{
					label: 'option1',
					votes: 1,
					addedBy: 'test user',
					voters: ['yassine@gmail.com'],
				},
				{
					label: 'option2',
					votes: 2,
					addedBy: 'test user 2',
					voters: ['test@gmail.com', 'test1@gmail.com'],
				},
				{
					label: 'option3',
					votes: 3,
					addedBy: 'test user 3',
					voters: ['test2@gmail.com', 'test13@gmail.com', 'test3@gmail.com'],
				},
			],
			rounds: 2,
		},
	],
})
