import { List, Paper, Theme, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanTaskModel } from "../../redux/slices/kanban/models/taskModel";
import { BoardItem } from "./BoardItem";
import styles from "./css/BoardList.module.css";
import { useTheme } from "@emotion/react";

interface BoardListProps {
  droppableId: string;
  listOfItems: KanbanTaskModel[];
  header: string;
}

export const BoardList = React.memo(
  ({ droppableId, listOfItems, header }: BoardListProps): JSX.Element => {
    const theme: Partial<Theme> = useTheme();
    const isFullScreen = useMediaQuery(theme?.breakpoints!.down("sm"));

    return (
      <Paper
        sx={{
          p: 2,
          minWidth: (theme) => (isFullScreen ? "90%" : "30%"),
          m: 1,
          transition: "all 0.5s ease-in-out",
          scrollBehavior: "smooth",
          ...styles,
        }}
      >
        <Typography variant="body1">{header}</Typography>
        <Droppable droppableId={droppableId}>
          {(droppableProvided) => (
            <List
              component={"div"}
              sx={{
                transition: "all 0.3s",
              }}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {listOfItems.map((item, idx) => (
                <BoardItem
                  task={item}
                  draggableId={item.id}
                  index={idx}
                  key={item.id}
                  idx={idx}
                />
              ))}
              {droppableProvided.placeholder}
            </List>
          )}
        </Droppable>
      </Paper>
    );
  }
);

BoardList.displayName = "BoardList";
