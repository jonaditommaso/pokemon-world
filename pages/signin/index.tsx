import Image from 'next/image';
import { connect } from 'react-redux'
import { signIn } from '../../redux/action-creators';
import pokeball from '../../public/assets/img/pokeball.png'
import styles from './signin.module.css'
import { Form } from './Form';
import Typography from '@mui/material/Typography';

const SignIn = () => {

  return (
    <div className={styles.container}>

        <Image src={pokeball} alt="login" width={70} height={65} />

        <Typography variant='h3' sx={{fontStyle: 'italic'}}>
            Sign in
        </Typography>

       <Form />

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