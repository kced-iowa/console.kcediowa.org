import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from '../../components/Navbar'

export default function Events(){
    return (
        <>
            <Head>
                <title>Events | SADC Console</title>
            </Head>
            <Navbar />
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();