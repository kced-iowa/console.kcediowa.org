import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import styles from './Dashboard.module.css';

import { BsBoxArrowUpRight } from 'react-icons/bs';

function Dashboard() {
    return (
        <div>
            <Head>
                <title>Dashboard | SADC Console</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.homeCard}>
                    <span className={styles.homeTitle}>Welcome back,<br />HORSAEN.</span>
                </div>
                <div className={styles.linkCard}>
                    <span>Analytics</span>
                    <a href="https://sadcmetrics.horsaen.com/" target="_blank" rel="noreferrer">
                        <span>To Analytics</span>
                        <span><BsBoxArrowUpRight /></span>
                    </a>
                </div>
                <div className={styles.wikiCard}>
                    <span>Wiki</span>
                    <a href="https://sadcwiki.horsaen.com/" target="_blank" rel="noreferrer">
                        <span>To Wiki</span>
                        <span><BsBoxArrowUpRight /></span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;