![preview](https://thumbs.gfycat.com/CarelessSoftBufflehead-size_restricted.gif)

# f-serv 📁

[![Twitter](https://img.shields.io/twitter/follow/v1rtl.svg?label=my%20twitter&style=flat-square)](https://twitter.com/v1rtl)
![David](https://img.shields.io/david/talentlessguy/f-serv.svg?style=flat-square)
![Top lang](https://img.shields.io/github/languages/top/talentlessguy/f-serv.svg?style=flat-square)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/f-serv.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/f-serv.svg?style=flat-square)](https://npm.im/f-serv)
![npm type definitions](https://img.shields.io/npm/types/f-serv.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/f-serv.svg?style=flat-square)
![Codacy grade](https://img.shields.io/codacy/grade/78b172f2f4d947168e6ccf30de895448.svg?style=flat-square)

File explorer working on a server with markdown rendering and colorized file names.

## Installation

```sh
npm i -g f-serv
# or
yarn global add f-serv
```

## Usage

### CLI

```sh
f-serv 80 ./ -o
```

If you add `-o` or `--open` flag in CLI it will open a new tab in a browser.

### As module

```js
const fServ = require('f-serv')

fServ(3000, './')
```

#### Options

```ts
fServ(port:number, startDir:string, open: boolean)
```

First option specifies the port the app will use so after launch you can find the app on `localhost:/<PORT>`

`startDir` is a root directory where to start from.

## TODO

- [x] Added URL decode for non-English characters
- [x] Add CLI interface
- [x] Replace Koa with `http` module
- [ ] Add more colors for file formats (0 / 30)
- [x] Add handling for permission errors
- [ ] Add editing files
- [x] Add different layout modes
- [x] Get rid of `chalk`
- [x] Get rid of `open`
- [x] Fix responsive mode for narrow screens
- [ ] Setup tests with Jest
