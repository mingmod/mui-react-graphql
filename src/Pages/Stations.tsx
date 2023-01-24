import { Box, LinearProgress } from "@mui/material";
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { Station, useStations } from "../Hooks/useStations";

export const StationsContext = createContext<Station[]>([]);

export const Stations: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { data = [] } = useStations();
  
  return data.length ? (
    <StationsContext.Provider value={data}>
      <Outlet />
    </StationsContext.Provider>
  ) : (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};
