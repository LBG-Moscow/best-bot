////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// best-bot or lbg-bot is authored and mantained by Caio Fleury, contact me at caio.fleury.r@gmail.com                // 
// If you don't understand this code read https://github.com/AnIdiotsGuide/guidebot before trying to change anything. //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Local development only commands, do not use in production! //
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;              //
////////////////////////////////////////////////////////////////

// Check node version.
if (Number(process.version.slice(1).split(".")[0]) < 10) throw new Error("Node 10.0.0 or higher is required. Update your Node");

const Discord = require('discord.js');
const fs = require("fs");

// Initial load for discord bot client
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require('./config.js');
client.logger = require("./modules/logger");

// Load database client and connect
PGclient = require("./database/connection.js")
PGclient.connect();

// Top level async
const init = async () => {

    // This loop reads the ./commands folder and attaches each event file to the appropriate event.
    fs.readdir('./commands/', (err, files) => {
        if (err) console.error(err);
        const jsfile = files
            .filter( (f) => !f.includes('.test.'))
            .filter( (f) => f.split('.').pop() === 'js');

            if (jsfile.length <= 0) {
                throw new Error('No commands loaded, check importing in index.js');
            }
            else {
                client.logger.log(`Loading a total of ${jsfile.length} commands.`);
                jsfile.forEach( (okf) => {
                    const myCommand = require(`./commands/${okf}`);
                    client.logger.log(`Loading Command: ${myCommand.config.name}`);
                    client.commands.set(myCommand.config.name, myCommand);
                    myCommand.config.aliases.forEach( (alias) => {
                        client.aliases.set(alias, myCommand.config.name);
                    });
                });
            }
    });

     // Same thing for events
     fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        const jsfile = files
            .filter( (f) => !f.includes('.test.'))
            .filter( (f) => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) {
            throw new Error('No events loaded, check importing in index.js');
        }
        else {
            client.logger.log(`Loading a total of ${jsfile.length} events.`);
            jsfile.forEach( (okf) => {
                const eventName = okf.split('.')[0];
                client.logger.log(`Loading Event: ${eventName}`);
                const event = require(`./events/${okf}`);
                // Bind the client to any event, before the existing arguments
                client.on(eventName, event.bind(null, client));
            });
        }
    });

    // Generate a cache of client permissions for pretty perm names in commands.
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init().then(()=> console.log("Bot is online."));