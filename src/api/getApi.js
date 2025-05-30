import {baseUrl} from "../Helper/baseUrlHelper";

export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`GET ${endpoint} failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        throw err;
    }
};
