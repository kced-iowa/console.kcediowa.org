import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Businesses(){
    return (
        <p>good</p>
    );
};

export const getServerSideProps = withPageAuthRequired();