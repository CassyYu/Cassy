import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Link from 'next/link'
import styles from '../../styles/markdown.module.scss'
import { LeftArrow } from '../../lib/svgs'

export default function Post({ postData }: any) {	
	return (
		<Layout siteTitle={postData.title}>
			<div className="mx-4 my-6 lg:mx-60 overflow-scroll">
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
					{postData.tags.map((tag: String, idx: number) => <span className="inline-block px-2 py-1 mr-4 rounded-full border border-gray-700 text-sm">#{tag}</span>)}
				</div>
				<Link href="/">
					<a className="my-8 flex items-start -ml-1 font-bold text-gray-500 hover:underline hover:text-gray-800">
						<LeftArrow width="23" height="23" />BACK
					</a>
				</Link>
			</div >
		</Layout >
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