import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderOverlayProps {
  loading: boolean;
  children: React.ReactNode;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ loading, children }) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Renderiza os filhos normalmente */}
      {children}

      {/* Exibe o loader apenas quando `loading` for true */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default LoaderOverlay;
