////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// best-bot or lbg-bot is authored and mantained by Caio Fleury, contact me at caio.fleury.r@gmail.com                // 
// If you don't understand this code read https://github.com/AnIdiotsGuide/guidebot before trying to change anything. //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check node version.
if (Number(process.version.slice(1).split(".")[0]) < 10) throw new Error("Node 10.0.0 or higher is required. Update your Node");

const Discord = require('discord.js');
const fs = require("fs");

// Initial load for discord bot client
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require('./config.json');

// Load basic functions
require("./modules/functions.js")(client);

//Load database client and connect
PGclient = require("./database/connection.js")
PGclient.connect();

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    const jsfile = files
        .filter( (f) => {
            // Exclude from the jsfile array all elements which are .test. or non .js, returns filtered array.
            !f.includes('.test.') && f.split('.').pop() === 'js';
        });
    if (jsfile.length <= 0) {
        throw new Error('No event module loaded, check importing in index.js');
    }
    else {
        jsfile.forEach( (okf) => {
            const event = require(`./events/${okf}`);
            const eventName = okf.split('.')[0];
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
        });
    }
});

fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    const jsfile = files
        .filter( (f) => {
            !f.includes('.test.');
            f.split('.').pop() === 'js';
        });
        if (jsfile.length <= 0) {
            throw new Error('Functions modules failed to load, check importing in index.js');
        }
        else {
            jsfile.forEach( (okf) => { //dynamically reading command files -> read more: https://discordjs.guide/command-handling/#dynamically-reading-command-files
                const myFunctions = require(`./commands/${okf}`);
                client.commands.set(myFunctions.config.name, myFunctions);
                myFunctions.config.aliases.forEach( (alias) => {
                    client.aliases.set(alias, myFunctions.config.name);
                });
            });
        }
});

