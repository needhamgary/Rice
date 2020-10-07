/*
rice eval const cfg = require('../../helpers/models/Guild');
await cfg.updateMany({}, { logID: '' });*/
const Command = require('../../core/Command');

class data extends Command {
    constructor(rice) {
        super(rice, {
            name: 'data',
            category: 'Developer',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Nothing here lol',
            usage: 'nothing to use :/'
        });
    }

    async run(message, args) {
        const cfg = require('../../helpers/models/Guild');
        await cfg.updateMany({}, { logID: '' });
        
        message.channel.send(`Done`)
        
    }
}

module.exports = data;