import Head from 'next/head'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'
import { Github, Alipay, Wechat } from '../lib/svgs'

const nav = [
	{
		name: 'home',
		href: '/'
	},
	{
		name: 'snake',
		href: '/snake'
	},
	{
		name: 'new',
		href: '/new'
	}
];

export default function Layout({ children, siteTitle }: any) {
	return (
		<div className="text-gray-700 overflow-hidden">
			<Head>
				<link rel="icon" href="/favicon.svg" />
				<title>{siteTitle}</title>
				<meta
					name="description"
					content="Learn to build a personal website using Next.js"
				/>
			</Head>
			<header className="flex fixed top-0 h-12 w-screen items-center justify-between shadow-lg font-mono font-semibold tracking-wider text-gray-500 whitespace-nowrap bg-gray-100 z-50">
				<div className="ml-4 sm:ml-8 hover:underline hover:text-gray-800">
					<a className="cursor-pointer"><Link href="">SING IN</Link></a>
				</div>
				<div className="flex items-center">
					{nav.map(({ name, href }: any, idx: number) => (
						<div key={idx} className="mr-4 sm:mr-8 hover:underline hover:text-gray-800">
							<a className="cursor-pointer"><Link href={href}>{name.toUpperCase()}</Link></a>
						</div>
					))}
					<div className="mr-4 sm:mr-8">
						<Link href="/snake"><a><SearchIcon className="h-5 w-5 hover:text-gray-800" /></a></Link>
					</div>
				</div>
			</header>
			<div className="flex flex-col mt-12 font-mono mx-2">
				{children}
			</div>
			<footer className="flex flex-col items-center font-mono my-8">
				<div className="flex my-12">
					<Github />
					<Alipay />
					<Wechat />
				</div>
				<div>Copyright by ZhangYu.</div>
			</footer>
		</div>
	)
}