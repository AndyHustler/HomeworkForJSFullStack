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
} from '@mui/material'
import classes from './Pages.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthStore } from '../store/authStore'
import { Formik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { observer } from 'mobx-react-lite'
import credentials from "../api/credentials.json"
import { getSymptoms } from '../api/getApi'

export function LoginPage({}) {
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const res = await AuthStore.login(data)
    const d = await getSymptoms(localStorage.getItem('access_token'))
    localStorage.setItem('simptoms',d.data)
    if (!res.error) navigate('/diagnostic')
  }

  const [showPass, setShowPass] = useState(false)

  const SubmitBtn = observer(() => (
    <LoadingButton
      type="submit"
      loading={AuthStore.state === 'loading'}
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
          Вход
        </Typography>
        <Formik initialValues={{ email: credentials.user_id, password: credentials.password }} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="Пароль"
                  type={showPass ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                        <Icon>{showPass ? 'visibility_off' : 'visibility'}</Icon>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <SubmitBtn />
            </Box>
          )}
        </Formik>
      </Card>
    </div>
  )
}
