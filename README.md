# AutoDMS v1
> Deprecated. Latest version is now AutoDMS v2, repo **HERE**.

Tools to automatically produce "Daily Media Scans" that I would've otherwise spend 3 hours producing.

Originally 3 separate repos, I've merged the 3 repos into a single repo for better management and preparation for AutoDMS v2

## Prerequisites

- Node 24 LTS
- (For `api` folder only) Node 18
- (For `api` folder only) Firebase Project, see [here](https://firebase.google.com/docs/functions/get-started#create-a-firebase-project) for more details.
- (For `api` folder only) Firebase CLI, see [here](https://firebase.google.com/docs/functions/get-started#set-up-your-environment-and-the-firebase-cli) for more details.
- (For `extension` folder only) pnpm package manager, see [here](https://pnpm.io/installation) for more details.


### API (Firebase Functions)

Make sure you've installed Firebase CLI globally, as detailed in the section "Prerequisites"

```bash
cd api

# Install dependencies
npm i 

cd functions

# Install dependencies
npm i

# Login to Firebase 
firebase login

# Run dev server
npm run serve

# Deploy to production
npm run deploy
```
> Why are there 2 `package.json` files? 
> Who knows.

### Core (Main scraping function)
```bash
cd core

# Install dependencies
npm i

# Testing
npm run test

# Publish to NPM
npm publish
```
> Why is it an npm package? 
> Because it was constantly evolving, both extension and API needed it and those 3 projects weren't in the same repos before.
> I needed an easy way to keep both projects in sync.

### Extension (Dashboard/frontend)

```bash
cd extension

# Install dependencies
pnpm i

# Run dev server
pnpm run dev
```

## I don't know what's going on here??
Read the [Wiki](https://github.com/lostmypillow/autodms/wiki).
