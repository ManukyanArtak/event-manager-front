import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { EventData } from "../../../interfaces/event";
import { Delete, Chat, Edit } from "@mui/icons-material";
import { CardActionArea, CardActions } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  event: EventData;
  askDeleteEvent: (id: number) => void;
  handleEditModal: (id: number) => void;
  handleOpenComment: (id: number) => void;
}

export default function Card({
  event,
  askDeleteEvent,
  handleEditModal,
  handleOpenComment,
}: Props) {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box
          sx={{
            height: 100,
            borderRadius: 0,
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#0c57a1",
            },
          }}
        />
        <CardContent>
          <Typography align="left" gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography align="left" variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography align="right" component="div">
            {dayjs(event.date).format("YYYY-MM-DD HH:MM")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="comment"
          color="success"
          onClick={() => handleOpenComment(event.id)}
        >
          <Chat />
        </IconButton>
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => handleEditModal(event.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => {
            askDeleteEvent(event.id);
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </MuiCard>
  );
}
