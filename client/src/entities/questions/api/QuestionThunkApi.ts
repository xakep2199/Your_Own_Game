import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosInstance, type ServerResponseType } from "@/shared";
import { type QuestionArrayType } from "@/entities";

export const getQuestionsByThemeIdThunk = createAsyncThunk<ServerResponseType<QuestionArrayType>, number, { rejectValue: ServerResponseType }>("questions/getQuestionsByThemeId", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<ServerResponseType<QuestionArrayType>>(`/questions/theme/${id}`);
        return data;
    } catch (error) {
        const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
    }
})