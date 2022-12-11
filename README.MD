**Requirements**
NodeJS

**Used third party libraries**
- Playwright - Runner and tests
- Faker - Data generator
- Mailinator-inbox - API access to mailinator inbox (not working)
- ESLint - Code formatter

**Running the tests**

The folder "config" contains the files with the endpoint and credentials to easily target any other endpoint with the credentials needed.
To run the tests, first we need to install the node modules:
```bash
npm install
```
Then we can run the tests:
```bash
npx playwright test --headed --project=chromium
```
The "--headed" option is to launch the browser visually, so we can check the test flow. Without it the tests run in background.
Within the "--project" option we can select which browser core to run the tests on. Options are "chromium", "firefox" and "webkit".

**Project limitations:**
- The webpage has a captcha which is hard to bypass. A temporary solution could be to add sleeps to allow the user to solve the captchas, but that solution is far from elegant. A better approach could be to completly remove captchas in a test environment, so the tests are run within it.
- Many elements in the webpage do not have an "id" to locate them properly, creating the need to use weak selectors to target certain elements, which are easily broken with every software update.
- To completely test the registration flow, it would be appropiate to evaluate the email that arrives to each new account created. I chose mailinator for the simplicity of it, but as of now, the access via "pop3" or an "api" is a paid option. Which leaves two options without paying, one could be to use Playwright to open mailinator webpage and interactively access the inbox to check for the email, the other is to simply check it manually.