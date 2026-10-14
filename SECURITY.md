# Website security maintenance

Security concerns: email support@asrtradingsystem.com with subject ASR Website Security. Include the affected URL and minimal reproduction details. Never send passwords, tokens, personal customer records or destructive test traffic. No response-time guarantee or bounty is offered.

## Implemented 2026-10-14

- Static GitHub Pages site with no application login, database, checkout or upload endpoint in this repository.
- All six HTML pages have an early meta Content Security Policy: local scripts/styles/images only, no inline scripts or styles, no plugins, no child frames, no browser fetch connections, no base URL overrides. Form destinations are restricted to the same origin and FormSubmit.
- Inline presentation rules were extracted to page-details.css, preserving their values and stylesheet order.
- Explicit strict-origin-when-cross-origin referrer policy.
- Existing FormSubmit CAPTCHA, honeypot and browser input limits retained. These are not a guarantee against spam or a substitute for provider-side validation/rate limiting. The form endpoint remains publicly reachable.
- Repeatable source checks: python scripts/check_security.py

## Owner controls still to verify

1. GitHub: enable a passkey/security key or 2FA, securely store recovery codes, review collaborators, authorized apps, tokens and sessions; grant only necessary access. Confirm domain verification in account Pages settings and keep its DNS TXT record. Consider branch rules requiring reviewed changes and disallowing force pushes/deletion without locking out the owner.
2. Namecheap: enable 2FA, confirm registrar transfer lock, domain renewal and recovery contact. Review DNS records and remove unused wildcard/dangling records after checking dependencies. Do not delete mail MX/TXT records during website changes.
3. Support mailbox and recovery email: unique passwords, MFA where supported, review forwarding rules/sessions. Verify SPF/DKIM and plan DMARC after identifying all legitimate senders. Do not publish a rejecting DMARC policy before testing mail delivery.
4. Keep an independent backup of the full repository and domain/mail configuration. Git history in the same compromised account is not an independent backup.

## Hosting limits and next infrastructure step

At review, HTTP redirected to HTTPS and HTTPS loaded successfully. The observed response did not include CSP, X-Frame-Options, X-Content-Type-Options or HSTS response headers. The CSP added here is delivered in HTML, not an HTTP header. Meta CSP cannot enforce frame-ancestors: anti-framing protection is not implemented by this change. It cannot configure WAF, server-side rate limiting or additional DDoS controls either.

For these controls, configure a supported edge proxy or hosting service with response-header and traffic-filtering controls. Plan this as an infrastructure change with DNS inventory, TLS validation, mail preservation and rollback. Do not add an ineffective _headers file to GitHub Pages and assume it works. Third-party FormSubmit traffic is outside an ASR-domain firewall and requires provider-side protection or migration to a controlled form endpoint.

## Incident procedure

If unauthorized edits, DNS changes or suspicious redirects appear: use a trusted device, secure the controlling accounts and recovery email, revoke suspicious sessions/tokens, retain evidence, restore a verified clean commit and DNS configuration, check mail forwarding, and assess whether inquiry data was exposed. Do not assume that reverting HTML removes an attacker's account access. Handle notices under applicable legal requirements.

## Scope and verification limits

This was a source and public HTTP review, not an intrusive penetration test, full repository-history secret scan or account audit. No passwords or private credentials were found in the reviewed website source. Account settings, domain verification, email authentication and provider-side abuse controls were not independently verified. Browser rendering, policy enforcement and a real form submission must be tested separately. No website is hacker-proof.

References: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy ; https://formsubmit.co/documentation
