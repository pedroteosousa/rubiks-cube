const assert = require('chai').assert
const Cube = require('../cube')

describe('Testing scramble functions', function () {
	it('Testing list function', function () {
		for (var i in Cube.moves()) {
			var cube = new Cube ()
			var copy = new Cube (cube)
			cube.scramble(i)
			assert.equal(cube.hash() == copy.hash(), false, "move in list does not work")
		}
	})
	it('Testing inverse function', function () {
		var tests = [{
			scramble: "D' R' F L' D2 F U' D' L U' F R2 B' D2 F' R2 U2 B' D2 R2 B"
		}, {
			scramble: "L2 U2 B2 R2 D2 B2 F' D2 F R2 F2 R' F L' D U' F L F R'"
		}, {
			scramble: Cube.allMoves().join(' ')
		}]
		for (var i in tests) {
			var cube = new Cube ()
			cube.scramble(tests[i].scramble)
			cube.scramble(Cube.inverse(tests[i].scramble))
			assert.equal(cube.isSolved(), true, "inverse scramble did not solve the cube")
		}
	})
})
