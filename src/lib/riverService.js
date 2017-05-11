const baseUrl = 'http://localhost:8080/rivers'

export const loadRivers = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}
