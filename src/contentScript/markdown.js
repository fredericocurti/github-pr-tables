export function generateMarkdownTable(items, i, j) {
  if (!items || !items.length) {
    items = []
  }
  // Check if the provided dimensions are valid
  if (i <= 0 || j <= 0) {
    return 'Invalid dimensions for the table.'
  }
  // Initialize the Markdown table
  let markdownTable = '|'

  // Create header row
  for (let col = 1; col <= j; col++) {
    markdownTable += ` Column${col} |`
  }
  markdownTable += '\n|'

  // Create separator row
  for (let col = 1; col <= j; col++) {
    markdownTable += ' --- |'
  }
  markdownTable += '\n'

  // Fill in the table with file names
  let fileIndex = 0
  for (let row = 1; row <= i; row++) {
    for (let col = 1; col <= j; col++) {
      if (fileIndex < items.length) {
        markdownTable += `| ${items[fileIndex]} `
        fileIndex++
      } else {
        markdownTable += `| `
      }
    }
    markdownTable += '|\n'
  }

  return markdownTable
}
