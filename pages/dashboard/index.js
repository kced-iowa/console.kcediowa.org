import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import useSWR, {mutate} from 'swr'
import axios from 'axios';
import styles from './Dashboard.module.css';

import { BiEditAlt, BiUpload } from 'react-icons/bi'
import { BsBoxArrowUpRight } from 'react-icons/bs'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
var key = api + '/backgrounds'

function ImageSelect (props) {
    return (
        <div className={styles.imageSelect}>
            <Image src={props.source} width={440} height={248} />
            <div>
                <input id={props.id} type="file" onChange={(e) => {
                    const formDatas = new FormData()
                        formDatas.append('file', e.target.files[0])
                    // axios if dumb and doesn't want to use PATH w/ formData so i will use fetch, yay!
                    fetch(api + '/backgrounds/' + props.id, {
                        method: 'PATCH',
                        body: formDatas
                    })
                    .then((res) => {
                        if (res.status == 200) {
                            mutate(key)
                        }
                    })
                }}/>
                <label htmlFor={props.id}>
                    <span><BiEditAlt /></span>
                </label>
            </div>
        </div>
    )
}

export default function Dashboard() {

    const {data} = useSWR(key, fetcher)

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
                <title>Dashboard | KCED Console</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <div>
                    <div className={styles.homeCard}>
                        <span className={styles.homeTitle}>Welcome back,<br />{user.username}.</span>
                    </div>
                    <div className={styles.backgroundContainer}>
                        <span>Home Background</span>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageSelectCont}>
                                {data && data.map((image) => (
                                    <ImageSelect
                                        id={image._id}
                                        source={api + '/cdn/backgrounds/' + image.file}
                                    />
                                ))}
                                {/* {data[0] ?
                                    <div className={styles.imageUpload}>
                                        <input id="uploadImage" type="file" onChange={(e)=> {
                                            const formData = new FormData()
                                                formData.append('file', e.target.files[0])
                                            axios
                                            .post(api + '/backgrounds', formData)
                                            .then((res) => {
                                                if (res.status == 201) {
                                                    mutate(key)
                                                }
                                            })
                                        }} />
                                        <label htmlFor='uploadImage'>
                                            <span><BiUpload /></span>
                                        </label>
                                    </div>
                                : null } */}
                            </div>
                        </div>
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