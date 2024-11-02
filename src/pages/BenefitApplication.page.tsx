import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid2 as Grid, Typography } from "@mui/material";
import { InputComfandi } from "../components/InputComfandi.component";
import moment from "moment";
import DatePickerComfandi from "../components/DatePickerComfandi.component";
import { SelectComfandi } from "../components/SelectComfandi.component";
import { documentTypes } from "../utils/documentTypes.util";
import ButtonComfandi from "../components/ButtonComfandi.component";
import api from "../services/interceptor";

// text color #97d700
// btn color #003da5

const BenefitApplication = () => {
  const formik = useFormik({
    initialValues: {
      is_family_head: false,
      first_name: "",
      second_name: "",
      first_last_name: "",
      second_last_name: "",
      birth_date: "",
      document_type: "",
      document_number: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("El primer nombre es requerido")
        .max(50, "Máximo 50 caracteres"),
      second_name: Yup.string().max(50, "Máximo 50 caracteres"),
      first_last_name: Yup.string()
        .required("El primer apellido es requerido")
        .max(50, "Máximo 50 caracteres"),
      second_last_name: Yup.string().max(50, "Máximo 50 caracteres"),
      birth_date: Yup.string().required("La fecha de nacimiento es requerida"),
      document_type: Yup.string().required("El tipo de documento es requerido"),
      document_number: Yup.string().required(
        "El número de documento es requerido"
      ),
    }),
    onSubmit: (values) => {
      api
        .post("/family-nucleus", values)
        .then((response) => {
          console.log("Datos enviados:", response);
        })
        .catch((error) => {
          console.error("Error al enviar los datos:", error);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container size={12} spacing={2}>
          <Typography variant="h4">Inicio</Typography>
          <Grid size={12}>
            <Typography variant="h5" textAlign="start">
              Solicitud de subsidio familiar de vivienda
            </Typography>
            <Grid size={12} p={1}>
              <Typography variant="h6" textAlign="start">
                Conformación del hogar
              </Typography>

              <Grid size={12} p={4}>
                <Grid size={12}>
                  <Typography variant="h6" textAlign="start">
                    CONFORMACIÓN Y CONDICIÓN SOCIOECONÓMICA DEL HOGAR
                  </Typography>
                </Grid>

                <Grid container size={6} spacing={2} mt={2}>
                  <Grid size={6}>
                    <InputComfandi
                      id="first_name"
                      label="Primer nombre"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      error={
                        !!(
                          formik.touched.first_name && formik.errors.first_name
                        )
                      }
                      helperText={
                        formik.touched.first_name && formik.errors.first_name
                          ? formik.errors.first_name
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputComfandi
                      id="second_name"
                      label="Segundo nombre"
                      name="second_name"
                      value={formik.values.second_name}
                      onChange={formik.handleChange}
                      error={
                        !!(
                          formik.touched.second_name &&
                          formik.errors.second_name
                        )
                      }
                      helperText={
                        formik.touched.second_name && formik.errors.second_name
                          ? formik.errors.second_name
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputComfandi
                      id="first_last_name"
                      label="Primer apellido"
                      name="first_last_name"
                      value={formik.values.first_last_name}
                      onChange={formik.handleChange}
                      error={
                        !!(
                          formik.touched.first_last_name &&
                          formik.errors.first_last_name
                        )
                      }
                      helperText={
                        formik.touched.first_last_name &&
                        formik.errors.first_last_name
                          ? formik.errors.first_last_name
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputComfandi
                      id="second_last_name"
                      label="Segundo apellido"
                      name="second_last_name"
                      value={formik.values.second_last_name}
                      onChange={formik.handleChange}
                      error={
                        !!(
                          formik.touched.second_last_name &&
                          formik.errors.second_last_name
                        )
                      }
                      helperText={
                        formik.touched.second_last_name &&
                        formik.errors.second_last_name
                          ? formik.errors.second_last_name
                          : ""
                      }
                    />
                  </Grid>

                  <Grid size={6}>
                    <DatePickerComfandi
                      name="birth_date"
                      label="Fecha de nacimiento"
                      value={
                        formik.values.birth_date
                          ? moment(formik.values.birth_date)
                          : null
                      }
                      onChange={(value) =>
                        formik.setFieldValue("birth_date", value)
                      }
                    />
                  </Grid>
                  <Grid size={6}></Grid>
                  <Grid size={6}>
                    <SelectComfandi
                      id="document_type"
                      label="Tipo de documento"
                      items={documentTypes}
                      value={formik.values.document_type}
                      onChange={formik.handleChange}
                      name="document_type"
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputComfandi
                      id="document_number"
                      label="Numero identificación"
                      name="document_number"
                      value={formik.values.document_number}
                      onChange={formik.handleChange}
                      error={
                        !!(
                          formik.touched.document_number &&
                          formik.errors.document_number
                        )
                      }
                      helperText={
                        formik.touched.document_number &&
                        formik.errors.document_number
                          ? formik.errors.document_number
                          : ""
                      }
                    />
                  </Grid>
                  <Grid size={6}></Grid>
                  <Grid size={6}>
                    <ButtonComfandi
                      content="Agregar"
                      type="submit"
                    ></ButtonComfandi>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BenefitApplication;
