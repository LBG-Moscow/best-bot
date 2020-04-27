const config = require('../config.json');
const Discord = require('discord.js');

class blacklistActions {



	static async checkBlacklist(client, message) {
		const blacklistList = config.modules.blacklistArray;

		const lowerCaseMessage = message.content.toLowerCase();
		let blacklistWord;
		const containedblacklist = blacklistList.some(substring => {
			blacklistWord = substring;
			return lowerCaseMessage.includes(substring);
		});
		const getSection = (message, word) => {
			let start = message.content.indexOf(word) - 10;
			let end = message.content.indexOf(word) + word.length + 10;
			// Add padding to the mare
			return message.content.substring(start, end);
		};

		const getMarker = (word, spacePadding) => {
			let marker = '';
			for (let i = 0; i < spacePadding; i++) {
				marker += ' ';
			}
			for (let i = 0; i < word.length; i++) {
				marker += '‾';
			}
			return marker;
		};
		const collectPlacement = (word, marker) => {
			return'```\n'+word+'\n'+marker+'\n'+'```';
		};

		if (containedblacklist) {
			const embedMessage = new Discord.RichEmbed()
				.setColor('#ff0000')
				.setTitle('Винимание: кто-то базарит')
				.setDescription(`blacklist detected in ${message.channel}`)
				.addField('User', message.author, true)
				.addField('Link', `[Go to message](${message.url})`, true)
				.setFooter(message.author.username + '#' + message.author.discriminator, message.author.avatarURL);

			// Split message into multiple, in case takes up more space than what discordjs allows for a field.
			const messageChunks = message.content.match(/[\s\S]{1,1024}/g);

			for (let chunk of messageChunks) {
				embedMessage.addField('Message', chunk);
			}
			let section = '';
			if (message.content.length > 20) {
				let messagePart = '';
				if (message.content.indexOf(blacklistWord) > 10) messagePart += '...';
				messagePart += getSection(message, blacklistWord);
				if (message.content.substring(message.content.indexOf(blacklistWord) + blacklistWord.length).length > 10) messagePart += '...';
				let marker = getMarker(blacklistWord, messagePart.indexOf(blacklistWord));
				section += collectPlacement(messagePart, marker);
				
			} else {
				let marker = getMarker(blacklistWord, message.content.indexOf(blacklistWord));
				section = collectPlacement(message.content, marker);
			}
			embedMessage.addField('Here', section, false);

			// Send message to moderation log
			client.channels.get(config.channels.moderation).send(embedMessage);
		}

	}



}


module.exports = blacklistActions;