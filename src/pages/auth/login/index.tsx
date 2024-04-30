import * as React from "react";
import { Formik, Form, Field } from "formik";
import { LoginData } from "../../../interfaces/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { LoginDataSchema } from "../../../schemas/login";
import { isAxiosError } from "axios";
import { FormikHelpers } from "formik/dist/types";
import { useNavigate } from "react-router-dom";
import { setStorage } from "../../../utils/storage";
import { ROUTES } from "../../../constants/routes";
import api from "../../../services/api/auth/axios";
import { Endpoints } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { SOMETHING_WENT_WRONG } from "../../../constants/messages";

const initialValues: LoginData = {
  email: "",
  password: "",
};
export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginData,
    { setErrors }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      const { data } = await api.post(Endpoints.Login, values);
      setStorage("accessToken", data.tokens.accessToken);
      setStorage("refreshToken", data.tokens.refreshToken);
      setStorage("user_id", data.id);
      navigate(ROUTES.Home);
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.data.statusCode === 403) {
          navigate(ROUTES.Verify);
        } else {
          const errors: Record<string, string> = {};
          e.response?.data.message.forEach((item: any) => {
            errors[item.field] = item.error;
          });

          setErrors(errors);
        }
      } else {
        toast.error(SOMETHING_WENT_WRONG);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
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
          validationSchema={LoginDataSchema}
        >
          {(props) => {
            return (
              <Form>
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={props.touched.password && props.errors.password}
                  error={props.errors.password && props.touched.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}
