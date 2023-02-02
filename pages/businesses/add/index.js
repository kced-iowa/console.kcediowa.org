import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from 'react'
import { useUser } from "@auth0/nextjs-auth0";
import FormData from "form-data";
import Head from "next/head";
import Image from 'next/image'
import axios from 'axios'
import styles from './Add.module.css'

export default function AddBusiness() {
    
    const api = process.env.NEXT_PUBLIC_APIBASE
    
    const [imagePreview, setImagePreview] = useState(api + '/cdn/members/BlacK.jpg')
    const [imagePreview2, setImagePreview2] = useState(api + '/cdn/members/BlacK.jpg')
    const [image, setImage] = useState('')
    const [image2, setImage2] = useState('')

    const [contactsPreview, setContactsPreview] = useState(api + '/cdn/members/Black.jpg')
    const [contactsImage, setContactsImage] = useState('')

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

    const onContactChange = (e) => {
        setContactsPreview(URL.createObjectURL(e.target.files[0]))
        setContactsImage(e.target.files[0])
    }

    const cum = {
        name: "John",
        position: "hi",
        number: 234234
    }
    const submitHandler = (e) => {
        e.preventDefault();
            const formDatas = new FormData();
            formDatas.append('coverimg', image)
            formDatas.append('mainimg', image2)
            formDatas.append('name', e.target.name.value)
            formDatas.append('type', e.target.type.value)
            formDatas.append('phone', e.target.phone.value)
            formDatas.append('address', e.target.address.value)
            formDatas.append('bio', e.target.bio.value)
            formDatas.append('website', e.target.website.value)
            formDatas.append('facebook', e.target.facebook.value)
            const contactObj = {
                name: e.target.contactName.value,
                position: e.target.contactPosition.value,
                number: e.target.contactNumber.value
            }
            // add contact data to object, should work ??
            const contactParsed = JSON.stringify(contactObj)
            formDatas.append("contact", contactParsed)
        axios
        .post(api + '/business', formDatas)
        .then(res => {
            if(res.status === 201) {
                returnHandler()
            }
        })
        .catch(err => console.log(err))
    }
    const returnHandler = () => {
        const url = '/businesses'
        window.location = url
    }
    return (
        <>
            <Head>
                <title>Business | Add</title>
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
                            <input type="text" id='name' placeholder="Name" />
                            <input type="text" id='type' placeholder="Business Type" />
                            <input type="tel" id='phone' placeholder="Phone Number" />
                            <input type="text" id='address' placeholder="Address" />
                            <input type="text" id='website' placeholder="Website" />
                            <input type="text" id='facebook' placeholder="Facebook" />
                            <textarea id='bio' placeholder="Bio" />
                        </div>
                        <div className={styles.buttons}>
                            <button type="submit">Add</button>
                            <button onClick={returnHandler} type="button">Cancel</button>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactTitle}>
                            <span>Contact Info</span>
                            <div>
                                <div className={styles.bar} />
                                <Image alt='' src={contactsPreview} height='200px' width='200px' />
                                <input type='file' accept='image/*' onChange={onContactChange} />
                            </div>
                        </div>
                        <div className={styles.inputs}>
                            <input id='contactName' placeholder='Name' />
                            <input id='contactPosition' placeholder='Position' />
                            <input id='contactNumber' type='tel' placeholder='Phone Number' />
                        </div>
                    </div>
                </form>
                <span className={styles.editStatus}>Editing as [{user.username}]</span>
            </div>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();