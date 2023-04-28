import Head from "next/head";
import Navbar from "../../components/Navbar";
import axios from 'axios'
import useSWR, { mutate } from 'swr'

import styles from './Memberships.module.css'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
const key = api + '/memberships'

function MembershipCard (props) {
    switch (props.type) {
        case 'business':
            return (
                <div className={styles.memberCard}>
                    <div className={styles.memberTitle}>
                        <span>{props.name}</span>
                    </div>
                    <div>
                        {props.type !== "" ?<span>{"Type: " + props.type}</span> : null }
                        {props.address !== "" ? <span>{"Address: " + props.address}</span> : null }
                        {props.contactName !== "" ? <span>{"Contact Name: " + props.contactName}</span> : null }
                        {props.contactEmail !== "" ? <span>{"Contact Email: " + props.contactEmail}</span> : null}
                        {props.phone !== "" ? <span>{"Phone: " + props.phone}</span> : null }
                        {props.website !== "" ? <span>{"Website: " + props.website}</span> : null}
                        {props.twitter !== "" ? <span>{"Twitter: " + props.twitter}</span> : null}
                        {props.instagram !== "" ? <span>{"Instagram: " + props.instagram}</span> : null}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={()=> {
                            axios
                            .delete(api + "/memberships/" + props.memberId)
                            .then((res) => {
                                if (res.status == 200) {
                                    mutate(key)
                                }
                            })
                        }}>Close Application</button>
                    </div>
                </div>
            )
        case 'individual':
            return (
                <div className={styles.memberCard}>
                    <div className={styles.memberTitle}>
                        <span>{props.name}</span>
                    </div>
                    <div>
                        {props.type !== "" ? <span>{"Type: " + props.type}</span> : null}
                        {props.address !== "" ? <span>{"Address: " + props.address}</span> : null}
                        {props.phone !== "" ? <span>{"Phone: " + props.phone}</span> : null}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={()=> {
                            axios
                            .delete(api + "/memberships/" + props.memberId)
                            .then((res) => {
                                if (res.status == 200) {
                                    mutate(key)
                                }
                            })
                        }}>Close Application</button>
                    </div>
                </div>
            )
        default:
            null
    }
}

export default function Memberships () {
    const { data, error } = useSWR(key, fetcher)
    return (
        <>
            <Head>
                <title>Memberships | KCED</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.title}>
                    <span>Memberships</span>
                </div>
                <div className={styles.container}>
                    {data && data.map((data, i) => (
                        <MembershipCard
                            key={i}
                            memberId={data._id}
                            type={data.type}
                            name={data.name}
                            address={data.address}
                            contactName={data.contactName}
                            contactEmail={data.contactEmail}
                            phone={data.phone}
                            website={data.website}
                            twitter={data.twitter}
                            instagram={data.instagram}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}