export default {
    meEndpoint: '/api/users/me',
    // meEndpoint: '/auth/me',
    loginEndpoint: '/api/auth/login',
    // loginEndpoint: '/jwt/login',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken' // logout | refreshToken
}
