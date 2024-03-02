import {Model} from "./model";
import {GradeTree} from "./grade-tree";
import {Employee} from "./employee";

export class Department extends Model {
    director: Employee;
    employees: Employee[];
    gradeTree: GradeTree;
}

