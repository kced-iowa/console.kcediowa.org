import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from '../../components/Navbar'

export default function News(){
    return (
        <>
        <Head>
            <title>News | SADC Console</title>
        </Head>
        <Navbar />
        <div>

        </div>
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();