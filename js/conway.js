/**
 * Created by francois on 2016-07-19.
 */

// High Life
var B = [3, 6]; // Default Born
var S = [2, 3]; // Default Survives

var grid = [];
var r = 15;

setGridDimensions();

var baseR = r;

var msPerFrame = 20;
var animationFramesPerGeneration = 120;
var newGenerationCountdown = animationFramesPerGeneration;

var baseAnimationDuration = animationFramesPerGeneration * msPerFrame;

var svg = d3.select("#conway");

var intervalId = setInterval(function () {
    drawGrid(r);
    newGenerationCountdown--;
    if (newGenerationCountdown == 0) {
        updateGridStatus(grid);
        newGenerationCountdown = animationFramesPerGeneration;
    }
}, msPerFrame);

function drawGrid(r) {

    grid.forEach(processColumn);

    function processColumn(column) {
        column.forEach(processRow);
    }

    function processRow(rowItem) {
        if (rowItem.status) {
            if (!rowItem.animated) {
                svg.append("circle")
                    .attr("cx", rowItem.startX)
                    .attr("cy", rowItem.startY)
                    .attr("r", 1)
                    .attr("class", "circle")
                    .attr("fill", rowItem.col)
                    .transition().ease("bounce").duration(Math.floor(Math.random() * (baseAnimationDuration / 2)) + baseAnimationDuration)
                    .attr("cx", rowItem.gridX * baseR * 2 + baseR + Math.random() * baseR / 2 - baseR/4)
                    .attr("cy", rowItem.gridY * baseR * 2 + baseR + Math.random() * baseR / 2 - baseR/4)
                    .attr("r", 1.5*r * (Math.random()/2 + 0.75))
                    .transition().ease("linear").duration(Math.floor(Math.random() * (baseAnimationDuration / 4)) + baseAnimationDuration/2)
                    .attr("r", 0)
                    .style("opacity", "0")
                    .remove();
                rowItem.animated = true;
            }
        } else {
            rowItem.animated = false;
        }
    }
}

document.onmousemove = function () {
    spawnGridElement(event)
};

document.onclick = function () {
    setGridDimensions();
};

function spawnGridElement(e) {
    var theMargin = 0;
    var x = e.clientX;
    var y = e.clientY;
    var gridX = Math.floor((x - theMargin) / (r * 2));
    var gridY = Math.floor((y - theMargin) / (r * 2));
    window.grid[gridX][gridY].status = true;
    window.grid[gridX][gridY].animated = false;
    window.grid[gridX][gridY].startX = 2 * (gridX) * baseR + baseR;
    window.grid[gridX][gridY].startY = 2 * (gridY) * baseR + baseR;
}

function initialiseGrid(x, y) {
    grid = [];

    for (var i = 0; i < x; i++) {
        grid[i] = [];
        for (var j = 0; j < y; j++) {

            grid[i][j] = {
                status: false,
                gridX: i,
                startX: 2 * i * baseR  + baseR,
                gridY: j,
                startY: 2 * j * baseR  + baseR,
                animated: false,
                col: d3.rgb("#86C53C")
            };
        }
    }
}

window.addEventListener('resize', setGridDimensions);

function setGridDimensions() {
    var windowDimensions = getWindowSize();
    gridX = Math.ceil(windowDimensions.width / r / 2);
    gridY = Math.ceil(windowDimensions.height / r / 2);

    initialiseGrid(gridX, gridY);
}


function getWindowSize() {
    if (typeof (window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    return {width: myWidth, height: myHeight};
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};

function updateGridStatus(grid) {
    
    // first discover the neighbours
    grid.forEach(discoverNeighboursColumn);

    function discoverNeighboursColumn(column) {
        column.forEach(discoverNeighboursRowItem);
    }

    function discoverNeighboursRowItem(rowItem) {
        rowItem.neigbourhood = discoverNeighbourhood(grid, rowItem.gridX, rowItem.gridY);
    }

    // now update the status
    grid.forEach(updateStatusColumn);

    function updateStatusColumn(column) {
        column.forEach(updateStatusRowItem);
    }

    function updateStatusRowItem(rowItem) {
        if (rowItem.status) {
            // Survives if...
            rowItem.status = S.indexOf(rowItem.neigbourhood.count) > -1;
        } else {
            // Born ...
            rowItem.status = B.indexOf(rowItem.neigbourhood.count) > -1;
        }

        if (rowItem.status) {
            // rowItem.animated = false;
            var randomNeighbour = rowItem.neigbourhood.neighbours.random();
            rowItem.startX = 2 * (rowItem.gridX + randomNeighbour.dX) * baseR + baseR;
            rowItem.startY = 2 * (rowItem.gridY + randomNeighbour.dY) * baseR + baseR;
            rowItem.animated = false;
        }
    }
}

// toroidal grid
function discoverNeighbourhood(grid, x, y) {
    var neighbourhood = {};
    neighbourhood.neighbours = [];
    neighbourhood.count = 0;

    for (var dX = -1; dX <= 1; dX++) {
        for (var dY = -1; dY <= 1; dY++) {
            if ((dX != 0) || (dY != 0)) { // don't count self
                nX = x + dX;
                nY = y + dY;

                if (nX < 0) {
                    nX = gridX - 1;
                } else if (nX == gridX) {
                    nX = 0;
                }
                if (nY < 0) {
                    nY = gridY - 1;
                } else if (nY == gridY) {
                    nY = 0;
                }

                if (grid[nX][nY].status) {
                    neighbourhood.count++;
                    neighbourhood.neighbours.push({dX:dX, dY:dY});
                }
            }
        }
    }

    return neighbourhood;
}
