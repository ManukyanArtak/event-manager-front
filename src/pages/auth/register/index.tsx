import * as React from "react";
import dayjs from "dayjs";
import {
  Box,
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RegistrationData } from "../../../interfaces/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registrationDataSchema } from "../../../schemas/register";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik/dist/types";
import { isAxiosError } from "axios";
import { ROUTES } from "../../../constants/routes";
import api from "../../../services/api/auth/axios";
import { Endpoints } from "../../../constants/endpoints";

const initialValues: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  gender: "",
  phone: "",
  password: "",
  confirmationPassword: "",
};
export default function Register() {
  const navigate = useNavigate();

  const tomorrow = dayjs().add(1, "day");

  const handleSubmit = async (
    values: RegistrationData,
    { setErrors }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await api.post(Endpoints.Register, values);
      navigate(ROUTES.Verify);
    } catch (e) {
      if (isAxiosError(e)) {
        const errors: Record<string, string> = {};
        e.response?.data.message.forEach((item: any) => {
          errors[item.field] = item.error;
        });

        setErrors(errors);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registrationDataSchema}
        >
          {(props) => {
            return (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="firstName"
                  helperText={props.touched.firstName && props.errors.firstName}
                  error={props.errors.firstName && props.touched.firstName}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  id="last_name"
                  helperText={props.touched.lastName && props.errors.lastName}
                  error={props.errors.lastName && props.touched.lastName}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={props.touched.email && props.errors.email}
                  error={props.errors.email && props.touched.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="phone"
                  helperText={props.touched.phone && props.errors.phone}
                  error={props.errors.phone && props.touched.phone}
                />
                <FormControl fullWidth sx={{ textAlign: "left" }}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    label="Gender"
                    name="gender"
                    error={!!(props.errors.gender && props.touched.gender)}
                    onChange={(value) =>
                      props.setFieldValue("gender", value.target.value)
                    }
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                  </Select>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      paddingLeft: "10px",
                      color: "#d32f2f",
                    }}
                  >
                    {props.errors.gender && props.touched.gender}
                  </Typography>
                </FormControl>
                <FormControl fullWidth sx={{ mt: "16px", mb: "8px" }}>
                  <DatePicker
                    maxDate={tomorrow}
                    sx={{ width: 1 }}
                    name={"birthday"}
                    label={"Birthday"}
                    slotProps={{
                      textField: {
                        error: !!(
                          props.errors.birthday && props.touched.birthday
                        ),
                        helperText:
                          props.errors.birthday && props.touched.birthday,
                      },
                    }}
                    onChange={(value: any) => {
                      const dayjsInstance = dayjs(value);
                      const formattedDate = dayjsInstance.format("YYYY-MM-DD");
                      props.setFieldValue("birthday", formattedDate);
                    }}
                    format="YYYY-MM-DD"
                  />
                </FormControl>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={props.touched.password && props.errors.password}
                  error={props.errors.password && props.touched.password}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="confirmationPassword"
                  label="Confirmation Password"
                  type="password"
                  id="confirmation_password"
                  helperText={
                    props.touched.confirmationPassword &&
                    props.errors.confirmationPassword
                  }
                  error={
                    props.errors.confirmationPassword &&
                    props.touched.confirmationPassword
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}
