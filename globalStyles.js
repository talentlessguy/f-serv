export default () => `
button {
	height: 2em;
	border: none;
	background: inherit;
	font-size: 1.2em;
	margin: .3em
}
button:hover {
	cursor: pointer;
	filter: brightness(90%)
}
   
body {
	display: flex;
	flex-direction: column;
	background: white;
	margin: 0;
	justify-content: center;
	align-items: center;
	font-family: sans-serif;
	flex-wrap: wrap
}

h1 {
	font-size: 3vw;
	padding-top: 1em;
	margin-bottom: 0
}

body div {
	display: flex;
	flex-direction: row;
	flex-wrap: inherit;
	width: 60vw;
}

a {
	font-size: 1.4em;
	text-decoration: underline;
	color: blue;
	cursor: pointer
}

main {
	padding: 1em;
}

pre, code {
	font-family: 'Fira Code', Consolas, monospace;
}

pre {
	padding: 0.5em;
	background: whitesmoke
}

.js {
	background: #e5e22f
}

.yarn_lock, .yarn-integrity {
	background: #2c8ebb;
	color: white
}

.md, .package_json {
	background: #e52f35;
	color: white
}

.html, .rb {
	background: red;
	color: white
}

.gitignore {
	background: #f74e27;
	color: white
}

.dir {
	border: 1px solid black
}

.py, .python-version, .Pipfile, .Pipfile_lock {
	background: #264d6f;
	color: white
}
`
