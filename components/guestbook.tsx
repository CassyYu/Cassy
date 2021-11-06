import { useState, useRef } from 'react';
import { mockComments } from '../lib/mockComments'
import { Divider, Send, Close } from '../lib/svgs'
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from '../lib/axios/main';

export default function guestbook() {

	const [comments, setComments] = useState(mockComments);
	const [submit, setSubmit] = useState(0);
	const [window, setWindow] = useState(""); // 1:login, 2:veryfy, 3:signup
	const [user, setUser] = useState({ email: "", pwd: "" });
	const [login, setLogin] = useState(false);

	const input: any = useRef();
	const login_email: any = useRef();
	const login_pwd: any = useRef();
	const email: any = useRef();

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
					const val = input.current.value.trim();
					setComments([...comments, {
						name: 'name',
						content: val,
						time: Date()
					}])
					input.current.value = "";
				}, 1000)
			})
		}
	}

	const handleLogin = (e: any) => {
		const email = login_email.current.value;
		const pwd = login_pwd.current.value;
		axios.post('/login', {
			email: email,
			pwd: pwd
		}).then(function (response: any) {
			const { hasUser, hasEmail } = response.data;
			if (hasUser) {
				setWindow("")
				setUser(email)
			} else if (hasEmail) {
				login_pwd.current.value = "";
				login_pwd.current.value = "";
				login_pwd.current.setAttribute("placeholder", "密码错误");
				setTimeout(() => {
					login_pwd.current.setAttribute("placeholder", "请输入密码");
				}, 1500)
			} else {
				login_email.current.value = "";
				login_pwd.current.value = "";
				login_email.current.setAttribute("placeholder", "用户不存在");
				setTimeout(() => {
					login_email.current.setAttribute("placeholder", "请输入用户名");
				}, 1500)
			}
		}).catch(function (error) {
			console.log(error);
		});
	}

	const handleVerify = () => {
		if (user.email !== "") {
			let exist = false;
			const val = email.current.value;
			axios.post('/signup', {
				email: val
			}).then(function (response: any) {
				exist = response.data.exist;
				if (exist) {
					email.current.value = "";
					email.current.setAttribute("placeholder", "用户已存在");
					setTimeout(() => {
						setWindow("login");
					}, 1500)
				} else {
					axios.post('/signup/create', {
						email: val
					}).then((response: any) => {
						if (response.data.success) {
							setUser({ email: val, pwd: "" })
							setWindow("signup")
						}
					})
				}
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
	const handleSignup = () => {
		console.log(1)
	}

	const renderWindow = () => {
		if (window === "login") {
			return (
				<>
					<div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black opacity-20"></div>
					<div className="fixed z-50 w-80 h-80 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-xl shadow-2xl">
						<button onClick={() => { setWindow("") }}><Close className="absolute w-6 h-6 right-2 top-2" /></button>
						<div className="w-full h-full flex flex-col items-center justify-evenly">
							<div className="text-3xl">LOGIN</div>
							<input ref={login_email} placeholder="请输入邮箱" className="px-2 py-0.5 rounded-md outline-none" />
							<input ref={login_pwd} placeholder="请输入密码" className="px-2 py-0.5 rounded-md outline-none" />
							<div className="text-blue-600 flex flex-col mb-4">
								<button onClick={(e) => { handleLogin(e) }} className="py-1 bg-blue-200 rounded-full">登录</button>
								<small className="m-2">还没有账号？<button className="hover:underline" onClick={() => { setWindow("verify") }}>立即注册</button></small>
							</div>
						</div>
					</div>
				</>
			)
		} else if (window === "verify") {
			return (
				<>
					<div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black opacity-20"></div>
					<div className="fixed z-50 w-80 h-80 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-xl shadow-2xl">
						<button onClick={() => { setWindow("") }}><Close className="absolute w-6 h-6 right-2 top-2" /></button>
						<div className="w-full h-full flex flex-col items-center justify-evenly">
							<div className="text-3xl">SIGNUP</div>
							<div><input ref={email} placeholder="请输入邮箱" className="px-2 py-0.5 rounded-md outline-none" /></div>
							<div className="relative">
								<input ref={email} placeholder="请输入验证码" className="px-2 py-0.5 rounded-md outline-none" />
								<button onClick={handleVerify} className="absolute right-0 top-0 px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-md whitespace-nowrap">获取</button>
							</div>
							<div className="text-blue-600 flex flex-col mb-4">
								<button onClick={handleVerify} className="px-4 py-1 text-blue-600 bg-blue-200 rounded-full">注册</button>
								<small className="m-2">已经有账号了？<button className="hover:underline" onClick={() => { setWindow("login") }}>立即登录</button></small>
							</div>
						</div>
					</div>
				</>
			)
		} else if (window === "signup") {
			return (
				<>
					<div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-black opacity-20"></div>
					<div className="fixed z-50 w-80 h-80 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-xl shadow-2xl">
						<button onClick={() => { setWindow("") }}><Close className="absolute w-6 h-6 right-2 top-2" /></button>
						<div className="w-full h-full flex flex-col items-center justify-evenly">
							<div className="text-3xl">SIGNUP</div>
							<div><input ref={email} className="px-2 py-0.5 rounded-md outline-none" readOnly value={user.email} /></div>
							<div><input placeholder="请输入密码" className="px-2 py-0.5 rounded-md outline-none" /></div>
							<div><input placeholder="请再次输入密码" className="px-2 py-0.5 rounded-md outline-none" /></div>
							<div className="text-blue-600 flex flex-col mb-4">
								<button onClick={handleSignup} className="py-1 bg-blue-200 rounded-full">注册</button>
								<small className="m-2">已经有账号了？<button className="hover:underline" onClick={() => { setWindow("login") }}>立即登录</button></small>
							</div>
						</div>
					</div>
				</>
			)
		} else {
			return (
				<></>
			)
		}
	}

	const renderSendBox = () => {
		if (submit === 1 || submit === 2) {
			return (
				<>
					<input ref={input} className="bg-gray-50 w-full outline-none px-4 py-1 rounded-full"></input>
					<button onClick={handleSend}
						className="flex-shrink-0 flex items-center justify-center w-20 ml-4 my-0.5 rounded-sm bg-blue-200 text-sm text-blue-600"
					>
						{submit === 1 ? <LoadingOutlined /> : <CheckCircleOutlined />}
					</button>
				</>
			)
		} else if (!login) {
			return (
				<>
					<input ref={input} placeholder="登录后即可发表评论" readOnly
						className="bg-gray-50 w-full outline-none px-4 py-1 rounded-full"></input>
					<button onClick={() => { setWindow("login") }}
						className="flex-shrink-0 flex items-center justify-center w-20 ml-4 my-0.5 rounded-sm bg-blue-200 text-sm text-blue-600">
						<div className="flex">点击登录</div>
					</button>
				</>
			)
		} else return (
			<>
				<input ref={input} className="bg-gray-50 w-full outline-none px-4 py-1 rounded-full"></input>
				<button onClick={handleSend}
					className="flex-shrink-0 flex items-center justify-center w-20 ml-4 my-0.5 rounded-sm bg-blue-200 text-sm text-blue-600"
				>
					<div className="flex">
						Send
						<Send className="inline h-5 w-5 ml-1" />
					</div>
				</button>
			</>
		)
	}

	return (
		<div className="my-8">
			<div className="flex items-center">
				<Divider className="w-8 h-2 bg-gray-400" />
				<div className="mx-4 flex-shrink-0 font-semibold text-xl tracking-widest text-gray-500">评论区</div>
				<Divider className="flex-grow h-2 bg-gray-400" />
			</div>
			{comments.map((comment, idx) =>
				<div key={idx} className={"mb-4 pt-4 border-gray-300" + (idx === 0 ? "" : " border-t")}>
					<div>{comment.name}&nbsp;{comment.time}</div>
					<div>{comment.content}</div>
				</div>
			)}
			{renderWindow()}
			<div>
				<div className="flex items-center">
					<Divider className="w-8 h-1 bg-gray-300" />
					<div className="mx-4 flex-shrink-0 font-medium text-md tracking-widest text-gray-400">发布评论</div>
					<Divider className="flex-grow h-1 bg-gray-300" />
				</div>
				<div className="mt-4 flex">
					{renderSendBox()}
				</div>
			</div>
		</div>
	)
}