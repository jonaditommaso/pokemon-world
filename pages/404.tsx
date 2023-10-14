import React from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';

import pikachuNotFound from '../public/assets/img/pikachu4.png'
import styles from '../styles/Home.module.css';

function NotFound() {
    const router = useRouter()
    return (
        <article className={clsx(styles['home'], styles['home-container'])}>
            <header className={styles['not-found-text']}>
                <h1>Oops!</h1>
                <h4>Page not found.</h4>
            </header>

            <Image
              src={pikachuNotFound}
              alt="404"
              style={{ marginBottom: '2%' }}
              width={270}
              height={270}
            />

            <footer>
                <Button
                    style={{marginBottom: '2%'}}
                    variant="outlined"
                    color='info'
                    onClick={() => router.push('/')}
                >
                    Go home
                </Button>
            </footer>
        </article>
    );
}

export default NotFound;