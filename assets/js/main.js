document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle')
  const links = document.getElementById('nav-links')
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(open))
  })

  // Copy the install command.
  const copy = document.getElementById('copy-btn')
  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('install-cmd').textContent.trim())
      copy.textContent = 'Copied'
      setTimeout(() => (copy.textContent = 'Copy'), 1600)
    } catch {
      // Clipboard needs HTTPS; the text stays selectable.
    }
  })

  // Fade sections in as they arrive (content is visible by default without JavaScript).
  const items = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )
    items.forEach((item, i) => {
      item.style.transitionDelay = `${(i % 4) * 80}ms`
      io.observe(item)
    })
  } else {
    items.forEach((item) => item.classList.add('in'))
  }

  // Anatomy: pick a note to highlight the matching part of the YAML.
  const notes = document.querySelectorAll('.note')
  const parts = document.querySelectorAll('.hl')
  const select = (name) => {
    notes.forEach((n) => n.classList.toggle('on', n.dataset.note === name))
    parts.forEach((p) => {
      const names = (p.dataset.note || '').split(' ')
      const isTriggers = name === 'triggers' && (p.dataset.note === 'triggers' || p.dataset.note === 'examples')
      p.classList.toggle('on', names.includes(name) || isTriggers)
    })
  }
  notes.forEach((n) => n.addEventListener('click', () => select(n.dataset.note)))
  if (notes.length) select('id')
})
