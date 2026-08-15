import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { publishPresetSync } from 'dsh-preset-kit'

/** Stable Cordis plugin name. */
export const name = 'dsh-minimal-web'

/**
 * Publish the bundled `minimal-web` preset into the harness-home user root
 * on every boot (copy mode — dsh's preset scanner does not follow
 * symlinks). `dsh-agent-presets` re-reads its roots on every list, so the
 * preset shows up in the UI immediately; upgrading this plugin and
 * restarting dsh refreshes the preset. Uninstalling removes exactly this
 * publication.
 */
export function apply(ctx) {
  const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'presets', 'minimal-web')
  const undo = publishPresetSync({
    id: 'minimal-web',
    dir,
    owner: name,
  })
  // cordis: ctx.effect runs the callback immediately and keeps its return
  // value as the disposer — so hand back `undo` instead of calling it.
  ctx.effect(() => undo, 'preset-publish')
}
