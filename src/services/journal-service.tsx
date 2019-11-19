import axios from 'axios'
const url = `${process.env.REACT_APP_URL_API}`

export default class JournalService{
  header = {
    "Authorization": ''
  }

  signIn(username:string,password:string){
    const data = {
      "username": `${username}`,
      "password": `${password}`
    }
    return axios({
      method: 'post',
      url: `${url}login`,
      data: data
    }).then((res) => {
      this.header.Authorization = res.data.token
      return res.data
    })
  }

}