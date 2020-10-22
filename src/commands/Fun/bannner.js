const Command = require("../../core/Command");
const figlet = require('util').promisify(require('figlet'));

class Banner extends Command {
    constructor(rice) {
        super(rice, {
            name: "banner",
            category: "Fun",
            botPerms: ["sendMessages"],
            memberPerms: ["sendMessages"],
            description: "creates a banner for your message",
            usage: "give me a message"
        });
    }

    async run(message, args, ...banner) {
        return message.channel.send(await figlet(banner), { code: true })
    }
}

module.exports = Banner;