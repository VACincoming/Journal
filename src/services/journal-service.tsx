import axios from 'axios'

const url = `${process.env.REACT_APP_URL_API}`
export default class JournalService{
  header = {
    "Authorization": ''
  }

  signIn(username:string, password:string){
    const data = {username, password}
    return axios({
      method: 'post',
      url: `${url}login`,
      data: data
    }).then((res:any) => {
      const data = res.data.data;
      localStorage.setItem("Token", data.token)
      this.header.Authorization = data.token
      return data
    }).catch((err:any) => {
        throw new Error(err.response.data.message)
    })
  }
  signUp(data:any){
    return axios({
      method: 'post',
      url: `${url}registration`,
      headers: this.header,
      data: data
    }).catch((err:any) => {
      throw new Error(err.response.data.error)
    })
  }
  getSchedule(weekType:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}schedule?week_type=${weekType}`,
      headers: this.header
    }).then((res:any) => res)
    .catch((err) => {return err})
  }
  getScheduleTime(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}schedule/time`,
      headers: this.header
    }).catch((err) => {return err})
  }
  getUser(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}users/current`,
      headers: this.header
    }).catch((err) => {
      if(err.toString().includes('401')){
        localStorage.removeItem("Token")
      }
    })
  }
  getAllUsers(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}users`,
      headers: this.header
    }).then((users:any) => {return users.data.data})
      .catch((err) => {return err})
  }
  changeRole(id:number, role:string, email:string, username:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    if(role === 'STUDENT') role="MONITOR"
    else if(role === 'MONITOR') role="STUDENT"
    return axios({
      method: 'post',
      url: `${url}users/${id}`,
      headers: this.header,
      data: {email, role, username},
    })
  }
  getRegistry(date:any){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}registry?date=${date}`,
      headers: this.header
    }).then((res:any) => res.data.data)
  }
  setRegistry(data:any){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'post',
      url: `${url}registry`,
      headers: this.header,
      data: data
    }) 
  }
  getSubjects(){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}subjects`,
      headers: this.header
    }).then((res:any) => res.data.data)
  }
}