export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string

    constructor(id: number, firstName: string, lastName: string, email: string, role: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}
