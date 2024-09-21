import { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image'; // Si usas Next.js

import styles from './eachPoke.module.css';

interface ImageWithTransitionProps {
    src: string,
    alt: string,
    priority: boolean
}

const ImageWithTransition = ({ src, alt, priority }: ImageWithTransitionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={clsx(styles.eachPoke__img, styles['image-container'], isLoaded ? styles['image-loaded'] : '')}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoadingComplete={() => setIsLoaded(true)}
        width={120}
        height={70}
      />
    </div>
  );
};

export default ImageWithTransition;
