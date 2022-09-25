import * as ex from 'excalibur'

const UNIT = 32

function makeScene(def, defMap, objects) {
    //const level1 = new ex.Scene()

    class NewScene extends ex.Scene {
        onInitialize(_engine: ex.Engine): void {
            const game = _engine
            const boxSize = UNIT
            let rowI = 0
            for (const row of def) {
                let blockI = 0
                for (const block of row) {
                    // @ts-ignore
                    if (defMap[block]) {
                        // @ts-ignore
                        const Resource = defMap[block]
                        const b = Resource(blockI * boxSize, rowI * boxSize)
                        this.add(b)
                    }

                    blockI++
                }
                rowI++
            }
            for (const o of objects) {
                this.add(o)
            }
        }
        onActivate(_context: ex.SceneActivationContext<unknown>): void {
            const data = _context.data
            if (data && data.hero) {
                const hero = this.actors.find((x) => x.name === 'hero')

                hero.setPosition(data.hero.x, data.hero.y)
            }
            // const game = _context.engine
            // const boxSize = UNIT
            // let rowI = 0
            // for (const row of def) {
            //     let blockI = 0
            //     for (const block of row) {
            //         // @ts-ignore
            //         if (defMap[block]) {
            //             // @ts-ignore
            //             const Resource = defMap[block]
            //             const b = Resource(blockI * boxSize, rowI * boxSize)
            //             this.add(b)
            //         }
            //         blockI++
            //     }
            //     rowI++
            // }
            // for (const o of objects) {
            //     this.add(o)
            // }
        }
        onDeactivate(_context: ex.SceneActivationContext<undefined>): void {}
    }
    // const boxSize = UNIT
    // let rowI = 0
    // for (const row of def) {
    //     let blockI = 0
    //     for (const block of row) {
    //         // @ts-ignore
    //         if (defMap[block]) {
    //             // @ts-ignore
    //             const Resource = defMap[block]
    //             const b = Resource(blockI * boxSize, rowI * boxSize)
    //             level1.add(b)
    //         }

    //         blockI++
    //     }
    //     rowI++
    // }
    // for (const o of objects) {
    //     level1.add(o)
    // }
    // return level1

    return new NewScene()
}

export default makeScene
