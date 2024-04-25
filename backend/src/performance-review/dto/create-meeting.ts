export interface ICreateMeeting {
    startDateTime: Date,
    agenda: string,
    title: string,
    reviewer?: string
    otherParticipants?: string[],
}