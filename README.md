# Rubiks Cube

Simple JavaScript modeling of a 3x3x3 Rubik's Cube.

### Usage

```javascript
const Cube = require('rubiks-cube')

// Create a new instance of a cube
var cube = new Cube ()
var copy = new Cube(cube) // or use the copy constructor

// Apply an algorithm
cube.scramble("U2 M2 U2 M' U2 M2 U2 M'")
copy.scramble("M S2 M' S2")

// Compare the cubes using hash()
console.log(cube.hash() == copy.hash()) // true
```