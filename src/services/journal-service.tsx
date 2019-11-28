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
  getSchedule(weekType:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}schedule?weekType=${weekType}`,
      headers: this.header
    }).catch((err) => console.log(err))
  }
  getScheduleTime(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}schedule/time`,
      headers: this.header
    }).catch((err) => console.log(err))
  }
  getUser(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}users/current`,
      headers: this.header
    }).catch((err) => console.log(err))
  }
  getAllUsers(){
    console.log(this.header)
    return axios({
      method: 'get',
      url: `${url}users`,
      headers: this.header
    }).then((users:any) => {return users.data.data})
      .catch((err) => console.log(err))
  }
}