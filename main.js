import Showdown from "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js/+esm"
import "./skills.js"

const showdown = new Showdown.Converter()
// hot-reload script
const source = new EventSource(`/changes`)
source.onmessage = (message) => {
  const { path, exists } = JSON.parse(message.data)

  if (!exists) {
    console.log(`${path} was deleted!`)
  } else {
    console.log(`${path} was modified.`)
  }

  // Use that specific file for hot reloading, or do a full page refresh
  document.location.reload()
}

// naive protection from bots
let movements = []
document.onmousemove = () => {
  movements++
}

function reveal() {
  const one = movements < 100 ? `nonono` : `mika`
  const two = `bytes`
  const three = `.com`
  majl.innerHTML = `${one}@${one}${two}${three}`
  majl.style.cursor = ``
  majl.removeEventListener(`click`, reveal)
}
majl.addEventListener(`click`, reveal)

function append(el, html) {
  el.appendChild(
    Object.assign(document.createElement(`template`), {
      innerHTML: html,
    }).content
  )
}

const [sidebar, profile, experience] = await Promise.all(
  [`./sidebar.md`, `./profile.md`, `./experience.md`].map((url) =>
    fetch(url).then((res) => res.text())
  )
)

const experienceWrapped = showdown
  .makeHtml(experience)
  .replaceAll(`\n`, ``)
  .replace(/(<h3 .*?)(?=<h2 |$)/gi, `<section>$1</section>`)

append(document.querySelector(`#body .left`), showdown.makeHtml(sidebar))
append(document.querySelector(`#body .right`), showdown.makeHtml(profile))
append(document.querySelector(`#body .right`), experienceWrapped)
