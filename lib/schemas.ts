import * as z from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, {
        message: "username is required",
    }),
    email: z
        .string()
        .min(1, {
            message: "email is required",
        })
        .email({
            message: "Enter a valid email address",
        }),
    password: z.string().min(1, {
        message: "password is required",
    }),
    re_password: z.string().min(1, {
        message: "confirm password is required",
    }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "email is required",
        })
        .email({
            message: "Enter a valid email address",
        }),
    password: z.string().min(1, {
        message: "password is required",
    }),
});

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "email is required",
        })
        .email({
            message: "Enter a valid email address",
        }),
});

export const resetPasswordConfirmSchema = z.object({
    new_password: z.string().min(1, {
        message: "new password is required",
    }),
    re_new_password: z.string().min(1, {
        message: "confirm new password is required",
    }),
});

export const createTimetableSchema = z.object({
    batch_id: z.string().min(1, "Batch ID is required."),
    start_time: z.string().min(1, "Start time is required."),
    end_time: z.string().min(1, "End time is required."),
    first_constrain: z.string().optional(),
    second_constrain: z.string().optional(),
    duration: z.string().min(1, "Class duration is required."),
    prompt: z.string().optional(),
}).refine(
    (data) =>
        !(data.first_constrain && data.second_constrain) ||
        data.first_constrain !== data.second_constrain,
    {
        message: "The constrain must be different!",
        path: ["second_constrain"],
    }
).refine((data) => data.start_time !== data.end_time, {
    message: "Start time and end time must not be the same!",
    path: ["end_time"],
});

export const EditTimetableSchema = z.object({
    start_time: z.string().min(1, "Start time is required."),
    end_time: z.string().min(1, "End time is required."),
    day: z.string().min(1, "Day is required."),
    unit_name: z.string().min(1, "Unit name is required."),
    unit_code: z.string().min(1, "Unit code is required."),
    lecturer: z.string().optional(),
    campus: z.string().optional(),
    mode: z.string().optional(),
    room: z.string().optional(),
    group: z.string().optional(),
});

export const renameSchema = z.object({
    name: z.string().min(1, "This field is required."),
});

export const SubscribeSchema = z.object({
    phone_number: z.string().min(10, "Phone number is required or must be 10 characters."),
    amount: z.string().min(1, "Amount is required."),
    // user: z.string().min(1, "Unit code is required."),
});
