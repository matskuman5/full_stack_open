const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = message.includes("error:")
    ? {
        color: "red",
      }
    : {
        color: "green",
      };

  return (
    <div className="error" style={notificationStyle}>
      <h1>{message}</h1>
    </div>
  );
};

export default Notification;
