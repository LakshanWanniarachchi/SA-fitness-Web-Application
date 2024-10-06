import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import MealPlan from "./TextCoveter";
import axios from "axios";

const Tips = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTip = async () => {
    setLoading(true);
    try {
      // Replace this URL with your actual Gemini AI endpoint
      const response = await axios.get(
        "https://api.example.com/gemini-ai/health-tip"
      );
      setTip(response.data.tip);
    } catch (error) {
      console.error("Error fetching health tip:", error);
      setTip(
        "Unable to fetch health tip at the moment. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Paper
        elevation={3}
        sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Health Tip of the Day
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="body1" paragraph sx={{ minHeight: "180px" }}>
              <MealPlan />
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Tips;
