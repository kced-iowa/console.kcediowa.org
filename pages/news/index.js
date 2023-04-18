import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from '../../components/Navbar'
import { useState, useEffect } from "react";
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import styles from './News.module.css'

import { AiFillDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from 'react-icons/bi'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const api = process.env.NEXT_PUBLIC_APIBASE
const fetcher = url => axios.get(url).then(res => res.data)
const key = api + '/news'

function NewsCard(props) {
    const [file, setFile] = useState(undefined)
    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const formSubmit = (e) => {
        e.preventDefault()
        console.log(file)
    }
    return (
        <div className={styles.card}>
            <form onSubmit={formSubmit}>
                <div className={styles.delButton}>
                    <button onClick={
                        function delEvent (e) {
                            e.preventDefault()
                            const check = confirm('Do you want to delete this event?')
                            if (check == true) {
                                axios
                                .delete(api + '/news/' + props._id)
                                .then((res)=> {
                                    if (res.status == 200) {
                                        mutate(key)
                                    }
                                })
                            } else {}
                        }
                    }><AiFillDelete /></button>
                </div>
                <input defaultValue={props.author}></input>
                <input defaultValue={props.title}></input>
                <input defaultValue={props.date}></input>
                <textarea defaultValue={props.metadata}></textarea>
                <div>
                    <span>{props.file}</span>
                    <a rel="noreferrer" target="_blank" href={api + '/cdn/news/' + props.file}><BsBoxArrowUpRight /></a>
                </div>
            </form>
        </div>
    )    
}
export default function News(){
    const {data, error} = useSWR(key, fetcher)
    const [add, setAdd] = useState(false)
    const [file, setFile] = useState(undefined)
    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const formSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
            formData.append('author', e.target.author.value)
            formData.append('title', e.target.title.value)
            formData.append('date', e.target.date.value)
            formData.append('metadata', e.target.metadata.value)
            formData.append('file', file)
        axios
        .post(api + '/news', formData)
        .then((res) => {
            if(res.status == 201) {
                setAdd(false)
                mutate(key)
            }
        })
    }
    return (
        <>
        <Head>
            <title>News | KCED Console</title>
        </Head>
        <Navbar />
        <div>
            <div className={styles.title}>
                <span>News</span>
                <span onClick={()=>{alert("Tap on any element of the card to edit it!")}}>
                    <IoMdInformationCircleOutline />
                </span>
                <form onSubmit={(e)=> {
                    e.preventDefault()
                    var str = e.target.hi.value
                    if (str.indexOf(' ') >= 0) {
                        var out = str.split(', ')
                    } else {
                        var out = str.split(',')
                    }
                    console.log(out)
                }}>
                    <input id="hi"></input>
                </form>
            </div>
            <div className={styles.container}>
                {add == true ?
                    <div className={styles.card}>
                        <form onSubmit={formSubmit}>
                            <div className={styles.delButton}>
                                <button onClick={
                                    function delEvent (e) {
                                        e.preventDefault()
                                        const check = confirm('Do you want to cancel?')
                                        if (check == true) {
                                            setAdd(false)
                                            mutate(key)
                                        }
                                    }
                                }>X</button>
                            </div>
                            <input id="author" placeholder="Author"></input>
                            <input id="title" placeholder="Title"></input>
                            <input id="date" placeholder="DD MM, YYYY"></input>
                            <textarea id="metadata" placeholder={`Metadata tags, separated with ','`}></textarea>
                            <div>
                                <input type="file" onChange={onFileChange} />
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                : null }
                {data && data.map((news) => (
                    <NewsCard
                        _id={news._id}
                        author={news.author}
                        title={news.title}
                        date={news.date}
                        metadata={news.metadata}
                        file={news.file}
                    />
                ))}
            </div>
            <div className={styles.addButton}>
                <span onClick={()=>setAdd(true)}><BiMessageSquareAdd /></span>
            </div>
        </div>
        </>
    );
};

export const getServerSideProps = withPageAuthRequired();