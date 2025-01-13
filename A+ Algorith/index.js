

function removeFromArray(arr,element){
    // traversing backwards
    for (let index = arr.length-1; index >= 0; index--) {
        if (arr[index] == element) {
            arr.splice(index,1);
        }
    }
}

// calc guess 
function heuristic(a,b){
    var distance = dist(a.i,a.j,b.i,b.j)
    return distance
}

let col = 25;
let row = 25;
var grid = new Array(col)

var openSet = []
var closedSet = []
var start ;
var end;
var width ;
var height ;
var previous = undefined
var path = [];


function Spot(i,j){
    // get the position from where to draw
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbours = []

    this.show = function(col){
        fill(col)
        noStroke()
        rect(this.i*w,this.j*h,w-1,h-1)
    }
    // adding neighbours
    this.addneighbours = function(grid){
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
    }
}

function setup(){
    createCanvas(400, 400);

    w = width/col
    h = height/row

    for (let i = 0; i < col ; i++) {
        grid[i] = new Array(row)
    }
    console.log(grid)
    // adding spots
    for (let i= 0; i< col; i++) {
        for (let j = 0; j < row; j++) {            
            grid[i][j] = new Spot(i,j)
        }
    }
    // adding neighboiurs
    for (let i= 0; i< col; i++) {
        for (let j = 0; j < row; j++) {            
            grid[i][j].addneighbours(grid)
        }
    }
    start = grid[0][0];
    end = grid[col-1][row-1]
    openSet.push(start)
}


setup()


function draw(){
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
            // find path
            path = []
            var temp = current
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous
            }
            console.log("Done")
        }
        // deleting the dealt node and moving it to the closed Set
        removeFromArray(openSet,current)
        closedSet.push(current)
        var neighbours = current.neighbours
        for (let i = 0; i < neighbours.length; i++) {
            var neighboiur = neighbours[i]
            // checking possible G score
            if (!closedSet.includes(neighboiur)) {
                var tempG =  current.g + 1
                // check if this exist in open set to see if tit is a batter G
                if (openSet.includes(neighboiur)) {
                    // finding the optimal G score
                    if (tempG < neighboiur.g) {
                        neighboiur.g = tempG
                    }
                }else{
                    neighboiur.g = tempG
                    openSet.push(neighboiur);
                }
                neighboiur.h = heuristic(neighboiur,end)
                neighboiur.f = neighboiur.g + neighboiur.h
                neighboiur.previous = current // where thje neighboiur came from 
            }
        }

    }else{
        // no solution
    }



    background(0)

    // debug

    for (let i = 0; i < col ; i++) {
        for (let j = 0; j < row; j++) {            
            grid[i][j].show(color(255))
        }
    }

    // closed set position
    for (let index = 0; index < closedSet.length; index++) {
        closedSet[index].show(color(255,0,0))
    }

    // open set position green
    for (let index = 0; index < openSet.length; index++) {
        openSet[index].show(color(255,0,0))
    }

    for (let index = 0; index < path.length; index++) {
        path[index].show(color(0,0,255))
    }
}