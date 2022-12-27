import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";

export default function AddBusiness() {
    return (
        <div>
            <Head>
                <title>Business | Add</title>
            </Head>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();