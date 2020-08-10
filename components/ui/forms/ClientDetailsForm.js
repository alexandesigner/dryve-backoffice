import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Field as FormikField, FieldArray } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import * as cep from 'cep-promise'
import { Box, Grid, TextField, Button, FormControl } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import AddIcon from '@material-ui/icons/Add'

import { isEmpty } from 'utils'

import Link from 'components/ui/Link'
import PhoneMaskedField from 'components/ui/masks/Phone'
import CepMaskedInput from 'components/ui/masks/Cep'
import CustomField from 'components/ui/forms/CustomField'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '& a': {
        textDecoration: 'none'
      },
      '& .MuiFormHelperText-contained': {
        marginLeft: 0
      }
    },
    formControl: {
      width: '100%'
    },
    container: {
      maxWidth: 596,
      width: '100%'
    },
    footer: {
      width: '100%',
      padding: 20,
      borderTop: '1px solid #e0e0e0',
      '& .MuiButtonBase-root': {
        minWidth: 150
      }
    },
    phoneItem: {
      position: 'relative',
      paddingRight: 12
    },
    removePhoneButton: {
      float: 'right',
      marginBottom: 5,
      '& .MuiButton-label': {
        fontSize: 12,
        textDecoration: 'underline',
        textTransform: 'none'
      }
    },
    addPhoneButton: {
      marginTop: 10,
      '& .MuiButton-label': {
        fontSize: 14,
        textTransform: 'none'
      }
    },
    margin: {
      marginTop: 14,
      marginBottom: 14
    }
  }),
  {
    name: 'ClientDetailsForm'
  }
)

