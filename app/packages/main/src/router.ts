import { Router } from 'excalibur-router'
import { Level1 } from './scenes/level1'
import { Level2 } from './scenes/level2'
import { StartScreen } from './scenes/_startScreen'
import { EndScreen } from './scenes/_endScreen'

/**
 * Scene 1
 */

// game.add('level1', level1)
// game.add('level2', level2)
// game.add('start', new StartScreen())
// game.add('end', new EndScreen())

const excaliburRouter = new Router({
    routes: {
        start: StartScreen,
        end: EndScreen,
        level1: Level1,
        level2: Level2
    }
})

export const router = excaliburRouter
