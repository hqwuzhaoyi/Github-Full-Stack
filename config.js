const GITHUB_OAUTH_RUL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = 'df7d31c7d918888f412c'

    module.exports = {
        github: {
            request_token_url: 'https://github.com/login/oauth/access_token',
            client_id,
            client_secret: '7120cc7c2c4a49e4761f61b63feeddad62f80e54'
        },
        GITHUB_OAUTH_RUL,
        OAUTH_URL: `${GITHUB_OAUTH_RUL}?client_id=${client_id}&scope=${SCOPE}`
    }

// access_token=9ac3ef6296eba73fecee716ad43c01453d7f5a6b&scope=repo%2Cuser&token_type=bearer