import Koa from 'koa'
import { promises, existsSync } from 'fs'
import marked from 'marked'
import { cyan, bold, blue } from 'chalk'
import open from 'open'

const { chdir, cwd } = process
const { readdir, readFile, lstat } = promises

import globalStyles from './globalStyles'
import addClass from './addClass'
import cleanHtml from './cleanHtml'

const fServ = (port = 80, startDir = './') => {

  const app = new Koa()

	app.use(async ctx => {
		// To use non-english characters
		ctx.url = decodeURI(ctx.url)
		if (ctx.url === '/') {
			chdir(startDir)
			const dir = await readdir('./')
			ctx.body = `
			<style>
			${globalStyles()}
			</style>
			<body style="height: 100vh" >
			<h1>🗂️ ${cwd()
					.toString()
					.slice(cwd().lastIndexOf('/') + 1, cwd().length)
				}
			</h1>
			<h4>${cwd()}</h4>
			<div>
			${
				dir.map(el => {
					return `<button
						class="${addClass(el)}"
						onClick="location.href = this.innerText"
					>
					${el}
					</button>
					`
				}
			).join('')}</div></body>`
		} else {
			let name = ctx.url
			name = ctx.url.slice(1, name.length)
			const stats = await lstat(name)
			const isFile = !stats.isDirectory() && existsSync(name)
			const file = isFile ? await readFile(name) : await readdir(name)
			ctx.type = 'html'
			const content = cleanHtml(file.toString())
			ctx.body = `<style>
			${globalStyles()}
			</style>
			<body>
			<h1>${isFile ? '📜' : '📁'} ${name.slice(name.lastIndexOf('/') + 1, name.length)}</h1>
			<a onClick="history.back()">back</a>
			<a href="/">home</a>
		${
			isFile ? (
				name.includes('.md') ? `<main>${marked(content)}</main>` : `<pre>${content}</pre>`
			) : (
					'<div>' + file.map(el => (
						`<button onClick="location.href = location.href + '/' + this.innerText"
						class=${addClass(name + '/' + el)}>
							${el}</button>`
					)).join('') + '</div>'
				)
		}</body>`
		}
	})
	app.listen(port, async () => {
		console.log(
			cyan('\nf-serv is starting from:'),
			blue(`\n\n${startDir || __dirname}`),
			cyan(`\n\nApp is served on`),
			bold(`http://localhost:${port}`),
			cyan('\n\nQuit f-serv: Ctrl + C')
		)
		await open(`http://localhost:${port}`)
	}
	)
}

module.exports = fServ

!module.parent ? fServ(process.argv[2], process.argv[3]) : null
