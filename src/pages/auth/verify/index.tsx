import * as React from "react";
import { Formik, Form, Field } from "formik";
import { VerifyData } from "../../../interfaces/auth";
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
import { VerifyDataSchema } from "../../../schemas/verify";
import { FormikHelpers } from "formik/dist/types";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import api from "../../../services/api/auth/axios";
import { Endpoints } from "../../../constants/endpoints";

const initialValues: VerifyData = {
  email: "",
  code: "",
};

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: VerifyData,
    { setErrors }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await api.post(Endpoints.Verify, values);
      navigate(ROUTES.Login);
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
          Verification
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={VerifyDataSchema}
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
                  name="code"
                  label="Code"
                  id="code"
                  helperText={props.touched.code && props.errors.code}
                  error={props.errors.code && props.touched.code}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}
