import {
    Engine,
    Actor,
    Color,
    CollisionType,
    Input,
    vec,
    DisplayMode
} from 'excalibur'
const game = new Engine({
    width: 1600,
    height: 900,
    backgroundColor: Color.Black,
    displayMode: DisplayMode.FitScreen
})

const UNIT = 32

/**
 * Hero
 */

class Player extends Actor {
    constructor() {
        super({
            width: UNIT,
            height: UNIT,
            radius: UNIT / 2,
            color: Color.Chartreuse,
            collisionType: CollisionType.Active,
            x: UNIT * 2,
            y: UNIT * 4
        })

        this.on('collisionstart', (e) => {
            if (e.other.name === 'goal') {
                alert('You have won the game!')
            }
        })
    }

    onInitialize(_engine: Engine): void {
        _engine.currentScene.camera.strategy.radiusAroundActor(this, 200)
    }

    public update = (engine: Engine) => {
        this.vel.y = 0
        this.vel.x = 0
        const speed = UNIT * 8
        const isPressed = (x: Input.Keys) => engine.input.keyboard.isHeld(x)
        const isControllerPressed = (x: Input.Buttons) =>
            engine.input.gamepads.at(0).isButtonPressed(x)

        const CONTROLLER_UP =
            isPressed(Input.Keys.W) || isControllerPressed(Input.Buttons.DpadUp)
        const CONTROLLER_LEFT =
            isPressed(Input.Keys.A) ||
            isControllerPressed(Input.Buttons.DpadLeft)

        const CONTROLLER_DOWN =
            isPressed(Input.Keys.S) ||
            isControllerPressed(Input.Buttons.DpadDown)

        const CONTROLLER_RIGHT =
            isPressed(Input.Keys.D) ||
            isControllerPressed(Input.Buttons.DpadRight)

        const CONTROLLER_B = isControllerPressed(Input.Buttons.Face1)
        const CONTROLLER_A = isControllerPressed(Input.Buttons.Face2)
        const CONTROLLER_Y = isControllerPressed(Input.Buttons.Face3)
        const CONTROLLER_X = isControllerPressed(Input.Buttons.Face4)

        if (CONTROLLER_UP) {
            this.vel.y = -speed
        }
        if (CONTROLLER_LEFT) {
            this.vel.x = -speed
        }
        if (CONTROLLER_DOWN) {
            this.vel.y = speed
        }
        if (CONTROLLER_RIGHT) {
            this.vel.x = speed
        }
        if (CONTROLLER_B) {
            this.color = Color.Blue
        }
        if (CONTROLLER_A) {
            this.color = Color.Red
        }
        if (CONTROLLER_Y) {
            this.color = Color.Magenta
        }
        if (CONTROLLER_X) {
            this.color = Color.Green
        }
    }
}

class Goal extends Actor {
    constructor() {
        super({
            name: 'goal',
            width: UNIT,
            height: UNIT,
            color: Color.Magenta,
            collisionType: CollisionType.Passive,
            x: 40 * UNIT,
            y: 14 * UNIT,
            anchor: vec(0, 0)
        })
    }
}

class Roof extends Actor {
    constructor(x: number, y: number) {
        super({
            name: 'b' + x + y,
            width: UNIT,
            height: UNIT,
            color: Color.fromHex('#333330'),
            collisionType: CollisionType.Fixed,
            x: x,
            y: y,
            anchor: vec(0, 0)
        })
    }
}

class Wall extends Actor {
    constructor(x: number, y: number) {
        super({
            name: 'b' + x + y,
            width: UNIT,
            height: UNIT,
            color: Color.fromHex('#666660'),
            collisionType: CollisionType.Fixed,

            x: x,
            y: y,
            anchor: vec(0, 0)
        })
    }
}
class Ground extends Actor {
    constructor(x: number, y: number) {
        super({
            name: 'b' + x + y,
            width: UNIT,
            height: UNIT,
            color: Color.fromHex('#445566'),
            //collisionType: CollisionType.Fixed,

            x: x,
            y: y,
            anchor: vec(0, 0)
        })
    }
}

const def = [
    'xxxxxxxxxx',
    'xwwwwwwwwx',
    'xwwwwwwwwx',
    'x........x',
    'x........x',
    'xxxxx....x',
    'xxxxx....xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xwwww....wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwx',
    'xwwww....wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwx',
    'x..............................................................x',
    'x..............................................................x',
    'x..............................................................x',
    'x..............................................................x',
    'x..............................................................x',
    'x..............................................................x',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..............................x',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwx..............................x',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
]

const boxSize = UNIT
let rowI = 0
for (const row of def) {
    let blockI = 0
    for (const block of row) {
        if (block === 'x') {
            const b = new Roof(blockI * boxSize, rowI * boxSize)
            game.add(b)
        }
        if (block === 'w') {
            const b = new Wall(blockI * boxSize, rowI * boxSize)
            game.add(b)
        }
        if (block === '.') {
            const b = new Ground(blockI * boxSize, rowI * boxSize)
            game.add(b)
        }
        blockI++
    }
    rowI++
}

const hero = new Player()
game.add(hero)

const goal = new Goal()
game.add(goal)

/**
 * Controls
 */
// game.input.gamepads.on('connect', (ce: ex.Input.GamepadConnectEvent) => {
//     console.log('Gamepad connected', ce)
//     ce.gamepad.on('button', (be: ex.GamepadButtonEvent) => {
//         //debugger
//         // if (be.button === ex.Input.Buttons.Face1) {
//         //     newPlayer.jump()
//         // }
//     })

//     ce.gamepad.on('axis', (ae: ex.GamepadAxisEvent) => {
//         //debugger
//         // if (ae.axis === ex.Input.Axis.LeftStickX && ae.value > 0.5) {
//         //     hero.moveRight()
//         // } else {
//         //     debugger
//         // }
//     })
// })
game.start()
