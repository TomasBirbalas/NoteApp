import Cookie from 'js-cookie'

const GetCookie = (cookiename) => {
    let cookie = Cookie.get(cookiename);
    if(cookie) {
        return cookie;
    } else {
        return null;
    }
};

export default GetCookie;