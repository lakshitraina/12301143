import axios from "axios";
import { TOKEN } from "../config";

export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
) {
  try {

    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log("Log sent");

  } catch (error) {

    console.error("Logging failed");

  }
}