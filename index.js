let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0

// make sure you create your images
let backImg = document.createElement('img')
backImg.src = 'images/bg.png'

let fgImg = document.createElement('img')
fgImg.src = 'images/fg.png'

let birdImg = document.createElement('img')
birdImg.src = 'images/bird.png'

let northPipe = document.createElement('img')
northPipe.src = 'images/pipeNorth.png'

let southPipe = document.createElement('img')
southPipe.src = 'images/pipeSouth.png'

let constant = northPipe.height + 100

let pipes = [{x:canvas.width + 10 , y: 0}]

let birdY = 30
let birdIncrement = 2
let birdWidth = birdY + birdImg.width
let birdLength = birdIncrement + 30


// event listeners to handle bord movement
document.addEventListener('mousedown', () => {
    // decrementing the bird Y value moves the bird to the top of the canvas
    birdIncrement = -5
})

document.addEventListener('mouseup', () => {
    // incrementing the bird Y value moves the bird to the bottom of the canvas
    birdIncrement = 2
})

function draw(){
    ctx.drawImage(backImg, 0, 0)


    // loop over a set of pipes to create the pipe animation
    for(let i=0; i< pipes.length ;i++) {
        ctx.drawImage(northPipe, pipes[i].x, pipes[i].y)
        ctx.drawImage(southPipe, pipes[i].x, pipes[i].y + constant)

        // make the pipes move towards the left on the x axis
        // decrementing the x value does that
        pipes[i].x--


        // check if a pipe has reached a certain position
        if (pipes[i].x == 50) {
            // add a new pipe at a random y value
            pipes.push({
                x: canvas.width + 30,
                y: -Math.floor(Math.random() * northPipe.height)
            })
        }
            //pipes collision
        if (pipes[i].x == birdWidth && northPipe.height < birdLength ) {
            clearinterval()
            alert('game over')
        } 
        
    }
    //draw your bird and foreground images
    ctx.drawImage(birdImg, 30, birdY)
    ctx.drawImage(fgImg, 0, canvas.height - fgImg.height)

    // add your score text
    ctx.font = '20px Verdana'
    ctx.fillText('Score: ' + score, 10, canvas.height - 50)
    
    // make the bird fall
    // putting a +ve "y" value does that
    birdY += birdIncrement
    
}
console.log(pipes)

// create your interval here
intervalID = setInterval(() => {
    requestAnimationFrame(draw)
}, 10)
