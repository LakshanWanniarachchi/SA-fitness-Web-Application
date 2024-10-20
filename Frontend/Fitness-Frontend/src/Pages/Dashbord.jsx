import React from "react";
import { Box, Stack } from "@mui/material";
import RightBar from "../components/RightBar";
import SideButton from "../components/Sidebar";
import MiddleBar from "../components/MiddleBar";
import Nav from "../components/Nav";
import Speedometer from "../components/Speedometer";
import BelowButton from "../components/BelowBar";
import Tips from "../components/Tips";
import WeightLineChart from "../components/WeightLineChart"; // Updated import

const Dashbord = () => {
  return (
    <Box>
      <Nav />

      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <MiddleBar />
        <WeightLineChart />
      </Stack>
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <Speedometer />
        <RightBar />
      </Stack>

      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <Tips />
      </Stack>
    </Box>
  );
};

export default Dashbord;
