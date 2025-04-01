import { apiSlice } from "../services/apiSlice";
import { TimetableType, TimetableNameType, SubscriptionType, unitsType } from "@/types/exports";

const timetableSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: ({ batchId, file }) => {
                const formData = new FormData();
                formData.append("batch_id", batchId);
                formData.append("file", file);

                return {
                    url: "/upload/units/",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        retrieveTimetable: builder.query<TimetableType[], string>({
            query: (batchId) => ({
                url: `/timetable/${batchId}/`,
            }),
        }),
        retrieveTimetableData: builder.query<TimetableType, string>({
            query: (rowId) => ({
                url: `/timetable/get/${rowId}/`,
            }),
        }),
        getTimetableNames: builder.query<TimetableNameType[], void>({
            query: () => ({
                url: "/timetable/names/",
            }),
        }),
        generateTimetable: builder.mutation({
            query: ({
                batch_id,
                start_time,
                end_time,
                first_constrain,
                second_constrain,
                duration,
                prompt }) => ({
                    url: "generate/timetable/",
                    method: "POST",
                    body: {
                        batch_id,
                        start_time,
                        end_time,
                        first_constrain,
                        second_constrain,
                        duration,
                        prompt,
                    },
                }),
        }),
        exportTimetable: builder.mutation({
            query: ({ batch_id, email }) => ({
                url: "export/timetable/",
                method: "POST",
                body: {
                    batch_id,
                    email,
                },
            }),
        }),

        subscribe: builder.mutation({
            query: ({ phone_number, amount }) => ({
                url: "/subscribe/",
                method: "POST",
                body: {
                    phone_number,
                    amount,
                },
            }),
        }),
        getSubscription: builder.query<SubscriptionType, void>({
            query: () => ({
                url: "/user/subscription/",
            }),
        }),
        getUnits: builder.query<unitsType, void>({
            query: () => ({
                url: "/user/units/",
            }),
        }),
    }),
});

export const {
    useGetUnitsQuery,
    useSubscribeMutation,
    useUploadFileMutation,
    useGetSubscriptionQuery,
    useRetrieveTimetableQuery,
    useGetTimetableNamesQuery,
    useExportTimetableMutation,
    useGenerateTimetableMutation,
    useRetrieveTimetableDataQuery,
} = timetableSlice;
