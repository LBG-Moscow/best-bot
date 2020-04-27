module.exports.execute = async (client, message, args) => {
	const searchTerm = args.join(' ');
	const query = args.join('+');

	if (searchTerm.length === 0) {
		return await message.channel.send(
			'Ты хоть скажи что мне искать.'
		);
	} else {
		return await message.channel.send(
			`Вон тебе: ${searchTerm}: https://www.google.com/search?q=${query}`,
		);
	}
};

module.exports.config = {
	name: 'search',
	aliases: ['search', 'искать', 'гугл'],
	description: 'Поиск в гугл по запросу.',
	usage: ['search', 'искать', 'гугл'],
};