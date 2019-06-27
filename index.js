import { createServer } from 'http'
import { promises, existsSync } from 'fs'
import marked from 'marked'
import { cyan, bold, blue } from 'chalk'
import open from 'open'

const { chdir, cwd } = process
const { readdir, readFile, lstat } = promises

import globalStyles from './globalStyles'
import addClass from './addClass'
import cleanHtml from './cleanHtml'
import template from './template'

const fServ = (port = 80, startDir = './', openServer = false) => {
  createServer(async (req, res) => {

    // Transform URL
    req.url = decodeURI(req.url)
    if (req.url === '/') {
      chdir(startDir)
			const dir = await readdir('./')
			res.end(template(`
			<style>
			${globalStyles()}
			</style>
			<body style="height: 100vh" >
			<h1>📁 ${cwd().toString().slice(cwd().lastIndexOf('/') + 1, cwd().length)
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
			).join('')}</div></body>`))
    }
    else if (req.url === '/favicon.ico') res.end('')
    else {
      let name = req.url.slice(1, req.url.length)
      const stats = await lstat(name)
			const isFile = !stats.isDirectory() && existsSync(name)
			const file = isFile ? await readFile(name) : await readdir(name)
      const content = cleanHtml(file.toString())
			res.end(template(`<style>
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
		}</body>`))
    }
  }).listen(port, async () => {
		console.log(
			cyan('\nf-serv is starting from:'),
			blue(`\n\n${startDir || __dirname}`),
			cyan(`\n\nApp is served on`),
			bold(`http://localhost:${port}`),
			cyan('\n\nQuit f-serv: Ctrl + C')
		)
		openServer && await open(`http://localhost:${port}`)
  })
}

module.exports = fServ
