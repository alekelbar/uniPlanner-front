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
} from "@mui/material";
import Link from "../common/Link";
import { pages } from "./helpers/pages";
import { useSideBar } from "./hooks/useSideBar";
import { useRouter } from "next/router";

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
          // width: 150,
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
        <List sx={{ mb: 2 }}>
          <ListItem>
            <ListItemIcon>
              <Avatar src="https://scontent.fsjo9-1.fna.fbcdn.net/v/t39.30808-6/301999029_768418684471692_6904334561164990019_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TJw0dH_UN8UAX-il7VE&_nc_ht=scontent.fsjo9-1.fna&oh=00_AfA1l4mwYw9AqIzm0Zj-ex_ue7HrVMW3HtnbEdI0w2gMlQ&oe=644BB05C" />
            </ListItemIcon>
            <ListItemText
              primary={user?.fullname}
              secondary={user?.email}
              sx={{ mb: 1 }}
            />
          </ListItem>
        </List>
        <Divider sx={{ mb: 2 }} />
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
      </Drawer>
    </Container>
  );
}
