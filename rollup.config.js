import { terser } from 'rollup-plugin-terser'
import { dependencies } from './package.json'

const dev = process.env.ROLLUP_WATCH === 'true'

export default {
  input: 'index.js',
  output: {
    file: 'lib/f-serv.js',
    format: 'cjs'
  },
  plugins: [!dev && terser()],
  external: ['koa', 'fs', 'marked', 'chalk', 'open']
}
