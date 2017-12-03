# Rubik's Cube
[![Build Status](https://travis-ci.org/pedroteosousa/rubiks-cube.svg?branch=master)](https://travis-ci.org/pedroteosousa/rubiks-cube)
[![npm version](https://badge.fury.io/js/rubiks-cube.svg)](https://badge.fury.io/js/rubiks-cube)

Simple JavaScript modeling of a 3x3x3 Rubik's Cube.

## Installing
```{r, engine='bash', count_lines}
npm install rubiks-cube
```

## Usage

Here are a few use examples:

### Constructors

```javascript
const Cube = require('rubiks-cube')

// default constructor (creates a solved cube)
var cube = new Cube ()

// copy constructor
var copy = new Cube (cube)

// hash constructor
var hash = new Cube (cube.hash())
```
#### Other ways of creating cubes:

```javascript
const Cube = require('rubiks-cube')

// creates a solved cube
var cube = Cube.identity()

// creates a cube in a random state
var random = Cube.random()
```

### Applying moves and comparing

```javascript
const Cube = require('rubiks-cube')

var cube1 = new Cube ()
var cube2 = new Cube ()

// apply an algorithm
cube1.scramble("U2 M2 U2 M' U2 M2 U2 M'")
cube2.scramble("M S2 M' S2")
// all face and slice moves are implemented, as well as all rotations

// check if cube is solved
console.log(cube1.isSolved()) // false

// compare cubes using hash()
console.log(cube1.hash() == cube2.hash()) // true

// it's important to note that the hash function takes permutations of centers into account, that means:
var cube = new Cube ()
cube.scramble('x y')
// rotations of the solved cube are considered different
console.log(cube.hash() == Cube.identity().hash()) // false

// but you can use the orient() function to put the cube back in WCA orientation and then compare it
cube.orient()
console.log(cube.hash() == Cube.identity().hash()) // true
```

#### More complex uses of the hash function:
	
The hash function can receive arguments to ignore a few pieces.

If no arguments are sent, it considers the permutation and orientation of all the pieces. It's first argument is used to check which pieces should be considered permutation-wise. It's second argument is used the same way, but orientation-wise.

Sending `undefined` in any of the two arguments causes the hash function to consider all pieces for that particular criteria.
```javascript
const Cube = require('rubiks-cube')

// this algorithm flips two corners (UBL and UFL) in place
var cube = Cube.identity().scramble("R U R' U R U2 R' L' U' L U' L' U2 L")
console.log(cube.hash() == Cube.identity().hash()) // false

var options = {
	corners: [0, 3] // piece codes for UBL and UFL (check below for all piece codes)
    edges: [],
    centers: []
} // you could have just the 'corners' field here, but the order are included for reference

console.log(cube.hash(options, {}) == Cube.identity().hash(options, {})) // true
// we need to send '{}' to the orientations options, otherwise, it would consider orientations of all pieces

// like wise, for the orientation:
cube = Cube.identity().scramble('U')
// note that the only moves that affect orientation of pieces are F, B and slice moves

console.log(cube.hash() == Cube.identity().hash()) // false
console.log(cube.hash({}, options) == Cube.identity().hash({}, options)) // true
```

A bit of information is lost while doing this, so the hash function can only be used in a constructor if it received no arguments (or both arguments `undefined`).

##### Piece codes:

Corners:

| UBL | UBR | UFR | UFL | DFL | DFR | DBR | DBL |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |


Edges:

| UB | UR | UF | UL | LB | LF | RF | RB | DF | DR | DB | DL |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 |

Centers:

| U | L | F | R | B | D |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 1 | 2 | 3 | 4 | 5 |

## License

This project is licensed under the MIT License








