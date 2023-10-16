import axios from "axios";

export default axios.create({
    baseURL: "https://jasenka85-001-site1.etempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});
