const Moves = require('./moves')
const Scramble = require('./scramble')

'use strict'

class Cube {
  /*
		By default, the constructor creates a solved cube, but copy, hash() and coordinate
		constructor are used depending on the argument given
	*/
  constructor (other) {
    // Apply cubie to this cube
    var apply = (cubie) => {
      this.co = cubie.co.slice()
      this.cp = cubie.cp.slice()
      this.ep = cubie.ep.slice()
      this.eo = cubie.eo.slice()
      this.c = cubie.c.slice()
    }
    // Identity Cube
    var identity = Cube.coordinateToCubie({ep: 0, eo: 0, cp: 0, co: 0, c: 0})
    // Constructor without arguments creates the identity cube
    apply(identity)

    // Get cube info from coordinate or from cubie objects
    if (other != undefined && other.hasOwnProperty('co')) {
      if (typeof other.co === 'number') {
        apply(Cube.coordinateToCubie(other))
      } else {
        apply(other)
      }
    }
    // Get cube info from hash function (only use this if hash functions affects all pieces)
    else if (other != undefined && typeof other === 'string') {
      for (var i = 0; i < 12; i++) {
        this.ep[i] = other.charCodeAt(2 * i) - 48
        this.eo[i] = other.charCodeAt(2 * i + 1) - 48
      }
      for (var i = 12; i < 20; i++) {
        this.cp[i - 12] = other.charCodeAt(2 * i) - 48
        this.co[i - 12] = other.charCodeAt(2 * i + 1) - 48
      }
      for (var i = 2 * 20; i < 46; i++) {
        this.c[i - 2 * 20] = other.charCodeAt(i) - 48
      }
    }
  }
  static Moves () {
    return Moves
  }
  // Returns a solved cube
  static identity () {
    var identity = new Cube()
    return identity
  }
  // Create a random cube state
  static random () {
    var randomInt = (max) => {
      return Math.floor(Math.random() * (max + 1))
    }

    // Verify if both edges and corners have the same parity
    var verifyParity = (cp, ep) => {
      var getSum = (data, num_pieces) => {
        var sum = 0
        for (var i = 1; i <= num_pieces; i++) {
          sum += data % i
          data = Math.floor(data / i)
        }
        return sum
      }
      return (getSum(cp, 8) % 2) == (getSum(ep, 12) % 2)
    }

    var data
    do {
      data = {
        co: randomInt(2186),
        eo: randomInt(2047),
        cp: randomInt(40319),
        ep: randomInt(479001599),
        c: 0
      }
    } while (!verifyParity(data.cp, data.ep))

    return new Cube(data)
  }
  // Get cube after a scramble
  static scramble (scramble) {
    var cube = new Cube()
    cube.scramble(scramble)
    return cube
  }
  // Get the inverse of a cube or of a scramble
  static inverse (arg) {
    var cube = new Cube(arg)
    return cube.inverse()
  }
  // Coordinate data to Cubie data
  static coordinateToCubie (data) {
    // Get cubie orientations from coordinates
    var orientation = (ori_data, num_pieces, flip_size) => {
      var ori = []
      var sum = 0
      for (var i = 0; i < num_pieces - 1; i++) {
        ori.push(ori_data % flip_size)
        sum += ori[i]
        ori_data = Math.floor(ori_data / flip_size)
      }
      ori.push((flip_size - sum % flip_size) % flip_size)
      return ori
    }
    // Get cubie permutations from coordinates
    var permutation = (per_data, num_pieces) => {
      var per = []
      var temp_info = []

      var extract = []
      for (var i = 1; i <= num_pieces; i++) {
        temp_info.push(num_pieces - i)
        extract.push(per_data % i)
        per_data = Math.floor(per_data / i)
      }

      for (var i = num_pieces - 1; i >= 0; i--) {
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
  static cubieToCoordinate (data) {
    // Get orientation coordinates from cubie
    var orientation = (ori_data, flip_size) => {
      var final_data = 0
      for (var i = ori_data.length - 2; i >= 0; i--) {
        final_data *= flip_size
        final_data += ori_data[i]
      }
      return final_data
    }
    // Get permutation coordinates from cubie
    var permutation = (per_data) => {
      var final_data = 0
      for (var i = per_data.length - 1; i >= 1; i--) {
        var sum = 0
        for (var j = 0; j < i; j++) {
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
  static allMoves () {
    return Object.keys(Cube.moves())
  }
  // List of moves given by cicles and/or sequences of other moves
  static moves () {
    return Moves.moves()
  }
  // Make all moves in a scramble string
  scramble (scramble) {
    scramble = Scramble.parse(scramble)
    if (scramble.indexOf(' ') >= 0) {
      var moves = scramble.split(' ').filter((m) => m.length > 0)
      for (var i in moves) this.scramble(moves[i])
    } else {
      var moveInfo = Cube.moves()[scramble]
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
          this.cp[moveInfo.corners[0][(i + 1) % 4]] = this.cp[moveInfo.corners[0][i]]
          this.co[moveInfo.corners[0][(i + 1) % 4]] = (this.co[moveInfo.corners[0][i]] + moveInfo.corners[1][i]) % 3
        }
        this.cp[moveInfo.corners[0][1]] = pieceInfo[0]
        this.co[moveInfo.corners[0][1]] = (pieceInfo[1] + moveInfo.corners[1][0]) % 3
      }

      // === Edges ===
      if (moveInfo.hasOwnProperty('edges')) {
        var t = moveInfo.edges[0][0]
        pieceInfo = [this.ep[t], this.eo[t]]
        for (var i = 3; i > 0; i--) {
          this.ep[moveInfo.edges[0][(i + 1) % 4]] = this.ep[moveInfo.edges[0][i]]
          this.eo[moveInfo.edges[0][(i + 1) % 4]] = (this.eo[moveInfo.edges[0][i]] + moveInfo.edges[1][i]) % 2
        }
        this.ep[moveInfo.edges[0][1]] = pieceInfo[0]
        this.eo[moveInfo.edges[0][1]] = (pieceInfo[1] + moveInfo.edges[1][0]) % 2
      }

      // === Centers ===
      if (moveInfo.hasOwnProperty('centers')) {
        var t = moveInfo.centers[0]
        pieceInfo = this.c[t]
        for (var i = 3; i > 0; i--) {
          this.c[moveInfo.centers[(i + 1) % 4]] = this.c[moveInfo.centers[i]]
        }
        this.c[moveInfo.centers[1]] = pieceInfo
      }
    }
    return this
  }
  // Multiply a cube by another
  multiply (cube_info, times = 1) {
    if (times < 1) return this

    if (times == 1) {
      var cube = new Cube(cube_info)
      var temp = new Cube(this)
      for (var i in cube.ep) {
        this.ep[i] = temp.ep[cube.ep[i]]
        this.eo[i] = (temp.eo[cube.ep[i]] + cube.eo[i]) % 2
      }
      for (var i in cube.cp) {
        this.cp[i] = temp.cp[cube.cp[i]]
        this.co[i] = (temp.co[cube.cp[i]] + cube.co[i]) % 3
      }
      for (var i in cube.c) {
        this.c[i] = temp.c[cube.c[i]]
      }
    } else {
      var temp = Cube.identity()
      temp.multiply(cube_info, parseInt(times / 2))
      this.multiply(temp)
      this.multiply(temp)
      if (times % 2) this.multiply(cube_info)
    }
    return this
  }
  // Get the inverse of a cube
  inverse () {
    var inverse = new Cube()
    for (var i in this.ep) {
      inverse.ep[this.ep[i]] = parseInt(i)
      inverse.eo[this.ep[i]] = this.eo[i]
    }
    for (var i in this.cp) {
      inverse.cp[this.cp[i]] = parseInt(i)
      inverse.co[this.cp[i]] = (this.co[i] * 2) % 3
    }
    for (var i in this.c) {
      inverse.c[this.c[i]] = parseInt(i)
    }
    return inverse
  }
  // Rotate cube to the default orientation
  orient () {
    var moveWhite = ['', 'z', 'x', "z'", "x'", 'x2']
    for (var i in this.c) {
      if (this.c[i] == 0) {
        this.scramble(moveWhite[i])
        break
      }
    }

    var moveGreen = ['', "y'", '', 'y', 'y2', '']
    for (var i in this.c) {
      if (this.c[i] == 2) {
        this.scramble(moveGreen[i])
        break
      }
    }
    return this
  }
  // Check if cube is solved
  isSolved (affected_permutation, affected_orientation) {
    var identity = new Cube()
    var copy = new Cube(this)
    return copy.orient().hash(affected_permutation, affected_orientation) == identity.hash(affected_permutation, affected_orientation)
  }
  /* Hash function to comparece cubes
		affected_permutation:
			track permutation of these pieces
		affected_orientation:
			track orientations of these pieces
	*/
  hash (affected_permutation, affected_orientation) {
    var defaultAffected = () => {
      return {
        corners: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        edges: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        centers: [0, 1, 2, 3, 4, 5]
      }
    }

    if (affected_permutation == undefined) affected_permutation = defaultAffected()
    if (affected_orientation == undefined) affected_orientation = defaultAffected()

    var hashString = ''
    for (var i in this.ep) {
      if (affected_permutation.hasOwnProperty('edges') && affected_permutation.edges.indexOf(this.ep[i]) >= 0) {
        hashString += String.fromCharCode(this.ep[i] + 48)
      } else hashString += String.fromCharCode(47)
      if (affected_orientation.hasOwnProperty('edges') && affected_orientation.edges.indexOf(this.ep[i]) >= 0) {
        hashString += String.fromCharCode(this.eo[i] + 48)
      } else hashString += String.fromCharCode(47)
    }
    for (var i in this.cp) {
      if (affected_permutation.hasOwnProperty('corners') && affected_permutation.corners.indexOf(this.cp[i]) >= 0) {
        hashString += String.fromCharCode(this.cp[i] + 48)
      } else hashString += String.fromCharCode(47)
      if (affected_orientation.hasOwnProperty('corners') && affected_orientation.corners.indexOf(this.co[i]) >= 0) {
        hashString += String.fromCharCode(this.co[i] + 48)
      } else hashString += String.fromCharCode(47)
    }
    for (var i in this.c) {
      if (affected_permutation.hasOwnProperty('centers') && affected_permutation.centers.indexOf(this.c[i]) >= 0) {
        hashString += String.fromCharCode(this.c[i] + 48)
      } else hashString += String.fromCharCode(47)
    }

    return hashString
  }
}

module.exports = Cube
module.exports.Scramble = Scramble
