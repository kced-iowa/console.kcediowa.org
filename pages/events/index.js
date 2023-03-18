import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Link from "next/link";
import Navbar from '../../components/Navbar'
import axios from 'axios'
import styles from './Events.module.css'
import EventCard from './EventCard'

import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'

export default function Events(){

    const api = process.env.NEXT_PUBLIC_APIBASE

    const [data, setData] = useState([])
    const [addHandler, setAddAppend] = useState(false)

    const fetchEvents = () => {
        axios
        .get(api + '/events')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const removeAddCard = () => {
        setAddAppend(false)
    }
    
    useEffect(() => {
        fetchEvents()
    }, [setData, removeAddCard])
    
    const addCard = () => {
        setAddAppend(true)
    }

    const newCardAdded = (e) => {
        e.preventDefault()
        const newEvent = {
            title: e.target.newTitle.value,
            dd: e.target.newDay.value,
            mm: e.target.newMonth.value,
            timestart: e.target.newTimestart.value,
            timeend: e.target.newTimeend.value,
            desc: e.target.newAbout.value,
            address: e.target.newAddress.value,
            rsvp: e.target.newRsvp.value
        }
        axios
        .post(api + '/events', newEvent)
        .then(res => {
            if(res.status == 201) {
                removeAddCard()
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    // const [isChanged, setIsChanged] = useState(false)
    // const changedHandler = () => {
    //     setIsChanged(true)
    // }
    // const savedHandler = () => {
    //     setIsChanged(false)
    // }

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
                            <form onSubmit={newCardAdded}>
                            <div className={styles.delButton}>
                                <button onClick={
                                    function cancelAdd () {
                                        const check = confirm("Are you sure you want to cancel?")
                                        if (check == true) {
                                            removeAddCard()
                                        } else {}
                                    }
                                }>X</button>
                            </div>
                            <div className={styles.cardTitle}>
                                <textarea id="newTitle" placeholder={"Event title"}></textarea>
                            </div>
                            <div className={styles.dateContainer}>
                                <input id="newDay" className={styles.day} type="text" maxLength={2} placeholder={"00"}></input>
                                <input id="newMonth" type="text" maxLength={4} placeholder={"MONTH"}></input>
                                <div className={styles.timeContainer}>
                                    <input id="newTimestart" placeholder={"0:00AM"}></input>
                                    <span> - </span>
                                    <input id="newTimeend" placeholder={"0:00PM"}></input>
                                </div>
                            </div>
                            <div className={styles.detailContainer}>
                                <textarea id="newAbout" placeholder={"About event"}></textarea>
                                <div>
                                    <span><FaMapMarkerAlt /></span>
                                    <input id="newAddress" placeholder={"Event location"}></input>
                                </div>
                            </div>
                            <div className={styles.forms}>
                                <input id="newRsvp" type="url" placeholder={"RSVP / form link"}></input>
                                <button type="submit">SAVE</button>
                            </div>
                            </form>
                        </div>
                    : null }
                    {data.map((event) =>
                        <EventCard
                            _id={event._id}
                            title={event.title}
                            dd={event.dd}
                            mm={event.mm}
                            timestart={event.timestart}
                            timeend={event.timeend}
                            desc={event.desc}
                            address={event.address}
                            rsvp={event.rsvp}
                        />
                    )}
                </div>
                <div className={styles.addButton}>
                    <span onClick={addCard}><BiMessageSquareAdd /></span>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();