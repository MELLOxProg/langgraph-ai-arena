import hljs from 'highlight.js'

/**
 * Lightweight markdown renderer with highlight.js syntax highlighting.
 * Uses the `md-content` @layer component classes defined in index.css.
 *
 * Handles: ## headings, **bold**, `inline code`, ```code blocks```, | tables |, - lists
 */
export default function MarkdownContent({ content }) {
  if (!content) return null
  const blocks = parseMarkdown(content)
  return (
    <div className="md-content">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h1': return <h1 key={i} className="md-h1">{inlineRender(block.text)}</h1>
    case 'h2': return <h2 key={i} className="md-h2">{inlineRender(block.text)}</h2>
    case 'h3': return <h3 key={i} className="md-h3">{inlineRender(block.text)}</h3>
    case 'hr': return <hr key={i} className="md-hr" />

    case 'code': {
      const lang = block.lang?.toLowerCase().trim()
      let highlightedHtml

      try {
        if (lang && hljs.getLanguage(lang)) {
          highlightedHtml = hljs.highlight(block.text, { language: lang }).value
        } else {
          // Auto-detect language when none specified or unknown
          highlightedHtml = hljs.highlightAuto(block.text).value
        }
      } catch {
        // Escape raw text as fallback
        highlightedHtml = block.text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }

      return (
        <div key={i} className="md-code-block">
          {block.lang && (
            <div className="md-code-lang">{block.lang}</div>
          )}
          <pre className="md-pre hljs">
            <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          </pre>
        </div>
      )
    }

    case 'table': return (
      <div key={i} className="md-table-wrapper">
        <table className="md-table">
          {block.header && (
            <thead>
              <tr>
                {block.header.map((cell, j) => (
                  <th key={j} className="md-th">{inlineRender(cell)}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {block.rows.map((row, j) => (
              <tr key={j} className="md-tr">
                {row.map((cell, k) => (
                  <td key={k} className="md-td">{inlineRender(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

    case 'ul': return (
      <ul key={i} className="md-ul">
        {block.items.map((item, j) => (
          <li key={j} className="md-li">{inlineRender(item)}</li>
        ))}
      </ul>
    )

    case 'p': return <p key={i} className="md-p">{inlineRender(block.text)}</p>

    default: return null
  }
}

/** Render inline markdown: **bold**, `code`, plain text */
function inlineRender(text) {
  if (!text) return null
  const parts = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const codeMatch = remaining.match(/`([^`]+)`/)
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    const codeIdx = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity

    if (boldMatch && boldIdx <= codeIdx) {
      if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>)
      parts.push(<strong key={key++} className="md-bold">{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldIdx + boldMatch[0].length)
    } else if (codeMatch && codeIdx < Infinity) {
      if (codeIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, codeIdx)}</span>)
      parts.push(<code key={key++} className="md-inline-code">{codeMatch[1]}</code>)
      remaining = remaining.slice(codeIdx + codeMatch[0].length)
    } else {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }
  }
  return parts
}

/** Parse raw markdown string into block objects */
function parseMarkdown(md) {
  const lines = md.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      i++
      const codeLines = []
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      blocks.push({ type: 'code', lang, text: codeLines.join('\n') })
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { blocks.push({ type: 'hr' }); i++; continue }

    // Headings
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4) }); i++; continue }
    if (line.startsWith('## '))  { blocks.push({ type: 'h2', text: line.slice(3) }); i++; continue }
    if (line.startsWith('# '))   { blocks.push({ type: 'h1', text: line.slice(2) }); i++; continue }

    // Table
    if (line.startsWith('|')) {
      const rows = []
      let header = null
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').slice(1, -1).map((c) => c.trim())
        if (lines[i].includes('---')) { /* separator row */ }
        else if (!header) { header = cells }
        else { rows.push(cells) }
        i++
      }
      blocks.push({ type: 'table', header, rows })
      continue
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*] /, ''))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    // Blank line
    if (line.trim() === '') { i++; continue }

    // Paragraph
    const paragraphLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('|') &&
      !/^[-*] /.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i])
      i++
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'p', text: paragraphLines.join(' ') })
    }
  }

  return blocks
}
