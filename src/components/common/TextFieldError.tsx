import { Alert, Typography } from "@mui/material";

export const TextFieldError = ({ msg }: { msg: string }) => {
  return (
    <Alert variant="standard" color="error">
      <Typography variant="caption">{msg}</Typography>
    </Alert>
  );
};
