const Command = require("../../core/Command");
const Membed = require('../../core/MessageEmbed');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: "help",
            category: "Misc",
            botPerms: ["sendMessages"],
            description: "View all commands."
        });
    }

    async run(message, args, developers) {

        if (args[0]) {
            let prefix = await this.rice.getPrefix(message.channel.guild.id);
            const cmd = this.rice.commands.get(args[0]) || this.rice.commands.get(this.rice.aliases.get(args[0]));

            if (!cmd) {
                return message.channel.sendError(`I couldn't find that command.`)
            }
            let inline = true;
            const embed = new Membed()
                embed.setTitle(`Command \`${prefix}\`${cmd.help.name}`)
                embed.setColor(0xFFFFFd)
                embed.addFields([{
                    name: "Category",
                    value: cmd.help.category,
                    inline
                },
                {
                    name: "Description",
                    value: cmd.help.description,
                    inline
                },
                {
                    name: "Cooldown",
                    value: cmd.config.cooldown / 1000 + " seconds" || "3 seconds",
                    inline
                }])

            if (cmd.help.aliases) 
            embed.fields.push(
                {
                    name: "Aliases",
                    value: cmd.help.aliases.map(x => `\`${x}\``).join(", ") || 'NONE'
                })
            if (cmd.help.usage) 
            embed.fields.push(
                {
                    name: "Usage",
                    value: `\`${prefix.prefix}\`` + cmd.help.usage,
                    inline
                })
            if (cmd.config.botPerms)
            embed.fields.push(
                {
                    name: "Bot Permissions",
                    value: cmd.config.botPerms.map(x => `\`${x}\``).join(", ") || `\`NONE\``,
                    inline
                })
            if (cmd.config.memberPerms) 
            embed.fields.push(
                {
                    name: "Member Permissions",
                    value: cmd.config.memberPerms.map(x => `\`${x}\``).join(", ") || `\`NONE\``,
                    inline
                });

            message.channel.send({ embed: embed });

        } else if (!args[0]) {

            const emojis = {
                "developer": "<:developer:762772547464724480>",
                "moderation": "🛠️",
                "misc": "ℹ️",
                "image": "📸",
                "config": "⚙️",
                "fun": "🤣",
                "info": "<:PeepoThink:763311088217096232>"
            };

            const categories = [];

            this.rice.commands.forEach((cmd) => {
                if (!categories.includes(cmd.help.category)) {
                    categories.push(cmd.help.category);
                }
            });

            const embed = {
                title: `My Commands [${this.rice.commands.size}]`,
                fields: [],
                color: 0xFFFFFd,
            };

            categories.sort().forEach((ct) => {
                const cmds = this.rice.commands.filter((cmd) => cmd.help.category === ct);
                embed.fields.push({ name: emojis[ct.toLowerCase()] + " " + ct, value: cmds.map((cmd) => `\`${cmd.help.name}\``).join(", ") })
            });

            message.channel.send({ embed });
        }
    }
}

module.exports = Help;
