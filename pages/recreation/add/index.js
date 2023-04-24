import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import { useUser } from "@auth0/nextjs-auth0";
import FormData from "form-data";
import Head from "next/head";
import Image from 'next/image'
import axios from 'axios'
import styles from './Add.module.css'

const mapMe = [
    {"type": "social1"},
    {"type": "social2"},
    {"type": "social3"}
]

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
        const balls = [
            {type: e.target.social1type.value, user: e.target.social1.value},
            {type: e.target.social2type.value, user: e.target.social2.value},
            {type: e.target.social3type.value, user: e.target.social3.value}
        ]
        const formDatas = new FormData();
            formDatas.append('coverImg', image)
            formDatas.append('mainImg', image2)
            formDatas.append('name', e.target.name.value)
            formDatas.append('url', e.target.link.value)
            formDatas.append('history', e.target.history.value)
            formDatas.append('activities', e.target.activities.value)
            formDatas.append('mapsAddress', e.target.address.value)
            formDatas.append('socials', JSON.stringify(balls))
        axios
        .post(api + '/recreation', formDatas)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
            }
        })
        .catch(err => console.log(err))
    }
    const returnHandler = () => {
        const url = '/recreation'
        window.location = url
    }
    return (
        <>
            <Head>
                <title>Recreation | Add</title>
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
                            <div>
                                <input type="text" id='name' placeholder="Name" />
                                <input type="link" id='link' placeholder="Link" />
                                <input type="text" id='address' placeholder="Address" />
                                <div>
                                    {mapMe.map((data, i) =>
                                        <div className={styles.socialCont} key={i}>
                                            <select id={data.type + "type"} className={styles.selectSocial}>
                                                <option value="">Social Media</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <input id={data.type} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <textarea id="history" cols={23} placeholder="History" />
                                <textarea id="activities" cols={23} placeholder="Activities" />
                            </div>
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