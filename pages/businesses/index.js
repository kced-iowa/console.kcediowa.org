import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Navbar from '../../components/Navbar'
import styles from './Businesses.module.css'

import { BiEdit } from 'react-icons/bi'
import { MdDelete, MdOutlineAdd } from 'react-icons/md'

const api = process.env.API_BASE

export default function Businesses(){

    const [businesses, setBusinesses] = useState([])
    useEffect(() => {
        fetchBusinesses()
    }, [])
    const fetchBusinesses = () => {
        axios
        .get(api + '/business')
        .then((res) => {
            setBusinesses(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <Head>
                <title>Businesses | SADC Console</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Businesses</span>
                </div>
                <div className={styles.businessContainer}>
                    <div className={styles.businessList}>
                        {businesses.map((business) => (
                            <div key={business._id} className={styles.business}>
                                <p>{business.name}</p>
                                <div>
                                    <button className={styles.edit} onClick={
                                            function editMember () {
                                                var url = '/businesses/edit/' + business._id
                                                window.location = url
                                            }
                                        }><BiEdit /></button>
                                    <button className={styles.delete} onClick={
                                        function deleteMember () {
                                            const check = confirm('Do you want to delete this business?')
                                                if (check == true) {
                                                    
                                                    setTimeout(function () {window.location.reload()},250)
                                                } else {}
                                        }
                                    }><MdDelete/></button>
                                </div>
                            </div>
                        ))}
                        <div className={styles.addMember} onClick={
                            function addMember() {
                                var url = '/businesses/add'
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