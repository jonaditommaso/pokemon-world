import React, { useState } from 'react';

import { Button, Snackbar, TextField } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';

import { fetchUsers, createUser } from '../../firebase/config';
import { loginWithGithub } from '../../firebase/config';
import { useActions } from '../../hooks/useActions';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { validationSchemaSignIn } from '../../utils/validationSchemaSignIn';

interface ContinueProps {
    account: string,
    thereIsUser?: boolean
}

const ContinueWith = ({ account, thereIsUser }: ContinueProps) => {

    const { signIn } = useActions();
    const router = useRouter();

    const icons = {
        github: <FaGithub size={23} style={{marginRight: '7px'}} />
    }

    const handleSignIn = async () => {
        const { user } = await loginWithGithub();
        if (user?.displayName) {
            signIn(user.displayName);
            localStorage.setItem('USER_NAME_GITHUB', user.displayName)
            router.push('/pokemons');
        }
    }

    return (
        <div style={{marginTop: '30px', marginBottom: '10px'}}>
            <Button onClick={handleSignIn} color='secondary' variant='contained' disabled={thereIsUser}>
                {icons[account as keyof typeof icons]}    Continue with {capitalizeFirstLetter(account)}
            </Button>
        </div>
    );
}

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
    mode: string,
    thereIsUser: any
}

const Form = ({ mode, thereIsUser } : FormProps) => {
    const [openErrorMessage, setOpenErrorMessage] = useState(false);

    const handleCloseMessage = () => {
        setOpenErrorMessage(false);
    }

    const { signIn } = useActions();
    const router = useRouter();

    const login = async (values: FormValues) => {
        if(mode === 'sign_in') {
            //check if user alredy exist
            const response = await fetchUsers(values).then(res => res)
            if (response.length === 0) {
                //user doesn't exist
                setOpenErrorMessage(true);
                return;
            } else {
                signIn(values.username) //send complete object
                localStorage.setItem('USER_NAME', values.username);
                router.push('/pokemons');
            }
        }

        if(mode === 'sign_up') {
            createUser(values.username, values.password);
            signIn(values.username)
            localStorage.setItem('USER_NAME', values.username);
            router.push('/pokemons');
        }
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

                {mode === 'sign_in' && <ContinueWith account='github' thereIsUser={thereIsUser} />}
            </form>
        </>
    );
};

export default Form;