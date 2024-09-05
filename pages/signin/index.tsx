import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import get from 'lodash/get'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Form from './Form';
import styles from './signin.module.css'
import PokemonSpinner from '../../components/spinner/PokemonSpinner';
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
    if (router && get(router, 'asPath', '')?.includes('#signup')) {
      setFormView('sign_up');
    }
  }, [router]);


  return (
    <div className={styles['container']}>
      {thereIsUser && <div className={styles['container-spinner']}>
        <PokemonSpinner />
      </div>}

      <Image src={pokeball} alt="login" width={70} height={65} style={{marginTop: '10px'}}  />

      <Typography variant='h4' className={styles['sign-in-text']}>
          {formView === 'sign_in' ? 'SIGN IN' : 'SIGN UP'}
      </Typography>

      <Form mode={formView} thereIsUser={thereIsUser} />

      <footer>
        {formView === 'sign_in'
          ? <>
            <p>{"Don't have an account?"}</p> &nbsp;
            <Link href='#signup' onClick={() => setFormView('sign_up')}>Sign Up</Link>
          </>
          : <>
            <p>{"Do you have an account?"}</p> &nbsp;
            <Link href='' onClick={() => setFormView('sign_in')}>Go to sign in</Link>
          </>
        }
      </footer>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(SignIn);