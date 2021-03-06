const Command = require("../../core/Command");

class Warn extends Command {
    constructor(rice) {
        super(rice, {
            name: "warn",
            category: "Moderation",
            memberPerms: ["manageMessages"],
        });
    }

    async run(message, args, data) {

        const user = message.mentions[0] || this.rice.users.get(args[0]) || this.rice.users.find(x => x.username == args[0]);

        if (!message.mentions[0] || !message.channel.guild.members.get(message.mentions[0].id) || !user.id) {
            return message.channel.sendError(" You need to provide a valid member to warn.")
        }

        if (user.id === message.author.id) {
            return message.channel.sendError("You cannot warn yourself.")
        }

        const member = await message.channel.guild.members.get(user.id);

        if (member.user.bot) {
            return message.channel.sendError("I can't warn bots.")
        }

        if (!member) {
            message.channel.sendError("You need to provide a valid user.")
        }

        let reason = args.slice(user.user).join(" ");

        if (!reason) reason = "No reason provided";

        const warning = await this.rice.warn(member.user.id, message, reason);

        const embed = {
            color: 0xEDD3BB,
            author: {
                name: `Case #${warning}`
            },
            fields: [
                { name: "User", value: member.user.username + "#" + member.user.discriminator },
                { name: "Moderator", value: message.author.username + "#" + message.author.discriminator },
                { name: "Reason", value: reason }
            ]
        }

        message.channel.createMessage({ embed });
    }
}

module.exports = Warn;