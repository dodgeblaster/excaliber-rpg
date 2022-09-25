import {
    Scene,
    Engine,
    Actor,
    Color,
    CollisionType,
    Input,
    vec,
    DisplayMode
} from 'excalibur'
import { Router } from 'excalibur-router'
import { Level1 } from './scenes/level1'
import { Level2 } from './scenes/level2'
import { StartScreen } from './scenes/_startScreen'
import { EndScreen } from './scenes/_endScreen'
import { router } from './router'

const game = new Engine({
    width: 1600,
    height: 900,
    backgroundColor: Color.Black,
    displayMode: DisplayMode.FitScreen
})

/**
 * Scene 1
 */

// game.add('level1', level1)
// game.add('level2', level2)
// game.add('start', new StartScreen())
// game.add('end', new EndScreen())

// const excaliburRouter = new Router({
//     routes: {
//         start: StartScreen,
//         end: EndScreen,
//         level1: Level1,
//         level2: Level2
//     }
// })

// export const router = excaliburRouter

router.start(game).then(() => {
    router.goto('start')
})
