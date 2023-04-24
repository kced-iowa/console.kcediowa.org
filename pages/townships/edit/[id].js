import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import {useState, useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import useSWR, { isLoading as swrIsLoading} from 'swr'
import axios from "axios";
import { useRouter } from "next/router";
import styles from './Edit.module.css'

const api = process.env.NEXT_PUBLIC_APIBASE

export default function EditBusiness() {
    
    const router = useRouter()
    const { id }= router.query

    useEffect(() => {
        const fetchTown = () => {
            axios
            .get(api + '/townships/' + id)
            .then((res) => {
                setData(res.data)
                setImagePreview(api + '/cdn/townships/' + res.data.coverImg)
                setImage(res.data.coverImg)
                setImagePreview2(api + '/cdn/townships/' + res.data.mainImg)
                setImage2(res.data.mainImg)
            })
        }
        if (router.isReady) {
            fetchTown()
        }
    }, [])

    const [data, setData] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview2, setImagePreview2] = useState('')
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

    const returnHandler = () => {
        const url = '/townships'
        window.location = url
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const balls = [
            {type: e.target.type0.value, user: e.target.user0.value},
            {type: e.target.type1.value, user: e.target.user1.value},
            {type: e.target.type2.value, user: e.target.user2.value}
        ]
        const formDatas = new FormData();
        formDatas.append('coverImg', image)
        formDatas.append('mainImg', image2)
        formDatas.append('name', e.target.name.value)
        formDatas.append('url', e.target.link.value)
        formDatas.append('about', e.target.bio.value)
        formDatas.append('mapsAddress', e.target.address.value)
        formDatas.append('socials', JSON.stringify(balls))
        console.log(formDatas)
        axios
        .patch(api + '/townships/' + id, formDatas)
        .then(res => {
            if(res.status === 200) {
                returnHandler()
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>{"Township | " + data.name}</title>
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
                                <input type="text" id='name' defaultValue={data.name} />
                                <input type="link" id='link' defaultValue={data.url} />
                                <input type="text" id='address' defaultValue={data.mapsAddress} />
                                <div>
                                    {data.socials.map((data, i) =>
                                        <div className={styles.socialCont} key={i}>
                                            <select id={"type" + i} defaultValue={data.type} className={styles.selectSocial}>
                                                <option value="">Social Media</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <input id={"user" + i} defaultValue={data.user} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <textarea id="bio" cols={23} placeholder="About" defaultValue={data.about} />
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
    );
}

export const getServerSideProps = withPageAuthRequired();