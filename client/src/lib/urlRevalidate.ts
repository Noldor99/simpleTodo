
const url = process.env.NEXT_BASE_URL || 'http://localhost:3000/api'
const secret = process.env.TOKEN_REVALIDATE || 'simple'

export const urlRevalidate = (router: string) => {
  fetch(
    `${url}/revalidate?path=/${router}&secret=${secret}`
  )
} 