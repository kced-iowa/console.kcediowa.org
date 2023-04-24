import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Navbar from '../../components/Navbar'
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import styles from './Recreation.module.css'

import { BiEdit } from 'react-icons/bi'
import { MdDelete, MdOutlineAdd } from 'react-icons/md'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
const key = api + '/recreation/'

export default function Recreation(){
    
    const { data, error } = useSWR(key, fetcher)

    return (
        <div>
            <Head>
                <title>Recreation | KCED Console</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Recreation</span>
                </div>
                <div className={styles.recreationContainer}>
                    <div className={styles.recreationList}>
                        {data && data.map((recreation) => (
                            <div key={recreation._id} className={styles.recreation}>
                                <p>{recreation.name}</p>
                                <div>
                                    <button className={styles.edit} onClick={
                                            function editMember () {
                                                var url = '/recreation/edit/' + recreation._id
                                                window.location = url
                                            }
                                        }><BiEdit /></button>
                                    <button className={styles.delete} onClick={
                                        function deleteMember () {
                                            const check = confirm('Do you want to delete this recreation?')
                                                if (check == true) {
                                                    axios
                                                    .delete(api + '/recreation/' + recreation._id)
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
                                var url = '/recreation/add'
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