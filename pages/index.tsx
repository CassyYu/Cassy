import Layout from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import { useState, useRef } from 'react'
import { RightArrow, LeftArrow, Close, Search, Nodata } from '../lib/svgs'

export default function Home({ allPostsData }: any) {

  const input: any = useRef();

  const [page, setPage] = useState(1);
  const [focus, setFocus] = useState(false);
  const [queryTags, setQueryTags]: any = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const pagination = 5;
  let lastPage = Math.ceil(allPostsData.length / pagination);

  const handlePage = (num: number) => {
    if (num === -1 && page === 1 || num === 1 && page === lastPage) return;
    else setPage(page + num);
  }

  const handleKeyDown = (keyCode: number) => {
    const val = input.current.value;
    const searchResults = val ? allPostsData.filter((e: any) => {
      if (e.title.indexOf(val) >= 0 || e.date.indexOf(val) >= 0) return true;
      return false;
    }) : allPostsData;
    setSearchResults(searchResults);
  }

  const renderTags = () => {
    let tagMap = new Map();
    let tagsNum = 0;
    allPostsData.forEach(({ tags }: any) => {
      tags.forEach((tag: string) => {
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

    const handleQuery = (addTag: string) => {
      return () => {
        if (addTag === "all") setQueryTags([]);
        else if (!queryTags.includes(addTag)) setQueryTags([...queryTags, addTag]);
      };
    }

    return (
      <>
        <button key={-1} onClick={handleQuery("all")} style={{ color: '#0085a1' }} className="m-1 py-1 px-3 rounded-full inline-block shadow-lg bg-gray-50 text-sm font-bold hover:bg-gray-200">
          <span>Show All</span>
          <sup className="ml-1 font-black">{tagsNum}</sup>
        </button>
        {sortedTags.map((tagInfo: any, i: number) =>
          <button key={i} onClick={handleQuery(tagInfo[0])} className="m-1 py-1 px-3 shadow-md rounded-full inline-block bg-gray-100 text-gray-400 text-sm hover:text-gray-600 hover:bg-gray-200">
            <span>{tagInfo[0]}</span>
            <sup className="ml-1 font-black">{tagInfo[1]}</sup>
          </button>
        )}
      </>
    )
  }

  const renderQueryTags = () => {
    const deleteQuery = (toDelete: string) => {
      if (toDelete === 'all') setQueryTags([]);
      else setQueryTags(queryTags.filter((q: string) => q !== toDelete));
    }
    return (
      <ul>
        {queryTags.length ? queryTags.map((tag: string) =>
          <li className="mt-3 mr-2 py-0.5 px-2 inline-flex items-center rounded-full border border-gray-600 text-sm">
            <span>{tag}</span>
            <button onClick={() => { deleteQuery(tag) }}>&nbsp;<Close className="h-5 w-5 inline -mx-1" /></button>
          </li>
        ) : <></>}
        {queryTags.length > 1 ? <li className="mt-3 ml-1 mr-2 py-0.5 px-2 inline-block rounded-full shadow-sm hover:shadow-inner bg-gray-300 text-sm">
          <button onClick={() => { deleteQuery('all') }}>Clear All</button>
        </li> : <></>}
      </ul>
    )
  }

  const renderPostsData = () => {
    const showPostsData = queryTags.length ? allPostsData.filter((e: any) => {
      for (const queryTag of queryTags) {
        if (e.tags.includes(queryTag)) return true;
      }
      return false;
    }) : allPostsData;
    lastPage = Math.ceil(showPostsData.length / pagination);
    return (
      showPostsData.map(({ id, date, title, tags, top }: any, idx: number) => {
        if (pagination * (page - 1) <= idx && idx < pagination * page) return (
          <li key={id} className="mt-8 text-gray-600">
            {top ? '📌 ' : ''}
            <a className="text-xl font-medium hover:underline hover:text-gray-800">
              <Link href={`/posts/${id}`}>{title}</Link>
            </a>
            <br />
            {tags.map((tag: string, idx: number) => <small key={idx} className="mr-2 px-2 border text-gray-500 bg-gray-300 rounded-full inline-block cursor-pointer hover:text-gray-800">#{tag}</small>)}
            <small>
              <Date dateString={date} />
            </small>
          </li>
        )
      })
    )
  }

  const renderSearchResults = () => {
    return (
      <ul className="mx-6 px-4 z-50 bg-gray-50 absolute">
        {searchResults.map((post: any) =>
          <li key={post.id} className="leading-5 mt-4 pb-2 text-gray-400 hover:text-gray-900">
            <a className=" text-md">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </a>
            <br />
            <small>
              <Date dateString={post.date} />
            </small>
          </li>
        )}
      </ul>
    )
  }

  return (
    <Layout siteTitle="CassyYu" className="relative">
      <div className={"w-screen absolute top-0 left-0 bg-black opacity-20 duration-500 ease-in-out" + (focus ? " h-full" : " h-0")}></div>
      <div className="lg:flex lg:flex-row flex flex-col justify-evenly mt-6 w-screen">
        <div className="lg:ml-24 max-w-md sm:ml-20 mx-4 sm:mt-4">
          <div className="text-8xl sm:text-9xl font-bold -mx-1">BLOG.</div>
          <div className="mt-4 sm:my-8">
            <div className="text-3xl text-gray-500 font-black">TAGS</div>
            <div className="my-1 -mx-1">
              {renderTags()}
            </div>
          </div>
        </div>
        <div className="mx-4 sm:mx-20 flex-grow">
          <div className="mt-6 flex items-center relative z-40">
            <Search className="absolute left-3 h-5 w-5" />
            <input ref={input} onKeyDown={(el: any) => { handleKeyDown(el.keyCode) }} onFocus={() => { setFocus(true); }} onBlur={() => { setFocus(false); setSearchResults([]) }} className="placeholder-gray-300 bg-gray-50 py-1 px-10 flex-1 rounded-full shadow-md focus:shadow-none outline-none" />
            <button className="absolute right-3"><Close className="h-5 w-5 inline" /></button>
          </div>
          {renderSearchResults()}
          {renderQueryTags()}
          <div className="hidden">
            <Nodata className="h-72 w-72 m-auto" />
            <div style={{ color: '#999' }} className="text-2xl text-center">No Data</div>
          </div>
          <ul>
            {renderPostsData()}
          </ul>
          <div className="flex w-full text-lg text-gray-500 mt-12 whitespace-nowrap">
            <div className="flex-grow">
              <button className={"-ml-4 " + (page === 1 ? "unable-btn" : "able-btn")} onClick={() => { handlePage(-1) }}><LeftArrow width="50" height="50" />PRE</button>
            </div>
            <div>
              <button className={"-mr-4 " + (page === lastPage ? "unable-btn" : "able-btn")} onClick={() => { handlePage(1) }}>NEXT<RightArrow width="50" height="50" /></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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