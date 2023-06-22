import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: null,
  token: null,
}
export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
      // store the data in Cookies
      Cookies.set('user', JSON.stringify(state.user))
      Cookies.set('token', state.token)
    },
    //remove the data from Cookies
    removeUser: (state) => {
      state.user = null
      state.token = null
      Cookies.remove('user')
      Cookies.remove('token')
    },
  },
})

export const { getUser, removeUser } = authSlice.actions

export default authSlice.reducer
