import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import backgroundImage from "./1.jpg";

const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="black"
            fontWeight="bold"
          >
            Welcome to FitTrack
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="black">
            Your Personal Fitness Journey Starts Here
          </Typography>
          <Button
            component={RouterLink}
            to="/Dashbord"
            variant="contained"
            color="dark"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
