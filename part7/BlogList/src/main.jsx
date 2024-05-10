import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/NotificationReducer";
import BlogReducer from "./reducers/BlogReducer";
import UserReducer from "./reducers/UserReducer";
import AllUsersReducer from "./reducers/AllUsersReducer";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: BlogReducer,
    user: UserReducer,
    allUsers: AllUsersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
