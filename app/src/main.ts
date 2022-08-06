import { Engine, Actor, Color, CollisionType, vec } from 'excalibur'
const game = new Engine({
    width: 800,
    height: 600
})

/**
 * Hero
 */
const paddle = new Actor({
    x: 150,
    y: game.drawHeight - 40,
    width: 200,
    height: 20,
    color: Color.Chartreuse
})
paddle.body.collisionType = CollisionType.Fixed
game.add(paddle)

/**
 * Controls
 */
game.input.pointers.primary.on('move', (evt) => {
    paddle.pos.x = evt.worldPos.x
})

/**
 * ball
 */
const ball = new Actor({
    x: 100,
    y: 300,
    radius: 10,

    color: Color.Red
})
const ballSpeed = vec(500, 500)
setTimeout(() => {
    ball.vel = ballSpeed
}, 1000)
ball.body.collisionType = CollisionType.Passive

/**
 * Add Wall logic for the ball
 */
ball.on('postupdate', () => {
    //  bounce off left wall
    if (ball.pos.x < ball.width / 2) {
        ball.vel.x = ballSpeed.x
    }

    //  bounce off right wall
    if (ball.pos.x + ball.width / 2 > game.drawWidth) {
        ball.vel.x = ballSpeed.x * -1
    }

    // bounce off top
    if (ball.pos.y < ball.height / 2) {
        ball.vel.y = ballSpeed.y
    }
})
game.add(ball)

// Padding between bricks
const padding = 20 // px
const xoffset = 65 // x-offset
const yoffset = 20 // y-offset
const columns = 8
const rows = 6

const brickColor = [Color.Violet, Color.Orange, Color.Yellow]

// Individual brick width with padding factored in
const brickWidth = game.drawWidth / columns - padding - padding / columns // px
const brickHeight = 30 // px
const bricks: Actor[] = []
for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
        bricks.push(
            new Actor({
                x: xoffset + i * (brickWidth + padding) + padding,
                y: yoffset + j * (brickHeight + padding) + padding,
                width: brickWidth,
                height: brickHeight,
                color: brickColor[j % brickColor.length]
            })
        )
    }
}

bricks.forEach(function (brick) {
    // Make sure that bricks can participate in collisions
    brick.body.collisionType = CollisionType.Active

    // Add the brick to the current scene to be drawn
    game.add(brick)
})
// end-snippet{create-bricks}

// start-snippet{ball-brick-collision}
// On collision remove the brick, bounce the ball
let colliding = false
ball.on('collisionstart', function (ev) {
    if (bricks.indexOf(ev.other) > -1) {
        // kill removes an actor from the current scene
        // therefore it will no longer be drawn or updated
        ev.other.kill()
    }

    // reverse course after any collision
    // intersections are the direction body A has to move to not be clipping body B
    // `ev.content.mtv` "minimum translation vector" is a vector `normalize()` will make the length of it 1
    // `negate()` flips the direction of the vector
    var intersection = ev.contact.mtv.normalize()

    // Only reverse direction when the collision starts
    // Object could be colliding for multiple frames
    if (!colliding) {
        colliding = true
        // The largest component of intersection is our axis to flip
        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
            ball.vel.x *= -1
        } else {
            ball.vel.y *= -1
        }
    }
})

ball.on('collisionend', () => {
    // ball has separated from whatever object it was colliding with
    colliding = false
})

// end-snippet{ball-brick-collision}

// start-snippet{lose-condition}
// Loss condition
ball.on('exitviewport', () => {
    alert('You lose!')
})
// end-snippet{lose-condition}

// start-snippet{start-game}
// Start the engine to begin the game.
game.start()
// end-snippet{start-game}
