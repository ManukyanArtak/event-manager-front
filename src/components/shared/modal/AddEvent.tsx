import * as React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Field, Form, Formik } from "formik";
import { AddEventSchema } from "../../../schemas/addEvent";
import { AddEventData, EventData } from "../../../interfaces/event";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../../services/grphql/events/events";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

interface IAddEventProps {
  submit: (values: any, cb: () => void) => void;
  id?: number;
}
export default function AddEvent({ submit }: IAddEventProps) {
  const tomorrow = dayjs().add(1, "day");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fabStyle = {
    position: "fixed",
    bottom: 20,
    right: 20,
  };

  const initialValues: AddEventData = {
    name: "",
    description: "",
    date: "",
  };

  const handleSubmit = async (values: AddEventData) => {
    await submit(values, handleClose);
    handleClose();
  };

  return (
    <div>
      <Fab
        sx={fabStyle}
        size={"large"}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Event
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={AddEventSchema}
          >
            {(props) => {
              return (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    helperText={props.errors.name}
                    error={!!props.errors.name}
                  />
                  <DateTimePicker
                    minDateTime={tomorrow}
                    sx={{ width: 1 }}
                    name={"date"}
                    slotProps={{
                      textField: {
                        error: !!props.errors.date,
                        helperText: props.errors.date,
                      },
                    }}
                    onChange={(value: any) => {
                      const dayjsInstance = dayjs(value);
                      const formattedDate = dayjsInstance.format("YYYY-MM-DD");
                      props.setFieldValue("date", formattedDate);
                    }}
                  />

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    multiline={true}
                    rows={4}
                    helperText={props.errors.description}
                    error={!!props.errors.description}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                      paddingTop: "15px",
                    }}
                  >
                    <Button variant="outlined" color="success" type="submit">
                      Create
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
