class Greeter {
	static async greetings(client, message) {
		// Handle good morning and goodnight
		let reg_hello = new RegExp('привет');
		let reg_goodbye = new RegExp('пока');
        if (reg_morning.test(message.content.toLowerCase())) {
            return await message.react("👋");
        } else if (reg_night.test(message.content.toLowerCase())) {
            return await message.react("💤");
        }
	}
}

module.exports = Greeter;
