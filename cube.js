class Cube {
	// Creates a solved cube at WCA scrambling orientation
	constructor() {
		// edge permutation
		this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		// edge orientation
		this.eo = (new Array (12)).fill(0)
		// corner permutation
		this.cp = [0, 1, 2, 3, 4, 5, 6, 7]
		// corner orientation
		this.co = (new Array (8)).fill(0)
		// centers
		this.c = [0, 1, 2, 3, 4, 5]
	}
	// List of moves given by cicles and/or sequences of other moves
	static moves() {
		return {
			"U" : {
				"corners" : [[0, 1, 2, 3], [0, 0, 0, 0]],
				"edges" : [[0, 1, 2, 3], [0, 0, 0, 0]]
			},
			"D" : {
				"corners" : [[4, 5, 6, 7], [0, 0, 0, 0]],
				"edges" : [[8, 9, 10, 11], [0, 0, 0, 0]]
			},
			"L" : {
				"corners" : [[0, 3, 4, 7], [1, 2, 1, 2]],
				"edges" : [[3, 5, 11, 4], [0, 0, 0, 0]]
			},
			"R" : {
				"corners" : [[2, 1, 6, 5], [1, 2, 1, 2]],
				"edges" : [[1, 7, 9, 6], [0, 0, 0, 0]]
			},
			"F" : {
				"corners" : [[3, 2, 5, 4], [1, 2, 1, 2]],
				"edges" : [[2, 6, 8, 5], [1, 1, 1, 1]]
			},
			"B" : {
				"corners" : [[1, 0, 11, 10], [1, 2, 1, 2]],
				"edges" : [[2, 6, 8, 5], [1, 1, 1, 1]]
			},
			"S" : {
				"edges" : [[1, 3, 11, 9], [1, 1, 1, 1]],
				"centers" : [0, 1, 5, 3]
			},
			"E" : {
				"edges" : [[7, 6, 5, 4], [1, 1, 1, 1]],
				"centers" : [4, 3, 2, 1]
			},
			"M" : {
				"edges" : [[0, 2, 8, 10], [0, 0, 0, 0]],
				"centers" : [0, 2, 5, 4]
			},
			"L'" : {"sequence" : "L L L"},
			"R'" : {"sequence" : "R R R"},
			"U'" : {"sequence" : "U U U"},
			"D'" : {"sequence" : "D D D"},
			"F'" : {"sequence" : "F F F"},
			"B'" : {"sequence" : "B B B"},
		}
	}
	// Make a move from the list of moves	
	move(m) {
		var moveInfo = Cube.moves()[m]
		var t, pieceInfo
		
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
}
var cube = new Cube ()
cube.scramble("R U' R' U' R U R' F' R U R' U' R' F R")
console.log(cube)
