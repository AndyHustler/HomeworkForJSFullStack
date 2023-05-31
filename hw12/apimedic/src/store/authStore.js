import { makeAutoObservable, runInAction } from 'mobx'
import { authApi } from '../api/authAPI'

export const AuthStore = makeAutoObservable({
  isAuth: !!localStorage.getItem('access_token'),
  state: 'unset',

  async login(data) {
    this.state = 'loading'
    const res = await authApi(data.email, data.password)
    runInAction(() => {
      if (res.error) {
        this.isAuth = false
        this.state = 'error'
      } else {
        localStorage.setItem('access_token', res.data.Token)
        console.log(localStorage.getItem('access_token'))
        this.isAuth = true
        this.state = 'success'
      }
    })
    return res
  },

  logout() {
    localStorage.removeItem('access_token')
    this.isAuth = false
    this.state = 'success'
  },
})
