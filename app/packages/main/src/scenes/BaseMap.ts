import * as ex from 'excalibur'

const UNIT = 32
export class BaseMap extends ex.Scene {
    defMap: any
    def: any
    objects: any
    constructor(props: { defMap: any; def: any; objects: any }) {
        super()
        this.defMap = props.defMap
        this.def = props.def
        this.objects = props.objects
    }
    onInitialize(_engine: ex.Engine): void {
        const boxSize = UNIT
        let rowI = 0
        for (const row of this.def) {
            let blockI = 0
            for (const block of row) {
                // @ts-ignore
                if (this.defMap[block]) {
                    // @ts-ignore
                    const Resource = this.defMap[block]
                    const b = Resource(blockI * boxSize, rowI * boxSize)
                    this.add(b)
                }

                blockI++
            }
            rowI++
        }
        for (const o of this.objects) {
            this.add(o)
        }
    }
    onActivate(_context: ex.SceneActivationContext<unknown>): void {
        const data = _context.data
        debugger
        if (data && data.hero) {
            const hero = this.actors.find((x) => x.name === 'hero')

            hero.setPosition(data.hero.x, data.hero.y)
        }
    }
    onDeactivate(_context: ex.SceneActivationContext<undefined>): void {}
}
