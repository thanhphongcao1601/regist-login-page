export interface LoginResponse {
  userInfo: UserInfo
  accessToken: string
}

export interface UserInfo {
  _id: string
  username: string
  email: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  __v: number
}