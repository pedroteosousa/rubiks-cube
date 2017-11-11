class Cube {
	constructor() {
		this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		this.eo = (new Array (12)).fill(0)
		this.cp = [0, 1, 2, 3, 4, 5, 6, 7]
		this.co = (new Array (8)).fill(0)
		this.c = [0, 1, 2, 3, 4, 5]
	}
	static moves() {
		return {
			"U" : {
				"corners" : [[0, 1, 2, 3], [0, 0, 0, 0]],
				"edges" : [[0, 1, 2, 3], [0, 0, 0, 0]]
			},
			"R" : {
				"corners" : [[2, 1, 6, 5], [1, 2, 1, 2]],
				"edges" : [[1, 7, 9, 6], [0, 0, 0, 0]]
			},
			"F" : {
				"corners" : [[3, 2, 5, 4], [1, 2, 1, 2]],
				"edges" : [[2, 6, 8, 5], [1, 1, 1, 1]]
			}
		}
	}
	move(m) {
		var moveInfo = Cube.moves()[m]
		var t, pieceInfo

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

}

var cube = new Cube ()
console.log(cube)
