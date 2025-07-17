export class User {
    public id: string;
    public username: string;
    public disciminator: string;
    public avatar: string | null;
    private token: string;
    private url: string;
    public bot?: boolean;
    public system?: boolean;

    constructor(d: any, token: string, url: string) {
        this.id = d.id;
        this.username = d.username;
        this.disciminator = d.discriminator;
        this.avatar = d.avatar || null;
        this.token = token;
        this.url = url;

        if (d.bot) {
            this.bot = d.bot;
        }

        if (d.system) {
            this.system = d.system;
        }
    }
}