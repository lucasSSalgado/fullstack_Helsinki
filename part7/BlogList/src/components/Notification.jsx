import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const show = useSelector((state) => state.notification.show);

  return (
    <>
      {show ? (
        <p
          style={{
            color: "green",
            border: "1px solid green",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {message}
        </p>
      ) : null}
    </>
  );
};

export default Notification;
