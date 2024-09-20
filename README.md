# Playwright Test Automation Project
This project uses Playwright for end-to-end testing of web applications.

## Prerequisites

Node.js (version 14 or higher)
npm (usually comes with Node.js)

## Installation

Clone this repository:
```bash
git clone https://github.com/FabianaCarbajal/e-commerce-search-automation.git
```
Navigate to the project directory:
```bash
cd your-project-name
```
Install dependencies:
```bash
npm install
```

Install browser binaries:
```bash
npx playwright install --with-deps
```
This command installs the necessary browser binaries (Chromium, Firefox, and WebKit) that Playwright will use to run tests.

## Running Tests
To run search product test:
```bash
npx playwright test search-product.spec.ts
```

## Project Structure

```
.
├── tests/                          # Contains test files
│   ├── pages/                      # Page objects
│   │   └── home-page.ts            # Home page object
│   └── specs/                      # Test specifications
│       └── search-product.spec.ts  # Search product test
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies and scripts
└── README.md                       # This file
```