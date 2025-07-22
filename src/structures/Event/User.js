class User {
    constructor(data) {
        this.v = data.v;
        this.user = {
            verified: data.user.verified,
            id: data.user.id,
            username: data.user.username,
            discriminator: data.user.discriminator,
            avatar: data.user.avatar,
            bot: data.user.bot,
            system: data.user.system,
            mfa_enabled: data.user.mfa_enabled,
            locale: data.user.locale,
            verified: data.user.verified,
            email: data.user.email,
            clan: data.user.clan,
            flags: data.user.flags,
        }
        this.session_id = data.session_id;
        this.guilds = data.guilds.map(guild => ({
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            owner: guild.owner,
            permissions: guild.permissions,
            features: guild.features,
            joined_at: guild.joined_at,
            large: guild.large,
            unavailable: guild.unavailable,
        }));
    }
}

module.exports = User;