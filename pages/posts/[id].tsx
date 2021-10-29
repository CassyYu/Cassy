import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Link from 'next/link'
import styles from '../../styles/markdown.module.scss'
import { LeftArrow } from '../../lib/svgs'
import { useEffect } from 'react'

export default function Post({ postData }: any) {
	useEffect(() => {
		const h1: any = document.getElementsByTagName("h1")
		const h2: any = document.getElementsByTagName("h2")
		const h3: any = document.getElementsByTagName("h3")
		const h4: any = document.getElementsByTagName("h4")
		const h5: any = document.getElementsByTagName("h5")
		for (let el of h1) el.setAttribute("id", el.innerHTML)
		for (let el of h2) el.setAttribute("id", el.innerHTML)
		for (let el of h3) el.setAttribute("id", el.innerHTML)
		for (let el of h4) el.setAttribute("id", el.innerHTML)
		for (let el of h5) el.setAttribute("id", el.innerHTML)
	}, [])
	return (
		<Layout siteTitle={postData.title}>
			<div className="px-4 my-6 lg:mx-60 overflow-scroll">
				<Link href="/">
					<a className="flex items-start -ml-1 font-bold text-gray-500 hover:underline hover:text-gray-800">
						<LeftArrow width="23" height="23" />BACK
					</a>
				</Link>
				<div className="my-6 text-gray-400">
					<Date dateString={postData.date} />
				</div>
				<article>
					<div id={styles.write} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
				</article>
				<div className="mt-8">
					{postData.tags.map((tag: String, idx: number) => <span key={idx} className="inline-block px-2 py-1 mr-4 rounded-full border border-gray-600 text-sm">#{tag}</span>)}
				</div>
				<Link href="/">
					<a className="my-8 flex items-start -ml-1 font-bold text-gray-500 hover:underline hover:text-gray-800">
						<LeftArrow width="23" height="23" />BACK
					</a>
				</Link>
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }: any) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData
		}
	}
}