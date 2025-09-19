export interface IQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  points: number;
  themeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type QuestionArrayType = Array<IQuestion>;