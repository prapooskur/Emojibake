const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bake')
        .setDescription('Takes two emojis and mashes them together, returning an image of the output emoji')
        .addStringOption(option =>
            option.setName('base_emoji')  // Add better name later
            .setDescription('The base emoji to combine')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('secondary_emoji') // Add better name later
            .setDescription('The emoji to combine the base with')
            .setRequired(true)),
            
    async execute(interaction) {
        const base_emoji = interaction.options.getString('base_emoji');
        const secondary_emoji = interaction.options.getString('secondary_emoji');

	console.log(base_emoji);
        console.log(secondary_emoji);

	codepoints_base=Array.from(base_emoji).map(c => c.codePointAt(0).toString(16));
	console.log(codepoints_base);
    codepoints_secondary=Array.from(secondary_emoji).map(c => c.codePointAt(0).toString(16));
	console.log(codepoints_secondary);
	
	converted_base = ""
	for (let i = 0; i < codepoints_base.length; i++) {
	    converted_base+="u";
	    converted_base+=codepoints_base[i];
	    if (i<codepoints_base.length-1) {
		    converted_base+="-";
        }
	}
	console.log(converted_base);

    converted_secondary = ""
	for (let i = 0; i < codepoints_secondary.length; i++) {
	    converted_secondary+="u";
	    converted_secondary+=codepoints_secondary[i];
	    if (i<codepoints_secondary.length-1) {
		    converted_secondary+="-";
        }
	}
	console.log(converted_secondary);
	
//    converted_base = base_emoji.codePointAt(0).toString(16);
//    converted_secondary = secondary_emoji.codePointAt(0).toString(16);

    imgpath = "./images/"+converted_base+"_"+converted_secondary+".png"
    console.log(imgpath)

    try {
        const image = new AttachmentBuilder(imgpath,"img.png")
        await interaction.reply({ files : [image] })
    } catch (error) {
        await interaction.reply({ content: "The combination you sent did not work.", ephemeral: true })
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }
        

//        await interaction.reply(converted_base+"  "+converted_secondary);
        console.log(`User ${interaction.user.tag} used command ${interaction}`);
    }
};
