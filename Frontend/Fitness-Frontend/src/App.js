import "./App.css";
import Dashbord from "./Pages/Dashbord";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./Pages/LoginPage";
import { PrivateRouteLogin } from "./utils/PrivateRoute";
import Register from "./Pages/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import FitnessApp from "./Pages/Ui";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                <PrivateRouteLogin>
                  <LoginPage />
                </PrivateRouteLogin>
              }
            />

            <Route
              path="/dashbord"
              element={
                <PrivateRoute>
                  <Dashbord />
                </PrivateRoute>
              }
            />

            <Route path="/logout" element={<h1>Not Found</h1>} />
            <Route path="/" element={<Home />} />
            <Route path="/ui" element={<FitnessApp />} />
          </Routes>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
