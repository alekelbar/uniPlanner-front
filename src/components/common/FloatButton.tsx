import { Fab, ZIndex } from "@mui/material";
import { Box, SxProps } from "@mui/system";

interface AddFloatButtonProps {
  onAction: () => void;
  icon: JSX.Element;
  sxProps: SxProps;
}

export function FloatButton({
  onAction,
  icon,
  sxProps,
}: AddFloatButtonProps): JSX.Element {
  
  return (
    <Box
      data-testid={"float-button"}
      sx={{
        ...sxProps,
        zIndex: theme => ((theme.zIndex) as ZIndex).modal,
      }}
    >
      <Fab
        onClick={onAction}
        sx={{
          width: { xs: "4em", md: "6em" },
          height: { xs: "4em", md: "6em" },
          cursor: "pointer",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {icon}
      </Fab>
    </Box>
  );
}
