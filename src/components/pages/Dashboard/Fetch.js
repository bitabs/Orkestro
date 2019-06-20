/**
 * helper func for making the request. Note an optional param.
 * If not defined from a callee, the parse format will be json
 * @param url - string endpoint
 * @param parseFormat - the type of response parsing
 * @returns {Promise<string>}
 */
const asyncData = async (url, parseFormat = 'json') => {
  try {
    // we use fetch() for making the request, and wait for it
    const resp = await fetch(url)
    // convert it to parseFormat and wait for it
    return await resp[parseFormat]()
  } catch (e) {
    return "Request Failed"
  }
}

/**
 * HOC component that is used to make http requests.
 * TODO: Improvement can be made by applying better error handling
 * @param url - the endpoint target
 * @param parseFormat - json() | text()
 * @returns {Promise<*|string>} - es6 async/await
 * @constructor
 */
const Fetch = async (url, parseFormat) => await asyncData(url, parseFormat)

export default Fetch
