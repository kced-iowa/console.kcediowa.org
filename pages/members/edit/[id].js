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
    const [data, setData] = useState('')

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
                setData(res.data)
                setImg(res.data.image)
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
            formDatas.append('name', e.target.name.value)
            formDatas.append('occupation', e.target.occupation.value)
            formDatas.append('bio', e.target.bio.value)
            formDatas.append('join', e.target.join.value)
            formDatas.append('image', img)
            formDatas.append('email', e.target.email.value)
            formDatas.append('phone', e.target.phone.value)
            formDatas.append('website', e.target.website.value)
        axios
        .patch(api + '/members/' + id, formDatas)
        .then(res => {
            if(res.status === 200) {
                cancelHandler()
            }
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
                            <div className={styles.image}><Image alt='' src={imagePreview} layout='fill' /></div>
                            <input type="file" onChange={onImageChange}></input>
                        </div>
                        <div className={styles.inputs}>
                            <div>
                                <input defaultValue={data.name} id='name' placeholder="Name" />
                                <input defaultValue={data.occupation} id='occupation' placeholder="Occupation" />
                                <input defaultValue={data.join} id='join' placeholder="Member Since" />
                                <input defaultValue={data.email} id="email" placeholder="Email" />
                                <input defaultValue={data.phone} id="phone" placeholder="Phone" />
                                <input defaultValue={data.website} id="website" placeholder="Website" />
                            </div>
                            <textarea defaultValue={data.bio} id='bio' placeholder="Paragraph" />
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