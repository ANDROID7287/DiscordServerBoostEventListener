// You can blend other GuildMemberUpdate functions in here as well.
// We'll be using discord.js: 
// https://discord.js.org/docs/packages/discord.js/14.14.1/GuildMember:Class  
// https://discord.js.org/docs/packages/discord.js/14.14.1/GuildMember:Class#guild, in case you'd like to play with their functions.

const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberUpdate,
    once: false,
    async execute(oldMember, newMember) {
        const guildId = '', // To listen for GuildMemberUpdates on the specifyed Guild ID.
        if (newMember.guild.id === guildId) {
            // const oldPremiumSince = null;
            // const newPremiumSince = null;
            // const newGuildBoostCount = 18;
            // For testing purposes, simulating events when a user is no longer a server booster, removed a boost but is still a booster, just started boosting, was booster and boosted the server again.
          
            const oldPremiumSince = oldMember.premiumSince?.getTime();
            const newPremiumSince = newMember.premiumSince?.getTime();
            const oldGuildBoostCount = oldMember.guild.premiumSubscriptionCount;
            const newGuildBoostCount = newMember.guild.premiumSubscriptionCount;
            
            if ((!oldPremiumSince && newPremiumSince) || // Was not a booster before.
                (oldGuildBoostCount < newGuildBoostCount) // Was a server booster and boosted again.
               ) {
    
                console.log(`${newMember.user.tag} has boosted the server ${newMember.guild.name}.`);
                /* // In case you'd like to announce it via a Channel.
                const channelId = ''; 
                const channel = newMember.guild.channels.cache.get(channelId);
                 
                if (channel) {
                    channel.send({
                        content: `**<@${newMember.user.id}> Has boosted the server! ${newMemner.guild.name} now has ${newGuildBoostCount} boosts!**`,
                    });
                } else {
                    console.error('Couldn\'t find the channel.');
                }
                */
            }

            if ((!newPremiumSince && oldPremiumSince) || // Was server booster before but now isn't.
                (oldGuildBoostCount > newGuildBoostCount) // Removed a server boost, but it's still server boosting the guild.
               ) {
            
                console.log(`${newMember.user.tag} has stopped boosting ${newMember.guild.name}.`);
                /* // In case you'd like to announce it via a Channel.
                const channelId = ''; 
                const channel = newMember.guild.channels.cache.get(channelId);
                */
              
                try {
                    if (!newPremiumSince) {
                        console.log(`${newMember.user.tag} is no longer a server booster.`);
                        /* channel.send({
                            content: `**<@${newMember.user.id}> has stopped boosting! ${newMember.guild.name} now has ${newGuildBoostCount} boosts!**`,
                        });

                        const roleId = ''; // In case you'd like to grant a specific role once the user stopped boosting the server.
                        const role = newMember.guild.roles.cache.get(roleId);
            
                        if (role) {
                            try {
                                await newMember.roles.add(role);
                            } catch (error) {
                                console.error('Error trying to update user\'s role:', error);
                            }
                        } */
                    } else {
                        console.log(`${newMember.user.tag} is still a server booster.`);
                        /* channel.send({
                            content: `**<@${newMember.user.id} has removed one boost from the server! However, he\'s still boosting. ${newMember.guild.name} now has ${newGuildBoostCount} boosts!**`,
                        }); */
                    }
                } catch (error) {
                    console.log('An unexpected error occurred:', error);
                }        
            }
        }
    },
};
