import axios from 'axios';

export default{
  denglu: (data) => {
    return axios.post('/signup', data)
  }
}