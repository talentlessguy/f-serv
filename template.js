export default stuff => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="description" content="File explorer working on a server">
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
  }
  
  h1 {
    font-size: 3vw;
    padding-top: 1em;
    margin-bottom: 0
  }
  
  body div {
    flex-wrap: wrap;
    width: 80vw;
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

  .toggle {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  
  pre, code {
    font-family: 'Fira Code', Consolas, monospace;
  }
  
  pre {
    padding: 0.5em;
    background: whitesmoke;
    width: 60vw;
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
  <script>
  let isTable = false
  const toggleGrid = () => {
    const table = document.getElementsByTagName('div')[0]
    if (isTable) {
      table.style.display = 'block'
      table.style['grid-template-rows'] = 'none'
      table.style['grid-template-columns'] = 'none'
      isTable = false
    } else {
      table.style.display = 'grid'
      table.style['grid-template-rows'] = '1fr'
      table.style['grid-template-columns'] = 'repeat(auto-fill, minmax(150px, 1fr))'
      isTable = true
    }
  }
  </script>
</head>
<body>
<button class="toggle" onclick="toggleGrid()">Display mode <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="26" height="26"
  viewBox="0 0 26 26"
  style=" fill:#000000;"><g id="surface1"><path style=" " d="M 1 0 C 0.398438 0 0 0.398438 0 1 L 0 25 C 0 25.601563 0.398438 26 1 26 L 25 26 C 25.601563 26 26 25.601563 26 25 L 26 1 C 26 0.398438 25.601563 0 25 0 Z M 2 2 L 6 2 L 6 6 L 2 6 Z M 8 2 L 12 2 L 12 6 L 8 6 Z M 14 2 L 18 2 L 18 6 L 14 6 Z M 20 2 L 24 2 L 24 6 L 20 6 Z M 2 8 L 6 8 L 6 12 L 2 12 Z M 8 8 L 12 8 L 12 12 L 8 12 Z M 14 8 L 18 8 L 18 12 L 14 12 Z M 20 8 L 24 8 L 24 12 L 20 12 Z M 2 14 L 6 14 L 6 18 L 2 18 Z M 8 14 L 12 14 L 12 18 L 8 18 Z M 14 14 L 18 14 L 18 18 L 14 18 Z M 20 14 L 24 14 L 24 18 L 20 18 Z M 2 20 L 6 20 L 6 24 L 2 24 Z M 8 20 L 12 20 L 12 24 L 8 24 Z M 14 20 L 18 20 L 18 24 L 14 24 Z M 20 20 L 24 20 L 24 24 L 20 24 Z "></path></g></svg></button>
  ${stuff}
  <span>by <a href="https://github.com/talentlessguy">v1rtl</a></span>
</body>
</html>
`
