import Link from 'next/link'
import styles from '../../styles/messageBoard.module.css'
import MessageBoard from './MessageBoard'

export default function MessageBoardApp() {
  return (
    <div className={styles.container}>
      <h1>留言板</h1>
      <MessageBoard />
      <Link href="/"><a className={styles.footer}>Back To Homepage</a></Link>
    </div>
  )
}