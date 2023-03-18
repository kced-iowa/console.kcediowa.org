import { useState } from "react"
import axios from "axios"
import styles from './Events.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'

export default function EventCard (props) {

    const api = process.env.NEXT_PUBLIC_APIBASE

    const [changed, setChanged] = useState(false)
    const changedCheck = () => {
        setChanged(true)
    }
    const savedHandler = () => {
        setChanged(false)
    }
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
                            savedHandler()
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
                            } else {}
                        }
                        }><AiFillDelete /></button>
                </div>
                <div className={styles.cardTitle}>
                    <textarea id="newTitle" defaultValue={props.title} onChange={changedCheck}></textarea>
                </div>
                <div className={styles.dateContainer}>
                    <input id="newDay" className={styles.day} type="text" maxLength={2} defaultValue={props.dd} onChange={changedCheck}></input>
                    <input id="newMonth" type="text" maxLength={4} defaultValue={props.mm} onChange={changedCheck}></input>
                    <div className={styles.timeContainer}>
                        <input id="newTimestart" defaultValue={props.timestart} onChange={changedCheck}></input>
                        <span> - </span>
                        <input id="newTimeend" defaultValue={props.timeend} onChange={changedCheck}></input>
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <textarea id="newAbout" defaultValue={props.desc} onChange={changedCheck}></textarea>
                    <div>
                        <span><FaMapMarkerAlt /></span>
                        <input id="newAddress" defaultValue={props.address} onChange={changedCheck}></input>
                    </div>
                </div>
                <div className={styles.forms}>
                    <a rel="noreferrer" target="_blank" href={props.rsvp}>
                        <BsBoxArrowUpRight />
                    </a>
                    <input id="newRsvp" defaultValue={props.rsvp} onChange={changedCheck}></input>
                    {changed == true ? <button>Save</button> : null}
                </div>
            </form>
        </div> 
    )
}