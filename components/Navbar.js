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
        title: "Companies",
        link: "companies"
    },
    {
        title: "Orgsanizations",
        link: "orgs"
    },
    {
        title: "Locations",
        link: "locations"
    }
];

function Navbar(){
    return (
        <div className={styles.navbar}>
                {buttons.map(({title, link}) => (
                    <Link href={'/' + link} key="" >
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