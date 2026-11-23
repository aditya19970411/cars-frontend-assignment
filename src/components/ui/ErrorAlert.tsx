import { Alert, AlertTitle, Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorAlertProps) => {
  return (
    <Box role="alert" sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={() => onRetry()}
            >
              Retry
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};
