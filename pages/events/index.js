import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Navbar from '../../components/Navbar'

export default function Events(){
    return (
        <div>
            <Navbar />
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();