import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchemaSignIn } from '../../utils/validationSchemaSignIn';
import { Button, Snackbar, TextField } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useActions } from '../../hooks/useActions';
import { useRouter } from 'next/router';
import { loginWithGithub } from '../../firebase/config';
import ContinueWith from './ContinueWith';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

interface FormValues {
    username: string,
    password: string
}

interface FormProps {
    mode: string
}

export const Form = ({ mode } : FormProps) => {
    const [openErrorMessage, setOpenErrorMessage] = useState(false);

    const handleCloseMessage = () => {
        setOpenErrorMessage(false);
    }

    const { signIn } = useActions();
    const router = useRouter();

    const login = (values: FormValues) => {
        //check if user alredy exist

        //user doesn't exist
        setOpenErrorMessage(true);
        //user exist
        return;
        signIn(values.username) //send complete object
        localStorage.setItem('USER_NAME', values.username);
        router.push('/pokemons');
    }


    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: validationSchemaSignIn,
      onSubmit: (values) => {
        login(values);
      },
    });

    return (
        <>
            <Snackbar open={openErrorMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} severity="error" sx={{ width: '100%' }}>
                    User does not exist!
                </Alert>
            </Snackbar>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        size='small'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username) || openErrorMessage}
                        helperText={formik.touched.username && formik.errors.username}
                        sx={{ width: '80%', margin: '7px'}}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        size='small'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password) || openErrorMessage}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{ width: '80%', margin: '7px'}}
                    />
                </div>
                <div style={{margin: '7px'}}>
                    <Button
                      color="error"
                      variant="contained"
                      type="submit"
                      disabled={!formik.values.username || !formik.values.password}
                    >
                        {mode === 'sign_in' ? 'Sign in' : 'Sign up'}
                    </Button>
                </div>

                {mode === 'sign_in' && <ContinueWith account='github' />}
            </form>
        </>
    );
};