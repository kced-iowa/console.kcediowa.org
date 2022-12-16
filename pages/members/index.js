import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import styles from './Members.module.css'

import { TbSelect } from 'react-icons/tb'

export default function Members() {
    const [members, setMembers] = useState([])
    useEffect(() => {
        fetchMembers()
    }, [])
    const fetchMembers = () => {
        axios
        .get('http://localhost:5000/members')
        .then((res) => {
            setMembers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <Head>
                <title>Members | SADC Console</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Members</span>
                </div>
                <div className={styles.memberContainer}>
                    <div className={styles.memberList}>
                        {members.map((member) => (
                            <div key={member._id} className={styles.member}>
                                <p>{member.name}</p>
                                <div>
                                    <button className={styles.edit} onClick={
                                        function editMember () {
                                            var url = '/members/edit/' + member._id
                                            window.location = url
                                        }
                                    }>Edit</button>
                                    <button className={styles.delete} onClick={
                                        function deleteMember () {
                                                axios
                                                .delete('http://localhost:5000/members/' + member._id)
                                                .then(res => res.json())
                                                .catch(err => console.log(err))
                                                setTimeout(function () {window.location.reload()},250)
                                        }
                                    }>Delete</button>
                                </div>
                            </div>
                        ))}
                        <div className={styles.addMember} onClick={
                            function addMember() {
                                var url = '/members/add'
                                window.location = url
                            }
                        }>Add Member</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();