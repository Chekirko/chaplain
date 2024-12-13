import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  role: z.enum(["user", "admin", "editor"]),
});

export const AddJourneySchema = z.object({
  start: z.date(),
  finish: z.date(),

  church: z.string().min(1, { message: "Церкву потрібно вказати обов'язково" }),
  vector: z.string().min(1, {
    message: "Напрямок поїздки (область) потрібно вказати обов'язково",
  }),
  chief: z.string().min(1, {
    message: "Відповідального за поїздку потрібно вказати обов'язково",
  }),
  chiefPhone: z.string().min(1, {
    message: "Телефон відповідального потрібно вказати обов'язково",
  }),
  members: z.string().min(1, {
    message: "Кількість учасників потрібно вказати обов'язково",
  }),
  comment: z.string().optional(),

  status: z.enum(["planned", "progress", "finished", "cancelled"]),
});

export const SignInWithOAuthSchema = z.object({
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z.string().url("Invalid image URL").optional(),
  }),
});
