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
});



// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>