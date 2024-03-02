import {Knowledge} from "./knowledge";
import {Model} from "./model";

export class KnowledgeBase extends Model {
    /** Список знаний */
    knowledgeList = new Array<Knowledge>();
    getKnowledgeByCategory(requestedCategory: string) {
        return this.knowledgeList.filter((knowledge) => knowledge.category === requestedCategory)
    }

    addKnowledge(knowledge: Knowledge) {
        this.knowledgeList.push(knowledge);
    }
}
