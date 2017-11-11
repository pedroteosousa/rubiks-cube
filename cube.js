class Cube {
	constructor() {
		this.ep = (new Array (12)).fill(0)
		this.eo = (new Array (12)).fill(0)
		this.cp = (new Array (8)).fill(0)
		this.co = (new Array (8)).fill(0)
		for (var i in this.ep) this..ep[i] = parseInt(i)
		for (var i in this.cp) this.cp[i] = parseInt(i)
	}
}

module.exports = Cube
