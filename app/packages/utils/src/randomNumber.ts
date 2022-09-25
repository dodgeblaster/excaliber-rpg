/**
 * Code
 *
 * This ranbdom number generator comes from this stack overflow answer
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
 * 
 * This enable the caller to pass a seed number, which will reproduce the same random numbers. This is great for
 * testing and for replaying a long sequence of random events
 */

export function makeRandomGenerator(a?: number): () => number {
    let seed = a || Math.floor(Math.random() * 10000000)
    return function () {
        var t = (seed += 0x6d2b79f5)
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        const MAX = 4294967296
        return ((t ^ (t >>> 14)) >>> 0) / MAX
    }
}

export function chooseRandomItem<T>(array: T[], seed?: number): T {
    const random = makeRandomGenerator(seed)
    const randomNumber = random()
    return array[Math.floor(randomNumber * array.length)]
}

/**
 * Tests
 */
if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('makeRandomGenerator will make random numbers', () => {
        const random = makeRandomGenerator()
        expect(random()).not.toBe(random())
    })

    it('makeRandomGenerator will create the same random numbers when given a seed', () => {
        const SEED = 12341234
        const random1 = makeRandomGenerator(SEED)
        const random2 = makeRandomGenerator(SEED)
        expect(random1()).toBe(random2())
        expect(random1()).toBe(random2())
        expect(random1()).toBe(random2())
        expect(random1()).toBe(random2())
    })

    it('chooseRandomItem will return a random index from an array', () => {
        const items = [0, 1, 2, 3, 4, 5, 6, 7]
        const SEED = 12341234
        const result = chooseRandomItem(items, SEED)
        expect(result).toBe(6)
    })
}
