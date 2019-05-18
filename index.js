const Koa = require('koa')
const { existsSync } = require('fs')
const { readdir, readFile, lstat } = require('fs').promises
const marked = require('marked')

const globalStyles = require('./globalStyles')
const addClass = require('./addClass')
const cleanHtml = require('./cleanHtml')

const app = new Koa()

module.exports = port => {
	app.use(async ctx => {
		if (ctx.url === '/') {
			const dir = await readdir('./')
			ctx.body = `
			<style>
			${globalStyles()}
			</style>
			<body style="height: 100vh" >
			<h1>${__dirname}</h1>
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
			const file = !stats.isDirectory() && existsSync(name) ? await readFile(name) : await readdir(name)
			ctx.type = 'html'
			const content = cleanHtml(file.toString())
			ctx.body = `<style>
			${globalStyles()}
			</style>
			<body>
			<h1>${ctx.url}</h1>
			<a onClick="history.back()">back</a>
			<a href="/">home</a>
		${
			!stats.isDirectory() && existsSync(name) ? (
				name.includes('.md') ? `<main>${marked(content)}</main>` : `<pre>${content}</pre>`
			) : (
					'<div>' + file.map(el => (
		`<button onClick="location.href = location.href + '/' + this.innerText" class=${addClass(name + '/' + el)}>${el}</button>`
					)).join('') + '</div>'
				)
		}</body>`
		}
	})
	app.listen(port || 80)
}