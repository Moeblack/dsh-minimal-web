# dsh-minimal-web

Agent preset for DeepSeek Harness: **极简模式（网络）** — the minimal
two-tool coding agent, plus:

- `web_search` network search (the minimal preset ships without it)
- `AGENTS.md` / `CLAUDE.md` workspace instruction loading (user-message
  injection, works despite the complete persona)

The preset appears in the mode picker as **极简模式（网络）** immediately
after installation; select it per session, or set it as the default:

```yaml
# $DSH_HOME/settings.yaml
agent-presets:
  default: minimal-web
```

## Install

```sh
dsh plugin --profile web add dsh-minimal-web
```

No restart is needed for the preset roster. Uninstall removes the preset:

```sh
dsh plugin --profile web rm dsh-minimal-web
```

## Composition

| Row | Purpose |
| --- | --- |
| `persona` | Fixed complete prompt (`includeRuntimeContext: false`) |
| `agent-instructions` | Loads workspace + `$DSH_HOME/AGENTS.md` |
| persistent shell | `bash` via PTY registry |
| `fs` + `str_replace_editor` | Bare local filesystem |
| `tool-web` | `web_search`, fetch disabled |

## How it ships

Published into `$DSH_HOME/.agent-presets/` by
[dsh-preset-kit](https://www.npmjs.com/package/dsh-preset-kit) at boot
(symlink, hot-reloadable), with an ownership record that keeps uninstall
clean and refuses to overwrite a preset you authored by hand.
