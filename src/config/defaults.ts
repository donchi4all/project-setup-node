import Secret from './../modules/secret'
export default {
    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    |
    | Set default pagination
    |
    */
    pageLimit: 10,

    /*
    |--------------------------------------------------------------------------
    | Password Reset
    |--------------------------------------------------------------------------
    |
    | Password reset token length
    |
    */
    tokenLength: 32,

    /*
    |--------------------------------------------------------------------------
    | User Otp Length
    |--------------------------------------------------------------------------
    |
    | Length of generated otps
    |
    */
    otpLength: 6,


    /*
    |--------------------------------------------------------------------------
    | Default Otp expiration
    |--------------------------------------------------------------------------
    |
    | Otp expiration in seconds
    |
    */
    otpExpiration: 10,

    /*
    |--------------------------------------------------------------------------
    | Default Client Role
    |--------------------------------------------------------------------------
    |
    | Otp expiration in seconds
    |
    */
    defaultClientRole: '',

    /*
    |--------------------------------------------------------------------------
    | Default Preference
    |--------------------------------------------------------------------------
    |
    | list the default site preferences
    |
    */
    defaultSitePreferences: {

    },


    /** 
        |------------------------------
        | EXCLUDE API AUDID LOGS
        |------------------------------
       */
    excludeAPILog: [
    ],

    /** 
        |------------------------------
        | Login expiration time
        |------------------------------
       */
    expiresIn: '30m',

    // accessToken: {
    //     secret: Secret.Salts.accessToken,
    //     options: {
    //         expiresIn: 60 * 60, // 1 hour in sec
    //     },
    // },
    // refreshToken: {
    //     name: 'refreshToken',
    //     secret: Secret.Salts.refreshToken,
    //     options: {
    //         expiresIn: 60 * 60 * 24, // 1 day in sec
    //     },
    // },
};