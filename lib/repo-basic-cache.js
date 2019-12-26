import LRU from 'lru-cache'

const REOI_CACHE = new LRU({
    maxAge: 1000 * 60 * 60
})

export function cache(repo) {
    const full_name = repo.full_name
    REOI_CACHE.set(full_name, repo)
}


// facebook/react
export function get(full_name) {
    return REOI_CACHE.get(full_name)
}

export function cacheArray(repos) {
    if (repos && Array.isArray(repos)) {
        repos.forEach(repo => cache(repo))
    }
}