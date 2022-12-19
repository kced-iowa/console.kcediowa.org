import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Events(){
    return (
        <p>good</p>
    );
};

export const getServerSideProps = withPageAuthRequired();