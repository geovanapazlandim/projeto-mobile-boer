import axios from 'axios';
const apiProdutosLolla = axios.create({
    baseURL:'https://api.jsonbin.io/v3/b/'
})
export default apiProdutosLolla;