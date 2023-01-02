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

    const [name, setName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [date, setDate] = useState('')

    const handleName = ({target:{value}}) => setName(value)
    const handleOccupation = ({target:{value}}) => setOccupation(value)
    const handleParagraph = ({target:{value}}) => setParagraph(value)
    const handleDate = ({target:{value}}) => setDate(value)

    const [imagePreview, setImagePreview] = useState('')
    const [img, setImg] = useState('')
    const [imgName, setImgName] = useState('')

    const onImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])
        setImgName(e.target.files[0].name)
    }

    const submitHandler = (e) => {
        e.preventDefault()
            const formDatas = new FormData()
            formDatas.append('name', name)
            formDatas.append('occupation', occupation)
            formDatas.append('bio', paragraph)
            formDatas.append('join', date)
            formDatas.append('image', img)
        console.log(formDatas)
        axios
        .post(api + '/members', formDatas)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const cancelHandler = () => {
        const url = '/members'
        window.location = url
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
                        <input type="file" name='balls' onChange={onImageChange}></input>
                    </div>
                    <div className={styles.inputs}>
                        <div>
                            <input value={name} placeholder="Name" onChange={handleName} />
                            <input value={occupation} placeholder="Occupation" onChange={handleOccupation} />
                            <input value={date} placeholder="Member Since" onChange={handleDate} />
                        </div>
                        <textarea value={paragraph} placeholder="Paragraph" onChange={handleParagraph} />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit">Add</button>
                        <button onClick={cancelHandler} type="button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();