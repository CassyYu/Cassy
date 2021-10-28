import Head from 'next/head'
import Link from 'next/link'
import { Github, Alipay, Wechat, Copyright } from '../lib/svgs'

const date = new Date();
const year = date.getFullYear();
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

export default function Layout({ children, siteTitle, className }: any) {
	return (
		<div className={"text-gray-700 overflow-hidden " + className}>
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
				</div>
			</header>
			<div className="flex flex-col mt-12 font-mono">
				{children}
			</div>
			<footer className="flex flex-col items-center font-mono my-8">
				<div className="flex my-12">
					<Github />
					<Alipay />
					<Wechat />
				</div>
				<div className="flex items-center">
					Copyright
					<Copyright width="20" height="20" className=" inline mx-2" />
					ZhangYu {year}
				</div>
			</footer>
		</div>
	)
}