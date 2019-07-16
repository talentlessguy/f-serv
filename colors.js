const reset = '\x1b[0m'

export const blue = msg => `\x1b[34m${msg}${reset}`

export const cyan = msg => `\x1b[36m${msg}${reset}`

export const bold = msg => `\x1b[1m${msg}${reset}`