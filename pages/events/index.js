"use client";

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

// i don't even remember importing this, remove later ??
import { Group } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

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
    const [start, setStart] = useState(new Date(props.start))
    const [end, setEnd] = useState(new Date(props.end))
    return (
        <div className={styles.eventCard}>
            <form onSubmit={
                function editEvent (e) {
                    e.preventDefault()
                    const editEvent = {
                        title: e.target.newTitle.value,
                        start: start,
                        end: end,
                        desc: e.target.newAbout.value,
                        address: e.target.newAddress.value,
                        rsvp: e.target.newRsvp.value,
                        link: e.target.newLink.value
                    }
                    axios
                    .patch(api + '/events/' + props.id, editEvent)
                    .then(res => {
                        console.log(res)
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
                                .delete(api + '/events/' + props.id)
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
                    <span>{props.deleteID}</span>
                    <span>From</span>
                    <DateTimePicker
                        value={start}
                        placeholder="Start Date"
                        maw={400}
                        mx="auto"
                        onChange={(value)=>{setStart(value); setChanged(true)}}
                    />
                    <span onClick={()=>console.log(date)}>To</span>
                    {/* <input id="newTimeend" placeholder={"0:00PM"}></input> */}
                    <DateTimePicker
                        value={end}
                        placeholder="End Date"
                        maw={400}
                        mx="auto"
                        onChange={(value)=>{setEnd(value); setChanged(true)}}
                    />
                </div>
                <div className={styles.detailContainer}>
                    <textarea id="newAbout" defaultValue={props.desc} onChange={()=>setChanged(true)}></textarea>
                    <div>
                        <span><FaMapMarkerAlt /></span>
                        <input id="newAddress" defaultValue={props.address} onChange={()=>setChanged(true)}></input>
                    </div>
                    <input id="newLink" defaultValue={props.link} onChange={()=>setChanged(true)}></input>
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

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const {data, error} = useSWR(key, fetcher)
    // const temp = Array.prototype.reverse(data)

    const [addHandler, setAddHandler] = useState(false)
    const newCardAdded = (e) => {
        e.preventDefault()
        const newEvent = {
            title: e.target.newTitle.value,
            start: start,
            end: end,
            desc: e.target.newAbout.value,
            address: e.target.newAddress.value,
            rsvp: e.target.newRsvp.value,
            link: e.target.newLink.value
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
                                            setStart('')
                                            setEnd('')
                                        }
                                    }
                                }>X</button>
                            </div>
                            <div className={styles.cardTitle}>
                                <textarea id="newTitle" placeholder={"Event title"}></textarea>
                            </div>
                            <div className={styles.dateContainer}>
                                <div className={styles.timeContainer}>
                                    {/* <input id="newTimestart" placeholder={"0:00AM"}></input> */}
                                    <span>From</span>
                                    <DateTimePicker
                                        placeholder="Start Date"
                                        maw={400}
                                        mx="auto"
                                        onChange={setStart}
                                    />
                                    <span>To</span>
                                    {/* <input id="newTimeend" placeholder={"0:00PM"}></input> */}
                                    <DateTimePicker
                                        placeholder="End Date"
                                        maw={400}
                                        mx="auto"
                                        onChange={setEnd}
                                    />
                                </div>
                            </div>
                            <div className={styles.detailContainer}>
                                <textarea id="newAbout" placeholder={"About event"}></textarea>
                                <div>
                                    <span><FaMapMarkerAlt /></span>
                                    <input id="newAddress" placeholder={"Event location"}></input>
                                </div>
                                <input id="newLink" type="url" placeholder={"Additional link"}></input>
                            </div>
                            <div className={styles.forms}>
                                <input id="newRsvp" type="url" placeholder={"RSVP / form link"}></input>
                                <button type="submit">SAVE</button>
                            </div>
                            </form>
                        </div>
                    : null }
                    {data && data.map((event, i)=> (
                        <Event
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            start={event.start}
                            end={event.end}
                            desc={event.desc}
                            address={event.address}
                            rsvp={event.rsvp}
                            link={event.link}
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