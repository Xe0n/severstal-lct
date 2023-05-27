// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import $api from '@src/http'

export const tryLogin = createAsyncThunk(
    "user/tryLogin",
    async (userdata, { rejectWithValue}) => {
      try {
        const response = await $api.post('api/token/', {email: userdata.userEmail, password: userdata.userPassword})
        return response
      } catch (err) {
        if (!err.response) {
          throw err
        }
        return rejectWithValue(err.response.data)
      }
    }
)
export const me = createAsyncThunk(
  "user/me",
  async () => {
    return $api.get('api/me')
  }
)
export const logout = createAsyncThunk(
  "user/logout",
  async () => {
    return await $api.get('/logout/')
  }
)

export const userSlice = createSlice({
    name: "user",
    initialState:{
      user: {},
      isAuth: false,
      loading: false,
      error: ''
    },
    reducers: {
      userExit: (state) => {
        state.isAuth = false
        localStorage.removeItem('accessToken')
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(tryLogin.pending, (state) => {
          state.error = ''
          state.loading = true
        })
        .addCase(tryLogin.fulfilled, (state, action) => {
          state.isAuth = true
          state.error = ''
          state.loading = false
          console.log('auth ok')
          console.log(state.isAuth)
          localStorage.setItem('accessToken', action?.payload?.data?.access)
          localStorage.setItem('refreshToken', action?.payload?.data?.refresh)
        })
        .addCase(tryLogin.rejected, (state) => {
          state.isAuth = false
          state.error = 'Ошибка авторизации'
          state.loading = false
        })
        .addCase(me.fulfilled, (state, action) => {
          console.log(action.payload)
          state.loading = false
          state.isAuth = true
          state.user = action.payload.data
        })
        .addCase(me.rejected, (state, action) => {
          console.log(action.payload)
          state.loading = false
          state.isAuth = false
          state.error = 'Ошибка авторизации'
        })
        .addCase(logout.fulfilled, (state) => {
          state.isAuth = false
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        })
    }
})
export const { userExit } = userSlice.actions
export default userSlice.reducer