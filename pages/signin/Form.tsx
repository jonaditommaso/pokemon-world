import React from 'react';
import { useFormik } from 'formik';
import { validationSchemaSignIn } from '../../utils/validationSchemaSignIn';
import { Button, TextField } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useRouter } from 'next/router';
import { loginWithGithub } from '../../firebase/config';
import { FaGithub } from 'react-icons/fa'
import { CustomButton } from '../../components/CustomButton';
import useUser from '../../hooks/useUser';

interface FormValues {
    username: string,
    password: string
  }

export const Form = () => {

    const { signIn } = useActions();
    const router = useRouter();
    // const user = useUser();

    const login = (values: FormValues) => {
        signIn(values.username) //send complete object
        setTimeout(()=> {
          router.push('/pokemons');
        }, 800);
    }

    const handleSignIn = async () => {
        const { user } = await loginWithGithub();
        if (user?.displayName) signIn(user.displayName);
        return;
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
        <form onSubmit={formik.handleSubmit}>
            <div>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    size='small'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
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
                    error={formik.touched.password && Boolean(formik.errors.password)}
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
                    Sign in
                </Button>
            </div>

            <div style={{margin: '30px'}}>
                <CustomButton onClick={handleSignIn}>
                    <FaGithub size={23} style={{marginRight: '7px'}} /> Sign in with Github
                </CustomButton>
            </div>
        </form>
    );
};