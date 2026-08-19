import test from "node:test";
import assert from "node:assert/strict";
import { COMMANDS } from "@/lib/commands";
import { ALL_ROUTES, isExternalHref, getSocialHref } from "@/lib/navigation";
import { getProjects, getProjectBySlug } from "@/lib/projects";

test("command ids are unique", () => {
  const ids = COMMANDS.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every internal palette target is a route the site actually owns", () => {
  const projectRoutes = getProjects().map((p) => `/projects/${p.slug}`);
  const known = new Set([...ALL_ROUTES, ...projectRoutes]);

  for (const command of COMMANDS) {
    if (command.action.type !== "navigate") continue;
    if (isExternalHref(command.action.href)) continue;
    assert.ok(
      known.has(command.action.href),
      `palette points at ${command.action.href}, which is not a real route`
    );
  }
});

test("isExternalHref recognises every non-route scheme", () => {
  assert.equal(isExternalHref("/projects"), false);
  assert.equal(isExternalHref("https://github.com/example"), true);
  assert.equal(isExternalHref("mailto:hello@example.com"), true);
  assert.equal(isExternalHref("tel:+33000000000"), true);
});

test("getSocialHref resolves known labels and reports unknown ones", () => {
  assert.ok(getSocialHref("GitHub")?.startsWith("http"));
  assert.equal(getSocialHref("Mastodon"), undefined);
});

test("project slugs are unique and resolvable", () => {
  const slugs = getProjects().map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.equal(getProjectBySlug(slug)?.slug, slug);
  }
});

test("getProjects returns a fresh array sorted by order", () => {
  const first = getProjects();
  assert.notEqual(first, getProjects());
  const orders = first.map((p) => p.order);
  assert.deepEqual(orders, [...orders].sort((a, b) => a - b));
});
