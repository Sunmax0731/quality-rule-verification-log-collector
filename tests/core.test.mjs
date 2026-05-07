import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "quality-1",
  "title": "品質ルール・手動検証・検証ログ収集 サンプル 1",
  "ruleId": "manual-checklist-required",
  "status": "ready",
  "evidencePath": "docs/manual-test.md",
  "manualStep": "主要フローを手動で確認する"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "quality-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "evidencePath": "docs/manual-test.md",
  "manualStep": "主要フローを手動で確認する"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
