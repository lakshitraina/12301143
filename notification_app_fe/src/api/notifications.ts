import axios from "axios";
import type { Notification } from "../types";
import { Log } from "../utils/logger";
import { TOKEN } from "../config";

export async function fetchNotifications(): Promise<Notification[]> {

  try {

    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications"
    );

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (response.data && response.data.notifications) {
      return response.data.notifications;
    }

    return [];

  } catch (error) {

    console.error(error);

    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    return [
  {
    ID: "1",
    Type: "Placement",
    Message: "Google interview shortlist released",
    Timestamp: new Date().toISOString(),
  },
  {
    ID: "2",
    Type: "Result",
    Message: "Mid semester results published",
    Timestamp: new Date().toISOString(),
  },
  {
    ID: "3",
    Type: "Event",
    Message: "Hackathon starts tomorrow",
    Timestamp: new Date().toISOString(),
  },
];
  }
}