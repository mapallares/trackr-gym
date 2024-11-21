export const routes = {
    get: () => {
        return window.location.href;
    },
    set: (route) => {
        window.location.href = route;
    },
    path: () => {
        return window.location.pathname;
    },
    draw: (path) => {
        history.pushState(null, null, path);
    }
};

export default routes;