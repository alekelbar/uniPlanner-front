import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { pages } from "./helpers/pages";
import { useSideBar } from "./hooks/useSideBar";
import { useRouter } from "next/router";
import { Close } from "@mui/icons-material";

export interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export function SideBar({ onClose, open }: SideBarProps): JSX.Element {
  const router = useRouter();
  const { drawerRef, user } = useSideBar({ onClose });
  return (
    <Container
      sx={{
        backdropFilter: "blur(20px)",
      }}
    >
      <Drawer
        sx={{
          display: !user.id ? "none" : "",
        }}
        variant="temporary"
        open={open}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            onClose();
          }
        }}
        ref={drawerRef}
      >
        <List>
          <ListItem>
            <ListItemIcon
              sx={{
                px: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  router.push(`/profile/${user.id}`);
                }}
              >
                <Avatar />
              </Button>
            </ListItemIcon>
            <ListItemText
              primary={user?.fullname}
              secondary={user?.email}
              sx={{ mb: 1 }}
            />
          </ListItem>
        </List>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption" align="center">
          Herramientas
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {pages.map((page) => {
            return (
              <Button
                key={page.title}
                variant="text"
                sx={{
                  boxShadow: "none",
                }}
                onClick={() => {
                  onClose();
                  router.push(`${page.url + user.id}`);
                }}
              >
                <ListItem
                  sx={{
                    borderBottom: router.pathname.includes(
                      page.url.split("/")[1]
                    )
                      ? ({ palette: { secondary } }) =>
                          `3px solid ${secondary.main}`
                      : "transparent",
                    color: router.pathname.includes(page.url.split("/")[1])
                      ? ""
                      : ({ palette: { text } }) => text.secondary,
                  }}
                >
                  <Stack direction={"row"}>
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.title} />
                  </Stack>
                </ListItem>
              </Button>
            );
          })}
        </List>
        <Button
          sx={{
            borderRadius: "20px",
            width: "25%",
            boxShadow: "10px",
            m: "0 auto",
            mt: 2,
          }}
          onClick={onClose}
          variant="contained"
          size="large"
        >
          <Close />
        </Button>
      </Drawer>
    </Container>
  );
}
