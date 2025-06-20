;(() => {
	const hr3 = 0.8660254037844386
	const outline = [
		[0, 0],
		[-1.5, -hr3],
		[-1.0, -2 * hr3],
		[1.0, -2 * hr3],
		[1.5, -hr3],
		[3.0, -2 * hr3],
		[4.5, -hr3],
		[4.0, 0],
		[3.0, 0],
		[3.0, 2 * hr3],
		[1.5, 3 * hr3],
		[1.0, 2 * hr3],
		[0.0, 2 * hr3]
	]
	const canvas = document.createElement('canvas')
	canvas.style.position = 'fixed'
	canvas.style.top = '0'
	canvas.style.left = '0'
	canvas.style.width = '100%'
	canvas.style.height = '100%'
	canvas.style.zIndex = '-1'
	canvas.style.pointerEvents = 'none'
	document.body.prepend(canvas)
	const ctx = canvas.getContext('2d')
	function getColor(name) {
		const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
		return `hsl(${val})`
	}
	function resize() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}
	function drawHat(x, y, s, rot = 0) {
		ctx.save()
		ctx.translate(x, y)
		ctx.rotate(rot)
		ctx.beginPath()
		ctx.moveTo(outline[0][0] * s, outline[0][1] * s)
		for (let i = 1; i < outline.length; i++) {
			ctx.lineTo(outline[i][0] * s, outline[i][1] * s)
		}
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
		ctx.restore()
	}
	function draw() {
		resize()
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = getColor('--accent')
		ctx.strokeStyle = getColor('--foreground')
		ctx.lineWidth = 1
		const scale = 40
		const tileW = 6 * scale
		const tileH = 4.33 * scale
		for (let y = -tileH; y < canvas.height + tileH; y += tileH) {
			for (let x = -tileW; x < canvas.width + tileW; x += tileW) {
				drawHat(x, y, scale)
				drawHat(x + tileW / 2, y + tileH / 2, scale, Math.PI)
			}
		}
	}
	draw()
	window.addEventListener('resize', draw)
	document.addEventListener('theme-change', draw)
})()
