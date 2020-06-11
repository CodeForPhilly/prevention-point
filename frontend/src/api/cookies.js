/**
 * Naive get cookie value implementation
 */
const cookieValue = key => {
  try {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(key))
      .split("=")[1]
  } catch {
    return ""
  }
}

export const setAuthCookie = (key, value) => {
  document.cookie = `${key}=${value}; SameSite=Strict`
}

export default cookieValue
