import {Grade} from "./grade";
import {Model} from "./model";
import {Role} from "./roles.enum";

export class Employee extends Model {
    role: Role;
    grade: Grade;

    constructor(role: Role, grade: Grade) {
        super()
        this.role = role;
        this.grade = grade;
    }

    override toDto() {
        return {
            role: this.role,
            grade: this.grade?.toDto()
        }
    }
}

