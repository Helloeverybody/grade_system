export interface IDepartmentSettingsEditable {
    defaultPerformanceReviewModel?: {
        title: string,
        agenda: string,
        timeFromEmploymentDay: number
    },
    defaultFirstTargets?: {
        title: string,
        description: string
    }[]
}
