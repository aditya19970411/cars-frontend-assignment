import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export const CarCardSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ aspectRatio: "16 / 9" }}
        animation="wave"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="70%" height={32} />
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
