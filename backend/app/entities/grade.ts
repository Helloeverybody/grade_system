import {KnowledgeBase} from "./knowledge-base";
import {Model} from "./model";

export class Grade extends Model {
    knowledgeBase: KnowledgeBase;

    toDto() {
        return {
            knowledgeBase: this.knowledgeBase?.toDto()
        }
    }
}

