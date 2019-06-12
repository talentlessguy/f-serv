![preview](https://thumbs.gfycat.com/CarelessSoftBufflehead-size_restricted.gif)

# f-serv 📁

![David](https://img.shields.io/david/talentlessguy/f-serv.svg?style=flat-square)

File explorer working on a server with markdown rendering and colorized file names.

## Installation

```sh
npm i -g f-serv
# or
yarn global add f-serv
```

## Usage

As CLI:

```sh
f-serv 80 ../
```

As module:

```js
const fServ = require('f-serv')

fServ(3000, './')
```

### Options

```js
fServ(port:number, startDir:string)
```

First option specifies the port the app will use so after launch you can find the app on `localhost:/<PORT>`

`startDir` is a root directory where to start from.

## TODO

- [x] Added URL decode for non-English characters
- [x] Add CLI interface
- [ ] Replace Koa with `http` module
- [ ] Add more colors for file formats
- [ ] Add handling for permission errors
- [ ] Add editing files
- [ ] Add different layout modes
