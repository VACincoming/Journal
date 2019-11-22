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
      console.log(res.data)
      localStorage.setItem("Token", res.data.data.token)
      this.header.Authorization = res.data.data.token
      return res.data.data
    })
  }
  signUp(data:any){
    return axios({
      method: 'post',
      url: `${url}registration`,
      headers: this.header,
      data: data
    })
  }
  getShedule(weekType:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    console.log(this.header)
    return axios({
      method: 'get',
      url: `${url}shedule?weekType=${weekType}`,
      headers: this.header
    }).then((shedule) => console.log(shedule))
      .catch((err) => console.log)
  }
}