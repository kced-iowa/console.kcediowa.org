import Head from 'next/head';
import { useState } from 'react'
import axios from 'axios'
import useSWR, {mutate} from 'swr'
import Navbar from '../../components/Navbar';
import styles from './About.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BiMessageSquareAdd } from 'react-icons/bi'

const api = process.env.NEXT_PUBLIC_APIBASE
var key = api + '/about'

function AboutCard(props) {

  const [changed, setChanged] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      content: e.target.content.value.replace(/\n/g, '\\n')
    }
    axios
    .patch(api + '/about/' + props.propID, data)
    .then(res => {
      if(res.status == 201) {
          setChanged(false)
          mutate(key)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.aboutCard}>
    <form onSubmit={submitHandler}>
      <div className={styles.delButton}>
        <button onClick={
            function delEvent (e) {
              e.preventDefault()
              const check = confirm('Do you want to delete this event?')
              if (check == true) {
                axios
                .delete(api + '/about/' + props.propID)
                .then((res)=> {
                if (res.status == 200) {
                    mutate(key)
                }
              })
            } else {}
          }
        }><AiFillDelete /></button>
      </div>
      <input id='title' defaultValue={props.title} onChange={()=>setChanged(true)} />
      <textarea id="content" defaultValue={props.content.replace(/\\n/g, '\n')} onChange={()=>setChanged(true)} />
      {changed == true ? <button type='submit'>Save</button> : null}
    </form>
    </div>
  )
}

export default function About() {

  const [addHandler, setAddHandler] = useState(false)

  const fetcher = url => axios.get(url).then(res => res.data)
  const key = api + '/about'

  const { data, error } = useSWR(key, fetcher)

  const [inputText, setInputText] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  const handleTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    // Replace newline characters with \n for JSON representation
    const textForJson = text.replace(/\n/g, '\\n');
    setJsonOutput(textForJson);
  };
  
  return (
    <div>
      <Head>
        <title>About | KCED Console</title>
      </Head>
      <Navbar />
      <div className={styles.title}>
        <span>
          About
        </span>
      </div>
      <div className={styles.container}>
      {addHandler == true ? 
        <div className={styles.addCard}>
          <form onSubmit={(e) => {
            e.preventDefault()
            const data = {
              title: e.target.title.value,
              content: e.target.content.value.replace(/\n/g, '\\n')
            }
            axios
            .post(api + '/about', data)
            .then((res)=> {
              if(res.status == 201) {
                setAddHandler(false)
                mutate(key)
              }
            })
            .catch(err => console.log(err))
          }}>
            <div className={styles.delButton}>
              <button type="button" onClick={
                function cancelAdd () {
                  const check = confirm("Are you sure you want to cancel?")
                  if (check == true) { setAddHandler(false) }
                }
              }>X</button>
            </div>
            <input id='title' placeholder='Title' />
            <textarea id="content" placeholder='Content' />
            <button type="submit">Submit</button>
          </form>
        </div>
        : null }
        {data && data.map((line, index) => (
          <AboutCard
          key={index}
          propID={line._id}
          title={line.title}
          content={line.content}
          />
          ))}
      </div>
      <div className={styles.addButton}>
        <span onClick={()=>setAddHandler(true)}><BiMessageSquareAdd /></span>
      </div>
    </div>
  );
}
  

// revolving loan fund
// committees
// history of sadc