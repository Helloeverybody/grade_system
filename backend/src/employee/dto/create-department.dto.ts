export interface ICreateDepartmentDto {
    director: string,
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
