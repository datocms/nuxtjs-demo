# Nuxt 3 + DatoCMS + Bulma demo

This is a demo of how to use Nuxt 3 and DatoCMS together. The demo includes a preview feature that:

- displays draft contents;
- updates content immediately when saving DatoCMS records, without the need to reload the page.

To keep the demo simple, content preview is available only for records that have been published at least once. More on previews [below](#preview-mode-and-deploy-environment).

## Deploy on DatoCMS

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/nuxtjs-demo)

## Preview mode and deploy environment

To take advantage of preview mode, deploy environment must support edge functions. That shouldn't be an issue: most of the provider have some form of edge function, these days. Make sure skim the list available ad [Nitro](https://nitro.unjs.io/deploy) — the server framework that Nuxt is based upon — for more info.

## Safety check before production

If you use this demo as a starting point for a project the you plan to deploy to production, **take some time to understand how to properly configure secrets, so that no reserved information (like DatoCMS contents in draft status) gets leaked**.

Only one environment variable (`NUXT_ENV_DATOCMS_API_TOKEN`) is required to have the project working. You can set it via the `.env` file, like explained in [the next section](#local-development).

Before deploying to production, though, you should set 4 environment variables:

* `NUXT_ENV_PREVIEW_MODE_PASSWORD`: the password that's requested before enabling preview mode;
* `NUXT_ENV_DATOCMS_API_BUNDLE_SAFE_TOKEN`: a DatoCMS token with read-only permissions and no access to draft contents: this token can be included in the bundles produced by Nuxt at deploy;
* `NUXT_ENV_DATOCMS_API_DRAFT_ENABLED_TOKEN`: a DatoCMS token with read-only permissions and **access to draft contents**: this token will be potentially accessible only to users who have access to the preview mode (thus, only to people that know the preview mode password and are therefore expected to see draft contents);
* `NUXT_ENV_PREVIEW_MODE_ENCRYPTION_SECRET`: this secret is meant to sign the cookie that enables preview mode: it can be any random string.

With these secrets in place, you can safely go to production. `NUXT_ENV_DATOCMS_API_TOKEN` won't be used anymore and only tokens with the minimum amount of permissions will be potentially visible to people visiting the website.

## Local development

For a quick start, set a Dato read-only API token in the `.env` file:

```
echo 'NUXT_ENV_DATOCMS_API_TOKEN=abc123' >> .env
```

Then you can install the dependencies and start the project:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

Other Nuxt conventional scripts:

```bash
# build for production and launch server
$ npm run build
$ npm run preview

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt docs](https://nuxt.com).
