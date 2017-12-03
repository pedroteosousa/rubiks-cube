"use strict"

class Moves {
	static list() {
		return Object.keys(Moves.moves())
	}
	static invertMove(move) {
		if (Moves.list().indexOf(move) >= 0) {
			if (move.length == 2) {
				if (move[1] == "'") {
					return move[0]
				} else return move
			} else {
				return move + "'";
			}
		}
	}
	static invert(scramble) {
		var inverse = ""
		var moves = scramble.split(' ').filter((m) => m.length > 0)
		for (var i in moves) inverse = this.invertMove(moves[i]) + " " + inverse
		return inverse.trim()
	}
	static moves () {
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
			"r": {"sequence" : "Rw"},
			"r'": {"sequence" : "Rw'"},
			"r2": {"sequence" : "Rw2"},
			"l": {"sequence" : "Lw"},
			"l'": {"sequence" : "Lw'"},
			"l2": {"sequence" : "Lw2"},
			"f": {"sequence" : "Fw"},
			"f'": {"sequence" : "Fw'"},
			"f2": {"sequence" : "Fw2"},
			"b": {"sequence" : "Bw"},
			"b'": {"sequence" : "Bw'"},
			"b2": {"sequence" : "Bw2"},
			"d": {"sequence" : "Dw"},
			"d'": {"sequence" : "Dw'"},
			"d2": {"sequence" : "Dw2"},
			"u": {"sequence" : "Uw"},
			"u'": {"sequence" : "Uw'"},
			"u2": {"sequence" : "Uw2"},
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
}

module.exports = Moves