import axios from '../api/axios';
import { useAuth } from '../components/auth';

const useRefreshToken = () => {
    const {setToken} = useAuth();

    const refresh = async () => {
        const response = await axios.post('/refresh', {
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.8AoDhDEVr9Wu0KS8gf_LAxm_DxU7aqNPtfWfRzI5BLk"
        })
        setToken(prev => {
            console.log(prev);
            console.log(response.data.access_token);
            return response.data.access_token;
        });
        return response.data.access_token;
    }
    return refresh;
}

export default useRefreshToken;