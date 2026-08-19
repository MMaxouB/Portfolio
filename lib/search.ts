/**
 * Client-side search engine for the command palette.
 *
 * V1 is intentionally local and dependency-free (PORTFOLIO_SPEC §14): it ranks
 * a static command list against a query, searching pages, projects,
 * technologies and categories through each command's label / keywords /
 * description.
 */

import type { Command } from "./commands";

/** Relative weight of each field — label matches should always outrank the rest. */
const LABEL_WEIGHT = 3;
const KEYWORD_WEIGHT = 2;
const DESCRIPTION_WEIGHT = 1;

/** Characters that mark the start of a "word" inside a haystack. */
const WORD_BOUNDARY = /[\s\-/_.]/;

/**
 * Score a single field against a single lowercase term.
 * 0 means "no match" — never a weak match, so callers can use it as a filter.
 */
function fieldScore(haystack: string | undefined, term: string): number {
  if (!haystack) return 0;
  const value = haystack.toLowerCase();

  if (value === term) return 100;
  if (value.startsWith(term)) return 70;

  const index = value.indexOf(term);
  if (index === -1) return 0;

  // A match starting a word ("burp" in "Burp Suite") beats one buried mid-word.
  return WORD_BOUNDARY.test(value[index - 1]) ? 50 : 30;
}

/** Best score across every keyword of a command. */
function keywordScore(keywords: string[] | undefined, term: string): number {
  if (!keywords || keywords.length === 0) return 0;
  let best = 0;
  for (const keyword of keywords) {
    const score = fieldScore(keyword, term);
    if (score > best) best = score;
  }
  return best;
}

/** Combined score of one command against one term. 0 means the term misses. */
export function scoreCommand(command: Command, term: string): number {
  const label = fieldScore(command.label, term) * LABEL_WEIGHT;
  const keywords = keywordScore(command.keywords, term) * KEYWORD_WEIGHT;
  const description =
    fieldScore(command.description, term) * DESCRIPTION_WEIGHT;

  return label + keywords + description;
}

/**
 * Filter and rank commands. Every whitespace-separated term must match
 * something, so "python security" narrows instead of widening.
 * An empty query returns the list untouched, preserving the authored order.
 */
export function searchCommands(
  commands: readonly Command[],
  query: string
): Command[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [...commands];

  const ranked: { command: Command; score: number }[] = [];

  for (const command of commands) {
    let total = 0;
    let matchesAllTerms = true;

    for (const term of terms) {
      const score = scoreCommand(command, term);
      if (score === 0) {
        matchesAllTerms = false;
        break;
      }
      total += score;
    }

    if (matchesAllTerms) ranked.push({ command, score: total });
  }

  ranked.sort(
    (a, b) => b.score - a.score || a.command.label.localeCompare(b.command.label)
  );

  return ranked.map((entry) => entry.command);
}
