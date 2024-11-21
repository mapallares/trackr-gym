export const params = {
    get: (param) => {
        const foundParams = new URLSearchParams(location.search);
        return foundParams.get(param);
    },
    set: (param, value) => {
        history.pushState(null, null, `?${param}=${value}`);
    }
};

export default params;