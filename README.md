# Mobile Banking Login Prototypes

This repo contains multiple secure mobile banking login UI variations that support optional camera-based face verification with user-controlled permission.

## Included variations

- HTML + CSS + JavaScript face-login prototype
- React version
- Tailwind CSS version
- Bootstrap version

## Security model

- Camera access is optional and only requested when the user chooses face login.
- If the user denies the permission, the app falls back to PIN/password login.
- This is a front-end prototype intended for UX and interface design.
- Real banking authentication should be enforced in a secure backend with strong MFA and device biometric APIs.

## Run locally

### Plain HTML versions

Open any of these files directly in the browser:

- `html-face-recognition/index.html`
- `tailwind-version/index.html`
- `bootstrap-version/index.html`

### React version

```bash
cd react-version
npm install
npm run dev
```

## Notes

These demo screens are designed for mobile banking apps and include:

- camera permission allow/deny UX
- secure fallback login flow
- dark and light mode styling
- mobile-friendly layout
- strong banking-app visual design
