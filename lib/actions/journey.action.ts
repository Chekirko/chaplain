"use server";

import Journey from "@/database/journey.model";

import logger from "../logger";
import dbConnect from "../mongoose";
import { CreateJourneyParams, EditJourneyParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createJourney({ data, author }: CreateJourneyParams) {
  try {
    dbConnect();

    const journeyData = {
      ...data,
      author: author,
      start: data.start instanceof Date ? data.start : new Date(data.start!),
      finish:
        data.finish instanceof Date ? data.finish : new Date(data.finish!),
    };

    const newJourney = await Journey.create(journeyData);

    if (!newJourney) {
      throw new Error("Error creating journey");
    }
    logger.info("Journey created successfully");
  } catch (error) {
    logger.error(error);
  }
}

export async function editJourney(params: EditJourneyParams) {
  try {
    dbConnect();

    const { id, data, path } = params;

    const journeyData = {
      ...data,
      start: data.start instanceof Date ? data.start : new Date(data.start!),
      finish:
        data.finish instanceof Date ? data.finish : new Date(data.finish!),
    };

    const journey = await Journey.findByIdAndUpdate(id, { ...journeyData });

    if (!journey) {
      throw new Error("Journey not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getPatientByDate(year: number, month: number) {
  try {
    const data = await Journey.find({
      start: {
        $gte: new Date(year, month - 1, 1), // Початок місяця
        $lt: new Date(year, month, 1), // Початок наступного місяця
      },
    }).exec();
    return data;
  } catch (error) {
    console.error("Error fetching data by year and month:", error);
    return null;
  }
}
