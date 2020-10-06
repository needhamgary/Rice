let embedObject = { };
const fieldArray = [];
class MessageEmbed {   
    constructor() {
        return embedObject;
    }
    embed
    setTitle(text) {
        if (!text) throw new Error('You didn\'t provide any text for the title');
        embedObject.title = text; 
    }

    setColor(hex) {
        if (!hex) throw new Error("You didn't provide a color.");
        embedObject.color = hex;
    }

    setURL(url) {
        if (!url) throw new Error("You didn't provide a url.");
        embedObject.url = url;
    }

    setAuthor(text, url) {
        if (!text) throw new Error('Author can\'t be empty.');
        embedObject.author.name = text;
        if (url) {
            embedObject.author.icon_url = url
        }
    }
    setDescription(content) {
        if (!content) throw new Error(`No Content for description provided.`);

        embedObject.description = content;
    }
    setThumbnail(url) {
        if (!url) throw new Error(`No Thumbnail URL Provided.`);

        embedObject.thumbnail.url = url;
    }
    addField(title, content, position) {
        if (!title) throw new Error(`No Name specified for the field.`);

        if (!content) throw new Error(`No Value specified for the field.`);

        fieldArray.push({ name: title, value: content, inline: position??false });

        embedObject.fields = fieldArray
    }
    setImage(url) {
        if (!url) throw new Error(`No URL for embed image specified.`);
        
        embedObject.image.url = url;
    }
    setFooter(content, url) {
        if (!content) throw new Error(`No Text for footer specified.`);
        
        embedObject.text = content;
        
        if (url) embedObject.icon_url = url
    }
    setTimestamp() {
        embedObject.timestamp = new Date()
    }
}
module.exports = MessageEmbed