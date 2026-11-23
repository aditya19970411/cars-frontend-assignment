import { Box, CircularProgress, Typography } from "@mui/material";

export interface LoadingStateProps {
  message?: string;
  minHeight?: number | string;
}

export const LoadingState = ({
  message = "Loading...",
  minHeight = 240,
}: LoadingStateProps) => {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={message}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        gap: 2,
        p: 4,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
