import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Head from 'next/head';
import axios from 'axios'
import styles from './Edit.module.css'

import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

export default function AddMember () {

    const api = process.env.NEXT_PUBLIC_APIBASE

    const [members, setMembers] = useState([])
    
    const [name, setName] = useState([])
    const handleName = ({target:{value}}) => setName(value)
    const [occupation, setOccupation] = useState('')
    const handleOccupation = ({target:{value}}) => setOccupation(value)
    const [paragraph, setParagraph] = useState('')
        const handleParagraph = ({target:{value}}) => setParagraph(value)
    const [date, setDate] = useState('')
        const handleDate = ({target:{value}}) => setDate(value)

    const router = useRouter()
    const { id }= router.query

    useEffect(() => {
        const fetchMembers = () => {
            axios
            .get(api + '/members/')
            .then((res) => {
                setMembers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        fetchMembers()
        const fetchAbout = () => {
            axios
            .get(api + '/members/' + id)
            .then((res) => {
                setName(res.data.name)
                setOccupation(res.data.occupation)
                setParagraph(res.data.bio)
                setDate(res.data.join)
                setImg(res.data.image)
                setImagePreview(api + '/cdn/members/' + res.data.image)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        fetchAbout()
    }, [api, id])


    const cancelHandler = () => {
        window.location = '/members'
    }

    const [imagePreview, setImagePreview] = useState('')
    const [img, setImg] = useState('')

    const onImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])
    }

    const submitHandle = (e) => {
        e.preventDefault();
        const formDatas = new FormData()
            formDatas.append('name', name)
            formDatas.append('occupation', occupation)
            formDatas.append('bio', paragraph)
            formDatas.append('join', date)
            formDatas.append('image', img)
        axios
        .patch(api + '/members/' + id, formDatas)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
                console.log(res)
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return(
        <>
            <Head>
                <title>Member | Edit</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    {members.map((member) => (
                        <div key={member._id} className={styles.member}>
                            <p>{member.name}</p>
                            <div>
                                <button className={styles.edit} onClick={
                                    function editMember () {
                                        var url = '/members/edit/' + member._id
                                        window.location = url
                                    }
                                }><BiEdit /></button>
                                <button className={styles.delete} onClick={
                                    function deleteMember () {
                                        const check = confirm('Do you want to delete this member?')
                                            if (check == true) {
                                                axios
                                                .delete(api + '/members/' + member._id)
                                                .then(res => res.json())
                                                .catch(err => console.log(err))
                                            } else {}
                                    }
                                }><MdDelete/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.editMember}>
                    <form onSubmit={submitHandle} encType="multipart/form-data">
                        <div className={styles.title}>
                            <div className={styles.bar}/>
                            <div className={styles.image}><Image alt='' src={imagePreview} layout='fill'/></div>
                            <input type="file" onChange={onImageChange}></input>
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
                            <button onClick={cancelHandler}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();