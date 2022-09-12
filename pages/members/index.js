import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import styles from './Members.module.css'

const deleteHandler = () => {
    alert('delete')
}
const updateHander = () => {
    alert('update')
}
const submitHandler = () => {}

function Members() {
    const [state, useState] = React.useState({
        balls: "test" 
    })
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
                <div className={styles.cardContainer}>
                    <div className={styles.memberCard}>
                        <div className={styles.imageContainer}>
                            <div className={styles.bar} />
                            <div className={styles.cardImage}>
                                <Image alt="" src="" layout="fill"/>
                            </div>
                        </div>
                        <div className={styles.cardTitle}>
                            <form>
                            <input name="name" value={state.balls} />
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