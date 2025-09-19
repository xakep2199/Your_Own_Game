import { type StatisticsArrayType, STATISTICS_API_ROUTE } from "@/entities";
import { AxiosError } from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ServerResponseType, axiosInstance } from "@/shared";


export const getAllStatisticsByUserIdThunk = createAsyncThunk<StatisticsArrayType, void, { rejectValue: string }>("statistics/getAllStatisticsByUserId", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<ServerResponseType<StatisticsArrayType>>(`${STATISTICS_API_ROUTE}`);
        return data.data;
    } catch (error) {
        const err = error as AxiosError<ServerResponseType>;
        return rejectWithValue(err.response!.data.error || "Ошибка при получении статистики");
    }
});