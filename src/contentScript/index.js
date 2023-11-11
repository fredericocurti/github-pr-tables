import { renderTablePicker } from './tableSizePicker'
import { generateMarkdownTable } from './markdown'

const mountButton = () => {
  let btn = document.querySelector('#gridify-button')
  if (btn) {
    btn.remove()
  }

  const label = document.createElement('span')
  label.innerText = '⋮⋮⋮'
  const toolbar = document.querySelector("div[data-target='action-bar.itemContainer']")
  const buttonMold = toolbar.firstElementChild
  btn = buttonMold.cloneNode(true)
  btn.id = 'gridify-button'
  btn.firstElementChild.firstElementChild.firstElementChild.replaceWith(label)
  btn.firstElementChild.firstElementChild.id = 'gridify-button-inner'
  btn.firstElementChild.lastElementChild.setAttribute('for', 'gridify-button-inner')
  btn.firstElementChild.lastElementChild.innerHTML = 'Gridify attachments'
  toolbar.prepend(btn)
  btn.addEventListener(
    'click',
    (ev) => {
      ev.stopPropagation()
      renderTablePicker({
        x: ev.clientX,
        y: ev.clientY,
      })
    },
    false,
  )
  return btn
}

export const handleGridSizeSelected = (rows, cols) => {
  const textarea = document.querySelector('#pull_request_body')
  const files = textarea.value.match(/!\[.*\]\(https:\/\/github.com\/.*\/.*\/assets\/.*\)/g) ?? []
  const markdownTable = generateMarkdownTable(files, rows + 1, cols + 1)
  const gridMarker = '| --- |'

  if (
    files.length > (rows + 1) * (cols + 1) &&
    !confirm('There are fewer table cells than attachments. Extras will be discarded. Continue?')
  ) {
    return
  }

  if (textarea.value.includes(gridMarker)) {
    alert('There is already a markdown table in the pull request. Please remove it and try again.')
    return
  }

  for (let i = files.length; i >= 0; i--) {
    if (i === 0) {
      textarea.value = textarea.value.replace(files[i], markdownTable)
    } else {
      textarea.value = textarea.value.replace(files[i], '')
    }
  }
}

const config = { attributes: false, childList: true, subtree: false }
const observer = new MutationObserver(() => {
  if (window.location.href.includes('compare')) {
    mountButton()
  }
})

observer.observe(document.body, config)
mountButton()
