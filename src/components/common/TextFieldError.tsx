import { Alert, Typography } from "@mui/material";

export const TextFieldError = ({ msg }: { msg: string }) => {
  return (
    <Alert variant="filled" sx={{ bgcolor: "primary.main" }}>
      <Typography variant="body1">{msg}</Typography>
    </Alert>
  );
};
