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

  const { drawerRef, handleClose, user } = useSideBar({ onClose });

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
        onClick={handleClose}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            onClose();
          }
        }}
        ref={drawerRef}
      >
        <List
          sx={{
            bgcolor: "white",
            width: "300",
            "&:hover": {
              bgcolor: "#F5F5F5",
            },
          }}
        >
          <ListItem>
            <ListItemIcon>
              <Button
                variant="text"
                onClick={() => {
                  router.push(`/tools/profile/${user.id}`);
                }}
              >
                <Avatar src="https://scontent.fsjo9-1.fna.fbcdn.net/v/t39.30808-6/301999029_768418684471692_6904334561164990019_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PaPhWcz1HfAAX_wMYaV&_nc_ht=scontent.fsjo9-1.fna&oh=00_AfA_tE2Ex1Jm2lvhHDOhQNgk8zre3XJa-ooWEeoaN8cKFg&oe=6455939C" />
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
        <Typography variant="h5" align="center">
          Herramientas
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {pages.map((page) => {
            return (
              <Button
                key={page.title}
                onClick={() => router.push(`${page.url + user.id}`)}
                variant="text"
                sx={{
                  color: router.pathname.includes(page.url.split("/")[2])
                    ? "common.white"
                    : "text.primary",
                }}
              >
                <ListItem
                  sx={{
                    backgroundColor: router.pathname.includes(
                      page.url.split("/")[2]
                    )
                      ? ({ palette: { primary } }) => primary.dark
                      : "transparent",
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
          <Divider sx={{ mt: 2, mb: 2 }} />
        </List>
        <Button onClick={onClose} fullWidth variant="text" size="large">
          <Close />
        </Button>
      </Drawer>
    </Container>
  );
}
