import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Head from 'next/head';
import axios from 'axios'
import styles from './Edit.module.css'

export default function EditMember () {
    const router = useRouter()
    const { id } = router.query
    const [member, setMember] = useState([])
    useEffect(() => {
        const fetchAbout = () => {
            axios
            .get('http://localhost:5000/members/' + id)
            .then((res) => {
                setMember(res.data)
                setName(res.data.name)
                setOccupation(res.data.occupation)
                setParagraph(res.data.paragraph)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        fetchAbout()
    }, [id])

    const memberName = member.name
    const memberOccupation = member.occupation
    const memberParagraph = member.paragraph

    const [name, setName] = useState(memberName)
    const [occupation, setOccupation] = useState(member.occupation)
    const [paragraph, setParagraph] = useState(member.paragraph)

    const handleName = ({target:{value}}) => setName(value)
    const handleOccupation = ({target:{value}}) => setOccupation(value)
    const handleParagraph = ({target:{value}}) => setParagraph(value)

    const submitHandle = (e) => {
        e.preventDefault();
        console.log(name)
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>{member.name} | Edit</title>
            </Head>
            <div className={styles.editMember}>
                <form onSubmit={submitHandle}>
                <div className={styles.title}>
                    <div className={styles.bar}/>
                    <div className={styles.image}><Image alt='' layout='fill'/></div>
                    <input value={name} onChange={handleName} />
                </div>
                <button onClick={function cancel(){window.location = '/members'}}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();