import Image from 'next/image';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { signIn } from '../../redux/action-creators';
import pokeball from '../../public/assets/img/pokeball.png'
import styles from './signin.module.css'
import { Button, FormControl, InputGroup, Alert, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
// interface SignInProps {
//   thereIsUser: boolean
// }

const SignIn = () => {
  const [user, setUser] = useState('')
  const { signIn } = useActions();
  const router = useRouter()

  const login = () => {
    signIn(user)
    setTimeout(()=> {
      router.push('/pokemons');
  }, 800);
  }

  return (
    <div className={styles.container}>
            {/* <Form> */}
                <Image src={pokeball} alt="login" width={70} height={65} />
                <Form.Label className={styles.login__title}>
                    <h3>Sign in</h3>
                </Form.Label>

                <InputGroup className="mb-2" hasValidation>
                    <FormControl
                        placeholder="Username"
                        required
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        // isInvalid={invalidInputWarning}
                    />
                </InputGroup>

                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={invalidInputWarning}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                        style={{display: showWarningTextForPassword, justifyContent: 'center' }}
                    >
                        {warningTextForPassword}
                    </Form.Control.Feedback>
                </Form.Group> */}

                <Button
                    variant="primary"
                    type="submit"
                    onClick={login}
                    // disabled={buttonDisabled}
                    style={{marginBottom: '10px', marginTop: '15px'}}
                >
                    Sign in!
                </Button>
                {/* <Alert
                    variant="success"
                    style={{display: showAlert, margin: '10px', justifyContent: 'center' }}
                >
                    Access granted!
                </Alert> */}
            {/* </Form> */}
        </div>
  )
}

const mapStateToProps = (state: any) => {
  return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(SignIn);