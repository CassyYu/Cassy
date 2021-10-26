import Layout from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import { RightArrow, LeftArrow } from '../lib/svgs'
import { useState } from 'react'

export default function Home({ allPostsData }: any) {

  const tagColor = ['#3799ae ', '#6babb9', '#97bbc4', '#b5cacf'];
  const pagination = 5;
  const lastPage = Math.ceil(allPostsData.length / pagination);

  const [page, setPage] = useState(1);

  const handlePage = (num: number) => {
    if (num === -1 && page === 1 || num === 1 && page === lastPage) return;
    else setPage(page + num);
  }

  const renderTags = () => {
    let tagMap = new Map();
    let tagsNum = 0;
    allPostsData.forEach(({ tags }: any) => {
      tags.forEach((tag: String) => {
        tagsNum++;
        if (tagMap.has(tag)) tagMap.set(tag, tagMap.get(tag) + 1);
        else tagMap.set(tag, 1);
      })
    });
    let sortedTags = Array.from(tagMap);
    sortedTags.sort((a, b): number => {
      if (a[1] === b[1]) return a[0] < b[0] ? -1 : 1;
      return b[1] - a[1];
    });
    return (
      <>
        <span key={-1} style={{ backgroundColor: '#0085a1' }} className="m-1 py-1 px-3 rounded-full shadow-lg inline-block text-gray-50 text-sm cursor-pointer hover:text-gray-900">
          Show All
          <sup className="ml-1 font-black">{tagsNum}</sup>
        </span>
        {sortedTags.map((tagInfo: any, i: number) =>
          <span key={i} style={{ backgroundColor: tagColor[Math.min(Math.floor(i / 2), 3)] }} className="m-1 py-1 px-3 rounded-full inline-block text-gray-50 text-sm cursor-pointer hover:text-gray-600">
            <span>{tagInfo[0]}</span>
            <sup className="ml-1 font-black">{tagInfo[1]}</sup>
          </span>)
        }
      </>
    )
  }
  return (
    <Layout siteTitle="CassyYu">
      <div className="lg:flex lg:flex-row flex flex-col justify-evenly mt-6 w-screen">
        <div className="lg:ml-24 max-w-md sm:ml-20 ml-6 mt-4">
          <div className="text-8xl sm:text-9xl font-bold">BLOG.</div>
          <div className="mt-4 mx-2 sm:my-8">
            <div className="text-3xl">TAGS</div>
            <div className="my-2">
              {renderTags()}
            </div>
          </div>
        </div>
        <ul className="mx-8 sm:mx-20 flex-grow">
          {allPostsData.map(({ id, date, title, tags, top }: any, idx: number) => {
            if (pagination * (page - 1) <= idx && idx < pagination * page) return (
              <li key={id} className="mt-6 text-gray-600">
                {top ? '📌 ' : ''}
                <a className="text-xl font-medium hover:underline hover:text-gray-800">
                  <Link href={`/posts/${id}`}>{title}</Link>
                </a>
                <br />
                {tags.map((tag: String, idx: number) => <small key={idx} className="mr-2 px-2 border text-gray-500 bg-gray-300 rounded-full inline-block cursor-pointer hover:text-gray-800">#{tag}</small>)}
                <small>
                  <Date dateString={date} />
                </small>
              </li>
            )
          })}
          <div className="flex w-full text-lg text-gray-500 mt-12 whitespace-nowrap">
            <div className="flex-grow">
              <button className={"-ml-4 " + (page === 1 ? "unable-btn" : "able-btn")} onClick={() => { handlePage(-1) }}><LeftArrow width="50" height="50" />PRE</button>
            </div>
            <div>
              <button className={"-ml-4 " + (page === lastPage ? "unable-btn" : "able-btn")} onClick={() => { handlePage(1) }}>NEXT<RightArrow width="50" height="50" /></button>
            </div>
          </div>
        </ul>
      </div>
    </Layout >
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}