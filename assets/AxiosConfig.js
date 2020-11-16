import axios from 'axios';

const AxiosConfig = () => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + localStorage.getItem('token')
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    return instance;
};

export default AxiosConfig();