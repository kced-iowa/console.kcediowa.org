import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import styles from './Members.module.css'

import { AiOutlineUserAdd } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
const key = api + '/members'

export default function Members() {
    const { data, error } = useSWR(key, fetcher)
    return (
        <div>
            <Head>
                <title>Members | KCED Console</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Members</span>
                </div>
                <div className={styles.memberContainer}>
                    <div className={styles.memberList}>
                        {data && data.map((member) => (
                            <div key={member._id} className={styles.member}>
                                <p>{member.name}</p>
                                <div>
                                    <button className={styles.edit} onClick={
                                        function editMember () {
                                            var url = '/members/edit/' + member._id
                                            window.location = url
                                        }
                                    }><BiEdit /></button>
                                    <button className={styles.delete} onClick={
                                        function deleteMember () {
                                            const check = confirm('Do you want to delete this member?')
                                                if (check == true) {
                                                    axios
                                                    .delete(api + '/members/' + member._id)
                                                    .then((res) => {
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
                                var url = '/members/add'
                                window.location = url
                            }
                        }><AiOutlineUserAdd /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();