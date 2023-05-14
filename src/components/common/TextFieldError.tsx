import { Alert, Typography } from "@mui/material";

export const TextFieldError = ({ msg }: { msg: string }) => {
  return (
    // <Alert variant="filled" sx={{ bgcolor: "secondary.main" }}>
    <Typography color={"red"} variant="caption">
      {msg}
    </Typography>
    // </Alert>
  );
};
