function isRecoverableAiUnavailable(error) {
  const message = String(error && error.message || error || '');
  return /ANTHROPIC_API_KEY is not configured|credit balance is too low|insufficient credit|rate limit|overloaded|temporarily unavailable|Claude API (?:429|529)/i.test(message);
}

function workflowWarning(message) {
  const safe = String(message).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  if (process.env.GITHUB_ACTIONS === 'true') console.log(`::warning title=Optional AI reconciliation deferred::${safe}`);
  else console.warn(`AI reconciliation deferred: ${message}`);
}

module.exports = { isRecoverableAiUnavailable, workflowWarning };
