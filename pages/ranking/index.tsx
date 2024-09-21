import { useDeferredValue, useEffect, useMemo, useState } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material'; //ThemeProvider
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoPlus } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

import ChartsModal from './ChartsModal';
import styles from './ranking.module.css'
import Battles from '../../components/fight/Battles';
import Frame from '../../components/frame';
import ContainerChart from '../../components/ranking/ContainerChart';
import RankingTable from '../../components/ranking/RankingTable';
import { fetchCharts } from '../../firebase/config';
import { useGetRanked } from '../../hooks/useGetRanked';
import pikachuImage from '../../public/assets/img/pikachusleeping.png'
import { RootState } from '../../redux';
import { TabPanel } from '../../utils/TabPanel';

const MySwal = withReactContent(Swal);

const Ranking = ({ ranking, userLogged, battlesData }: any) => {

    const [currentTab, setCurrentTab] = useState(0);
    const [charts, setCharts] = useState <string[]>([]);
    const chartsSelected = useDeferredValue(charts);
    const router = useRouter();

    useGetRanked(ranking);

    useEffect(() => {
        if(!userLogged) return;
        (async function getCharts () {
            const response = await fetchCharts(userLogged).then(res => {
                return res.map((chart, index) => Object.values(chart)[index])
            });
            if(response.length > 0) setCharts(response as unknown[] as string[]);
        })();
    }, [userLogged]);

    const showModal = () => {
        MySwal.fire({
          html: (
            <ChartsModal setCharts={setCharts} currentCharts={charts} userLogged={userLogged} />
          ),
          showCancelButton: false,
          showConfirmButton: false,
          backdrop: false,
          showCloseButton: true,
      });
    }

    const noData = useMemo(() => ranking.length === 0 && battlesData.battles === 0, [])

    return (
        <div
            className={styles.ranking}
            style={{
                background : !noData ? '#e3e4e5' : '',
                border: !noData ? 'solid 12px #88b9eb' : '',
                width: !noData ? '40%' : ''
            }}
        >
            <div className={styles.backdrop} style={{ backgroundColor: noData ? '#00000066' : '' }}>
                {noData
                ? <div className={styles['not-explored-container']}>
                    <h3>{"Haven't you explored Pokémon World yet?"}</h3>
                    <p>Rank pokemons in <span onClick={() => router.push('/pokemons')}>See all Pokemons</span></p>
                    <p>Search and choose a Pokémon in <span onClick={() => router.push('/search')}>Search Pokémon</span> to battle with it</p>
                    <Image
                        src={pikachuImage}
                        alt='pikachu image'
                        width={150}
                    />
                </div>
                : <div>
                    <div className={styles['frame-container']}>
                        <Frame />
                    </div>

                    <div className={styles.tabs}>
                        <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
                            <Tab label='Table' id='0' sx={{ fontSize: '18px' }} />
                            <Tab label='Charts' id='1' sx={{ fontSize: '18px' }} />
                            <Tab label='Battles' id='2' sx={{ fontSize: '18px' }} />
                        </Tabs>
                    </div>

                    <div>
                        <TabPanel value={currentTab} index={0}>
                            <RankingTable />
                        </TabPanel>
                        <Box style={{display: 'flex', justifyContent: 'center'}}>
                            <TabPanel value={currentTab} index={1}>
                                { ranking.length === 0
                                ? <div style={{ marginTop: '1%', width: '400px', textAlign: 'center', borderRadius: '5px' }}>
                                    <div>
                                        No pokemons ranked <RiErrorWarningLine color="red" />
                                    </div>
                                </div>
                                : <>
                                    <div className={styles['container-add-button']}>
                                        <Button
                                            onClick={showModal}
                                            variant='contained'
                                        >
                                            Add chart &nbsp; <GoPlus />
                                        </Button>
                                    </div>
                                    <hr style={{ width: '70%', margin: 'auto', marginTop: '10px' }} />
                                    <ContainerChart chartsSelected={chartsSelected} />
                                </>}
                            </TabPanel>
                        </Box>
                        <TabPanel value={currentTab} index={2}>
                            <Battles />
                        </TabPanel>
                    </div>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    ranking: state.ranking.pokemonRanked,
    userLogged: state.login.user,
    battlesData: state.battlesData.battlesData,
});

export default connect(mapStateToProps, null)(Ranking);