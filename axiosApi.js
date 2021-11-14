
// import pkg from 'axios';
// const {create} = pkg;
//import {create} from 'axios';
// const createAxios = create({baseUrl: process.env.URL});
import axios from 'axios';

// export const axios = async (message) => {
//     await createAxios({
//         method: 'post',
//         url: '/',
//         data: {
//             fromName: message.from_name,
//             toName: message.to_name,
//             message: message.message
//         }
//     });
// };

// export const axiosPut = async (message) => {
//     await createAxios({
//         method: '/',
//         url: process.env.URL,
//         data: {
//             key: message.key,
//             fromName: message.from_name,
//             toName: message.to_name,
//             message: message.message
//         }
//     });
// };
let res;

export const addMessage = async (message) => {
    try {
      res = await axios.post(process.env.URL,{
        fromName: message.from_name,
        toName: message.to_name,
        message: message.Message
      })
      console.log(res.data.payload);
      return res.data.payload;//.
    } catch (error) {
      console.error(error)
    }
  }

  export const updateMessage = async (message) => {
    try {
      console.log(message);
       res = await axios.put(process.env.URL,{
        KEY: message.key,
        FROM_NAME: message.from_name,
        TO_NAME: message.to_name,
        MESSAGE: message.Message
      })
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }