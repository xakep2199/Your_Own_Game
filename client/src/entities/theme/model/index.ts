export interface ITheme {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ThemeArrayType = Array<ITheme>;