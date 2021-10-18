import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import markdown from './notes.md'
import { Breadcrumb, Menu } from 'antd'
import styles from '../../../../styles/notes.module.scss'

const yearMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/posts/2021/10"><a>2021</a></Link>
    </Menu.Item>
  </Menu>
);

const monthMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/posts/2021/10"><a>10</a></Link>
    </Menu.Item>
  </Menu>
);

export default function Oct2021() {
  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link href="/"><a href="">HomePage</a></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={yearMenu}>
          <a href="">Year</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={monthMenu}>
          <a href="">Month</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.write}>
        <ReactMarkdown children={markdown} />
      </div>
    </>
  )
}