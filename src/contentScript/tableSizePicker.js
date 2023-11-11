import { handleGridSizeSelected } from './index'
import './tableSizePicker.css'

const MAX_COLS = 4
const MAX_ROWS = 4
const GITHUB_GREEN = '#238636'
const GITHUB_DARK = '#161b22'

const handleCellClick = (ev, i, j) => {
  document?.getElementById('grid-select')?.remove()
  handleGridSizeSelected(i, j)
}

function highlightCells(ev, i, j) {
  // traverse and highlight until i, j
  const table = ev.target.parentElement.parentElement.parentElement
  for (let x = 0; x < MAX_ROWS; x++) {
    for (let y = 0; y < MAX_COLS; y++) {
      let cell = table.children[x].children[y]
      cell.style.background = x <= i && y <= j ? GITHUB_GREEN : GITHUB_DARK
    }
  }
}

export const renderTablePicker = ({ x, y }) => {
  const container = document.createElement('div')
  const table = document.createElement('table')

  container.id = 'grid-select'
  table.id = 'grid-table'

  document.body.appendChild(container)
  table.classList.add('layout-select')

  container.style.position = 'absolute'
  container.style.left = x + 'px'
  container.style.top = y + 'px'
  container.append(table)

  for (let i = 0; i < MAX_ROWS; i++) {
    const row = document.createElement('tr')
    table.append(row)
    for (let j = 0; j < MAX_COLS; j++) {
      const cell = document.createElement('td')
      cell.addEventListener('click', (ev) => handleCellClick(ev, i, j), true)
      cell.addEventListener('mouseover', (ev) => highlightCells(ev, i, j), true)
      const cellDiv = document.createElement('div')
      cellDiv.id = 'picker-cell-div'
      cell.append(cellDiv)
      row.append(cell)
    }
  }

  // if click is outside the container, remove the container
  document.addEventListener(
    'click',
    (ev) => {
      if (!container.contains(ev.target)) {
        container.remove()
      }
    },
    true,
  )
}
