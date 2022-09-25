import makeScene from './_makeScene'
import { Hero } from '../objects/hero'
import { Wall, Ground, Roof, Door } from '../objects/map'
import { Goal } from '../objects/goal'
import { BaseMap } from './BaseMap'

/**
 * Scene 1
 */

const defMap = {
    x: (x, y) => new Roof(x, y),
    w: (x, y) => new Wall(x, y),
    ['.']: (x, y) => new Ground(x, y),
    d: (x, y) =>
        new Door(
            x,
            y,
            'door2',
            {
                scene: 'level1',
                heroPosition: { x: 8, y: 4 }
            },
            'left'
        )
}

//   new Door(x, y, 'door1', {
//       scene: 'level2',
//       heroPosition: { x: 10, y: 4 }
//   })

const def = [
    'xxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxx.............x',
    'xxxxxxxxxx.............x',
    'xxxxxxxxxx.............x',
    'xxxxxxxxxd.............x',
    'xxxxxxxxxx.............x',
    'xxxxxxxxxxxxxxxxxxxxxxxx'
]

export class Level2 extends BaseMap {
    constructor() {
        super({
            def,
            defMap,
            objects: [new Hero(3, 3)]
        })
    }
}
