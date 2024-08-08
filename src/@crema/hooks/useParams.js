
export const UseParams = (name) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let value = params.get(name);
    return value

}
