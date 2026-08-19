import test from "node:test";
import assert from "node:assert/strict";
import {
  TERMINAL_COMMANDS,
  TERMINAL_COMMAND_NAMES,
  commonPrefix,
  resolveCommand,
  type TerminalContext,
} from "@/components/terminal/TerminalCommands";
import { ALL_ROUTES } from "@/lib/navigation";
import { getProjects } from "@/lib/projects";

/** A context that records what a command tried to do instead of doing it. */
function stubContext(args: string[] = []) {
  const calls = {
    navigate: [] as string[],
    openExternal: [] as string[],
    openPalette: 0,
    closeTerminal: 0,
    clear: 0,
  };
  const context: TerminalContext = {
    args,
    pathname: "/",
    history: ["help", "whoami"],
    navigate: (href) => calls.navigate.push(href),
    openExternal: (href) => calls.openExternal.push(href),
    openPalette: () => calls.openPalette++,
    closeTerminal: () => calls.closeTerminal++,
    clear: () => calls.clear++,
  };
  return { context, calls };
}

test("command names and aliases never collide", () => {
  assert.equal(
    new Set(TERMINAL_COMMAND_NAMES).size,
    TERMINAL_COMMAND_NAMES.length
  );
});

test("help lists every visible command and hides the hidden ones", () => {
  const { context } = stubContext();
  const output = resolveCommand("help")!.run(context)!.output as string[];
  const text = output.join("\n");

  for (const command of TERMINAL_COMMANDS) {
    if (command.hidden) {
      assert.ok(
        !new RegExp(`^\\s+${command.cmd}\\s`, "m").test(text),
        `${command.cmd} is hidden but appears in help`
      );
    } else {
      assert.ok(text.includes(command.cmd), `${command.cmd} missing from help`);
    }
  }
});

test("every name listed by help resolves to a runnable command", () => {
  for (const name of TERMINAL_COMMAND_NAMES) {
    assert.ok(resolveCommand(name), `${name} does not resolve`);
  }
});

test("resolveCommand is case-insensitive and handles aliases", () => {
  assert.equal(resolveCommand("HELP")?.cmd, "help");
  assert.equal(resolveCommand("q")?.cmd, "exit");
  assert.equal(resolveCommand("close")?.cmd, "exit");
  assert.equal(resolveCommand("nope"), undefined);
});

test("navigation commands only target routes that exist", () => {
  const projectRoutes = getProjects().map((p) => `/projects/${p.slug}`);
  const known = new Set([...ALL_ROUTES, ...projectRoutes]);

  for (const command of TERMINAL_COMMANDS) {
    const { context, calls } = stubContext();
    command.run(context);
    for (const href of calls.navigate) {
      assert.ok(known.has(href), `${command.cmd} navigates to unknown ${href}`);
    }
  }
});

test("open validates the slug before navigating", () => {
  const bad = stubContext(["not-a-project"]);
  const result = resolveCommand("open")!.run(bad.context);
  assert.equal(result?.kind, "error");
  assert.equal(bad.calls.navigate.length, 0);

  const slug = getProjects()[0].slug;
  const good = stubContext([slug]);
  resolveCommand("open")!.run(good.context);
  assert.deepEqual(good.calls.navigate, [`/projects/${slug}`]);
});

test("open with no argument explains itself instead of failing silently", () => {
  const { context, calls } = stubContext([]);
  const result = resolveCommand("open")!.run(context);
  assert.equal(result?.kind, "error");
  assert.ok((result!.output as string[])[0].startsWith("Usage:"));
  assert.equal(calls.navigate.length, 0);
});

test("side-effect commands reach the host instead of printing", () => {
  const exit = stubContext();
  resolveCommand("exit")!.run(exit.context);
  assert.equal(exit.calls.closeTerminal, 1);

  const clear = stubContext();
  resolveCommand("clear")!.run(clear.context);
  assert.equal(clear.calls.clear, 1);

  const palette = stubContext();
  resolveCommand("palette")!.run(palette.context);
  assert.equal(palette.calls.openPalette, 1);

  const github = stubContext();
  resolveCommand("github")!.run(github.context);
  assert.equal(github.calls.openExternal.length, 1);
});

test("ls lists exactly the site's routes", () => {
  const { context } = stubContext();
  const output = resolveCommand("ls")!.run(context)!.output as string;
  assert.deepEqual(output.split(/\s+/).filter(Boolean), ALL_ROUTES);
});

test("commonPrefix drives Tab completion", () => {
  assert.equal(commonPrefix([]), "");
  assert.equal(commonPrefix(["timeline"]), "timeline");
  assert.equal(commonPrefix(["clear", "close"]), "cl");
  assert.equal(commonPrefix(["cd", "clear", "contact"]), "c");
  assert.equal(commonPrefix(["help", "ls"]), "");
});
