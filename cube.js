const Moves = require('./moves')

"use strict"

var randomInt = (max) => {
	return Math.floor(Math.random() * (max + 1));
}

class Cube {
	// Creates a solved cube at WCA scrambling orientation
	constructor(other) {
		var identity = {ep: 0, eo: 0, cp: 0, co: 0, c: 0}
		var cubie = Cube.coordinateToCubie(identity)
		this.co = cubie.co
		this.cp = cubie.cp
		this.ep = cubie.ep
		this.eo = cubie.eo
		this.c = cubie.c
		if (other != undefined && other.hasOwnProperty('co')) {
			this.ep = other.ep.slice()
			this.eo = other.eo.slice()
			this.cp = other.cp.slice()
			this.co = other.co.slice()
			this.c = other.c.slice()
		} else if (other != undefined && typeof other === "string") {
			for (var i = 0; i < 12; i++) {
				this.ep[i] = other.charCodeAt(2*i) - 48
				this.eo[i] = other.charCodeAt(2*i+1) - 48
			}
			for (var i = 12; i < 20; i++) {
				this.cp[i-12] = other.charCodeAt(2*i) - 48
				this.co[i-12] = other.charCodeAt(2*i+1) - 48
			}
			for (var i = 2*20; i < 46; i++) {
				this.c[i - 2*20] = other.charCodeAt(i) - 48
			}
		}
	}
	// Coordinate data to Cubie data
	static coordinateToCubie(data) {
		var orientation = (ori_data, num_pieces, flip_size) => {
			var ori = []
			var sum = 0
			for (var i = 0; i < num_pieces-1; i++) {
				ori.push(ori_data%flip_size)
				sum += ori[i]
				ori_data = Math.floor(ori_data/flip_size)
			}
			ori.push((flip_size - sum%flip_size)%flip_size)
			return ori
		}
		var permutation = (per_data, num_pieces) => {
			var per = []
			var temp_info = []

			var extract = []
			for (var i=1; i <= num_pieces; i++) {
				temp_info.push(num_pieces - i)
				extract.push(per_data%i)
				per_data = Math.floor(per_data / i)
			}

			for (var i=num_pieces-1; i >= 0; i--) {
				per.push(temp_info.splice(extract[i], 1)[0])
			}
			per.reverse()

			return per
		}
		return {
			co: orientation(data.co, 8, 3),
			eo: orientation(data.eo, 12, 2),
			cp: permutation(data.cp, 8),
			ep: permutation(data.ep, 12),
			c: permutation(data.c, 6)
		}
	}
	// Cubie data to Coordinate data
	static cubieToCoordinate(data) {
		var orientation = (ori_data, flip_size) => {
			var final_data = 0
			for (var i = ori_data.length-2; i >= 0; i--) {
				final_data *= flip_size
				final_data += ori_data[i]
			}
			return final_data
		}
		var permutation = (per_data) => {
			var final_data = 0
			for (var i = per_data.length-1; i >= 1; i--) {
				var sum = 0
				for (var j=0; j < i; j++) {
					if (per_data[j] > per_data[i]) sum++
				}
				final_data += sum
				final_data *= i
			}
			return final_data
		}
		return {
			co: orientation(data.co, 3),
			eo: orientation(data.eo, 2),
			cp: permutation(data.cp),
			ep: permutation(data.ep),
			c: permutation(data.c)
		}
	}
	// Create a random cube state
	static random() {
		var verifyParity = (cp, ep) => {
			var getSum = (data, num_pieces) => {
				var sum = 0
				for (var i=1; i <= num_pieces; i++) {
					sum += data%i
					data = Math.floor(data / i)
				}
				return sum;
			}
			return (getSum(cp, 8)%2) == (getSum(ep, 12)%2)
		}

		var data
		do {
			var cube = new Cube ();

			data = {
				co: randomInt(2186),
				eo: randomInt(2047),
				cp: randomInt(40319),
				ep: randomInt(479001599),
				c: 0
			}
		} while (!verifyParity(data.cp, data.ep));

		return new Cube (Cube.coordinateToCubie(data));
	}
	// List of moves given by cicles and/or sequences of other moves
	static moves() {
		return Moves.moves()
	}
	// Make a move from the list of moves	
	move(m) {
		var moveInfo = Cube.moves()[m]
		var pieceInfo

		if (moveInfo == undefined) return

		// === Sequence ===
		if (moveInfo.hasOwnProperty('sequence')) {
			this.scramble(moveInfo.sequence)
		}

		// === Corners ===
		if (moveInfo.hasOwnProperty('corners')) {
			var t = moveInfo.corners[0][0]
			pieceInfo = [this.cp[t], this.co[t]]
			for (var i = 3; i > 0; i--) {
				this.cp[moveInfo.corners[0][(i+1)%4]] = this.cp[moveInfo.corners[0][i]]
				this.co[moveInfo.corners[0][(i+1)%4]] = (this.co[moveInfo.corners[0][i]]+moveInfo.corners[1][i])%3
			}
			this.cp[moveInfo.corners[0][1]] = pieceInfo[0]
			this.co[moveInfo.corners[0][1]] = (pieceInfo[1]+moveInfo.corners[1][0])%3
		}

		// === Edges ===
		if (moveInfo.hasOwnProperty('edges')) {
			var t = moveInfo.edges[0][0]
			pieceInfo = [this.ep[t], this.eo[t]]
			for (var i = 3; i > 0; i--) {
				this.ep[moveInfo.edges[0][(i+1)%4]] = this.ep[moveInfo.edges[0][i]]
				this.eo[moveInfo.edges[0][(i+1)%4]] = (this.eo[moveInfo.edges[0][i]]+moveInfo.edges[1][i])%2
			}
			this.ep[moveInfo.edges[0][1]] = pieceInfo[0]
			this.eo[moveInfo.edges[0][1]] = (pieceInfo[1]+moveInfo.edges[1][0])%2
		}

		// === Centers ===
		if (moveInfo.hasOwnProperty('centers')) {
			var t = moveInfo.centers[0]
			pieceInfo = this.c[t]
			for (var i = 3; i > 0; i--) {
				this.c[moveInfo.centers[(i+1)%4]] = this.c[moveInfo.centers[i]]
			}
			this.c[moveInfo.centers[1]] = pieceInfo
		}
	}
	// Make all moves in a scramble string
	scramble(s) {
		var moves = s.split(' ').filter((m) => m.length > 0)
		for (var i in moves) this.move(moves[i])
	}
	// Rotate cube to the default orientation
	orient() {
		var moveWhite = ["", "z", "x", "z'", "x'", "x2"]
		for (var i in this.c) {
			if (this.c[i] == 0) {
				this.scramble(moveWhite[i])
				break
			}
		}
		var moveGreen = ["", "y'", "", "y", "y2", ""]
		for (var i in this.c) {
			if (this.c[i] == 2) {
				this.scramble(moveGreen[i])
				break
			}
		}
	}
	// Check if cube is solved
	isSolved() {
		var solved = new Cube ()
		var oriented = new Cube (this)
		oriented.orient()
		return (oriented.hash() == solved.hash())
	}
	/* Hash function to comparece cubes
		affected_pieces:
			an array of arrays [corners, edges, centers], that represent the pieces for which
			bot ORIENTATION AND PERMUTATION are supposed to be considered in the hash function
		affected_positions:
			an array of arrays [corners, edges], that represent the positions in the
			cube in which the ORIENTATION is supposed to be considered in the hash function
		
		if both arguments are missing, then affected_pieces, by default, is the whole cube
	*/
	hash(affected_pieces, affected_positions) {
		var str = ""

		if (affected_pieces == undefined && affected_positions == undefined) {
			affected_pieces = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 1, 2, 3, 4, 5]]
		}
		for (var i in this.ep) {
			if (affected_pieces[1] != undefined && affected_pieces[1].indexOf(this.ep[i]) >= 0) {
				str += String.fromCharCode(this.ep[i]+48)
				str += String.fromCharCode(this.eo[i]+48)
			} else {
				str += String.fromCharCode(47)
				if (affected_positions != undefined && affected_positions[1] != undefined && affected_positions[1].indexOf(parseInt(i)) >= 0)
					str += String.fromCharCode(this.eo[i]+48)
				else str += String.fromCharCode(47)
			}
		}
		for (var i in this.cp) {
			if (affected_pieces[0] != undefined && affected_pieces[0].indexOf(this.cp[i]) >= 0) {
				str += String.fromCharCode(this.cp[i]+48)
				str += String.fromCharCode(this.co[i]+48)
			} else {
				str += String.fromCharCode(47)
				if (affected_positions != undefined && affected_positions[0] != undefined && affected_positions[0].indexOf(parseInt(i)) >= 0)
					str += String.fromCharCode(this.co[i]+48)
				else str += String.fromCharCode(47)
			}
		}
		for (var i in this.c) {
			if (affected_pieces[2] != undefined && affected_pieces[2].indexOf(this.c[i]) >= 0) {
				str += String.fromCharCode(this.c[i]+48)
			} else {
				str += String.fromCharCode(47)
			}
		}

		return str
	}
}

module.exports = Cube