import { useState } from 'react';

import { Button, ThemeProvider, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image'
import { BsInfoCircle } from 'react-icons/bs';
import { GoChevronLeft } from 'react-icons/go';
import Swal from 'sweetalert2';

import styles from './ranking.module.css'
import { theme } from '../../config/theme.config';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { charts } from '../../utils/charts';
import { Carousel } from 'react-bootstrap';


const ChartsModal = ({ setNewCharts }: void) => {

    const [chartsSelected, setChartsSelected] = useState <String[]> ([]);
    // const [carouselIndex, setCarouselIndex] = useState({});

    const handleChartSelection = (chart: string) => {
        let currentCharts = [...chartsSelected];
        if(currentCharts.includes(chart)) {
            const index = currentCharts.indexOf(chart)
            currentCharts.splice(index, 1);
        } else {
            currentCharts.push(chart)
        }
        setChartsSelected(currentCharts);
    }

    const handleOk = () => {
        setNewCharts(chartsSelected);
        Swal.close()
    }

    // const handleCarousel = (index: number, path: string) => {
    //     let currentValues = {...carouselIndex}
    //     currentValues[index] = path
    //     setCarouselIndex(currentValues)
    //     // setIndex(selectedIndex);
    //   };

    return (
        <ThemeProvider theme={theme}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '40px'}}>
                    {charts.map((chart, index) => (
                        // <Carousel key={chart.name} activeIndex={`${carouselIndex[index]}`}>
                            <div key={chart.name}>
                                <div
                                  className={clsx(styles['image-container'], chartsSelected.includes(chart.name) && styles['image-container-selected'])}
                                  onClick={() => handleChartSelection(chart.name)}
                                >
                                    <Image
                                        src={chart.src}
                                        width={150}
                                        height={150}
                                        alt={chart.name}
                                    />
                                </div>
                                {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> */}
                                    <Typography>{capitalizeFirstLetter(chart.name)}</Typography>
                                    {/* &nbsp;
                                    <BsInfoCircle
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => handleCarousel(index, 'info')}
                                    /> */}
                                {/* </div> */}
                            </div>
                        // </Carousel>
                    ))}
                </div>
                <div>
                  <Button
                        onClick={handleOk}
                        disabled={chartsSelected.length === 0}
                        variant='contained'

                  >
                      Add
                  </Button>
                </div>
              </ThemeProvider>
    );
}

export default ChartsModal;