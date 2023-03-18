import { useEffect, useState } from 'react';

import { Button, Tab, Tabs, ThemeProvider } from '@mui/material';
import { GoPlus } from 'react-icons/go';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

import ChartsModal from './ChartsModal';
import styles from './ranking.module.css'
import Chart from '../../components/ranking/Chart';
import ContainerChart from '../../components/ranking/ContainerChart';
import RankingTable from '../../components/ranking/RankingTable';
import { fetchRanking } from '../../firebase/config';
import { useActions } from '../../hooks/useActions';
import { useGetRanked } from '../../hooks/useGetRanked';
import useUser from '../../hooks/useUser';
import { TabPanel } from '../../utils/TabPanel';

const MySwal = withReactContent(Swal);

const Ranking = ({ ranking }: any) => {

    const [currentTab, setCurrentTab] = useState(0);
    const [newCharts, setNewCharts] = useState <String[]>([]);

    useGetRanked(ranking);

    const showModal = () => {
        MySwal.fire({
          html: (
            <ChartsModal setNewCharts={setNewCharts} />
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
                </Tabs>
            </div>
            <div>
                <TabPanel value={currentTab} index={0} style={{display: 'flex', justifyContent: 'center'}}>
                    <RankingTable />
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                    <div className={styles['container-add-button']}>
                        <Button
                            onClick={showModal}
                            variant='contained'
                        >
                            Add chart &nbsp; <GoPlus />
                        </Button>
                    </div>
                    <ContainerChart chartsSelected={newCharts} />
                </TabPanel>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    ranking: state.ranking.pokemonRanked
});

export default connect(mapStateToProps, null)(Ranking);