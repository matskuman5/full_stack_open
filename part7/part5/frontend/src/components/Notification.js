import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null || notification === "") {
    return null;
  }

  const notificationStyle = notification.includes("error:")
    ? "error"
    : "success";

  return <Alert severity={notificationStyle}>{notification}</Alert>;
};

export default Notification;
