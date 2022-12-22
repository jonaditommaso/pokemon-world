import Image from 'next/image';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { signIn } from '../../redux/action-creators';
import pokeball from '../../public/assets/img/pokeball.png'
import styles from './signin.module.css'
import { Button, FormControl, Form as RBForm, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
// interface SignInProps {
//   thereIsUser: boolean
// }

const SignIn = () => {
  const [user, setUser] = useState('')
  const { signIn } = useActions();
  const router = useRouter();

  interface FormValues {
    username: string,
    password: string
  }

  const initialValuesForm: FormValues = {
    username: '',
    password: '',
  }

  const login = () => {
    signIn(user)
    setTimeout(()=> {
      router.push('/pokemons');
  }, 800);
  }

  return (
    <div className={styles.container}>

        <Image src={pokeball} alt="login" width={70} height={65} />

        <RBForm.Label className={styles.login__title}>
            <h3>Sign in</h3>
        </RBForm.Label>

        <Formik
            initialValues={initialValuesForm}
            onSubmit={(values, actions) => {
                console.log({ values, actions });
                // alert(JSON.stringify(values, null, 2));
                // actions.setSubmitting(false);
              }}
        >
            <Form>
                <FormControl
                    placeholder="Username"
                    name='username'
                    id='username'
                    required
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    // isInvalid={invalidInputWarning}
                />

                <FormControl
                    type="password"
                    placeholder="Password"
                    required
                    // value={password}
                    // onChange={e => setPassword(e.target.value)}
                    // isInvalid={invalidInputWarning}
                />
                <FormControl.Feedback
                    type="invalid"
                    // style={{display: showWarningTextForPassword, justifyContent: 'center' }}
                >
                    {/* {warningTextForPassword} */}
                </FormControl.Feedback>


                <Button
                    variant="primary"
                    type="submit"
                    onClick={login}
                    // disabled={buttonDisabled}
                    style={{marginBottom: '10px', marginTop: '15px'}}
                >
                    Sign in!
                </Button>
            </Form>
        </Formik>

        <Alert
            variant="success"
            style={{display: 'flex', margin: '10px', justifyContent: 'center' }} //showAlert
        >
            Access granted!
        </Alert>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(SignIn);