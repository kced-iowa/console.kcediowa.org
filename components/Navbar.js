import { handleLogout, useUser } from '@auth0/nextjs-auth0';
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
        title: "Live here",
        link: "townships"
    },
    {
        title: "Play here",
        link: "recreation"
    },
    {
        title: "Memberships",
        link: 'memberships'
    }
];


// construct our own because auth0's won't work (womp womp)
// also: make own confirmation object to look better ?? not needed now
const logout = () => {
    var logoutUrl = '/api/auth/logout'
    // so 2012 but idc
    const check = confirm("Are you sure you want to log out?")
    if (check == 1) {
        window.location = logoutUrl
    } else {}
}

export default function Navbar(){
    const { user, error, isLoading } = useUser();
    // i don't know why auth0 needs this, but it won't run without it...
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <>
        <div className={styles.navbar}>
            {buttons.map(({title, link, i}) => (
                <div key={i}>
                <Link href={'/' + link}>
                    <a>
                        <div className={styles.button}>
                            <span>{title}</span>
                        </div>
                    </a>
                </Link>
                </div>
            ))}
            <div className={styles.account}>
                <a onClick={logout}>
                    <CgProfile className={styles.space} />
                    <span>{user.username}</span>
                </a>
            </div>
        </div>
        {/* <div className={styles.mobileNav}>
            <input type="checkbox" className={styles.toggler} />
            <div className={styles.hamburger}><div></div></div>
            <div className={styles.menu}>
                <div>
                    <ul>
                        {buttons.map(({title, link, i}) => (
                            <li>
                                <Link href={'/' + link} key={i} >
                                    <a>
                                        <div className={styles.button}>
                                            <span>{title}</span>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                        <li>
                        <a onClick={logout}>
                            <CgProfile className={styles.space} />
                            <span>{user.username}</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div> */}
        </>
    )
}
