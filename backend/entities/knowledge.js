export class Knowledge {
    /** название */
    title;
    /** что человек должен знать */
    description;
    /** категория вопроса */
    category;
    /** список юрлов для подготовки */
    helpLinks = new Map();
}
