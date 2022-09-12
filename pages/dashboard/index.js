import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div>
            <Head>
                <title>Dashboard | SADC Console</title>
            </Head>
            <Navbar />
        </div>
    );
}

export default Dashboard;