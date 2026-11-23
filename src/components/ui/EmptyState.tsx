import type { ReactNode } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 6,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
        my: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          color: "text.secondary",
        }}
      >
        {icon ?? <SearchOffIcon sx={{ fontSize: 56, opacity: 0.7 }} />}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 460, mx: "auto", mb: actionLabel ? 3 : 0 }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="outlined" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
};
