"use server";

import Journey, { IJourney } from "@/database/journey.model";
import dbConnect from "../mongoose";

export interface GroupedData {
  [year: number]: {
    [month: number]: IJourney[];
  };
}

export async function fetchGroupedData(): Promise<GroupedData> {
  try {
    await dbConnect();

    // Отримання даних з бази
    const journeys = await Journey.find({}).exec();

    // Перевірка та обробка даних
    const groupedData: GroupedData = {};
    journeys.forEach((journey) => {
      if (!journey.start) {
        console.warn("Skipping invalid entry:", journey);
        return;
      }

      const date = new Date(journey.start);
      if (isNaN(date.getTime())) {
        console.warn("Invalid date format:", journey.start);
        return;
      }

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (!groupedData[year]) {
        groupedData[year] = {};
      }

      if (!groupedData[year][month]) {
        groupedData[year][month] = [];
      }

      groupedData[year][month].push(journey);
    });

    return groupedData;
  } catch (error) {
    console.error("Error in fetchGroupedData:", error);
    return {};
  }
}