const ClientDetailsForm = (props) => {
  const classes = useStyles()
  const { push } = useRouter()
  const { states, cities, hasUpdate } = props
  const { enqueueSnackbar } = useSnackbar()
  const newClient = useStoreActions((action) => action.clients.newClient.fetch)
  const updateClient = useStoreActions((action) => action.clients.updateClient)
  const currentClient = useStoreState((state) => state.clients.current)
  const [currentCities, setCurrentCities] = React.useState([])
  const [currentCity, setCurrentCity] = React.useState(null)
  const [currentState, setCurrentState] = React.useState(null)
  const [visible, setVisible] = React.useState(false)

  const setLocation = (value) => {
    const city = cities.find((item) => item.name === value.city)
    setCurrentCity(city)
    setVisible(true)
    setCurrentState(states.find((item) => item._id === city.state))
    setCurrentCities(cities.filter((item) => item.state === city.state))
  }

  const handleAddressByCep = (setFieldValue, zipCode) => {
    cep(zipCode)
      .then((response) => {
        setFieldValue('street', currentClient.street)
        setFieldValue('neighborhood', currentClient.neighborhood)
        setFieldValue('state_id', city.state)
        setFieldValue('city_id', city._id)
        setLocation(response)
      })
      .catch((error) =>
        enqueueSnackbar('Cep inválido', {
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
          variant: 'error',
          autoHideDuration: 5000,
          preventDuplicate: true
        })
      )
  }

  const handleChangeState = (setFieldValue, newValue) => {
    setCurrentCities([])
    setCurrentCity({})
    setVisible(false)
    setFieldValue('city_id', '')
    if (newValue) {
      const stateId = newValue._id
      setCurrentState(newValue)
      setFieldValue('state_id', stateId)
      setCurrentCities(cities.filter((item) => item.state === stateId))
      setVisible(true)
    }
  }

  React.useEffect(() => {
    if (hasUpdate && !isEmpty(currentClient)) {
      cep(currentClient.zip_code)
        .then((response) => {
          setLocation(response)
        })
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{
          first_name: hasUpdate ? currentClient.first_name : '',
          last_name: hasUpdate ? currentClient.last_name : '',
          email: hasUpdate ? currentClient.email : '',
          phones: hasUpdate
            ? currentClient.phones
            : [
                {
                  number: ''
                }
              ],
          zip_code: hasUpdate ? currentClient.zip_code : '',
          street: hasUpdate ? currentClient.street : '',
          number: hasUpdate ? currentClient.number : '',
          neighborhood: hasUpdate ? currentClient.neighborhood : '',
          complement: hasUpdate ? currentClient.complement : '',
          city_id: hasUpdate ? currentClient.city_id : '',
          state_id: hasUpdate ? currentClient.state_id : ''
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (!hasUpdate) {
            newClient({ client: { ...values, status: 'client' } })
            enqueueSnackbar('Cliente cadastrado!', {
              anchorOrigin: { horizontal: 'center', vertical: 'top' },
              variant: 'success',
              autoHideDuration: 5000,
              preventDuplicate: true
            })
          } else {
            updateClient({
              id: currentClient.client_uuid,
              client: {
                ...values,
                status: currentClient.status
              }
            })
            enqueueSnackbar('Cliente atualizado!', {
              anchorOrigin: { horizontal: 'center', vertical: 'top' },
              variant: 'success',
              autoHideDuration: 5000,
              preventDuplicate: true
            })
          }
          push('/clientes')
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
          email: Yup.string()
            .required('Email é obrigatório')
            .email('E-mail inválido'),
          phones: Yup.array()
            .of(
              Yup.object().shape({
                number: Yup.string().required('Número de telefone obrigatório')
              })
            )
            .required('Telefone obrigatório'),
          zip_code: Yup.string().required('CEP é obrigatório'),
          street: Yup.string().required('Endereço é obrigatório'),
          number: Yup.string().required('Número é obrigatório'),
          neighborhood: Yup.string().required('Bairro é obrigatório'),
          city_id: Yup.number().required('Cidade é obrigatório'),
          state_id: Yup.number().required('Estado é obrigatório')
        })}
      >
        {(props) => {
          const {
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue
          } = props

          return (
            <form>
              <Box className={classes.container} p={5}>
                <Grid container spacing={3}>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="first_name"
                        label="Nome"
                        value={values.first_name}
                        variant="outlined"
                        error={
                          touched.first_name && errors.first_name ? true : false
                        }
                        helperText={
                          touched.first_name ? errors.first_name : undefined
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="last_name"
                        label="Sobrenome"
                        value={values.last_name}
                        variant="outlined"
                        error={
                          touched.last_name && errors.last_name ? true : false
                        }
                        helperText={
                          touched.last_name ? errors.last_name : undefined
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="email"
                        label="Email"
                        value={values.email}
                        variant="outlined"
                        error={touched.email && errors.email ? true : false}
                        helperText={touched.email ? errors.email : undefined}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid className={classes.margin} container spacing={3}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Box
                      component="div"
                      display="flex"
                      flexDirection="row"
                      flexWrap="wrap"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <FieldArray
                        name="phones"
                        render={(arrayHelpers) => {
                          return (
                            <React.Fragment>
                              <Grid
                                className={classes.phoneItem}
                                item
                                md={6}
                                sm={12}
                                xs={12}
                              >
                                {values.phones && values.phones.length > 0
                                  ? values.phones.map((phone, i) => {
                                      return (
                                        <React.Fragment key={i}>
                                          <FormikField name="phones">
                                            {({ field, form }) => {
                                              return (
                                                <CustomField
                                                  id="phones"
                                                  name={`phones.[${i}].number`}
                                                  type="text"
                                                  label="Telefone"
                                                  placeholder="Digite seu telefone"
                                                  error={
                                                    touched.phones
                                                      ? touched.phones[i]
                                                        ? touched.phones[i]
                                                            .number &&
                                                          errors.phones
                                                          ? errors.phones[i]
                                                            ? errors.phones[i]
                                                                .number
                                                              ? true
                                                              : false
                                                            : false
                                                            ? true
                                                            : false
                                                          : false
                                                        : false
                                                      : false
                                                  }
                                                  helperText={
                                                    touched.phones
                                                      ? touched.phones[i]
                                                        ? touched.phones[i]
                                                            .number &&
                                                          errors.phones
                                                          ? errors.phones[i]
                                                            ? errors.phones[i]
                                                                .number
                                                              ? errors.phones[i]
                                                                  .number
                                                              : undefined
                                                            : undefined
                                                          : undefined
                                                        : undefined
                                                      : undefined
                                                  }
                                                  value={
                                                    values.phones[i].number
                                                  }
                                                  onChange={handleChange}
                                                  maskedField={PhoneMaskedField}
                                                />
                                              )
                                            }}
                                          </FormikField>
                                          {arrayHelpers.form.values.phones
                                            .length > 1 ? (
                                            <Button
                                              className={
                                                classes.removePhoneButton
                                              }
                                              onClick={() =>
                                                arrayHelpers.remove(i)
                                              }
                                              variant="text"
                                              color="primary"
                                            >
                                              Remover
                                            </Button>
                                          ) : (
                                            false
                                          )}
                                        </React.Fragment>
                                      )
                                    })
                                  : false}
                              </Grid>
                              <Button
                                className={classes.addPhoneButton}
                                color="primary"
                                variant="text"
                                onClick={() =>
                                  arrayHelpers.push({
                                    number: ''
                                  })
                                }
                              >
                                <AddIcon />
                                adicionar telefone
                              </Button>
                            </React.Fragment>
                          )
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      error={touched.zip_code && errors.zip_code ? true : false}
                    >
                      <CustomField
                        id="zip_code"
                        name="zip_code"
                        className={clsx(classes.textField)}
                        variant="outlined"
                        type="text"
                        label="CEP"
                        placeholder="Digite o CEP"
                        value={values.zip_code}
                        onChange={handleChange}
                        error={
                          touched.zip_code && errors.zip_code ? true : false
                        }
                        helperText={
                          touched.zip_code ? errors.zip_code : undefined
                        }
                        onBlur={() =>
                          handleAddressByCep(setFieldValue, values.zip_code)
                        }
                        maskedField={CepMaskedInput}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="street"
                        label="Endereço"
                        value={values.street}
                        variant="outlined"
                        error={touched.street && errors.street ? true : false}
                        helperText={touched.street ? errors.street : undefined}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="number"
                        label="Número"
                        value={values.number}
                        variant="outlined"
                        error={touched.number && errors.number ? true : false}
                        helperText={touched.number ? errors.number : undefined}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="complement"
                        label="Complemento"
                        value={values.complement}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        onChange={handleChange}
                        id="neighborhood"
                        label="Bairro"
                        value={values.neighborhood}
                        variant="outlined"
                        error={
                          touched.neighborhood && errors.neighborhood
                            ? true
                            : false
                        }
                        helperText={
                          touched.neighborhood ? errors.neighborhood : undefined
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Autocomplete
                      id="states"
                      options={states}
                      onChange={(event, newValue) =>
                        handleChangeState(setFieldValue, newValue)
                      }
                      value={currentState == null ? '' : currentState}
                      inputValue={currentState == null ? '' : currentState.name}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      getOptionSelected={(option, value) =>
                        value.name === option.name
                      }
                      onInputChange={(event, newInputValue) => {
                        setCurrentState({
                          ...currentState,
                          name: newInputValue
                        })
                        setVisible(true)
                      }}
                      filterSelectedOptions
                      disableClearable
                      renderOption={(option) => (
                        <React.Fragment>
                          {option.name} - {option.initials}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estado"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.state_id && errors.state_id ? true : false
                          }
                          helperText={
                            touched.state_id ? errors.state_id : undefined
                          }
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'state'
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Autocomplete
                      id="cities"
                      disabled={!visible}
                      options={currentCities}
                      value={currentCity == null ? '' : currentCity}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setCurrentCity(newValue)
                          const cityId = newValue._id
                          setFieldValue('city_id', cityId)
                        }
                      }}
                      inputValue={currentCity == null ? '' : currentCity.name}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      getOptionSelected={(option, value) =>
                        value.name === option.name
                      }
                      onInputChange={(event, newInputValue) => {
                        setCurrentCity({
                          ...currentCity,
                          name: newInputValue
                        })
                      }}
                      filterSelectedOptions
                      renderOption={(option) => (
                        <React.Fragment>{option.name}</React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cidade"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.city_id && errors.city_id ? true : false
                          }
                          helperText={
                            touched.city_id ? errors.city_id : undefined
                          }
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'city'
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box className={classes.footer} component="footer">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Salvar
                </Button>
                <Link naked href="/clientes">
                  <Button variant="text" color="primary">
                    Cancelar
                  </Button>
                </Link>
              </Box>
            </form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default ClientDetailsForm
