/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name: string, content: any) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = (name: string) => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = (name: string) => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
