class User {
    constructor(d) {
        this.v = d.v;
        this.userSettings = d.user_settings;
        this.user = {
            verified: d.user.verified,
            username: d.user.username,
            primaryGuild: d.user.primary_guild,
            mfaEnabled: d.user.mfa_enabled,
            id: d.user.id,
            globalName: d.user.global_name,
            flags: d.user.flags,
            email: d.user.discriminator,
            clan: d.user.clan,
            bot: d.user.bot,
            avatar: d.user.avatar,
        };
        this.sessionType = d.session_type;
        this.sessionID = d.session_id;
        this.resumeGatewayUrl = d.resume_gateway_url;
        this.presences = d.presences;
        this.guilds = d.guilds;
    }
}

module.exports = User;