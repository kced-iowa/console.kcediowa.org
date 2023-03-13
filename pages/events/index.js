import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Link from "next/link";
import Navbar from '../../components/Navbar'
import axios from 'axios'
import styles from './Events.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'

export default function Events(){

    const [addHandler, setAddAppend] = useState(false)
    const addCard = () => {
        setAddAppend(true)
    }
    const removeAddCard = () => {
        setAddAppend(false)
    }

    const [isChanged, setIsChanged] = useState(false)
    const changedHandler = () => {
        setIsChanged(true)
    }
    const savedHandler = () => {
        setIsChanged(false)
    }
    return (
        <>
            <Head>
                <title>Events | SADC Console</title>
            </Head>
            <Navbar />
            <div>
                <div className={styles.title}>
                    <span>
                        Events
                    </span>
                    <span onClick={()=>{alert("Tap on any element of the card to edit it!")}}>
                        <IoMdInformationCircleOutline />
                    </span>
                </div>
                <div className={styles.container}>
                    {addHandler == true ? 
                        <div className={styles.addCard}>
                            <span onClick={removeAddCard}>hi</span>
                        </div>
                    : null }
                    <div className={styles.eventCard}>
                        <div className={styles.delButton}>
                            <button onClick={()=>{confirm("Are you sure you want to delete this event?")}}><AiFillDelete /></button>
                        </div>
                        <div className={styles.cardTitle}>
                            <textarea defaultValue={"Farmer's Markeasffffffffasd fasd fsadf asdft"} onChange={changedHandler}></textarea>
                        </div>
                        <div className={styles.dateContainer}>
                            <input type="text" maxLength={2} defaultValue={"24"} onChange={changedHandler}></input>
                            <input type="text" maxLength={4} defaultValue={"SEPT"} onChange={changedHandler}></input>
                            {/* <div>
                                <input defaultValue={"9:20AM"}></input>
                                <span> - </span>
                                <input defaultValue={"8:35PM"}></input>
                            </div> */}
                        </div>
                        <div className={styles.detailContainer}>
                            <textarea defaultValue={"Buy fresh vegetables at the farmers market"} onChange={changedHandler}></textarea>
                            <div>
                                <span><FaMapMarkerAlt /></span>
                                <input defaultValue={"15999 200th avenue"} onChange={changedHandler}></input>
                            </div>
                        </div>
                        {isChanged == true ? <span>true</span> : <span>false</span>}
                        <div className={styles.forms}>
                            <a rel="noreferrer" target="_blank" href="https://google.com">
                                <button><BsBoxArrowUpRight /></button>
                            </a>
                            <input defaultValue={"https://google.com"} onChange={changedHandler}></input>
                        </div>
                        <span onClick={savedHandler}>vlickcle</span>
                    </div>
                </div>
                <div className={styles.addButton}>
                    <span onClick={addCard}><BiMessageSquareAdd /></span>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();