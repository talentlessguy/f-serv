const { lstatSync } = require('fs')

module.exports = file => {
	const stats = lstatSync(file)
	let className = ''

	const addExt = file => {
		const ext = file.slice(file.lastIndexOf('.') + 1, file.length)
		const special = /(package.json|yarn.lock)/
		special.test(file) ? (
			className += file
				.slice(file.lastIndexOf('/') + 1, file.length)
				.replace(/\./g, '_')
		) : (
			className += ext
		)
	}

	stats.isFile() ? addExt(file) : className += 'dir'
	
	return className
}