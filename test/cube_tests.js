const assert = require('chai').assert
const Cube = require('../cube')

describe('Testing cube functions', function () {
	it('Testing constructos', function () {
		for (var i = 0; i < 20; i++) {
			var cube, random = Cube.random()
			cube = new Cube (random)
			assert.deepEqual(cube, random, 'copy constructor not working')
			cube = new Cube (random.hash())
			assert.deepEqual(cube, random, 'hash function constructor not working')
			cube = new Cube (random)
			assert.deepEqual(cube, random, 'coordinate constructor not working')
			cube = Cube.identity()
			assert.deepEqual(cube.isSolved(), true, 'Cube.identity() not working')
		}
		// testing scramble 'constructor'
		var tests = [{
			scramble: "D' R' F L' D2 F U' D' L U' F R2 B' D2 F' R2 U2 B' D2 R2 B",
			solve: "y2 R F' Rw' U B F U M U' M' U2 Rw' U' Rw R U Rw' U Rw U' Rw' U' R' U2 R U R' U R U' R U R' F' R U R' U' R' F R2 U' R' M' U M U M' U' M U2 M U' M2 U2 M' U2 M' L2"
		}, {
			scramble: "L2 U2 B2 R2 D2 B2 F' D2 F R2 F2 R' F L' D U' F L F R'",
			solve: "z2 R2 U R F Rw' F U2 R B' U' M2 U R2 U' R' U2 R U M U M' R U2 L' B' L U' L U2 L' U' L U' L' U' R U R' F' R U R' U' R' F R2 U' R' M' U2 M U M' U2"
		}]
		for (var i in tests) {
			assert.equal(Cube.scramble(tests[i].scramble).scramble(tests[i].solve).isSolved(), true, "scramble 'constructor' not working")
		}
	})
	it('Testing cubie and coordinate functions', function () {
		for (var i = 0; i < 20; i++) {
			var random = Cube.random()
			var cubie = Cube.coordinateToCubie(Cube.cubieToCoordinate(random))
			assert.deepEqual(cubie, random, "cubes did not match")	
		}
	})
	it('Testing moves and simple hash function', function () {
		var tests = [{
			scramble: "D' R' F L' D2 F U' D' L U' F R2 B' D2 F' R2 U2 B' D2 R2 B",
			solve: "y2 R F' Rw' U B F U M U' M' U2 Rw' U' Rw R U Rw' U Rw U' Rw' U' R' U2 R U R' U R U' R U R' F' R U R' U' R' F R2 U' R' M' U M U M' U' M U2 M U' M2 U2 M' U2 M' L2"
		}, {
			scramble: "L2 U2 B2 R2 D2 B2 F' D2 F R2 F2 R' F L' D U' F L F R'",
			solve: "z2 R2 U R F Rw' F U2 R B' U' M2 U R2 U' R' U2 R U M U M' R U2 L' B' L U' L U2 L' U' L U' L' U' R U R' F' R U R' U' R' F R2 U' R' M' U2 M U M' U2"
		}, {
			scramble: "(R U')63",
			solve: ""
		}, {
			scramble: "R2 L' ([Rw: [R L2; R']])2'3'' [R, L]",
			solve: "(R2 L' ([Rw: [R L2; R']])2'3'' [R, L])'"
		}]
		for (var i in tests) {
			var identity = new Cube ()
			var cube = new Cube ()
			cube.scramble(tests[i].scramble + " " + tests[i].solve)
			assert.equal(cube.orient().hash(), identity.hash(), "test " + i + ": scramble + solve")
		}
	})
	it('Testing multiply function', function () {
		var tests = [{
			scramble: "R B R' U'",
			times: 6
		}, {
			scramble: "R U'",
			times: 63
		}, {
			scramble: "[[L, D'],U']",
			times: 3
		}]
		// testing multiply function with one argument
		for (var i in tests) {
			var multiCube = Cube.scramble(tests[i].scramble)
			var cube = new Cube ()
			for (var j = 0; j < tests[i].times; j++) {
				cube.multiply(multiCube)
			}
			assert.equal(cube.isSolved(), true, "test " + i + ": did not cycle in time")
		}
		// testing multiply function with two arguments
		for (var i in tests) {
			var multiCube = Cube.scramble(tests[i].scramble)
			var cube = new Cube(multiCube)
			assert.equal(cube.isSolved(), false, "test " + i + ": cube was solved from the beginning")
			cube.multiply(multiCube, tests[i].times-1)
			assert.equal(cube.isSolved(), true, "test " + i + ": did not cycle in expected time")
		}//*/
	})
	it('Testing inverse function', function () {
		var tests = [{
			scramble: "F"
		}, {
			scramble: "D' R' F L' D2 F U' D' L U' F R2 B' D2 F' R2 U2 B' D2 R2 B"
		}, {
			scramble: "L2 U2 B2 R2 D2 B2 F' D2 F R2 F2 R' F L' D U' F L F R'"
		}]
		for (var i in tests) {
			var cube = Cube.scramble(tests[i].scramble)
			assert.equal(cube.multiply(cube.inverse()).isSolved(), true, "generated cube is not the inverse of original")
		}
		for (var i = 0; i < 20; i++) {
			var cube = Cube.random()
			assert.equal(cube.multiply(cube.inverse()).isSolved(), true, "generated cube is not hte inverse of original")
		}
	})
	it('Testing hash function with arguments', function () {
		var tests = [{
			scramble: "R U R' U R U2 R' L' U' L U' L' U2 L",
			perm_options: {corners: [0, 3]},
			orien_options: {}
		} , {
			scramble: "U",
			perm_options: {},
			orien_options: undefined
		} , {
			scramble: "M2 U M' U M' U M' U2 M' U M' U M' U",
			perm_options: undefined,
			orien_options: {}
		} , {
			scramble: "M S2 M S2",
			perm_options: {centers: [0, 1, 2, 3, 4, 5]},
			orien_options: {}
		} , {
			scramble: "M2 U' M' U2 M U' M2",
			perm_options: {edges: [8, 10], centers: [0, 1, 2, 3, 4, 5]},
			orien_options: {edges: [0, 1, 2, 3, 8, 10]}
		}]
		for (var i in tests) {
			assert(Cube.scramble(tests[i].scramble).hash(tests[i].perm_options, tests[i].orien_options) 
				== Cube.identity().hash(tests[i].perm_options, tests[i].orien_options), true, "test " + i + ": cubes did not match")
		}
	})
	it('Testing parity', function () {
		var getParity = (data, num_pieces) => {
			var sum = 0
			for (var i=1; i <= num_pieces; i++) {
				sum += data%i
				data = Math.floor(data / i)
			}
			return sum%2;
		}

		var num_tests = 30
		// in generating a lot of random cubes, we can pretty much guarantee both cases of parity will show up
		var odd = 0
		for (var i = 0; i < num_tests; i++) {
			var random = Cube.random()
			var coordinates = Cube.cubieToCoordinate(random)
			var parity = getParity(coordinates.ep, 12)
			assert.equal(parity, getParity(coordinates.cp, 8), "edge and corner parity did not match")
			if (parity == 1) odd++;
		}
		assert.notEqual(odd, 0, "no odd parity cases generated in random()")
		assert.notEqual(odd, num_tests, "no even parity cases generated in random()")
	})
})
