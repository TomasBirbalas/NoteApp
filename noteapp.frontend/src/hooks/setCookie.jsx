import Cookie from 'js-cookie'

const SetCookie = (cookiename, value) => {
    Cookie.set(cookiename, value, {
        expires:1,
        sameSite:"strict",
        path:"/"
    });
};

export default SetCookie;