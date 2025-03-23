import {z} from 'zod';

export const createMenuSchema = z.object({
    name: z.string({
        required_error: "Menu name is required",
        invalid_type_error: "Menu name must be a string",
    }),
    description: z.string({
        required_error: "Menu description is required",
        invalid_type_error: "Menu description must be a string",
    }),
    price: z.number({
        required_error: "Menu price is required",
        invalid_type_error: "Menu price must be a number",
    }),
    image: z.string({
        required_error: "Menu image is required",
        invalid_type_error: "Menu image must be a string",
    }),
});