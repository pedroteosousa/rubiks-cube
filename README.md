# Rubik's Cube
[![npm version](https://badge.fury.io/js/rubiks-cube.svg)](https://badge.fury.io/js/rubiks-cube)

Simple JavaScript modeling of a 3x3x3 Rubik's Cube.

### Usage

You can install the package with
```{r, engine='bash', count_lines}
npm install rubiks-cube
```

Here is a small use example

```javascript
const Cube = require('rubiks-cube')

// Create a new instance of a cube
var cube = new Cube ()
var copy = new Cube(cube) // or use the copy constructor

// Apply an algorithm
cube.scramble("U2 M2 U2 M' U2 M2 U2 M'")
copy.scramble("M S2 M' S2")

// Compare cubes using hash()
console.log(cube.hash() == copy.hash()) // true

// Create a cube in a random state
var random = Cube.random()
```