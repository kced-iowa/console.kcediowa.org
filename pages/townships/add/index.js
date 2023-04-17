import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import { useUser } from "@auth0/nextjs-auth0";
import FormData from "form-data";
import Head from "next/head";
import Image from 'next/image'
import axios from 'axios'
import styles from './Add.module.css'

function SocialInputs () {
    const [socialType, setSocialType] = useState('')
    return (
        <div className={styles.socialCont}>
        <select onChange={(e)=>setSocialType(e.target.value)} className={styles.selectSocial}>
            <option value="">asdfasdfasdf</option>
            <option value="test1">test1</option>
            <option value="test2">test2</option>
        </select>
        <input placeholder={socialType} />
        </div>
    )
}

export default function AddBusiness() {
    
    const api = process.env.NEXT_PUBLIC_APIBASE
    
    const [imagePreview, setImagePreview] = useState(api + '/cdn/members/Black.jpg')
    const [imagePreview2, setImagePreview2] = useState(api + '/cdn/members/Black.jpg')
    const [image, setImage] = useState('')
    const [image2, setImage2] = useState('')

    const { user, error, isLoading } = useUser();
    // i don't know why auth0 needs this, but it won't run without it...
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    const onImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }
    
    const onImageChange2 = (e) => {
        setImagePreview2(URL.createObjectURL(e.target.files[0]));
        setImage2(e.target.files[0]);
    }

    const submitHandler = (e) => {
        e.preventDefault();
            const formDatas = new FormData();
            formDatas.append('coverimg', image)
            formDatas.append('mainimg', image2)

        axios
        .post(api + '/townships', formDatas)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }
    const returnHandler = () => {
        const url = '/townships'
        window.location = url
    }
    return (
        <>
            <Head>
                <title>Townships | Add</title>
            </Head>
            <div className={styles.page}>
                <form onSubmit={submitHandler} encType='multipart/form-data'>
                    <div className={styles.add}>
                        <div className={styles.title}>
                            <div className={styles.bar} />
                                <div className={styles.image}>
                                    <Image alt='' src={imagePreview} height='200px' width='200px'/>
                                    <div>
                                        <input type='file' onChange={onImageChange} accept='image/*' />
                                        <span>Cover Image</span>
                                    </div>
                                </div>
                                <div className={styles.image}>
                                    <Image alt='' src={imagePreview2} height='200px' width='200px'/>
                                    <div>
                                        <input type='file' onChange={onImageChange2}/>
                                        <span>Main Image</span>
                                    </div>
                                </div>
                        </div>
                        <div className={styles.inputs}>
                            <input type="text" id='name' placeholder="Town Name" />
                            <input type="link" id='link' placeholder="Town Link" />
                            <input type="text" id='address' placeholder="Town Address (Just town name)" />
                            <SocialInputs />
                            <textarea id="bio" placeholder="About" />
                        </div>
                        <div className={styles.buttons}>
                            <button type="submit">Add</button>
                            <button onClick={returnHandler} type="button">Cancel</button>
                        </div>
                    </div>
                </form>
                <span className={styles.editStatus}>Editing as [{user.username}]</span>
            </div>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();