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
    

    const [data, setData] = useState([])
    const [contact, setContact] = useState({})

    const [imagePreview, setImagePreview] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview2, setImagePreview2] = useState('')
    const [image2, setImage2] = useState('')

    const [contactsPreview, setContactsPreview] = useState('')
    const [contactsImage, setContactsImage] = useState('')
    
    const { id } = router.query
    
    useEffect(() => {
        const fetchBusiness = () => {
            axios
            .get(api + '/business/' + id)
            .then((res) => {
                setData(res.data)
                setContact(res.data.contact)
                setImagePreview(api + '/cdn/business/' + res.data.coverimg)
                setImage(res.data.coverimg)
                setImagePreview2(api + '/cdn/business/' + res.data.mainimg)
                setImage2(res.data.mainimg)
                setContactsPreview(api + '/cdn/business/' + res.data.contactimg)
                setContactsImage(res.data.contactimg)
            })
        }
        if(router.isReady){
            fetchBusiness();
        }
    }, [api, router.query, router.isReady, id])
    
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

    const returnHandler = () => {
        const url = '/businesses'
        window.location = url
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // i will rename this later but i don't really care
        const balls = [
            {type: e.target.type0.value, user: e.target.user0.value},
            {type: e.target.type1.value, user: e.target.user1.value},
            {type: e.target.type2.value, user: e.target.user2.value}
        ]
        const formData = new FormData()
            formData.append('coverimg', image)
            formData.append('mainimg', image2)
            // find how to append the image to the contactObj object ???
            formData.append('contactimg', contactsImage)
            formData.append('name', e.target.name.value)
            formData.append('type', e.target.type.value)
            formData.append('phone', e.target.phone.value)
            formData.append('address', e.target.address.value)
            formData.append('bio', e.target.bio.value)
            formData.append('website', e.target.website.value)
            formData.append('socials', JSON.stringify(balls))
            const contactObj = {
                name: e.target.contactName.value,
                position: e.target.contactPosition.value,
                number: e.target.contactNumber.value,
                email: e.target.contactEmail.value,
                website: e.target.contactWebsite.value
            }
            formData.append("contact", JSON.stringify(contactObj))
        axios
        .patch(api + '/business/' + id, formData)
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
                <title>{"Business | " + data.name}</title>
            </Head>
            <div className={styles.page}>
                <form onSubmit={submitHandler} encType='multipart/form-data'>
                    <div className={styles.add}>
                        <div className={styles.title}>
                            <div className={styles.bar} />
                                <div className={styles.image}>
                                    <Image alt='' src={imagePreview} height='200px' width='200px' />
                                    <div>
                                        <input type='file' onChange={onImageChange} accept='image/*' />
                                        <span>Cover Image</span>
                                    </div>
                                </div>
                                <div className={styles.image}>
                                    <Image alt='' src={imagePreview2} height='200px' width='200px' />
                                    <div>
                                        <input type='file' onChange={onImageChange2}/>
                                        <span>Main Image</span>
                                    </div>
                                </div>
                        </div>
                        <div className={styles.inputs}>
                            <div>
                                <input type="text" id='name' defaultValue={data.name} placeholder="Name" />
                                <input type="text" id='type' defaultValue={data.type} placeholder="Business Type" />
                                <input type="tel" id='phone' defaultValue={data.phone} placeholder="Phone Number" />
                                <input type="text" id='address' defaultValue={data.address} placeholder="Address" />
                                <input type="url" id='website' defaultValue={data.website} placeholder="Website" />
                            </div>
                            <div>
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
                                <textarea type="text" id='bio' defaultValue={data.bio} placeholder="About Business" />
                            </div>
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
                            <input id='contactName' defaultValue={contact.name} placeholder='Name' />
                            <input id='contactPosition' defaultValue={contact.position} placeholder='Position' />
                            <input id='contactNumber' type='tel' defaultValue={contact.number} placeholder='Phone Number' />
                            <input id='contactEmail' type='email' defaultValue={contact.email} placeholder='Email' />
                            <input id='contactWebsite' type='url' defaultValue={contact.website} placeholder='Website' />
                        </div>
                    </div>
                </form>
                <span className={styles.editStatus}>Editing as [{user.username}]</span>
            </div>
        </>
    );
}

export const getServerSideProps = withPageAuthRequired();