const {z} = require("zod");


const loginSchema = z.object({
    email: z
    .string({required_error:"Email Is Required"})
    .trim()
    .email({message:"Inavlid Email Address"})
    .min(3, {message:"Email must be at least of 3 characters"})
    .max(255, {message:"Email must not be more than 255 characters"})
    .toLowerCase().endsWith('@gmail.com'),

    password: z
    .string({required_error:"Password Is Required"})
    .min(8, {message:"Password must be at least of 8 characters"})
    .max(1024, {message:"Password must not be more than 1024 characters"}),
})

// creating an object schema

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name Is Required"})
    .trim()
    .min(3, {message:"Name must be at least of 3 characters"})
    .max(255,{message:"name must not be more than 255 characters"}),
});


module.exports = {signupSchema, loginSchema}; 