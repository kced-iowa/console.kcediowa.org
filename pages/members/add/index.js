import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FormData from 'form-data';
import Image from 'next/image'
import Head from 'next/head';
import axios from 'axios'
import styles from './Add.module.css'

export default function AddMember (props) {

    const api = process.env.NEXT_PUBLIC_APIBASE

    const [imagePreview, setImagePreview] = useState(api + '/cdn/members/Black.jpg')
    const [img, setImg] = useState('')

    const onImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])
    }

    const returnHandler = () => {
        const url = '/members'
        window.location = url
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
            const formDatas = new FormData()
            formDatas.append('name', name)
            formDatas.append('occupation', e.target.occupation.value)
            formDatas.append('bio', e.target.paragraph.value)
            formDatas.append('join', e.target.date.value)
            formDatas.append('image', img)
        axios
        .post(api + '/members', formDatas)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Member | Add</title>
            </Head>
            <div className={styles.editMember}>
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className={styles.title}>
                        <div className={styles.bar}/>
                        <div className={styles.image}><Image alt='' layout='fill' src={imagePreview} /></div>
                        <input type="file" onChange={onImageChange}></input>
                    </div>
                    <div className={styles.inputs}>
                        <div>
                            <input id="name" placeholder="Name" />
                            <input id="occupation" placeholder="Occupation" />
                            <input id="date" placeholder="Member Since" />
                        </div>
                        <textarea id="paragraph" placeholder="Paragraph" />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit">Add</button>
                        <button onClick={returnHandler} type="button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();