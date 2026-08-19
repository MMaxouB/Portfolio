import test from "node:test";
import assert from "node:assert/strict";
import { searchCommands, scoreCommand } from "@/lib/search";
import { COMMANDS, type Command } from "@/lib/commands";

const labels = (results: Command[]) => results.map((c) => c.label);

test("an empty query returns every command in authored order", () => {
  const results = searchCommands(COMMANDS, "   ");
  assert.equal(results.length, COMMANDS.length);
  assert.deepEqual(labels(results), labels([...COMMANDS]));
});

test("an empty query returns a copy, not the shared array", () => {
  assert.notEqual(searchCommands(COMMANDS, ""), COMMANDS);
});

test("a technology only present in keywords still finds the project", () => {
  // "Nmap" appears in no label — only in Enterprise Network Audit's tech list.
  const results = searchCommands(COMMANDS, "nmap");
  assert.equal(results[0].label, "Enterprise Network Audit");
});

test("a category finds every project carrying it", () => {
  const results = labels(searchCommands(COMMANDS, "security"));
  assert.ok(results.includes("Enterprise Network Audit"));
  assert.ok(results.includes("Vulnerability Scanner"));
});

test("label matches outrank keyword and description matches", () => {
  const results = searchCommands(COMMANDS, "projects");
  assert.equal(results[0].label, "Projects");
});

test("every term must match — multi-term queries narrow the list", () => {
  const wide = searchCommands(COMMANDS, "python");
  const narrow = searchCommands(COMMANDS, "python docker");
  assert.ok(narrow.length < wide.length);
  assert.ok(narrow.every((c) => wide.includes(c)));
});

test("a query matching nothing returns an empty list", () => {
  assert.deepEqual(searchCommands(COMMANDS, "zzzzz-nothing"), []);
});

test("scoring ranks exact > prefix > word-boundary > mid-word", () => {
  const at = (label: string, keywords?: string[]): Command => ({
    id: label,
    label,
    keywords,
    action: { type: "navigate", href: "/" },
    group: "navigation",
  });

  const exact = scoreCommand(at("go"), "go");
  const prefix = scoreCommand(at("golang"), "go");
  const boundary = scoreCommand(at("the go tool"), "go");
  const midWord = scoreCommand(at("ago"), "go");

  assert.ok(exact > prefix);
  assert.ok(prefix > boundary);
  assert.ok(boundary > midWord);
  assert.ok(midWord > 0);
});

test("a term matching no field scores zero", () => {
  const command: Command = {
    id: "x",
    label: "Timeline",
    description: "Go to Timeline",
    action: { type: "navigate", href: "/timeline" },
    group: "navigation",
  };
  assert.equal(scoreCommand(command, "kubernetes"), 0);
});
