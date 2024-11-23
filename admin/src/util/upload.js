import axios from 'axios';
export const upload = (path, form) => {
    const formData = new FormData();
    for (let i in form) {
        formData.append(i, form[i])
    }
    return axios.post(path, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}