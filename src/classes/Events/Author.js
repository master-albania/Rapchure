class Author {
    constructor(d) {
        this.username = d.username;
        this.bot = d.bot;
        this.publicFlags = d.public_flags;
        this.primaryGuild = d.primary_guild;
        this.id = d.id;
        this.globalName = d.global_name;
        this.displayName = d.display_name;
        this.avatar = d.avatar; 
    }
}

module.exports = Author;