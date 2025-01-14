

function removeFromArray(arr, element) {
    // traversing backwards
    for (let index = arr.length - 1; index >= 0; index--) {
        if (arr[index] == element) {
            arr.splice(index, 1);
        }
    }
}

// calc guess 
function heuristic(a, b) {
    // var distance = dist(a.i, a.j, b.i, b.j)
    var distance = abs(a.i - b.i) + abs(a.j - b.j)
    return distance
}

let col = 55;
let row = 50;
var grid = new Array(col)

var openSet = []
var closedSet = []
var start;
var end;
var width;
var height;
var previous = undefined
var path = [];


function Spot(i, j) {
    // get the position from where to draw
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbours = []
    this.previous = undefined
    this.wall = false

    if (random(1) < 0.2) {
        this.wall = true
    }

    this.show = function (col) {
        fill(col)
        if (this.wall) {
            fill(0)
        }
        noStroke()
        rect(this.i * w, this.j * h, w - 1, h - 1)
    }
    // adding neighbours
    this.addneighbours = function (grid) {
        var i = this.i;
        var j = this.j;
        if (i < col - 1) {
            this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbours.push(grid[i - 1][j]);
        }
        if (j < row - 1) {
            this.neighbours.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbours.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbours.push(grid[i - 1][j - 1])
        }
        if (i < col - 1 && j > 0) {
            this.neighbours.push(grid[i + 1][j - 1])
        }
        if (i > 0 && j < row - 1) {
            this.neighbours.push(grid[i - 1][j + 1])
        }
        if (i < col - 1 && j < row - 1) {
            this.neighbours.push(grid[i + 1][j + 1])
        }
    }
}

function setup() {
    createCanvas(400, 400);

    w = width / col
    h = height / row

    for (let i = 0; i < col; i++) {
        grid[i] = new Array(row)
    }
    // adding spots
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j] = new Spot(i, j)
        }
    }
    // adding neighboiurs
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid)
        }
    }
    start = grid[0][0];
    end = grid[col - 1][row - 1] // row
    start.wall = false
    end.wall = false
    openSet.push(start)
}


setup()


function draw() {
    if (openSet.length > 0) {
        // finding the lowest F
        var lowestIndex = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i
            }
        }

        var current = openSet[lowestIndex]

        if (current === end) {
            noLoop()
            console.log("Done")
        }
        // deleting the dealt node and moving it to the closed Set
        removeFromArray(openSet, current)
        closedSet.push(current)
        var neighbours = current.neighbours
        for (let i = 0; i < neighbours.length; i++) {
            var neighboiur = neighbours[i]
            // checking possible G score
            if (!closedSet.includes(neighboiur) && !neighboiur.wall) {
                var tempG = current.g + 1
                // check if this exist in open set to see if tit is a batter G
                var newPath = false
                if (openSet.includes(neighboiur)) {
                    // finding the optimal G score
                    if (tempG < neighboiur.g) {
                        neighboiur.g = tempG
                        newPath = true
                    }
                } else {
                    neighboiur.g = tempG
                    newPath = true
                    openSet.push(neighboiur);
                }

                if (newPath) {
                    // total distance a guess
                    neighboiur.h = heuristic(neighboiur, end)
                    // formula to calculate cost
                    neighboiur.f = neighboiur.g + neighboiur.h
                    neighboiur.previous = current // where thje neighboiur came from 
                }

            }
        }

    } else {
        console.log("nos solution")
        // no solution
        noLoop()
        return
    }



    background(0)

    // debug

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].show(color(255))
        }
    }

    // closed set position
    for (let index = 0; index < closedSet.length; index++) {
        closedSet[index].show(color(255, 0, 0))
    }

    // find path
    path = []
    var temp = current
    // run this loop until there is no previous element
    while (temp.previous) {
        // pushing the previous paths in a temp variable 
        path.push(temp);
        temp = temp.previous
    }
    // open set position green
    for (let index = 0; index < openSet.length; index++) {
        openSet[index].show(color(0, 255, 0))
    }
    // final path drawing  
    for (let index = 0; index < path.length; index++) {
        path[index].show(color(0, 0, 255))
    }
    // grid[col - 1][row - 1].show(color((0, 0, 255)))
}