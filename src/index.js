require("dotenv").config()

const Rice = require("./core/Rice");

const util = require("util");
const fs = require("fs");

const readdir = util.promisify(fs.readdir);

const rice = new Rice(process.env.token, {
    allowedMentions: [],
    defaultImageFormat: "png",
    defaultImageSize: 512,
});

const setup = async () => {

    const dirs = await readdir(__dirname + `/commands/`);
    console.log(`${dirs.length} categories loaded.`);
    dirs.forEach(async (dir) => {
        const commands = await readdir(__dirname + `/commands/${dir}/`);
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = rice.setupCommand(`./commands/${dir}`, cmd);
            if (response) {
                console.log(response);
            }
        });
    });

    const events = await readdir(__dirname + "/events");
    console.log(`${events.length} events loading.`);
    events.forEach((evt) => {
        const evtName = evt.split(".")[0];
        console.log(`Event loaded ${evtName}`);
        const event = new (require(`./events/${evt}`))(rice);
        rice.on(evtName, (...args) => event.run(...args));
        delete require.cache[require.resolve(__dirname + `/events/${evt}`)];
    });
    
    rice.weather = require("weather-js");
    rice.fs = fs;
    rice.mongoose = require("./helpers/utils/mongoose");
    await rice.mongoose.init(rice);
}

setup();
rice.connect();