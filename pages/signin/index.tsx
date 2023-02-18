import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { signIn } from '../../redux/action-creators';
import pokeball from '../../public/assets/img/pokeball.png'
import styles from './signin.module.css'
import { Form } from './Form';
import Typography from '@mui/material/Typography';

const SignIn = () => {
  const [formView, setFormView] = useState('sign_in');

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes('#signup')) setFormView('sign_up');
  }, [router]);


  return (
    <div className={styles.container}>

        <Image src={pokeball} alt="login" width={70} height={65} style={{marginTop: '20px'}}  />

        <Typography variant='h4' sx={{fontStyle: 'italic'}} className={styles['sign-in-text']}>
            {formView === 'sign_in' ? 'SIGN IN' : 'SIGN UP'}
        </Typography>

       <div style={{marginTop: '15px'}}>
        <Form mode={formView} />
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

        {/* <Alert
            variant="success"
            style={{display: 'flex', margin: '10px', justifyContent: 'center' }} //showAlert
        >
            Access granted!
        </Alert> */}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(SignIn);