import React from 'react';
import { useFormik } from 'formik';
import { validationSchemaSignIn } from '../../utils/validationSchemaSignIn';
import { Button, TextField } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useRouter } from 'next/router';

interface FormValues {
    username: string,
    password: string
  }

export const Form = () => {

    const { signIn } = useActions();
    const router = useRouter();

    const login = (values: FormValues) => {
        signIn(values.username) //send complete object
        setTimeout(()=> {
          router.push('/pokemons');
        }, 800);
    }

    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: validationSchemaSignIn,
      onSubmit: (values) => {
        console.log(values)
      },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <TextField
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
            </div>
            <div style={{marginTop: '10px'}}>
                <Button color="error" variant="contained" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    );
};