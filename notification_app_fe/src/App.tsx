import { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notifications";
import type { Notification } from "./types";

function App() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("All");
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  useEffect(() => {

    async function loadData() {
      const data = await fetchNotifications();
      setNotifications(data);
    }

    loadData();

  }, []);

  const priorityMap: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const sortedNotifications = [...notifications].sort((a, b) => {

    const priorityDifference =
      priorityMap[b.Type] - priorityMap[a.Type];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (
      new Date(b.Timestamp).getTime() -
      new Date(a.Timestamp).getTime()
    );
  });

  const topNotifications = sortedNotifications.slice(0, 10);

  const filteredNotifications =
    filter === "All"
      ? sortedNotifications
      : sortedNotifications.filter(
          (notification) => notification.Type === filter
        );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Notification Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Placement")}>
          Placement
        </button>

        <button onClick={() => setFilter("Result")}>
          Result
        </button>

        <button onClick={() => setFilter("Event")}>
          Event
        </button>

      </div>

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Top Priority Notifications
      </h2>

      {topNotifications.map((notification) => (

        <div
          key={notification.ID}
          onClick={() => {

            if (
              !readNotifications.includes(notification.ID)
            ) {

              setReadNotifications([
                ...readNotifications,
                notification.ID,
              ]);

            }

          }}
          style={{
            border: "1px solid #334155",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "16px",
            backgroundColor: "#1e293b",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            opacity: readNotifications.includes(notification.ID)
              ? 0.6
              : 1,
            cursor: "pointer",
            transition: "0.3s",
          }}
        >

          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <small>{notification.Timestamp}</small>

        </div>

      ))}

      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        All Notifications
      </h2>

      {filteredNotifications.map((notification) => (

        <div
          key={notification.ID}
          onClick={() => {

            if (
              !readNotifications.includes(notification.ID)
            ) {

              setReadNotifications([
                ...readNotifications,
                notification.ID,
              ]);

            }

          }}
          style={{
            border: "1px solid #334155",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "16px",
            backgroundColor: "#1e293b",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            opacity: readNotifications.includes(notification.ID)
              ? 0.6
              : 1,
            cursor: "pointer",
            transition: "0.3s",
          }}
        >

          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <small>{notification.Timestamp}</small>

        </div>

      ))}

    </div>
  );
}

export default App;