import {
    Engine,
    Actor,
    Color,
    CollisionType,
    Input,
    vec,
    DisplayMode
} from 'excalibur'

const UNIT = 32

/**
 * Hero
 */

export class Hero extends Actor {
    constructor(xUnit: number, yUnit: number) {
        super({
            width: UNIT,
            height: UNIT,
            radius: UNIT / 2,
            color: Color.Chartreuse,
            collisionType: CollisionType.Active,
            x: UNIT * xUnit,
            y: UNIT * yUnit
        })
    }

    onInitialize(_engine: Engine): void {
        _engine.currentScene.camera.strategy.radiusAroundActor(this, 200)

        this.on('collisionstart', (e) => {
            if (e.other.name === 'goal') {
                alert('You have won the game!')
                return
            }
            if (e.other.name === 'door1') {
                _engine.goToScene('level2')
            }
            if (e.other.name === 'door2') {
                _engine.goToScene('level1')
            }
        })
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
