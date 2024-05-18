export const updateCacheAllBooks = (cache, query, obj) => {
    const uniqByName = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.name
        return seen.has(k) ? false : seen.add(k)
      })
    }
  
    cache.updateQuery(query, (resp) => {
      console.log(resp)
      return {
        allBooks: uniqByName(resp.allBooks.concat(obj)),
      }
    })
}