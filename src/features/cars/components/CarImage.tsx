import { Box, type BoxProps } from "@mui/material";

export interface CarImageProps extends BoxProps {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Responsive car image using standard HTML5 <picture>.
 * Breakpoints:
 * - Desktop: >= 1024px
 * - Tablet: 640px - 1023px
 * - Mobile: <= 639px (fallback)
 */
export const CarImage = ({
  mobile,
  tablet,
  desktop,
  alt,
  aspectRatio = "16 / 9",
  priority = false,
  sx,
  ...rest
}: CarImageProps) => {
  return (
    <Box
      component="picture"
      data-testid="car-picture"
      sx={{
        display: "block",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "grey.100",
        ...sx,
      }}
      {...rest}
    >
      <source
        data-testid="car-source-desktop"
        media="(min-width: 1024px)"
        srcSet={desktop}
      />
      <source
        data-testid="car-source-tablet"
        media="(min-width: 640px)"
        srcSet={tablet}
      />
      <Box
        component="img"
        data-testid="car-img"
        src={mobile}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          aspectRatio,
        }}
      />
    </Box>
  );
};
