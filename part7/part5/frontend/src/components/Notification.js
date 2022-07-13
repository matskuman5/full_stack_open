import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  const notificationStyle = notification.includes("error:")
    ? {
        color: "red",
      }
    : {
        color: "green",
      };

  return (
    <div className="error" style={notificationStyle}>
      <h1>{notification}</h1>
    </div>
  );
};

export default Notification;
