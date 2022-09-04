import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { CgProfile } from 'react-icons/cg';

function Dashboard() {

    const buttons = [
        {
            title: "Home",
            link: "dashboard"
        },
        {
            title: "Members",
            link: "members"
        },
        {
            title: "Companies",
            link: "companies"
        },
        {
            title: "Orgsanizations",
            link: "orgs"
        },
        {
            title: "Locations",
            link: "locations"
        }
    ];
    return (
        <div>
            <Head>
                <title>Dashboard | SADC Console</title>
            </Head>
            <div className={styles.navbar}>
                {buttons.map(({title, link}) => (
                    <Link href={'/' + link} key="">
                        <a>
                            <div className={styles.button}>
                                <span>{title}</span>
                            </div>
                        </a>
                    </Link>
                ))}
                <div className={styles.account}>
                    <CgProfile className={styles.space} />
                    <span>HORSAEN</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;