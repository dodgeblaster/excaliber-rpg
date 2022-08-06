import { Engine, Actor, Color, CollisionType, Input } from 'excalibur'
const game = new Engine({
    width: 800,
    height: 600
})

/**
 * Hero
 */

class Player extends Actor {
    constructor() {
        super({
            width: 20,
            height: 20,
            radius: 10,
            color: Color.Chartreuse,
            collisionType: CollisionType.Active,
            x: 150,
            y: game.drawHeight - 40
        })

        this.on('collisionstart', (e) => {
            if (e.other.name === 'goal') {
                alert('You have won the game!')
            }
        })
    }

    public update = (engine: Engine) => {
        this.vel.y = 0
        this.vel.x = 0
        const speed = 150
        const isPressed = (x: Input.Keys) => engine.input.keyboard.isHeld(x)
        if (isPressed(Input.Keys.W)) {
            this.vel.y = -speed
        }
        if (isPressed(Input.Keys.A)) {
            this.vel.x = -speed
        }
        if (isPressed(Input.Keys.S)) {
            this.vel.y = speed
        }
        if (isPressed(Input.Keys.D)) {
            this.vel.x = speed
        }
    }
}

class Goal extends Actor {
    constructor() {
        super({
            name: 'goal',
            width: 20,
            height: 20,
            color: Color.Magenta,
            collisionType: CollisionType.Passive,
            x: 250,
            y: game.drawHeight - 40
        })
    }
}

const hero = new Player()
game.add(hero)

const goal = new Goal()
game.add(goal)

/**
 * Controls
 */
// game.input.pointers.primary.on('move', (evt) => {
//     paddle.pos.x = evt.worldPos.x
// })

game.start()
