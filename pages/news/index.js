import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default function News(){
    return (
        <p>good</p>
    );
};

export const getServerSideProps = withApiAuthRequired();