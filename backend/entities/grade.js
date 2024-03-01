export class Grade {
    knowledgeBase;

    toDto() {
        return {
            knowledgeBase: knowledgeBase?.toDto()
        }
    }
}

