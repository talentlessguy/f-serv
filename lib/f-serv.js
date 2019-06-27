'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = require('http');
var fs = require('fs');
var marked = _interopDefault(require('marked'));
var chalk = require('chalk');
var open = _interopDefault(require('open'));

var addClass = file => {
  const stats = fs.lstatSync(file);
  let className = '';

  const addExt = file => {
    const ext = file.slice(file.lastIndexOf('.') + 1, file.length);
    const special = /(package.json|yarn.lock|Pipfile(\.lock)?)/;
    special.test(file)
      ? (className += file
          .slice(file.lastIndexOf('/') + 1, file.length)
          .replace(/\./g, '_'))
      : (className += ext);
  };

  stats.isFile() ? addExt(file) : (className += 'dir');

  return className
};

var cleanHtml = html =>
  html
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

var template = stuff => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>f-serv</title>
  <style>
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
    flex-wrap: wrap;
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
    background: whitesmoke;
    width: 
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
  </style>
</head>
<body>
  ${stuff}
  <span>by <a href="https://github.com/talentlessguy">v1rtl</a></span>
</body>
</html>
`;

const { chdir, cwd } = process;
const { readdir, readFile, lstat } = fs.promises;

const fServ = (port = 80, startDir = './', openServer = false) => {
  http.createServer(async (req, res) => {
    // Transform URL
    req.url = decodeURI(req.url);
    if (req.url === '/') {
      chdir(startDir);
      try {
        const dir = await readdir('./');
        res.end(
          template(`
        
        <body style="height: 100vh" >
        <h1>📁 ${cwd()
          .toString()
          .slice(cwd().lastIndexOf('/') + 1, cwd().length)}
        </h1>
        <h4>${cwd()}</h4>
        <div>
        ${dir
          .map(el => {
            return `<button
              class="${addClass(el)}"
              onClick="location.href = this.innerText"
            >
            ${el}
            </button>
            `
          })
          .join('')}</div></body>`)
        );
      } catch (e) {
        res.end(
          template(`
        <h1>Oops! ⚠ </h1>
        <h2>${e}</h2>
        `)
        );
      }
    } else if (req.url === '/favicon.ico') res.end('');
    else {
      let name = req.url.slice(1, req.url.length);
      const stats = await lstat(name);
      const isFile = !stats.isDirectory() && fs.existsSync(name);
      const file = isFile ? await readFile(name) : await readdir(name);
      const content = cleanHtml(file.toString());
      res.end(
        template(`
			<h1>${isFile ? '📜' : '📁'} ${name.slice(
          name.lastIndexOf('/') + 1,
          name.length
        )}</h1>
			<a onClick="history.back()">back</a>
      <a href="/">home</a>
		${
      isFile
        ? name.includes('.md')
          ? `<main>${marked(content)}</main>`
          : `<pre>${content}</pre>`
        : '<div>' +
          file
            .map(
              el =>
                `<button onClick="location.href = location.href + '/' + this.innerText"
						class=${addClass(name + '/' + el)}>
							${el}</button>`
            )
            .join('') +
          '</div>'
    }`)
      );
    }
  }).listen(port, async () => {
    console.log(
      chalk.cyan('\nf-serv is starting from:'),
      chalk.blue(`\n\n${startDir || __dirname}`),
      chalk.cyan(`\n\nApp is served on`),
      chalk.bold(`http://localhost:${port}`),
      chalk.cyan('\n\nQuit f-serv: Ctrl + C')
    );
    openServer && (await open(`http://localhost:${port}`));
  });
};

module.exports = fServ;
