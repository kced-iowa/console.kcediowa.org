import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default function Orgs(){
    return (
        <p>good</p>
    );
};

export const getServerSideProps = withApiAuthRequired();