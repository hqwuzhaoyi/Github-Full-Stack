const axios = require('axios')

const isServer = typeof window === 'undefined'

const github_base_url = 'http://api.github.com'

async function requestGitHub(method, url, data, headers) {
    return await axios({
        method,
        url: `${github_base_url}${url}`,
        data,
        headers
    })
}

async function request({ method = 'GET', url, data = {} }, req, res) {
    if (!url) {
        throw Error('url must provide')
    }
    if (isServer) {
        const headers = {}
        if (req) {
            const session = req.session || {}
            const githubAuth = session.githubAuth || {}
            if (githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
            }
        }
        const result = await requestGitHub(method, url, data, headers)
        return result;
    } else {
        const result = await axios({
            method,
            url: `/github${url}`,
            data
        })
        console.log(
            result
        )
        return result;
    }
}

module.exports = {
    request,
    requestGitHub
}