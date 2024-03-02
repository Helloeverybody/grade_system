import {Model} from "./model";

export class Knowledge extends Model {
    /** название */
    title: string;
    /** что человек должен знать */
    description: string;
    /** категория вопроса */
    category: string;
    /** список юрлов для подготовки */
    helpLinks = new Map();
}
