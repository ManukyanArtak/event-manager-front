import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import { AddEventSchema } from "../../../schemas/addEvent";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { AddEventData, EventData } from "../../../interfaces/event";

const tomorrow = dayjs().add(1, "day");

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

interface IAddEditProps {
  open: boolean;
  closeModal: () => void;
  id?: number | null;
  handleSubmit: (values: AddEventData) => Promise<void>;
  values?: EventData | null;
}

const AddEditEventModal = ({
  open,
  closeModal,
  id,
  handleSubmit,
  values,
}: IAddEditProps) => {
  const initialValues = {
    name: values?.name || "",
    description: values?.description || "",
    date: values?.date ? dayjs(values?.date) : undefined,
  };
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {id ? "Edit Event" : "Create Event"}
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
                  helperText={props.touched.name && props.errors.name}
                  error={props.errors.name && props.touched.name}
                />
                <DateTimePicker
                  minDateTime={tomorrow}
                  defaultValue={props.values.date}
                  sx={{ width: 1 }}
                  name={"date"}
                  slotProps={{
                    textField: {
                      helperText: props.touched.date && props.errors.date,
                      error: Boolean(props.errors.date && props.touched.date),
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
                  helperText={
                    props.touched.description && props.errors.description
                  }
                  error={props.errors.description && props.touched.description}
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
                    {id ? "Save" : "Create"}
                  </Button>
                  <Button variant="outlined" color="error" onClick={closeModal}>
                    Cancel
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddEditEventModal;
