import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useComments } from "./useComments";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  maxHeight: "50%",
  overflow: "auto",
};
interface ICommentProps {
  open: boolean;
  handleClose: () => void;
  id: number | null;
}

const sx = {
  padding: "10px 20px",
  marginBottom: "10px",
  borderRadius: "20px",
};

const rightStyle = {
  marginLeft: "40px",
  backgroundColor: "#1976d2",
  color: "white",
};

const leftStyle = {
  marginRight: "40px",
  backgroundColor: "#7EA5C4",
  color: "black",
};
export default function Comments({ open, handleClose, id }: ICommentProps) {
  const {
    handleComment,
    comments,
    commentText,
    loading,
    addComment,
    handleKeyPress,
    userId,
  } = useComments(String(id));
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            paddingBottom={4}
          >
            Event Comments
          </Typography>
          {loading ? (
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
            >
              {" "}
              <CircularProgress />
            </Box>
          ) : (
            comments?.map((comment) => (
              <Paper
                key={comment.id}
                style={{
                  ...sx,
                  ...(userId === String(comment.user.id)
                    ? rightStyle
                    : leftStyle),
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4
                      style={{ margin: 0, textAlign: "left", color: "black" }}
                    >{`${comment.user.firstName} ${comment.user.lastName}`}</h4>
                    <p style={{ textAlign: "left" }}>{comment.text}</p>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}

          <Box sx={{ paddingTop: "15px" }}>
            <TextField
              id="standard-name"
              label="Message"
              value={commentText}
              rows={2}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={addComment}>
                    <Send />
                  </IconButton>
                ),
              }}
              onChange={handleComment}
              onKeyDown={handleKeyPress}
            />
          </Box>
        </Box>
      }
    </Modal>
  );
}
