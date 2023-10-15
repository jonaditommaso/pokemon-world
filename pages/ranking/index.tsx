import { useEffect, useState } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material'; //ThemeProvider
import { GoPlus } from 'react-icons/go';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

import ChartsModal from './ChartsModal';
import styles from './ranking.module.css'
import Battles from '../../components/fight/Battles';
// import Chart from '../../components/ranking/Chart';
import ContainerChart from '../../components/ranking/ContainerChart';
import RankingTable from '../../components/ranking/RankingTable';
import { fetchCharts } from '../../firebase/config';
// import { useActions } from '../../hooks/useActions';
import { useGetRanked } from '../../hooks/useGetRanked';
import { RootState } from '../../redux';
import { TabPanel } from '../../utils/TabPanel';

const MySwal = withReactContent(Swal);

const Ranking = ({ ranking, userLogged }: any) => {

    const [currentTab, setCurrentTab] = useState(0);
    const [charts, setCharts] = useState <string[]>([]);

    useGetRanked(ranking);

    useEffect(() => {
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
            <ChartsModal setCharts={setCharts} currentCharts={charts} userLogged={userLogged}/>
          ),
          showCancelButton: false,
          showConfirmButton: false,
          backdrop: false,
          showCloseButton: true
      });
      }

    return (
        <div className={styles.ranking}>
            <div className={styles.tabs}>
                <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
                    <Tab label='Table' id='0'/>
                    <Tab label='Charts' id='1'/>
                    <Tab label='Battles' id='2'/>
                </Tabs>
            </div>
            <div>
                <Box style={{display: 'flex', justifyContent: 'center'}}>
                    <TabPanel value={currentTab} index={0}>
                        <RankingTable />
                    </TabPanel>
                </Box>
                <TabPanel value={currentTab} index={1}>
                    <div className={styles['container-add-button']}>
                        <Button
                            onClick={showModal}
                            variant='contained'
                        >
                            Add chart &nbsp; <GoPlus />
                        </Button>
                    </div>
                    <hr />
                    <ContainerChart chartsSelected={charts} />
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                    <Battles />
                </TabPanel>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    ranking: state.ranking.pokemonRanked,
    userLogged: state.login.user,
});

export default connect(mapStateToProps, null)(Ranking);