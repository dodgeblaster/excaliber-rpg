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

export class Goal extends Actor {
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

    onInitialize(_engine: Engine): void {
        this.on('collisionstart', (e) => {
            if (e.other.name === 'hero') {
                _engine.goToScene('end')
            }
        })
    }
}
