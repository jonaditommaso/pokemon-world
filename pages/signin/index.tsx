import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import get from 'lodash/get'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Form from './Form';
import styles from './signin.module.css'
import pokeball from '../../public/assets/img/pokeball.png'
import { RootState } from '../../redux';
import { signIn } from '../../redux/action-creators';

interface SignInProps {
  thereIsUser : string | boolean
}

const SignIn = ({ thereIsUser }: SignInProps) => {
  const [formView, setFormView] = useState('sign_in');

  const router = useRouter();

  useEffect(() => {
    if (router && get(router, 'asPath', '')?.includes('#signup')) setFormView('sign_up');
  }, [router]);


  return (
    <div className={styles.container}>

      <Image src={pokeball} alt="login" width={70} height={65} style={{marginTop: '20px'}}  />

      <Typography variant='h4' sx={{fontStyle: 'italic'}} className={styles['sign-in-text']}>
          {formView === 'sign_in' ? 'SIGN IN' : 'SIGN UP'}
      </Typography>

      <div style={{marginTop: '15px'}}>
      <Form mode={formView} thereIsUser={thereIsUser} />
      </div>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        {formView === 'sign_in'
        ? <>
          <p>{"Don't have an account?"}</p> &nbsp;
          <Link href='#signup' onClick={() => setFormView('sign_up')}>Sign Up</Link>
        </>
        : <Link href='' onClick={() => setFormView('sign_in')}>Go back to sign in form</Link>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(SignIn);