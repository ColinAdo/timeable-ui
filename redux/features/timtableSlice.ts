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
    }),
});

export const { useUploadFileMutation } = timetableSlice;
