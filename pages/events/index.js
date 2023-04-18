// !! NEEDS CLEANING !!
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useMemo, useState, useEffect, useCallback } from 'react'
import Head from "next/head";
import Link from "next/link";
import Navbar from '../../components/Navbar'
import axios from 'axios'
import useSWR, {mutate} from 'swr'
// this especially needs to be cleaned up
import styles from './Events.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
var key = api + '/events'

function Event(props){
    const [changed, setChanged] = useState(false)
    return (
        <div className={styles.eventCard}>
            <form onSubmit={
                function editEvent (e) {
                    e.preventDefault()
                    const editEvent = {
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
                    .patch(api + '/events/' + props._id, editEvent)
                    .then(res => {
                        if(res.status == 201) {
                            setChanged(false)
                            mutate(key)
                        }
                    })
                    .catch(err => console.log(err))
                }
            }>
                <div className={styles.delButton}>
                    <button onClick={
                        function delEvent (e) {
                            e.preventDefault()
                            const check = confirm('Do you want to delete this event?')
                            if (check == true) {
                                axios
                                .delete(api + '/events/' + props._id)
                                .then((res)=> {
                                    if (res.status == 200) {
                                        mutate(key)
                                    }
                                })
                            } else {}
                        }
                        }><AiFillDelete /></button>
                </div>
                <div className={styles.cardTitle}>
                    <textarea id="newTitle" defaultValue={props.title} onChange={()=>setChanged(true)}></textarea>
                </div>
                <div className={styles.dateContainer}>
                    <input id="newDay" className={styles.day} type="text" maxLength={2} defaultValue={props.dd} onChange={()=>setChanged(true)}></input>
                    <input id="newMonth" type="text" maxLength={4} defaultValue={props.mm} onChange={()=>setChanged(true)}></input>
                    <div className={styles.timeContainer}>
                        <input id="newTimestart" defaultValue={props.timestart} onChange={()=>setChanged(true)}></input>
                        <span> - </span>
                        <input id="newTimeend" defaultValue={props.timeend} onChange={()=>setChanged(true)}></input>
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <textarea id="newAbout" defaultValue={props.desc} onChange={()=>setChanged(true)}></textarea>
                    <div>
                        <span><FaMapMarkerAlt /></span>
                        <input id="newAddress" defaultValue={props.address} onChange={()=>setChanged(true)}></input>
                    </div>
                </div>
                <div className={styles.forms}>
                    <a rel="noreferrer" target="_blank" href={props.rsvp}>
                        <BsBoxArrowUpRight />
                    </a>
                    <input id="newRsvp" defaultValue={props.rsvp} onChange={()=>setChanged(true)}></input>
                    {changed == true ? <button>Save</button> : null}
                </div>
            </form>
        </div> 
    )
}

export default function Events(){

    const {data, error} = useSWR(key, fetcher)

    const [addHandler, setAddHandler] = useState(false)
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
        .then((res)=> {
            if(res.status == 201) {
                setAddHandler(false)
                mutate(key)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>Events | KCED Console</title>
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
                                <button type="button" onClick={
                                    function cancelAdd () {
                                        const check = confirm("Are you sure you want to cancel?")
                                        if (check == true) {
                                            setAddHandler(false)
                                        }
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
                    {data && data.map((event)=> (
                        <Event
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
                    ))}
                </div>
                <div className={styles.addButton}>
                    <span onClick={()=>setAddHandler(true)}><BiMessageSquareAdd /></span>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();