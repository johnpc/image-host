# files.jpc.io

A free file uploading website available at [files.jpc.io](https://files.jpc.io)

## Install dependencies

```bash
npm install
```

## Deploying Backend Resources

Deploy necessary resources to your personal AWS account via

```bash
npx amplify sandbox
```

This will populate the `amplify_outputs.json` file at the root of your project, which contains all configuration necessary to interact with the deployed resources.

## Test the website

```bash
npm run dev
```

Then navigate to https://localhost:3000
