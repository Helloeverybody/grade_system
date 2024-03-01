export class Employee {
    role;
    grade;

    constructor(role, grade) {
        this.role = role;
        this.grade = grade;
    }

    toDto() {
        return {
            role: this.role,
            grade: this.grade?.toDto()
        }
    }
}

