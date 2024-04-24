import { Dayjs } from "dayjs";

export interface AddEventData {
  name: string;
  description: string;
  date: Dayjs | string | undefined;
}

export interface EventData {
  id: number;
  name: string;
  description: string;
  date: string;
}

export interface GetEventsResult {
  getEvents: Array<EventData>;
}
