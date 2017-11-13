"use strict";

class Cube {
	// Creates a solved cube at WCA scrambling orientation
	constructor(other) {
		this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		this.eo = (new Array (12)).fill(0)
		this.cp = [0, 1, 2, 3, 4, 5, 6, 7]
		this.co = (new Array (8)).fill(0)
		this.c = [0, 1, 2, 3, 4, 5]
		if (typeof other !== "string" && other != undefined) {
			this.ep = other.ep.slice()
			this.eo = other.eo.slice()
			this.cp = other.cp.slice()
			this.co = other.co.slice()
			this.c = other.c.slice()
		} else if (typeof other === "string" && other != undefined) {
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
	// List of moves given by cicles and/or sequences of other moves
	static moves() {
		return {
			"U" : {
				"corners" : [[0, 1, 2, 3], [0, 0, 0, 0]],
				"edges" : [[0, 1, 2, 3], [0, 0, 0, 0]]
			},
			"U'" : {
				"corners" : [[0, 3, 2, 1], [0, 0, 0, 0]],
				"edges" : [[0, 3, 2, 1], [0, 0, 0, 0]]
			},
			"D" : {
				"corners" : [[4, 5, 6, 7], [0, 0, 0, 0]],
				"edges" : [[8, 9, 10, 11], [0, 0, 0, 0]]
			},
			"D'" : {
				"corners" : [[4, 7, 6, 5], [0, 0, 0, 0]],
				"edges" : [[8, 11, 10, 9], [0, 0, 0, 0]]
			},
			"L" : {
				"corners" : [[0, 3, 4, 7], [1, 2, 1, 2]],
				"edges" : [[3, 5, 11, 4], [0, 0, 0, 0]]
			},
			"L'" : {
				"corners" : [[0, 7, 4, 3], [1, 2, 1, 2]],
				"edges" : [[3, 4, 11, 5], [0, 0, 0, 0]]
			},
			"R" : {
				"corners" : [[2, 1, 6, 5], [1, 2, 1, 2]],
				"edges" : [[1, 7, 9, 6], [0, 0, 0, 0]]
			},
			"R'" : {
				"corners" : [[2, 5, 6, 1], [1, 2, 1, 2]],
				"edges" : [[1, 6, 9, 7], [0, 0, 0, 0]]
			},
			"F" : {
				"corners" : [[3, 2, 5, 4], [1, 2, 1, 2]],
				"edges" : [[2, 6, 8, 5], [1, 1, 1, 1]]
			},
			"F'" : {
				"corners" : [[3, 4, 5, 2], [1, 2, 1, 2]],
				"edges" : [[2, 5, 8, 6], [1, 1, 1, 1]]
			},
			"B" : {
				"corners" : [[1, 0, 7, 6], [1, 2, 1, 2]],
				"edges" : [[0, 4, 10, 7], [1, 1, 1, 1]]
			},
			"B'" : {
				"corners" : [[1, 6, 7, 0], [1, 2, 1, 2]],
				"edges" : [[0, 7, 10, 4], [1, 1, 1, 1]]
			},
			"S" : {
				"edges" : [[1, 3, 11, 9], [1, 1, 1, 1]],
				"centers" : [0, 1, 5, 3]
			},
			"S'" : {
				"edges" : [[1, 9, 11, 3], [1, 1, 1, 1]],
				"centers" : [0, 3, 5, 1]
			},
			"E'" : {
				"edges" : [[7, 6, 5, 4], [1, 1, 1, 1]],
				"centers" : [4, 3, 2, 1]
			},
			"E" : {
				"edges" : [[7, 4, 5, 6], [1, 1, 1, 1]],
				"centers" : [4, 1, 2, 3]
			},
			"M" : {
				"edges" : [[0, 2, 8, 10], [1, 1, 1, 1]],
				"centers" : [0, 2, 5, 4]
			},
			"M'" : {
				"edges" : [[0, 10, 8, 2], [1, 1, 1, 1]],
				"centers" : [0, 4, 5, 2]
			},
			"Rw" : {"sequence" : "R M'"},
			"Rw'" : {"sequence" : "R' M"},
			"Rw2" : {"sequence" : "R2 M2"},
			"Lw" : {"sequence" : "L M"},
			"Lw'" : {"sequence" : "L' M'"},
			"Lw2" : {"sequence" : "L2 M2"},
			"Fw" : {"sequence" : "F S'"},
			"Fw'" : {"sequence" : "F' S"},
			"Fw2" : {"sequence" : "F2 S2"},
			"Bw" : {"sequence" : "B S"},
			"Bw'" : {"sequence" : "B' S'"},
			"Bw2" : {"sequence" : "B2 S2"},
			"Uw" : {"sequence" : "U E'"},
			"Uw'" : {"sequence" : "U' E"},
			"Uw2" : {"sequence" : "U2 E2"},
			"Dw" : {"sequence" : "D E"},
			"Dw'" : {"sequence" : "D' E'"},
			"Dw2" : {"sequence" : "D2 E2"},
			"E2" : {"sequence" : "E E"},
			"S2" : {"sequence" : "S S"},
			"M2" : {"sequence" : "M M"},
			"L2" : {"sequence" : "L L"},
			"R2" : {"sequence" : "R R"},
			"U2" : {"sequence" : "U U"},
			"D2" : {"sequence" : "D D"},
			"F2" : {"sequence" : "F F"},
			"B2" : {"sequence" : "B B"},
			"x" : {"sequence" : "L' M' R"},
			"x'" : {"sequence" : "L M R'"},
			"x2" : {"sequence" : "L2 M2 R2"},
			"y" : {"sequence" : "U E' D'"},
			"y'" : {"sequence" : "U' E D"},
			"y2" : {"sequence" : "U2 E2 D2"},
			"z" : {"sequence" : "F S' B'"},
			"z'" : {"sequence" : "F' S B"},
			"z2" : {"sequence" : "F2 S2 B2"}
		}
	}
	// Make a move from the list of moves	
	move(m) {
		var moveInfo = Cube.moves()[m]
		var t, pieceInfo

		if (moveInfo == undefined) return
		// === Sequence ===
		if (moveInfo.sequence != undefined) {
			this.scramble(moveInfo.sequence)
		}
		// === Corners ===
		if (moveInfo.corners != undefined) {
			t = moveInfo.corners[0][0]
			pieceInfo = [this.cp[t], this.co[t]]
			for (var i = 3; i > 0; i--) {
				this.cp[moveInfo.corners[0][(i+1)%4]] = this.cp[moveInfo.corners[0][i]]
				this.co[moveInfo.corners[0][(i+1)%4]] = (this.co[moveInfo.corners[0][i]]+moveInfo.corners[1][i])%3
			}
			this.cp[moveInfo.corners[0][1]] = pieceInfo[0]
			this.co[moveInfo.corners[0][1]] = (pieceInfo[1]+moveInfo.corners[1][0])%3
		}

		// === Edges ===
		if (moveInfo.edges != undefined) {
			t = moveInfo.edges[0][0]
			pieceInfo = [this.ep[t], this.eo[t]]
			for (var i = 3; i > 0; i--) {
				this.ep[moveInfo.edges[0][(i+1)%4]] = this.ep[moveInfo.edges[0][i]]
				this.eo[moveInfo.edges[0][(i+1)%4]] = (this.eo[moveInfo.edges[0][i]]+moveInfo.edges[1][i])%2
			}
			this.ep[moveInfo.edges[0][1]] = pieceInfo[0]
			this.eo[moveInfo.edges[0][1]] = (pieceInfo[1]+moveInfo.edges[1][0])%2
		}

		// === Centers ===
		if (moveInfo.centers != undefined) {
			t = moveInfo.centers[0]
			pieceInfo = this.c[t]
			for (var i = 3; i > 0; i--) {
				this.c[moveInfo.centers[(i+1)%4]] = this.c[moveInfo.centers[i]]
			}
			this.c[moveInfo.centers[1]] = pieceInfo
		}
	}
	// Make all moves in a scramble string
	scramble(s) {
		var moves = s.split(' ')
		for (var i in moves) {
			this.move(moves[i])
		}
	}
	// Rotate cube to the default orientation
	orient() {
		var moveWhite = ["", "z", "x", "z'", "x'", "x2"]
		for (var i in this.c) {
			if (this.c[i] == 0) {
				this.scramble(moveWhite[i])
				break;
			}
		}
		var moveGreen = ["", "y'", "", "y", "y2", ""]
		for (var i in this.c) {
			if (this.c[i] == 2) {
				this.scramble(moveGreen[i])
				break;
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
	// Hash function to comparece cubes
	hash() {
		var str = ""
		for (var i in this.ep) {
			str += String.fromCharCode(this.ep[i]+48)
			str += String.fromCharCode(this.eo[i]+48)
		}
		for (var i in this.cp) {
			str += String.fromCharCode(this.cp[i]+48)
			str += String.fromCharCode(this.co[i]+48)
		}
		for (var i in this.c) {
			str += String.fromCharCode(this.c[i]+48)
		}
		return str;
	}
}

module.exports = Cube