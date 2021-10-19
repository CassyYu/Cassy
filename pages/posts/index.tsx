import { Breadcrumb, Menu } from 'antd'
import Link from 'next/link'
import styles from '../../styles/posts.module.scss'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import markdown from './2021/10/notes.md'

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

const dayMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/posts/2021/10"><a>18</a></Link>
    </Menu.Item>
  </Menu>
);

export default function Posts() {
  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link href="/"><a href="">HomePage</a></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={yearMenu}>
          <a>Year</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={monthMenu}>
          <a>Month</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={dayMenu}>
          <a>Day</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.main}>
        <div className={styles.toc}>
          <p>文档目录</p>
          <p>怎么做自动生成呢</p>
        </div>
        <div className={styles.articleContainer}>
          <ReactMarkdown children={markdown} remarkPlugins={[gfm]} />
        </div>
      </div>
    </div>
  )
}