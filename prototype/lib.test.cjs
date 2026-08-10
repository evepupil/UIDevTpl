"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const { templates } = require("./data.js");
const {
  buildMigrationInstruction,
  filterTemplates,
  filtersFromSearch,
  filtersToSearch,
  formatBytes,
  selectTemplates,
  sortTemplates
} = require("./lib.js");

test("filterTemplates combines free text, framework and mood", () => {
  const result = filterTemplates(templates, {
    query: "HeroUI",
    framework: "react",
    mood: "calm"
  });

  assert.equal(result.length, 1);
  assert.equal(result[0].slug, "quiet-grid");
});

test("filterTemplates supports Chinese visual traits", () => {
  const result = filterTemplates(templates, {
    query: "海报",
    framework: "all",
    mood: "all"
  });

  assert.deepEqual(result.map((template) => template.slug), ["signal-canvas"]);
});

test("sortTemplates does not mutate source order", () => {
  const source = [templates[1], templates[0]];
  const sourceSlugs = source.map((template) => template.slug);
  const result = sortTemplates(source, "recommended");

  assert.deepEqual(source.map((template) => template.slug), sourceSlugs);
  assert.deepEqual(result.map((template) => template.slug), ["quiet-grid", "signal-canvas"]);
});

test("selectTemplates applies sorting after filtering", () => {
  const result = selectTemplates(templates, {
    query: "",
    framework: "all",
    mood: "all",
    sort: "name"
  });

  assert.equal(result.length, 2);
  assert.notEqual(result, templates);
});

test("buildMigrationInstruction pins identity, artifact and destination", () => {
  const instruction = buildMigrationInstruction(templates[0], "制作一个分析工作台");

  assert.match(instruction, /template: web\/react\/heroui\/quiet-grid/);
  assert.match(instruction, /version: 1\.0\.0/);
  assert.match(instruction, /sha256: 7d3f50a9/);
  assert.match(instruction, /expected_path: \.uidevtpl\/web\/react\/heroui\/quiet-grid\//);
  assert.ok(instruction.endsWith("制作一个分析工作台"));
});

test("filter URL state round-trips non-default values", () => {
  const serialized = filtersToSearch({
    query: "grid",
    framework: "react",
    mood: "calm",
    sort: "updated"
  });
  const parsed = filtersFromSearch(`?${serialized}`);

  assert.deepEqual(parsed, {
    query: "grid",
    framework: "react",
    mood: "calm",
    sort: "updated"
  });
});

test("formatBytes produces stable human-readable sizes", () => {
  assert.equal(formatBytes(1843200), "1.8 MB");
  assert.throws(() => formatBytes(-1), /non-negative/);
});
