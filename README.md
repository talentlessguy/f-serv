# f-serv

![David](https://img.shields.io/david/talentlessguy/f-serv.svg?style=flat-square)

Small files explorer working on a server.

## Usage

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
- [ ] Add more colors for file formats
- [ ] Add handling for permission errors
- [ ] Add editing files