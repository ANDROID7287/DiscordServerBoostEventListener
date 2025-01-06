# Discord Server Boost Event Listener
This project will include a `GuildMemberUpdate` event listener, event handling will not be included as of now.

It's recommended to cache all members once the bot starts running to gather all member's `oldMember` data and avoid non-detection once the member updates for the first time, just like this:
```js
// In your ready.js or execution file, use this code.

const { Events } = require('discord.js');
const guildId = '', // Your target guild's ID.

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        try {
            const guild = client.guilds.cache.get(guildId);

            if (guild) {
                await guild.members.fetch();
                console.log('[🟢] Members Cached.')
            } else {
                console.warn('[🔴] Couldn't retrieve the server from its ID.')
            }
        } catch (error) {
            console.error('[🔴] There was an error caching members:', error);
        }

        console.log(`[🟢] ${client.user.tag} ready to go!`);
    },
};
```
In this event listener you will only find console logs once the user boosts, however, you can mix it with embeds, custom messages, or other functions you'd like to host once the user boosts or removes a boost from your server.
