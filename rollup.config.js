import { terser } from 'rollup-plugin-terser'

const dev = process.env.ROLLUP_WATCH === 'true'

export default {
  input: 'index.js',
  output: {
    file: 'lib/f-serv.js',
    format: 'cjs'
  },
  plugins: [!dev && terser()],
  external: ['http', 'fs', 'marked', 'chalk', 'open']
}
