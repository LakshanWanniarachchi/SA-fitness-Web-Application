import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected the import for jwtDecode
import { useNavigate } from "react-router-dom";
import Speedometer from "../components/Speedometer";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => JSON.parse(localStorage.getItem("authToken")) || null
  );

  const navigate = useNavigate(); // Make sure navigate is defined here
  const [user, setUser] = useState(() =>
    authToken ? jwtDecode(authToken.access) : null
  );
  const [loading, setLoading] = useState(false);
  const [refreshBMICalories, setRefreshBMICalories] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      setAuthToken(token);
      setUser(jwtDecode(token.access));
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login"); // Use navigate instead of navigation
  }, [navigate]); // Add navigate to dependency array

  const updateToken = useCallback(async () => {
    console.log("Updating token...");
    const response = await fetch("http://159.100.18.155/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authToken?.refresh }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logout();
    }
    setLoading(false);
  }, [authToken, logout]);

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 240000); // 4-minute interval
    return () => clearInterval(interval);
  }, [authToken, loading, updateToken]);

  const login = async (username, password) => {
    console.log("Logging in...");
    const response = await fetch("http://159.100.18.155/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/Dashbord"); // Corrected navigation to navigate
    } else {
      throw new Error(data.error);
    }
  };

  const Registration = async (formData) => {
    console.log("registration...");

    try {
      const response = await fetch("http://159.100.18.155/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          userprofile: {
            birthday: formData.birthday,
            sex: formData.sex,
          },
        }),
      });

      console.log(formData);

      const data = await response.json();
      if (response.status === 201) {
        setAuthToken(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/Dashbord");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const CalorieBurnCalculator_api = async (
    weight,
    height,
    duration,
    activity
  ) => {
    const response = await fetch("http://159.100.18.155/api/bmi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.access}`,
      },
      body: JSON.stringify({
        weight: weight,
        height: height,
        duration_hours: duration,
        activity: activity,
      }),
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log(`Calories burned: ${data.calories_burned}`);
      setRefreshBMICalories(true);
    } else {
      alert("Error calculating calories burned");
    }
  };

  const get_diet = async () => {
    try {
      const response = await fetch("http://159.100.18.155/api/get_diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.access}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        return data.diet_plan;
      } else {
        alert("No diet data found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    login,
    user,
    logout,
    authToken,
    Registration,
    CalorieBurnCalculator_api,
    refreshBMICalories,
    setRefreshBMICalories,
    get_diet,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
