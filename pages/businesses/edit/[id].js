import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import {useState, useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from './Edit.module.css'


export default function EditBusiness() {
    
    const api = process.env.NEXT_PUBLIC_APIBASE
    
    const router = useRouter()
    const { id } = router.query

    const [imagePreview, setImagePreview] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview2, setImagePreview2] = useState('')
    const [image2, setImage2] = useState('')
    
    // oh my god find a different way to handle this
    const [name, setName] = useState('')
        const handleName = ({target:{value}}) => setName(value)
    const [type, setType] = useState('')
        const handleType = ({target:{value}}) => setType(value)
    const [phone, setPhone] = useState('')
        const handlePhone = ({target:{value}}) => setPhone(value)
    const [address, setAddress] = useState('')
        const handleAddress = ({target:{value}}) => setAddress(value)
    const [bio, setBio] = useState('')
        const handleBio = ({target:{value}}) => setBio(value)
    const [website, setWebsite] = useState('')
        const handleWebsite = ({target:{value}}) => setWebsite(value)
    const [facebook, setFacebook] = useState('')
        const handleFacebook = ({target:{value}}) => setFacebook(value)

    useEffect(() => {
        const getBusiness = () => {
            axios
            .get(api + '/business/' + id)
            .then((res) => {
                setImagePreview(api + '/cdn/business/' + res.data.coverimg)
                setImagePreview2(api + '/cdn/business/' + res.data.mainimg)
            })
        }
        getBusiness()
    }, [id, api])
    
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
        const url = '/businesses'
        window.location = url
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
            formData.append('name', name)
            formData.append('type', type)
            formData.append('phone', phone)
            formData.append('address', address)
            formData.append('bio', bio)
            formData.append('website', website)
            formData.append('facebook', facebook)
        axios
        .patch(api + '/businesses/' + id, formData)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
                console.log(res)
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>Business | Add</title>
            </Head>
            <div className={styles.page}>
                <div className={styles.add}>
                    <form onSubmit={submitHandler} encType='multipart/form-data'>
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
                            <input type="text" id='name' placeholder="Name" onChange={handleName} />
                            <input type="text" id='type' placeholder="Business Type" onChange={handleType} />
                            <input type="tel" id='phone' placeholder="Phone Number" onChange={handlePhone} />
                            <input type="text" id='address' placeholder="Address" onChange={handleAddress} />
                            <input type="text" id='bio' placeholder="About Business" onChange={handleBio} />
                            <input type="text" id='website' placeholder="Website" onChange={handleWebsite} />
                            <input type="text" id='facebook' placeholder="Facebook" onChange={handleFacebook} />
                        </div>
                        <div className={styles.buttons}>
                            <button type="submit">Add</button>
                            <button onClick={returnHandler} type="button">Cancel</button>
                        </div>
                    </form>
                </div>
                <span className={styles.editStatus}>Editing as [{user.username}]</span>
            </div>
        </>
    );
}

export const getServerSideProps = withPageAuthRequired();