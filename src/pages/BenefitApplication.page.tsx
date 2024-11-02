/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Checkbox,
  Grid2 as Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { InputComfandi } from "../components/InputComfandi.component";
import moment from "moment";
import DatePickerComfandi from "../components/DatePickerComfandi.component";
import { SelectComfandi } from "../components/SelectComfandi.component";
import { documentTypes } from "../utils/documentTypes.util";
import ButtonComfandi from "../components/ButtonComfandi.component";
import { FormControlLabel } from "@mui/material";
import api from "../services/interceptor";
import SnackComfandi from "../components/SnackComfandi.component";
import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RowsProps } from "./BenefitApplication.interface";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

// text color #97d700
// btn color #003da5

const BenefitApplication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<RowsProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [snackOptions, setSnackOptions] = useState<{
    open: boolean;
    severity?: "success" | "info" | "warning" | "error";
    variant?: "filled" | "outlined" | "standard" | undefined;
    content: string;
  }>({ open: false, severity: undefined, content: "" });

  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("is_family_head", event.target.checked);
  };

  const fetchTableInfo = useCallback(() => {
    setIsLoading(true);
    api.get("/family-nucleus").then((response) => {
      const dataRows = response.data;

      if (dataRows.length > 0) {
        const newRows = dataRows.map((row: RowsProps) => {
          return {
            ...row,
            birth_date: moment(row.birth_date).format("DD/MM/YYYY"),
            created_at: moment(row.created_at).format("DD/MM/YYYY"),
            updated_at: moment(row.updated_at).format("DD/MM/YYYY"),
          };
        });
        console.log({ newRows });
        setRows(newRows);
      } else {
        setRows([]);
      }
    });
    setIsLoading(false);
  }, []);

  const handleEdit = (data: any) => () => {
    setIsEditing(true);
    setSelectedRowId(data.row.id);
    formik.setValues({
      is_family_head: data.row.is_family_head,
      first_name: data.row.first_name,
      second_name: data.row.second_name,
      first_last_name: data.row.first_last_name,
      second_last_name: data.row.second_last_name,
      birth_date: data.row.birth_date,
      document_type: data.row.document_type,
      document_number: data.row.document_number,
    });
  };
  const handleUpdateRow = () => {
    const values = formik.values;
    const desctValues = {
      is_family_head: values.is_family_head,
      first_name: values.first_name,
      second_name: values.second_name,
      first_last_name: values.first_last_name,
      second_last_name: values.second_last_name,
      birth_date: moment(values.birth_date, "DD/MM/YYYY").toISOString(),
      document_type: values.document_type,
      document_number: values.document_number,
    };
    api
      .put(`/family-nucleus/${selectedRowId}`, desctValues)
      .then(() => {
        setSnackOptions({
          open: true,
          severity: "success",
          content: "Familiar actualizado correctamente",
          variant: "filled",
        });
        fetchTableInfo();
        formik.resetForm();
        setIsEditing(false);
      })
      .catch(() => {
        setSnackOptions({
          open: true,
          severity: "error",
          content: "Error al actualizar los datos del familiar",
          variant: "filled",
        });
      });
  };

  const handleDelete = (data: any) => () => {
    api.delete(`/family-nucleus/${data.row.id}`).then(() => {
      setSnackOptions({
        open: true,
        severity: "success",
        content: "Familiar eliminado correctamente",
        variant: "filled",
      });
      fetchTableInfo();
    });
  };

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "Nombres",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) =>
        `${row.first_name || ""} ${row.second_name || ""}`,
    },
    {
      field: "last_name",
      headerName: "Apellidos",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) =>
        `${row.first_last_name || ""} ${row.second_last_name || ""}`,
    },
    {
      field: "birth_date",
      headerName: "Fecha de nacimiento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
    },
    {
      field: "document_type",
      headerName: "Tipo de documento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
    },
    {
      field: "document_number",
      headerName: "Número de documento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
    },

    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (data: any) => {
        return (
          <>
            <Tooltip title="Editar" arrow>
              <IconButton color="secondary" onClick={handleEdit(data)}>
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" arrow>
              <IconButton color="error" onClick={handleDelete(data)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

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
        .then(() => {
          setSnackOptions({
            open: true,
            severity: "success",
            content: "Familiar agregado correctamente",
            variant: "filled",
          });
          fetchTableInfo();
          formik.resetForm();
        })
        .catch((error) => {
          if (error?.errorData?.code === "23505") {
            setSnackOptions({
              open: true,
              severity: "error",
              content: "El número de documento ya existe",
              variant: "filled",
            });
          } else {
            setSnackOptions({
              open: true,
              severity: "error",
              content: "Error al enviar los datos",
              variant: "filled",
            });
          }
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container size={{ xs: 12, sm: 12, md: 12 }} spacing={2}>
          <Typography variant="h4" fontWeight={600} color="primary.main">
            Inicio
          </Typography>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="start"
              color="primary.main"
            >
              Solicitud de subsidio familiar de vivienda
            </Typography>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} p={1}>
              <Typography
                variant="h6"
                fontWeight={400}
                textAlign="start"
                color="secondary.main"
              >
                Conformación del hogar
              </Typography>

              <Grid size={{ xs: 12, sm: 12, md: 12 }} p={4}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    textAlign="start"
                    color="primary.main"
                  >
                    CONFORMACIÓN Y CONDICIÓN SOCIOECONÓMICA DEL HOGAR
                  </Typography>
                </Grid>

                <Grid
                  container
                  size={{ xs: 12, sm: 12, md: 6 }}
                  spacing={2}
                  mt={2}
                  p={2}
                >
                  <Grid
                    size={{ xs: 12, sm: 12, md: 12 }}
                    display="flex"
                    alignItems="flex-start"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.is_family_head}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Cabeza de hogar"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}></Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <SelectComfandi
                      id="document_type"
                      label="Tipo de documento"
                      items={documentTypes}
                      value={formik.values.document_type}
                      onChange={formik.handleChange}
                      name="document_type"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <InputComfandi
                      id="document_number"
                      label="Número identificación"
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
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}></Grid>
                  {isEditing ? (
                    <>
                      <Grid container size={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid size={6}>
                          <ButtonComfandi
                            content="Cancelar"
                            bgcolor="primary.main"
                            type="button"
                            onClick={() => {
                              formik.resetForm();
                              setIsEditing(false);
                            }}
                          ></ButtonComfandi>
                        </Grid>
                        <Grid size={6}>
                          <ButtonComfandi
                            content="Actualizar"
                            type="button"
                            onClick={handleUpdateRow}
                          ></ButtonComfandi>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <ButtonComfandi
                          content="Agregar"
                          type="submit"
                        ></ButtonComfandi>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }} p={4}>
                {rows.length > 0 ? (
                  <DataGrid
                    {...rows}
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pagination
                    pageSizeOptions={[10, 20, 50]}
                    disableRowSelectionOnClick
                    loading={isLoading}
                    slotProps={{
                      loadingOverlay: {
                        variant: "linear-progress",
                        noRowsVariant: "skeleton",
                      },
                    }}
                  />
                ) : (
                  <Alert variant="standard" severity="info">
                    Por favor agregue los miembros familiares
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <SnackComfandi
          content={snackOptions.content}
          severity={snackOptions.severity}
          variant={snackOptions.variant}
          open={snackOptions.open}
          onClose={handleSnackClose}
          autoHideDuration={6000}
        />
      </form>
    </>
  );
};

export default BenefitApplication;
