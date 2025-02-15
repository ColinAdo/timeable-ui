import { apiSlice } from "../services/apiSlice";

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
        retrieveTimetable: builder.query<void, string>({
            query: (batchId) => ({
                url: `/timetable/${batchId}/`,
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
    }),
});

export const {
    useUploadFileMutation,
    useRetrieveTimetableQuery,
    useGenerateTimetableMutation,
} = timetableSlice;
