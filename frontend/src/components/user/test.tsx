import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const test = () => {

    const handle = async() => {
        try {
            const response = await axios.get(`${apiUrl}/user/test`);
            console.log(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <button onClick={handle}>Click</button>
    </div>
  )
}

export default test
