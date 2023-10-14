import Image from 'next/image'
import { Carousel } from 'react-bootstrap';

import styles from '../styles/Home.module.css'
import { carouselHomeItems } from '../utils/carouselHomeItems';

export default function Home() {
  return (
        <article className={styles['home']}>
            <Carousel
                interval={8000}
                className={styles['home-container']}
                variant="dark"
            >
                {carouselHomeItems.map(item => (
                <Carousel.Item key={item.alt}>
                    <Image
                        src={item.imageSrc}
                        alt={item.alt}
                        className={styles['carousel-image']}
                    />
                    <footer className={styles['home-text']}>
                        {item.content}
                    </footer>
                </Carousel.Item>
                ))}
            </Carousel>
        </article>
    )
}
