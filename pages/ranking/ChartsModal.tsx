import { useState } from 'react';

import { Button, ThemeProvider, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image'
import Swal from 'sweetalert2';

import styles from './ranking.module.css'
import InfoIcon from '../../components/info/InfoIcon';
import { theme } from '../../config/theme.config';
import { updateCharts } from '../../firebase/config';
import useOriginUser from '../../hooks/useOriginUser';
import { capitalize } from '../../utils/capitalize';
import { charts } from '../../utils/charts';

interface ChartsModalProps {
    setCharts: React.Dispatch<React.SetStateAction<string[]>>,
    currentCharts: string[],
    userLogged: any,
}

const ChartsModal = ({ setCharts, currentCharts = [], userLogged }: ChartsModalProps) => {

    const [chartsSelected, setChartsSelected] = useState <string[]> ([]);
    const originUser = useOriginUser()

    const handleChartSelection = (chart: string) => {
        let currentCharts = [...chartsSelected];
        if(currentCharts && currentCharts?.includes(chart)) {
            const index = currentCharts.indexOf(chart)
            currentCharts.splice(index, 1);
        } else {
            currentCharts.push(chart)
        }
        setChartsSelected(currentCharts);
    }

    const handleOk = () => {
        setCharts([...chartsSelected, ...currentCharts]);
        if (originUser.username !== 'ALLOW_NOT_ACCOUNT') {
            updateCharts(userLogged, chartsSelected)
        }
        Swal.close()
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                {charts.map((chart, index) => (
                    <div key={chart.name}>
                        <div
                            className={clsx(
                                styles['image-container'],
                                (chartsSelected && chartsSelected?.includes(chart.name)) && styles['image-container-selected'],
                                (currentCharts && currentCharts?.includes(chart.name)) && styles['disabled-chart']
                            )}
                            onClick={() => {
                                if (currentCharts && currentCharts?.includes(chart.name)) return;
                                handleChartSelection(chart.name)
                            }}
                        >
                            <Image
                                src={chart.src}
                                width={150}
                                height={150}
                                alt={chart.name}
                            />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography margin={0}>{capitalize(chart.name)}</Typography>
                            &nbsp;
                            <InfoIcon description={chart.description} />
                        </div>
                    </div>
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