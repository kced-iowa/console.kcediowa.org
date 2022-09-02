import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { CgProfile } from 'react-icons/cg';

function Dashboard() {
    return (
        <div>
            <Head>
                <title>Dashboard | SADC Console</title>
            </Head>
            <div className={styles.navbar}>
                <div className={styles.button}>

                </div>
                <div className={styles.account}>
                    <CgProfile className={styles.space} />
                    <span>HORSAEN</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;