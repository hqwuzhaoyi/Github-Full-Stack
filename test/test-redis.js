async function test() {
    const Redis = require('ioredis');

const redis = new Redis({
    port: 6378,
    password: '123456'
})

// const keys = await redis.keys('*');
await redis.set('c',123)
const keys = await redis.keys('*');
console.log(await redis.get('c'))
}

test()