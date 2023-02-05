import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css';
import pikachuNotFound from '../public/assets/img/pikachu4.png'
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.home} style={{backgroundColor: '#EB2D0C', borderRadius: '15px', opacity: '0.9', margin: 'auto'}}>
            <div className={styles.notFound__container}>
                <div className={styles.notFound__text}>
                    <h1>Oops!</h1>
                    <h4>Page not found.</h4>
                </div>

                <Image src={pikachuNotFound} alt="404" className={styles.notFound__img} width={300} height={300} />

                <div>
                    <Button
                        style={{marginBottom: '3%'}}
                        variant="outlined"
                        color='info'
                        onClick={()=> router.push('/')}
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;