import {
    Box,
    Card,
    FormControl,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    Select,
    MenuItem,
    Autocomplete,
  } from '@mui/material'
  import classes from './Pages.module.css'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { Formik } from 'formik'
  import { LoadingButton } from '@mui/lab'
  import { observer } from 'mobx-react-lite'
  import { getSymptoms } from '../api/getApi'
  
  export function DiagnosticPage({}) {
    const navigate = useNavigate()
    
    const onSubmit = async (data) => {
      //const res = await AuthStore.login(data)
      //if (!res.error) navigate('/symptoms')
    }
  
    //const [sex, setSex] = useState(false)

    const SubmitBtn = observer(() => (
      <LoadingButton
        type="submit"
        //loading={AuthStore.state === 'loading'}
        sx={{ mt: 1, display: 'flex', ml: 'auto' }}
        variant="outlined"
      >
        Подтвердить
      </LoadingButton>
    ))

    return (
      <div className={classes['display_center']}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h4" component="h1">
            Диагностика
          </Typography>
          <Formik initialValues={{ age: "", password: "" }} onSubmit={onSubmit}>
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Box component="form" onSubmit={handleSubmit} sx={{ width: 1600 }}>
                <TextField
                  type="number"
                  name="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  label="Возраст"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="demo-simple-select-outlined-label">Пол</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={values.sex}
                    onChange={handleChange}
                    label="Пол"
                  >
                    <MenuItem value={"male"}>Мужской</MenuItem>
                    <MenuItem value={"female"}>Женский</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Пароль</InputLabel>
                  <OutlinedInput
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    label="Пароль"
                    type='text'
                  />
                </FormControl>
                {<Box>
                  {localStorage.getItem('simptoms').map(item =>
                    <Card  
                      style={{flexDirection: "row", alignItems: "space-around",alignItems: "center", marginTop: "10px"}}
                    >
                      <div>{item.ID}</div>
                      <div>{item.Name}</div>
                    </Card>
                  )}
                </Box>}

                <SubmitBtn />
              </Box>
            )}
          </Formik>
        </Card>
      </div>
    )
  }
  