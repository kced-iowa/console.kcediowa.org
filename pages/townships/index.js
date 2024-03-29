import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Navbar from '../../components/Navbar'
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import styles from './Townships.module.css'

import { BiEdit } from 'react-icons/bi'
import { MdDelete, MdOutlineAdd } from 'react-icons/md'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
const key = api + '/townships'

export default function Townships(){
    
    const { data, error } = useSWR(key, fetcher)

    return (
        <div>
            <Head>
                <title>Townships | KCED Console</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Townships</span>
                </div>
                <div className={styles.townshipContainer}>
                    <div className={styles.townshipList}>
                        {data && data.map((township) => (
                            <div key={township._id} className={styles.township}>
                                <p>{township.name}</p>
                                <div>
                                    <button className={styles.edit} onClick={
                                            function editMember () {
                                                var url = '/townships/edit/' + township._id
                                                window.location = url
                                            }
                                        }><BiEdit /></button>
                                    <button className={styles.delete} onClick={
                                        function deleteMember () {
                                            const check = confirm('Do you want to delete this township?')
                                                if (check == true) {
                                                    axios
                                                    .delete(api + '/townships/' + township._id)
                                                    .then((res)=> {
                                                        if (res.status == 200) {
                                                            mutate(key)
                                                        }
                                                    })
                                                    .catch(err => console.log(err))
                                                } else {}
                                        }
                                    }><MdDelete/></button>
                                </div>
                            </div>
                        ))}
                        <div className={styles.addMember} onClick={
                            function addMember() {
                                var url = '/townships/add'
                                window.location = url
                            }
                        }><MdOutlineAdd /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();