import { FiBell } from "react-icons/fi";
import { notifications } from "../../config/crmData.jsx";

export function NotificationsPanel({ onClose }) {
  return (
    <aside className="notifications-panel" aria-label="Notifications panel">
      <header>
        <h3>
          <FiBell size={16} aria-hidden="true" /> Notifications
        </h3>
        <button className="link-btn" type="button" onClick={onClose}>
          Mark all read
        </button>
      </header>
      <div className="notif-tabs">
        <button className="active" type="button">
          All
        </button>
        <button type="button">Overdue</button>
        <button type="button">Assignments</button>
      </div>
      <div className="notif-list">
        {notifications.map((item) => (
          <article
            key={item.text}
            className={`notif-item ${item.tone} ${item.unread ? "unread" : ""}`}
          >
            <p>{item.text}</p>
            <time>{item.time}</time>
          </article>
        ))}
      </div>
    </aside>
  );
}
