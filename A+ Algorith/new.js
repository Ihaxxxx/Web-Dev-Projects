let maingrid = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
];

let sidegrid = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
];



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function removeFromArray(arr, element) {
    // traversing backwards
    for (let index = arr.length - 1; index >= 0; index--) {
        if (arr[index] == element) {
            arr.splice(index, 1);
        }
    }
}





let row = 10
let col = 10
let openSet = []
let closedSet = []
let startLocationAddress;
let endLocationAddress;
let totalValue = 0
let openSetIndex = 0


function Spot(hor, ver) {
    this.x = hor
    this.y = ver
    this.edgeVals = []
    this.heuristic = getRndInteger(1, 100)
    this.neighbours = []

    this.addEdgeVals = function (maingrid) {
        if (hor < col - 1) {
            this.edgeVals.push(getRndInteger(1, 100))
        } else {
            this.edgeVals.push(null);
        }

        if (hor < col - 1 && ver < row - 1) {
            this.edgeVals.push(getRndInteger(1, 100))
        } else {
            this.edgeVals.push(null);
        }

        if (ver < row - 1) {
            this.edgeVals.push(getRndInteger(1, 100))
        } else {
            this.edgeVals.push(null);
        }
    };
    // [1,2,3]
    // [right,diagnol,left]

    this.addneighbours = function () {
        var hor = this.x;
        var ver = this.y;
        if (hor < col - 1) {
            this.neighbours.push(maingrid[hor + 1][ver]);
        }
        if (hor > 0) {
            this.neighbours.push(maingrid[hor - 1][ver]);
        }
        if (ver < row - 1) {
            this.neighbours.push(maingrid[hor][ver + 1]);
        }
        if (ver > 0) {
            this.neighbours.push(maingrid[hor][ver - 1]);
        }
        if (hor > 0 && ver > 0) {
            this.neighbours.push(maingrid[hor - 1][ver - 1]);
        }
        if (hor < col - 1 && ver > 0) {
            this.neighbours.push(maingrid[hor + 1][ver - 1]);
        }
        if (hor > 0 && ver < row - 1) {
            this.neighbours.push(maingrid[hor - 1][ver + 1]);
        }
        if (hor < col - 1 && ver < row - 1) {
            this.neighbours.push(maingrid[hor + 1][ver + 1]);
        }
    };

}


function setup() {
    // adding spots
    for (let ver = 0; ver < 10; ver++) {
        for (let hor = 0; hor < 10; hor++) {
            maingrid[ver][hor] = new Spot(hor, ver)
        }
    }

    // adding neighbours
    for (let ver = 0; ver < 10; ver++) {
        for (let hor = 0; hor < 10; hor++) {
            maingrid[ver][hor].addneighbours(maingrid)
        }
    }

    // adding edge values
    for (let ver = 0; ver < 10; ver++) {
        for (let hor = 0; hor < 10; hor++) {
            maingrid[ver][hor].addEdgeVals();
        }
    }

    // console.log(maingrid)

    // function to find start and the end
    startAndEnd(sidegrid)
    findPath(maingrid)


}


function startAndEnd(grid) {
    let startLocation = "A5"
    let endLocation = "J9"
    for (let ver = 0; ver < 10; ver++) {
        for (let hor = 0; hor < 10; hor++) {
            if (sidegrid[ver][hor] === startLocation) {
                startLocationAddress = maingrid[ver][hor]
            }
        }
    }
    for (let ver = 0; ver < 10; ver++) {
        for (let hor = 0; hor < 10; hor++) {
            if (sidegrid[ver][hor] === endLocation) {
                endLocationAddress = maingrid[ver][hor]
            }
        }
    }
    openSet.push(startLocationAddress)
}


function findPath(grid) {
    while (openSetIndex < 2) {
        console.log(openSet[openSetIndex].edgeVals)
        let lowest = findLowestVal(openSet[openSetIndex].edgeVals)
        const totalValue = lowest + openSet[openSetIndex].heuristic
        let valOfDirection = openSet[openSetIndex].edgeVals.indexOf(lowest)
        closedSet.push(openSet[openSetIndex])
        openSet = []

        if (valOfDirection == 0) {
            console.log(closedSet[openSetIndex].x, closedSet[openSetIndex].y)
            openSet.push(maingrid[closedSet[openSetIndex].x + 1][closedSet[openSetIndex].y])
        }
        if (valOfDirection == 1) {
            console.log(closedSet[openSetIndex].x, closedSet[openSetIndex].y)
            openSet.push(maingrid[closedSet[openSetIndex].x + 1][closedSet[openSetIndex].y + 1])
        }
        if (valOfDirection == 2) {
            console.log(closedSet[openSetIndex].x, closedSet[openSetIndex].y)
            openSet.push(maingrid[closedSet[openSetIndex].x][closedSet[openSetIndex].y + 1])
        }
        openSetIndex++
    }
    console.log(closedSet)

}


function findLowestVal(arr, heuristicVal) {
    return Math.min(...arr);
}



setup()