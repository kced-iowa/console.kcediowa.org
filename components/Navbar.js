import Link from 'next/link'
import styles from './Navbar.module.css'
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

function Navbar(){
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
                    <CgProfile className={styles.space} />
                    <span>HORSAEN</span>
                </div>
            </div>
    )
}

export default Navbar