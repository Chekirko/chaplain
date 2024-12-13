"use server";

import User, { IUser } from "@/database/user.model";
import { parseStringify } from "@/lib/utils";

import logger from "../logger";
import dbConnect from "../mongoose";
import { revalidatePath } from "next/cache";

export async function getUserById(id: string) {
  console.log(id);

  try {
    dbConnect();

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    logger.info("User found successfully");
    return parseStringify(user);
  } catch (error) {
    logger.error(error);
    throw new Error("Error fetching user");
  }
}

export async function getUsers(): Promise<{ users: IUser[] }> {
  try {
    dbConnect();

    const users = await User.find({ role: "user" });

    if (!users) {
      throw new Error("User not found");
    }
    logger.info("Users found successfully");
    return { users };
  } catch (error) {
    logger.error(error);
    throw new Error("Error fetching users");
  }
}

export async function updateUserToEditor(id: string) {
  try {
    dbConnect();
    const parsedId = JSON.parse(id);

    const user = await User.findByIdAndUpdate(
      parsedId,
      { role: "editor" },
      { new: true }
    );

    revalidatePath("/users");

    if (!user) {
      throw new Error("User not found");
    }
    const parsedUser = parseStringify(user);

    return { parsedUser };
  } catch (error) {
    logger.error(error);
    throw new Error("Error fetching users");
  }
}
