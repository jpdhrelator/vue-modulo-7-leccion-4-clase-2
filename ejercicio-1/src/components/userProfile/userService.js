import axios from 'axios'

export const userService = {
  async getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return {
      name: response.data.name,
      avatarUrl: `https://randomuser.me/api/portraits/women/${id}.jpg`
    }
  }
}
