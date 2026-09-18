function isRecoverableAiUnavailable(error) {
  const message = String(error && error.message || error || '');
  return /ANTHROPIC_API_KEY is not configured|credit balance is too low|insufficient credit|rate limit|overloaded|temporarily unavailable|Claude API (?:429|529)/i.test(message);
}

// `title` distinguishes failure modes in the GitHub Actions UI (Part 11):
// an AI-reconciliation deferral must never be conflated with a goal-
// ingestion or squad-reconciliation warning — each is a different signal
// requiring different follow-up. Defaults to the original AI-deferral
// title so the existing call site's behavior is unchanged.
function workflowWarning(message, title = 'Optional AI reconciliation deferred') {
  const safe = String(message).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  if (process.env.GITHUB_ACTIONS === 'true') console.log(`::warning title=${title}::${safe}`);
  else console.warn(`${title}: ${message}`);
}

module.exports = { isRecoverableAiUnavailable, workflowWarning };
