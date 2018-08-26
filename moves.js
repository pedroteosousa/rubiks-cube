module.exports = {
	moves: () => {
		return {
			"U" : {
				corners : [[0, 1, 2, 3], [0, 0, 0, 0]],
				edges : [[0, 1, 2, 3], [0, 0, 0, 0]]
			},
			"U'" : {
				corners : [[0, 3, 2, 1], [0, 0, 0, 0]],
				edges : [[0, 3, 2, 1], [0, 0, 0, 0]]
			},
			"D" : {
				corners : [[4, 5, 6, 7], [0, 0, 0, 0]],
				edges : [[8, 9, 10, 11], [0, 0, 0, 0]]
			},
			"D'" : {
				corners : [[4, 7, 6, 5], [0, 0, 0, 0]],
				edges : [[8, 11, 10, 9], [0, 0, 0, 0]]
			},
			"L" : {
				corners : [[0, 3, 4, 7], [1, 2, 1, 2]],
				edges : [[3, 5, 11, 4], [0, 0, 0, 0]]
			},
			"L'" : {
				corners : [[0, 7, 4, 3], [1, 2, 1, 2]],
				edges : [[3, 4, 11, 5], [0, 0, 0, 0]]
			},
			"R" : {
				corners : [[2, 1, 6, 5], [1, 2, 1, 2]],
				edges : [[1, 7, 9, 6], [0, 0, 0, 0]]
			},
			"R'" : {
				corners : [[2, 5, 6, 1], [1, 2, 1, 2]],
				edges : [[1, 6, 9, 7], [0, 0, 0, 0]]
			},
			"F" : {
				corners : [[3, 2, 5, 4], [1, 2, 1, 2]],
				edges : [[2, 6, 8, 5], [1, 1, 1, 1]]
			},
			"F'" : {
				corners : [[3, 4, 5, 2], [1, 2, 1, 2]],
				edges : [[2, 5, 8, 6], [1, 1, 1, 1]]
			},
			"B" : {
				corners : [[1, 0, 7, 6], [1, 2, 1, 2]],
				edges : [[0, 4, 10, 7], [1, 1, 1, 1]]
			},
			"B'" : {
				corners : [[1, 6, 7, 0], [1, 2, 1, 2]],
				edges : [[0, 7, 10, 4], [1, 1, 1, 1]]
			},
			"S" : {
				edges : [[1, 3, 11, 9], [1, 1, 1, 1]],
				centers : [0, 1, 5, 3]
			},
			"S'" : {
				edges : [[1, 9, 11, 3], [1, 1, 1, 1]],
				centers : [0, 3, 5, 1]
			},
			"E'" : {
				edges : [[7, 6, 5, 4], [1, 1, 1, 1]],
				centers : [4, 3, 2, 1]
			},
			"E" : {
				edges : [[7, 4, 5, 6], [1, 1, 1, 1]],
				centers : [4, 1, 2, 3]
			},
			"M" : {
				edges : [[0, 2, 8, 10], [1, 1, 1, 1]],
				centers : [0, 2, 5, 4]
			},
			"M'" : {
				edges : [[0, 10, 8, 2], [1, 1, 1, 1]],
				centers : [0, 4, 5, 2]
			},
			"Rw" : {sequence : "R M'"},
			"Rw'" : {sequence : "R' M"},
			"r": {sequence : "Rw"},
			"r'": {sequence : "Rw'"},
			"l": {sequence : "Lw"},
			"l'": {sequence : "Lw'"},
			"f": {sequence : "Fw"},
			"f'": {sequence : "Fw'"},
			"b": {sequence : "Bw"},
			"b'": {sequence : "Bw'"},
			"d": {sequence : "Dw"},
			"d'": {sequence : "Dw'"},
			"u": {sequence : "Uw"},
			"u'": {sequence : "Uw'"},
			"Lw" : {sequence : "L M"},
			"Lw'" : {sequence : "L' M'"},
			"Fw" : {sequence : "F S'"},
			"Fw'" : {sequence : "F' S"},
			"Bw" : {sequence : "B S"},
			"Bw'" : {sequence : "B' S'"},
			"Uw" : {sequence : "U E'"},
			"Uw'" : {sequence : "U' E"},
			"Dw" : {sequence : "D E"},
			"Dw'" : {sequence : "D' E'"},
			"x" : {sequence : "L' M' R"},
			"x'" : {sequence : "L M R'"},
			"y" : {sequence : "U E' D'"},
			"y'" : {sequence : "U' E D"},
			"z" : {sequence : "F S' B'"},
			"z'" : {sequence : "F' S B"},
		}
	}
}
