(() => {
  const term = document.getElementById('term')
  const lm = document.getElementById('lm')
  if (!term || !lm) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const SCRIPT = [
    { cmd: 'localagents advisor init job_loss.yaml --publisher "Acme Co"', out: [['', 'Created job_loss.yaml. Edit it, then run: localagents advisor validate job_loss.yaml']] },
    { cmd: 'localagents advisor validate job_loss.yaml', out: [['ok', 'OK: Job Loss v0.1.0 (stress_test) with 2 scenario(s)']] },
    {
      cmd: 'localagents advisor publish job_loss.yaml --to loonie',
      out: [
        ['', 'Published to ...\\com.loonie.app\\backend\\data\\advisors\\acme_co.job_loss.yaml'],
        ['ok', 'Loonie picks it up on its next request.'],
      ],
    },
  ]

  const QUESTION = 'What if I lose my job for 3 months?'
  let token = 0
  let visible = false

  const el = (tag, className, text) => {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text) node.textContent = text
    return node
  }

  function renderTermStatic() {
    term.replaceChildren()
    for (const item of SCRIPT) {
      const line = el('div')
      line.append(el('span', 'prompt', '$ '), el('span', 'cmd', item.cmd))
      term.append(line)
      for (const [kind, text] of item.out) term.append(el('span', `out ${kind}`, text))
    }
  }

  function renderLoonieStatic() {
    lm.replaceChildren()
    lm.append(el('div', 'lm-user', QUESTION))
    const steps = el('ul', 'lm-steps')
    for (const text of ['Bringing in the right advisor: Job Loss', 'Working through 2 scenarios on your numbers']) {
      const li = el('li', 'lm-step done')
      li.append(el('span', 'dot'), el('span', '', text))
      steps.append(li)
    }
    lm.append(steps, resultCard())
  }

  function resultCard() {
    const card = el('div', 'lm-card')
    card.append(el('small', '', 'Loonie'))
    card.append(el('div', '', 'Your cash covers about 7 months of essentials, so a 3-month gap is manageable. Your weakest spot is having most of your money in investments you would rather not sell.'))
    card.append(el('div', 'lm-note', 'Illustrative answer'))
    return card
  }

  async function typeInto(node, text, alive, delay = 24) {
    for (const ch of text) {
      if (!alive()) return false
      node.textContent += ch
      await wait(delay)
    }
    return true
  }

  async function playTerminal(alive) {
    term.replaceChildren()
    for (const item of SCRIPT) {
      const line = el('div')
      const cmd = el('span', 'cmd')
      const cursor = el('span', 'cursor')
      line.append(el('span', 'prompt', '$ '), cmd, cursor)
      term.append(line)
      if (!(await typeInto(cmd, item.cmd, alive))) return false
      cursor.remove()
      await wait(350)
      for (const [kind, text] of item.out) {
        if (!alive()) return false
        term.append(el('span', `out ${kind}`, text))
        await wait(300)
      }
      await wait(500)
    }
    return true
  }

  async function playLoonie(alive) {
    lm.replaceChildren()
    const user = el('div', 'lm-user')
    lm.append(user)
    if (!(await typeInto(user, QUESTION, alive, 26))) return false
    await wait(500)

    const steps = el('ul', 'lm-steps')
    lm.append(steps)
    const step = (text) => {
      const li = el('li', 'lm-step')
      li.append(el('span', 'dot'), el('span', '', text))
      steps.append(li)
      return li
    }

    const first = step('Bringing in the right advisor: Job Loss')
    await wait(900)
    if (!alive()) return false
    first.classList.add('done')

    const consent = el('div', 'lm-card')
    consent.append(el('small', '', 'What it will look at'))
    const list = el('ul')
    for (const label of ['Net worth', 'Cash flow history']) list.append(el('li', '', label))
    consent.append(list, el('div', 'lm-note', 'Everything is worked out on your computer.'))
    lm.append(consent, el('span', 'lm-btn', 'Allow and run'))
    await wait(1600)
    if (!alive()) return false

    const second = step('Working through 2 scenarios on your numbers')
    await wait(1400)
    if (!alive()) return false
    second.classList.add('done')
    lm.append(resultCard())
    return true
  }

  async function loop() {
    const mine = ++token
    const alive = () => mine === token && visible
    lm.replaceChildren(el('p', 'lm-idle', 'Publish an advisor and watch it appear here…'))
    if (!(await playTerminal(alive))) return
    if (!(await playLoonie(alive))) return
    await wait(6500)
    if (alive()) loop()
  }

  renderTermStatic()
  renderLoonieStatic()
  if (reduce || !('IntersectionObserver' in window)) return

  new IntersectionObserver(
    (entries) => {
      const now = entries.some((entry) => entry.isIntersecting)
      if (now === visible) return
      visible = now
      if (visible) loop()
      else token++
    },
    { threshold: 0.3 },
  ).observe(document.getElementById('demo'))
})()
