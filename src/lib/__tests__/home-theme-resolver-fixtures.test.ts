import { readFileSync } from "node:fs";

import { expect, test } from "bun:test";

import {
  resolveHomeArtwork,
  resolveHomeIdentity,
  resolveThemeImage,
  type ThemeManifest,
} from "../theme-package";

type Fixture = {
  format: string;
  fixtureVersion: number;
  themeSchemaVersion: number;
  sources: {
    app: Array<{ path: string; sha256: string }>;
  };
  cases: Array<{
    id: string;
    manifest: unknown | null;
    queries: Array<{
      id: string;
      mode: "light" | "dark";
      width: "compact" | "regular";
      preference?: "theme" | "shown" | "hidden";
      decorationsEnabled?: boolean;
      directFallbackSlot?: string;
    }>;
    expectedIdentity: ReturnType<typeof resolveHomeIdentity>;
    expected: Array<{
      id: string;
      artwork: ReturnType<typeof resolveHomeArtwork>;
      directImage: ReturnType<typeof resolveThemeImage>;
    }>;
  }>;
};

const fixture = JSON.parse(
  readFileSync(
    new URL("../../../fixtures/home-theme-resolvers.json", import.meta.url),
    "utf8",
  ),
) as Fixture;

test("the browser Home resolvers match the generated App fixture", () => {
  expect(fixture.format).toBe("muqun-home-theme-resolvers");
  expect(fixture.fixtureVersion).toBe(1);
  expect(fixture.themeSchemaVersion).toBe(1);
  expect(fixture.sources.app.map((source) => source.path)).toEqual([
    "src/theme/resolve.ts",
    "src/theme/home-artwork.ts",
    "src/theme/schema.ts",
  ]);
  for (const item of fixture.cases) {
    const manifest =
      item.manifest === null ? undefined : (item.manifest as ThemeManifest);
    expect(resolveHomeIdentity(manifest)).toEqual(item.expectedIdentity);

    for (const expected of item.expected) {
      const input = item.queries.find((query) => query.id === expected.id);
      expect(input).toBeDefined();
      if (!input) continue;

      const decorationsEnabled = input.decorationsEnabled ?? true;
      expect(
        resolveHomeArtwork({
          manifest,
          mode: input.mode,
          width: input.width,
          preference: input.preference,
          decorationsEnabled,
        }),
      ).toEqual(expected.artwork);

      const directImage = manifest
        ? resolveThemeImage(
            manifest,
            "home.artwork",
            input.mode,
            input.width,
            decorationsEnabled,
            input.directFallbackSlot,
          )
        : null;
      expect(directImage).toEqual(expected.directImage);
    }
  }
});
