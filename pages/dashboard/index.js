import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import styles from './Dashboard.module.css';

import { BsBoxArrowUpRight } from 'react-icons/bs';

const api = process.env.API_BASE

export default function Dashboard() {
    const [members, setMembers] = useState([])
    useEffect(() => {
        fetchMembers()
    }, [])
    const fetchMembers = () => {
        axios
        .get(api + '/members')
        .then((res) => {
            setMembers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const { user, error, isLoading } = useUser();
    // i don't know why auth0 needs this, but it won't run without it...
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    const links = [
        {id: 0, title: 'Analytics', link: 'https://sadcmetrics.horsaen.com/'},
        {id: 1, title: 'Wiki', link: 'https://sadcwiki.horsaen.com/'},
        {id: 2, title: 'Live Site', link: 'https://sadc.horsaen.com/'}
    ]

    return (
        <div>
            <Head>
                <title>Dashboard | SADC Console</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <div>
                    <div className={styles.homeCard}>
                        <span className={styles.homeTitle}>Welcome back,<br />{user.username}.</span>
                    </div>
                </div>
                {links.map((data) => (
                    <div key={data.id} className={styles.card}>
                        <span>{data.title}</span>
                        <a href={data.link}>
                            <span>To {data.title}</span>
                            <span><BsBoxArrowUpRight /></span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();