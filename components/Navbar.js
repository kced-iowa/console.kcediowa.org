import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { CgProfile } from 'react-icons/cg';


const buttons = [
    {
        title: "Home",
        link: "dashboard"
    },
    {
        title: "Members",
        link: "members"
    },
    {
        title: "Businesses",
        link: "businesses"
    },
    {
        title: "Events",
        link: "events"
    },
    {
        title: "News",
        link: "news"
    },
    {
        title: "Clubs & Organizations",
        link: "orgs"
    },
    {
        title: "Visit",
        link: "visit"
    }
];

export default function Navbar(){
    const { user, error, isLoading } = useUser();
    // i don't know why auth0 needs this, but it won't run without it...
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div className={styles.navbar}>
                {buttons.map(({title, link}) => (
                    <Link href={'/' + link} key={title} >
                        <a>
                            <div className={styles.button}>
                                <span>{title}</span>
                            </div>
                        </a>
                    </Link>
                ))}
                <div className={styles.account}>
                    <Link href='/api/auth/logout'>
                        <a>
                            <CgProfile className={styles.space} />
                            <span>{user.username}</span>
                        </a>
                    </Link>
                </div>
            </div>
    )
}
