import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "quality-rule-verification-log-collector-1",
  "title": "品質ルール検証ログコレクター サンプル1",
  "status": "ready",
  "ruleId": "manual-evidence-required",
  "evidencePath": "docs/manual-test.md",
  "manualStep": "手動テストの結果を検証ログへ添付する"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "quality-rule-verification-log-collector-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "evidencePath": "docs/manual-test.md",
  "manualStep": "手動テストの結果を検証ログへ添付する"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
