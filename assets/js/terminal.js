// Terminal demo: types out a realistic "install, then run" session so visitors can see the
// actual command + output shape without leaving the homepage. Respects prefers-reduced-motion
// by leaving the static fallback markup (already the full final transcript) untouched.
(function () {
    const el = document.getElementById("terminal-output");
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const SCRIPT = [
        { type: "command", text: 'pip install -e ".[ollama]"' },
        { type: "output", text: "Successfully installed localagents-0.1.0" },
        { type: "command", text: "python examples/basic_agent.py" },
        { type: "output", text: "The square root of 1764 is 42." },
    ];

    const TYPE_MS = 32;
    const AFTER_COMMAND_MS = 350;
    const AFTER_OUTPUT_MS = 900;
    const LOOP_PAUSE_MS = 3500;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function appendSpan(className, text) {
        const span = document.createElement("span");
        if (className) span.className = className;
        span.textContent = text;
        el.appendChild(span);
        return span;
    }

    async function typeLine(prefix, text, className) {
        appendSpan("t-prompt", prefix);
        const span = appendSpan(className, "");
        for (const char of text) {
            span.textContent += char;
            await sleep(TYPE_MS);
        }
    }

    async function runScript() {
        el.textContent = "";
        const cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        el.appendChild(cursor);

        for (const line of SCRIPT) {
            cursor.remove();
            if (line.type === "command") {
                await typeLine("$ ", line.text, "t-command");
                el.appendChild(document.createTextNode("\n"));
                await sleep(AFTER_COMMAND_MS);
            } else {
                appendSpan("t-output", line.text + "\n");
                await sleep(AFTER_OUTPUT_MS);
            }
            el.appendChild(cursor);
        }

        await sleep(LOOP_PAUSE_MS);
        runScript();
    }

    runScript();
})();
