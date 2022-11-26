import Head from 'next/head'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import styles from './Members.module.css'

import { TbSelect } from 'react-icons/tb'

function Members() {

    const memberSelect = () => {
        alert("test")
    }
    const handleNewMember = () => {
        alert('add')
    }
    const deleteHandler = () => {
        alert('delete')
    }
    const updateHander = () => {
        alert('update')
    }
    
    const members = [
        {
            name: "david"
        },
        {
            name: "person0"
        },
        {
            name: "person1"
        },
        {
            name: "person2"
        }
    ]    

    const [name, setName] = useState("name");
    const [occupation, setOccupation] = useState("occupation");
    const [paragrah, setParagraph] = useState("paaaaaa supser cuool paragraph\ni amsupergungry");
    const handleName = ({target:{value}}) => setName(value);
    const handleOccupation = ({target:{value}}) => setOccupation(value);
    const handleParagraph = ({target:{value}}) => setParagraph(value);
    const submitHandle = async (event) => {
        event.preventDefault();
        console.log(occupation)
        console.log(paragrah)
        axios
        .post("http://localhost:5000/members", {
            id: 17,
            name: name
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
                <div className={styles.container}>
                    <div className={styles.memberList}>
                        {members.map(({name}) => (
                            <div className={styles.member} key={name}>
                                <span>{name}</span>
                                <div className={styles.memberSelect} onClick={memberSelect}>
                                    <TbSelect />
                                </div>
                            </div>
                        ))}
                        <div className={styles.addMember}>
                            <button onClick={handleNewMember}>
                                <span>Add Member</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.memberCard}>
                        <div className={styles.titleContainer}>
                            <div className={styles.bar} />
                            <div className={styles.cardImage}>
                                <Image alt="" src="" layout="fill"/>
                            </div>
                        </div>
                        <div className={styles.cardForm}>
                            <form onSubmit={submitHandle}>
                                <div>
                                    <input name="name" value={name} onChange={handleName} />
                                    <input name="" value={occupation} onChange={handleOccupation} />
                                </div>
                                <input name="paragraph" value={paragrah} onChange={handleParagraph} />
                                <button type="submit">Test</button>
                            </form>
                        </div>
                        <div className={styles.cardButtons}>
                            <div onClick={deleteHandler} className={styles.delete}>Delete</div>
                            <div onClick={updateHander} className={styles.update}>Update</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Members