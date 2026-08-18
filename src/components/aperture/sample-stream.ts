/**
 * A fixture: one session's worth of output, for previewing the aperture
 * without waiting on the real copy.
 *
 * It is also the executable spec for what `Aperture`'s `lines` prop wants.
 * Four things this file demonstrates and the real stream must also do:
 *
 *   1. ASCII only. The machine register is never translated, so this array
 *      is identical in all eight locales.
 *   2. Colour by ROLE (`ok`, `err`, `dim`), never by hex. A role resolves
 *      through whichever theme pack is selected, which is the only reason
 *      one stream can be correct under all 32 packs.
 *   3. LONG LINES. This is the one that is easy to get wrong. Most lines
 *      here run 80-110 characters, because the aperture is sized so that
 *      ~100 columns is slightly wider than the band: at that width the
 *      output bleeds off both edges and the device is a window cut into a
 *      field. Feed it 45-character lines and the field collapses into a
 *      ribbon down the middle with dark ground either side, no line crosses
 *      the device's right edge, and the whole trick stops working.
 *   4. Enough lines to overscan. The hero band runs up to 900px at a ~26px
 *      line box, so roughly 40 lines are needed before the output runs off
 *      the top and bottom rather than floating between them.
 *
 * Real terminal output is this shape -- log lines with timestamps, test
 * names, paths, and columns -- so none of this is padding for its own sake.
 */
import type { StreamLine } from '../types';

export const SAMPLE_STREAM: readonly StreamLine[] = [
  [
    { t: '$ ', c: 'accent' },
    { t: 'muqun pair --gateway studio.local --fingerprint SHA256:0f8c41ab9d2e77c5b310e6f9' },
  ],
  [
    { t: 'resolving studio.local via mDNS ... ', c: 'dim' },
    { t: '10.0.4.18:8443  rtt 4ms  tls1.3  x25519' },
  ],
  [
    { t: '  ok  ', c: 'ok' },
    { t: 'gateway verified against the pinned key, no trust-on-first-use prompt shown' },
  ],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'muqun ls --sessions --format wide --sort uptime --header --color=always' }],
  [{ t: 'NAME        PID     UPTIME    CLIENTS   CWD                        COMMAND', c: 'dim' }],
  [{ t: 'build       48213   4h12m     3         ~/src/muqun                bun --watch test' }],
  [{ t: 'logs        48219   4h12m     1         /var/log                   tail -F muqun-gateway.log' }],
  [{ t: 'scratch     51044     26m     0         ~/tmp                      zsh' }],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'muqun attach build   # the same pane the phone in your pocket is watching' }],
  [{ t: 'attached to build (48213); 3 clients, 96x28, scrollback 8000 lines replayed', c: 'dim' }],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'bun test src --coverage=false   # 42 tests over six files, eight workers' }],
  [{ t: 'bun test v1.4.0 (45eda514) darwin arm64, 8 workers, --coverage=false', c: 'dim' }],
  '',
  [{ t: 'src/gateway/pair.test.ts:                                4 tests, 0 failures, 16.53ms' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'refuses a fingerprint that does not match the pinned key      [ 3.10ms]' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'reconnects after the socket drops mid-frame                   [11.44ms]' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'expires the pairing code after 120 seconds exactly            [ 0.92ms]' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'rejects a second client using a code already redeemed         [ 1.07ms]' }],
  [{ t: 'src/terminal/render.test.ts:                             4 tests, 1 skipped, 23.34ms' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'wraps at the column count the gateway reported, not the view  [ 2.31ms]' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'redraws 2000 dirty cells inside a single frame budget        [16.08ms]' }],
  [{ t: ' ok ', c: 'ok' }, { t: 'keeps the cursor on screen when the keyboard opens            [ 4.55ms]' }],
  [{ t: '  ! ', c: 'warn' }, { t: 'skipped: hardware keyboard chords need a physical device' }],
  '',
  [
    { t: ' 41 pass', c: 'ok' },
    { t: '     1 skip', c: 'warn' },
    { t: '     0 fail        63 expect() calls        no snapshots written' },
  ],
  [
    {
      t: 'Ran 42 tests across 6 files in 812.00ms; slowest was render.test.ts at 16.08ms',
      c: 'dim',
    },
  ],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'git status --short && git log --oneline -3' }],
  [{ t: ' M ', c: 'warn' }, { t: 'src/terminal/render.ts                       +48 -12, staged for the next commit' }],
  [{ t: '?? ', c: 'err' }, { t: 'src/terminal/render.bench.ts                 untracked, written twelve minutes ago' }],
  [{ t: 'bfb3d16 ', c: 'dim' }, { t: 'fix(pairing): a gateway you cannot reach did not refuse your code' }],
  [{ t: '5c08657 ', c: 'dim' }, { t: 'fix(shots): unstick the theme capture run, and cut it for the site' }],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'tail -f /var/log/muqun-gateway.log   # what the phone is doing, from here' }],
  [{ t: '12:04:11  ', c: 'dim' }, { t: 'session build resized 80x24 -> 96x28, 214 rows reflowed in 3ms' }],
  [{ t: '12:04:19  ', c: 'dim' }, { t: 'client ios-15.2 attached from 10.0.4.31, resuming at offset 88214' }],
  [{ t: '12:05:02  ', c: 'dim' }, { t: 'keepalive ok, rtt 8ms, 0 frames dropped over the last 60 seconds' }],
  [
    { t: '12:05:44  ', c: 'dim' },
    { t: 'warn ', c: 'warn' },
    { t: 'client ios-15.2 backgrounded by the OS, buffering output to disk' },
  ],
  [{ t: '12:06:10  ', c: 'dim' }, { t: 'client ios-15.2 resumed, 214 buffered rows replayed in 31ms' }],
  [
    { t: '12:06:41  ', c: 'dim' },
    { t: 'session scratch idle for 26m, holding the pty open per --keep-alive=never' },
  ],
  [
    { t: '12:07:02  ', c: 'dim' },
    { t: 'renegotiated the session key after 4h; old key destroyed, 0 frames buffered' },
  ],
  '',
  [{ t: '$ ', c: 'accent' }, { t: '_', c: 'accent' }],
];
