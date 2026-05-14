import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaGl0LnJhaW5hMjNAbHB1LmluIiwiZXhwIjoxNzc4NzU4MDA1LCJpYXQiOjE3Nzg3NTcxMDUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjMGYyZDVhNi1jYzdkLTQ4NTItYWJiMy03M2E4Nzc2ZDk1YjQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJsYWtzaGl0IHJhaW5hIiwic3ViIjoiNDI1Y2YyODQtNDM4Ni00YTIxLWFkYjAtM2Y1NDA3ZDFiNTQ5In0sImVtYWlsIjoibGFrc2hpdC5yYWluYTIzQGxwdS5pbiIsIm5hbWUiOiJsYWtzaGl0IHJhaW5hIiwicm9sbE5vIjoiMTIzMDExNDMiLCJhY2Nlc3NDb2RlIjoiVFJ2WldxIiwiY2xpZW50SUQiOiI0MjVjZjI4NC00Mzg2LTRhMjEtYWRiMC0zZjU0MDdkMWI1NDkiLCJjbGllbnRTZWNyZXQiOiJQYXFxblZ5TWVhZHpURmVZIn0.hONEqp2oyu4NFicXyR0q7ykz0RdTzilFrFXmvS0mZk4";

export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
) {
  try {
    const response = await axios.post(
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

    console.log("Log created successfully:", response.data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}