export class KnowledgeBase {
    /** Список знаний */
    knowledgeList = [];
    getKnowledgeByCategory(requestedCategory) {
        return this.knowledgeList.filter((knowledge) => knowledge.category === requestedCategory)
    }

    addKnowledge(knowledge) {
        this.knowledgeList.push(knowledge);
    }
}
