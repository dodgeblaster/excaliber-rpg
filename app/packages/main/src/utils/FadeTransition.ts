import * as ex from 'excalibur'
import { Transition, TransitionArgs } from 'excalibur-router'

export class FadeTransition extends Transition {
    el: ex.ScreenElement

    constructor(args: TransitionArgs = {}) {
        super({
            duration: 300,
            z: Infinity,
            ...args
        })
    }

    onInitialize(engine: ex.Engine): void {
        this.el = new ex.ScreenElement({
            x: 0,
            y: 0,
            z: this.z,
            width: engine.canvasWidth,
            height: engine.canvasHeight,
            color: ex.Color.Black
        })

        this.el.graphics.opacity = this.isOutro ? 0 : 1
        this.addChild(this.el)
    }

    onIntroStart() {
        this.el.graphics.opacity = 1
    }

    onOutroStart() {
        this.el.graphics.opacity = 0
    }

    onIntro(progress: number) {
        this.el.graphics.opacity = 1 - progress
    }

    onOutro(progress: number) {
        this.el.graphics.opacity = progress
    }
}
