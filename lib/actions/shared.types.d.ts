import { IJourney } from "@/database/journey.model";

export interface getPatientByIdParams {
  id: string;
}

export interface CreateJourneyParams {
  data: Partial<IJourney>;
  author: string;
}
export interface EditJourneyParams {
  id: string;
  data: Partial<IJourney>;
  path: string;
}
