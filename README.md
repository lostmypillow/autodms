# AutoDMS

Tools to automatically produce "Daily Media Scans" that I would've otherwise spend 3 hours producing.

Originally 3 separate repos, I've merged the 3 repos into a single repo for better management and preparation for AutoDMS v2

## Prerequisites

- Node 24 LTS
- (For `api/firebase` folder only) 
  - Node 18
  - Firebase Project, see [here](https://firebase.google.com/docs/functions/get-started#create-a-firebase-project) for more details.
  - Firebase CLI, see [here](https://firebase.google.com/docs/functions/get-started#set-up-your-environment-and-the-firebase-cli) for more details.


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

### Extension

```bash
cd extension

# Install dependencies
pnpm i

# Run dev server
npm run dev
```
