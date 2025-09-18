# Conduit API Playwright tests

# Install:
```bash
npm install
npx playwright install --with-deps
```
# Run tests:
```bash
npm run test
```
# Continuous Integration (CI):
This project uses **GitHub Actions** for running Playwright tests.

- Tests run automatically on every push or pull request to `master`.
- A scheduled job runs daily at 09:00 UTC.
- Test reports are uploaded as workflow artifacts.

You can also trigger tests manually from the **Actions** tab.


# Environment Variables and Secrets Setup:
IMPORTANT! Do not store passwords, tokens, secret keys, or any private information in public repository files. Use a .env file to keep such data safe.

Example .env
`API_URL=https://conduit-realworld-example-app.fly.dev/`
`API_TOKEN=your_private_token`


Add .env to .gitignore so it won’t be committed to the repository.

If you are using **GitHub Actions**, you can add secrets in Settings → Secrets and variables → Actions.

