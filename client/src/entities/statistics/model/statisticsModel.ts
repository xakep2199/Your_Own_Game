export interface IStatistics {
    id: number;
    userId: number;
    themaId: number;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}
export type StatisticsArrayType = Array<IStatistics>;

export const STATISTICS_API_ROUTE = "/statistics";