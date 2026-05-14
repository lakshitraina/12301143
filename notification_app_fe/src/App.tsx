import { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notifications";
import type { Notification } from "./types";

const priorityMap: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const typeConfig: Record<string, { color: string; bg: string }> = {
  Placement: { color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  Result:    { color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  Event:     { color: "#f97316", bg: "rgba(249,115,22,0.12)"  },
};

function NotificationCard({ notification }: { notification: Notification }) {
  const cfg = typeConfig[notification.Type] ?? { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" };

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 16,
        padding: "20px",
        border: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <span
        style={{
          alignSelf: "flex-start",
          backgroundColor: cfg.bg,
          color: cfg.color,
          padding: "4px 12px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.04em",
        }}
      >
        {notification.Type}
      </span>

      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.55,
          color: "#cbd5e1",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {notification.Message}
      </p>

      <span
        style={{
          fontSize: 12,
          color: "#475569",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {new Date(notification.Timestamp).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadData() {
      const data = await fetchNotifications();
      setNotifications(data);
    }
    loadData();
  }, []);

  const sorted = [...notifications].sort((a, b) => {
    const pd = priorityMap[b.Type] - priorityMap[a.Type];
    if (pd !== 0) return pd;
    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });

  const topNotifications = sorted.slice(0, 10);

  const filtered =
    filter === "All"
      ? sorted
      : sorted.filter((n) => n.Type === filter);

  const filters = ["All", "Placement", "Result", "Event"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #020617; }

        .filter-btn {
          padding: 9px 18px;
          border-radius: 10px;
          border: 1px solid #1e293b;
          cursor: pointer;
          background: transparent;
          color: #64748b;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }

        .filter-btn:hover {
          background: #1e293b;
          color: #94a3b8;
        }

        .filter-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #fff;
        }

        .notif-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        @media (max-width: 480px) {
          .notif-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #020617 0%, #0f172a 100%)",
          padding: "clamp(20px, 5vw, 48px) clamp(16px, 4vw, 32px)",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 48px)",
                fontWeight: 600,
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Notifications
            </h1>
            <p style={{ color: "#475569", fontSize: "clamp(13px, 2vw, 15px)" }}>
              Priority-sorted activity feed
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: "clamp(28px, 4vw, 44px)",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Top Priority */}
          <section style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
            <h2
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#334155",
                fontFamily: "'DM Mono', monospace",
                marginBottom: 16,
              }}
            >
              Top Priority
            </h2>
            <div className="notif-grid">
              {topNotifications.map((n) => (
                <NotificationCard key={n.ID} notification={n} />
              ))}
            </div>
          </section>

          {/* All / Filtered */}
          <section>
            <h2
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#334155",
                fontFamily: "'DM Mono', monospace",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {filter === "All" ? "All Notifications" : filter}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "#1d4ed8",
                  background: "rgba(29,78,216,0.12)",
                  padding: "2px 8px",
                  borderRadius: 999,
                  letterSpacing: "0.04em",
                }}
              >
                {filtered.length}
              </span>
            </h2>
            <div className="notif-grid">
              {filtered.map((n) => (
                <NotificationCard key={n.ID} notification={n} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p
                style={{
                  color: "#334155",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  marginTop: 24,
                }}
              >
                No notifications of this type.
              </p>
            )}
          </section>

        </div>
      </div>
    </>
  );
}