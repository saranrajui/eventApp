export class User {
    public Id: string;
    public age: number;
    public name: string;
    public company: string;
    public email: string;
    public phone: string;

    constructor(data: any = {}) {
        this.Id = data.Id ? data.Id : ``;
        this.age = data.age ? data.age : 0;
        this.name = data.name ? data.name[`first`] + ` ` + data.name[`last`] : `User`;
        this.company = data.company ? data.company : ``;
        this.email = data.email ? data.email : ``;
        this.phone = data.phone ? data.phone : '+1 (XXX) XXX-XXXX';
    }
}
