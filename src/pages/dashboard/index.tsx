import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "../../components/shared/card";
import Header from "../../components/layout/Header";
import DeleteEventModal from "../../components/shared/modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddEditEventModal from "../../components/shared/modal/AddEditEvent";
import { useDashboard } from "./useDashboard";
import Comments from "../../components/shared/comments/Comments";

export default function Dashboard() {
  const {
    askDeleteEvent,
    handleAddEvent,
    handleUpdateEvent,
    handleCloseDeleteModal,
    handleOpenEditModal,
    handleCloseEditModal,
    data,
    editId,
    editItem,
    openCreateModal,
    deleteId,
    handleToggleCreateModal,
    handleDelete,
    handleOpenComment,
    handleCloseComment,
    commentId,
  } = useDashboard();

  return (
    <>
      <Header />

      <Container>
        <Grid container spacing={2} pt={2}>
          {data?.getEvents.map((event) => (
            <Grid item xs={4} key={event.id}>
              <Card
                event={event}
                askDeleteEvent={askDeleteEvent}
                handleEditModal={handleOpenEditModal}
                handleOpenComment={handleOpenComment}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <DeleteEventModal
        handleDelete={handleDelete}
        open={Boolean(deleteId)}
        handleClose={handleCloseDeleteModal}
      />

      <AddEditEventModal
        open={openCreateModal}
        handleSubmit={handleAddEvent}
        closeModal={() => handleToggleCreateModal(false)}
      />

      <AddEditEventModal
        open={Boolean(editId)}
        id={editId}
        handleSubmit={handleUpdateEvent}
        closeModal={handleCloseEditModal}
        values={editItem}
      />

      {Boolean(commentId) ? (
        <Comments
          open={Boolean(commentId)}
          handleClose={handleCloseComment}
          id={commentId}
        />
      ) : null}

      <Fab
        size={"large"}
        color="primary"
        aria-label="add"
        onClick={() => handleToggleCreateModal(true)}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
