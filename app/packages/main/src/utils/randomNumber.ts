// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
function mulberry32(a) {
    if (!a) {
        a = Math.floor(Math.random() * 10000000)
    }

    return function () {
        var t = (a += 0x6d2b79f5)
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        const MAX = 4294967296
        return ((t ^ (t >>> 14)) >>> 0) / MAX
    }
}

const gen = mulberry32(2341234)
for (let index = 0; index < 10; index++) {
    const x = gen()
    console.log(x)
}
