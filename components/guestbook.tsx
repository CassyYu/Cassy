import { useState, useRef } from 'react';
import { mockComments } from '../lib/mockComments'
import { Divider, Send } from '../lib/svgs'
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { resolveHref } from 'next/dist/shared/lib/router/router';
export default function guestbook() {

	const [comments, setComments] = useState(mockComments);
	const [submit, setSubmit] = useState(0);
	const input: any = useRef();

	const handleSend = () => {
		if (submit !== 0) return;
		else if (input.current.value.trim() === "") {
			input.current.setAttribute("placeholder", "输入内容不能为空")
			setTimeout(() => {
				input.current.setAttribute("placeholder", "")
			}, 2000)
			input.current.value = "";
		} else {
			new Promise((resolve: any, reject) => {
				setSubmit(1);
				resolve();
			}).then(() => {
				return new Promise((resolve: any, reject) => {
					setTimeout(() => {
						setSubmit(2);
						resolve();
					}, 1500)
				})
			}).then(() => {
				setTimeout(() => {
					setSubmit(0);
					setComments([...comments, {
						name: 'name',
						content: input.current.value.trim(),
						time: Date()
					}])
					input.current.value = "";
				}, 1000)
			})
		}
	}

	const renderSendBox = () => {
		if (submit === 1) return <LoadingOutlined />
		else if (submit === 2) return <CheckCircleOutlined />
		else return (
			<div className="flex">
				Send
				<Send className="inline h-5 w-5 ml-1" />
			</div>
		)
	}

	return (
		<div className="my-8">
			<div className="flex items-center">
				<Divider className="w-8 h-2 bg-gray-400" />
				<div className="mx-4 flex-shrink-0 font-semibold text-xl tracking-widest text-gray-500">评论区</div>
				<Divider className="flex-grow h-2 bg-gray-400" />
			</div>
			{
				comments.map((comment, idx) =>
					<div key={idx} className={"mb-4 pt-4 border-gray-300" + (idx === 0 ? "" : " border-t")}>
						<div>{comment.name}&nbsp;{comment.time}</div>
						<div>{comment.content}</div>
					</div>
				)
			}
			<div>
				<div className="flex items-center">
					<Divider className="w-8 h-1 bg-gray-300" />
					<div className="mx-4 flex-shrink-0 font-medium text-md tracking-widest text-gray-400">发布评论</div>
					<Divider className="flex-grow h-1 bg-gray-300" />
				</div>
				<div className="mt-4 flex">
					<input ref={input} className="bg-gray-50 w-full outline-none px-4 py-1 rounded-full"></input>
					<button onClick={handleSend}
						className="flex-shrink-0 flex items-center justify-center w-20 ml-4 my-0.5 rounded-sm bg-blue-200 text-sm text-blue-600"
					>
						{renderSendBox()}
						{/* <LoadingOutlined /> */}
						{/* <CheckCircleOutlined /> */}
						{/* <div className="flex">
							Send
							<Send className="inline h-5 w-5 ml-1" />
						</div> */}
					</button>
				</div>
			</div>
		</div>
	)
}