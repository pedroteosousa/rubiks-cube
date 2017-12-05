# Rubik's Cube
[![Build Status](https://travis-ci.org/pedroteosousa/rubiks-cube.svg?branch=master)](https://travis-ci.org/pedroteosousa/rubiks-cube)
[![npm version](https://badge.fury.io/js/rubiks-cube.svg)](https://badge.fury.io/js/rubiks-cube)

A simple JavaScript modeling of a 3x3x3 Rubik's Cube.

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

// creates a cube from a scramble
var scramble = Cube.scramble("M u2 M' y M2 U2 R2 U2 R2 U2")
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

// it's important to note that, differently from isSolved() the hash function takes permutations of centers into account,
// that means:
var cube = new Cube ()
cube.scramble('x y')
// rotations of the solved cube are considered different
console.log(cube.hash() == Cube.identity().hash()) // false

// but you can use the orient() function to put the cube back in WCA orientation and then compare it
cube.orient()
console.log(cube.hash() == Cube.identity().hash()) // true
```

#### Multiply function

This function does the equivalent of applying the scramble of a cube into another

```javascript
const Cube = require('rubiks-cube')

var multi = Cube.scramble("R U L D")

var cube = new Cube ()

var count = 0;
do {
	cube.multiply(multi)
    count++;
} while (!cube.isSolved())

console.log(count) // 315
```

You can use this to apply a long algorithm if you are using it frequently, because it's a lot faster, or if you have the cube but not the actual scramble (like in the example of the random cube)

#### Scrambles

The program accepts a bit more complex scrambles, like commutators (`[A:B] = A B A' B'`) and conjugates (`[A,B] = A B A'`).

```javascript
const Cube = require('rubiks-cube')

// commutators for PC and CP (speffz with UBL as buffer)
var PC = Cube.scramble("[ [R' , D'] : U2]")
var CP = Cube.scramble("[U , [U2: L D' L']]")

console.log(PC.multiply(CP).isSolved()) // true
```

#### Inverse function

This function finds the inverse state of a cube or the inverse of a scramble

```javascript
const Cube = require('rubiks-cube')

var cube = Cube.random()
// Get the inverse state of a cube
var inverse = cube.inverse()

console.log(cube.multiply(inverse).isSolved()) // true

// Or you can use the class inverse function, which also works for scrambles
cube = Cube.random()
console.log(cube.multiply(Cube.inverse(cube)).isSolved()) // true

var scramble = "M' x' Rw2 B"
console.log(Cube.inverse(scramble)) // B' Rw2 x M
```

#### More complex uses of the hash function:
	
The hash function can receive arguments to ignore a few pieces.

If no arguments are sent, it considers the permutation and orientation of all the pieces. It's first argument is used to check which pieces should be considered permutation-wise. It's second argument is used the same way, but orientation-wise.

Sending `undefined` in any of the two arguments causes the hash function to consider all pieces for that particular criteria.
```javascript
const Cube = require('rubiks-cube')

// this algorithm flips two corners (UBL and UFL) in place
var cube = Cube.scramble("R U R' U R U2 R' L' U' L U' L' U2 L")
console.log(cube.hash() == Cube.identity().hash()) // false

var options = {
	corners: [0, 3], // piece codes for UBL and UFL (check below for all piece codes)
    edges: [],
    centers: []
} // you could have just the 'corners' field here, but the others are included for reference

console.log(cube.hash(options, {}) == Cube.identity().hash(options, {})) // true
/* we need to send '{}' to the orientations options, otherwise, it would consider orientations
   of all pieces */

// like wise, for the orientation:
cube = Cube.scramble('U')
// U and D do not affect the orientation of any piece 

console.log(cube.hash() == Cube.identity().hash()) // false
console.log(cube.hash({}, undefined) == Cube.identity().hash({}, undefined)) // true
// returns true because we are considering orientations of all pieces, but permutations of none
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