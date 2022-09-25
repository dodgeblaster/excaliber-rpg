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
            'door1',
            {
                scene: 'level2',
                heroPosition: { x: 10, y: 4 }
            },
            'right'
        )
}

const def = [
    'xxxxxxxxxx',
    'xwwwwwwwwx',
    'xwwwwwwwwx',
    'x........x',
    'x........d',
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
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '                                wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    '                                wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
]

export class Level1 extends BaseMap {
    constructor() {
        super({
            def,
            defMap,
            objects: [new Hero(2, 4), new Goal()]
        })
    }
}
