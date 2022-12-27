import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import Navbar from '../../components/Navbar'

export default function News(){
    return (
        <div>
            <Navbar />
        </div>
    );
};

export const getServerSideProps = withApiAuthRequired();