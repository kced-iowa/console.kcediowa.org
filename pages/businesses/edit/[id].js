import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import axios from "axios";

export default function EditBusiness() {
    const router = useRouter()
    const { id } = router.query

    const [name, setName] = useState('')

    useEffect(() => {
        const getBusiness = () => {
            axios
            .get('http://localhost:5000/business/' + id)
            .then((res) => {
                setName(res.data.name)
            })
        }
        getBusiness()
    }, [id])

    return (
        <div>
            {name}
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();