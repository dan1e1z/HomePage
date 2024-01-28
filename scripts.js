/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","#new":""}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"z0XjYo3WR7ekKrku","label":"school","bookmarks":[{"id":"JmKCtmjJ16ZrZpzE","label":"Login","url":"https://sydneystudent.sydney.edu.au/sitsvision/wrd/siw_lgn"},{"id":"cNgbjTfGkLkDRgIn","label":"Timetable","url":"https://timetable.sydney.edu.au/even/student?ss=71e3542be1784c8a8d0af8c143ffc981"},{"id":"MJ3qhTvAwAwO97Oc","label":"Ed","url":"https://edstem.org/au/dashboard"},{"id":"ZJi07uxHh7iA2Rjp","label":"Canvas","url":"https://canvas.sydney.edu.au/"}]},{"id":"JmoAEZOjPFtjVRFN","label":"personal","bookmarks":[{"id":"lXRyQdJr73m5AGW9","label":"Github","url":"https://github.com/dan1e1z"},{"id":"yKlrvp9OMrKttK1I","label":"Drive","url":"https://drive.google.com/drive/u/0/my-drive"},{"id":"KR4bIXljJqzZWCBf","label":"Developer Roadmap","url":"https://roadmap.sh/"}]},{"id":"GCbpJyNSXi7sYszB","label":"media","bookmarks":[{"id":"8n37UrKP2eHF2pWU","label":"Youtube","url":"https://www.youtube.com/"},{"id":"fIbsk3tZmsy7KAYr","label":"Reddit","url":"https://www.reddit.com/"}]},{"id":"fLaM3CUjgUGevNt4","label":"misc","bookmarks":[{"id":"A6lIQGwxpzQggvzA","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"DiJC3XrFKK23Avpf","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"3ULU0eNz37ablIJQ","label":"Leetcode 75","url":"https://www.techinterviewhandbook.org/grind75?weeks=8"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
