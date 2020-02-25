export class UserInfo {
    userId: string;
    email: string;
    name: string;
    private $token: string;

    get token() {
        return this.$token;
    }

    set token(tk) {
        this.$token = tk;
    }

    constructor(userId: string, email: string, name: string, token: string) {
        this.userId = userId;
        this.$token = token;
        this.email = email;
        this.name = name;
    }
}
