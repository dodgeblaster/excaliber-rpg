import {
    Engine,
    Actor,
    Color,
    CollisionType,
    Input,
    vec,
    DisplayMode
} from 'excalibur'
import { FadeTransition } from '../utils/FadeTransition'
import { router } from '../router'

const UNIT = 32

/**
 * Hero
 */

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

export class Roof extends Actor {
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

export class Wall extends Actor {
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
export class Ground extends Actor {
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

type GoTo = {
    scene: string
    heroPosition: { x: number; y: number }
}
export class Door extends Actor {
    _scene: string = 'level1'
    heroPosition: { x: number; y: number } = { x: 0, y: 0 }

    goTo: GoTo = {
        scene: 'level1',
        heroPosition: { x: 0, y: 0 }
    }
    direction: string = 'right'
    doorOpen = true
    constructor(
        x: number,
        y: number,
        name: string,
        goto: GoTo,
        direction: string = 'right'
    ) {
        super({
            name,
            width: UNIT,
            height: UNIT,
            color: Color.Blue,
            collisionType: CollisionType.Passive,
            x: x,
            y: y,
            anchor: vec(0, 0)
        })

        this.goTo = goto
        this.direction = direction
    }
    onInitialize(_engine: Engine): void {
        _engine.currentScene.camera.strategy.radiusAroundActor(this, 200)

        this.on('precollision', (e) => {
            if (e.other.name === 'hero') {
                const rightIntersection = e.intersection._x
                const leftIntersection = e.intersection._x
                const upIntersection = UNIT - e.intersection._y
                const downIntersection = e.intersection._y

                if (this.direction === 'right') {
                    const isHeroThruDoor = rightIntersection > UNIT * 0.75

                    if (isHeroThruDoor && !this.scene.isTransitioning) {
                        console.log('RIGHT DOOR')
                        // _engine.goToScene(this.goTo.scene, {
                        //     hero: this.goTo.heroPosition
                        // })

                        router.goto(this.goTo.scene, {
                            data: { hero: this.goTo.heroPosition },
                            transition: new FadeTransition()
                        })
                        this.doorOpen = false
                        setTimeout(() => {
                            this.doorOpen = true
                        }, 500)
                    }
                }

                if (this.direction === 'left') {
                    const isHeroThruDoor = leftIntersection > UNIT * 0.75
                    if (isHeroThruDoor && !this.scene.isTransitioning) {
                        // console.log('LEFT DOOR')
                        // _engine.goToScene(this.goTo.scene, {
                        //     hero: this.goTo.heroPosition
                        // })

                        router.goto(this.goTo.scene, {
                            data: { hero: this.goTo.heroPosition },
                            transition: new FadeTransition()
                        })
                        // this.doorOpen = false
                        // setTimeout(() => {
                        //     this.doorOpen = true
                        // }, 500)
                    }
                }
            }
        })

        // this.on('collisionstart', (e) => {
        //     if (e.other.name === 'hero') {
        //         if (this.doorOpen) {
        //             debugger
        //             // _engine.goToScene(this.goTo.scene, {
        //             //     hero: this.goTo.heroPosition
        //             // })
        //             // this.doorOpen = false
        //         }
        //     }
        // })
    }

    /* 
    
    if (e.other.name === 'door1') {
        _engine.goToScene('level2', { hero: { x: 10, y: 4 } })
    }
    if (e.other.name === 'door2') {
        _engine.goToScene('level1', { hero: { x: 8, y: 4 } })
    }
    */

    // public onInitialize(engine: Engine) {
    //     // load scene-specific assets

    //     this.on('collisionstart', (e) => {
    //         debugger
    //         //engine.goToScene('level2')
    //         //   if (e.other.name === 'goal') {
    //         //       alert('You have won the game!')
    //         //   }
    //     })
    // }
}
