<!--datocms-autoinclude-header start-->

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60"></a>

👉 [Visit the DatoCMS homepage](https://www.datocms.com) or see [What is DatoCMS?](#what-is-datocms)

---

<!--datocms-autoinclude-header end-->

# Nuxt 3 + DatoCMS + Bulma demo

This is a demo of how to use Nuxt 3 and DatoCMS together. The demo includes a preview feature that:

- displays draft contents;
- updates content immediately when saving DatoCMS records, without the need to reload the page.

To keep the demo simple, content preview is available only for records that have been published at least once. More on previews [below](#preview-mode-and-deploy-environment).

## Deploy on DatoCMS

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/nuxtjs-demo)

## Preview mode and deploy environment

To take advantage of preview mode, deploy environment must support edge functions. That shouldn't be an issue: most of the providers have some form of edge function, these days. For more info, make sure to skim the list available at [Nitro](https://nitro.unjs.io/deploy) — the server framework that Nuxt is based upon.

## Safety check before production

If you use this demo as a starting point for a project and you plan to deploy to production, **take some time to understand how to properly configure secrets, so that no reserved information (like, for example, DatoCMS contents in draft status) gets leaked**.

Only one environment variable (`NUXT_ENV_DATOCMS_API_TOKEN`) is strictly required to have the project working. You can set it via the `.env` file, like explained in [the next section](#local-development). Though, before deploying to production, you should set following 4 environment variables:

* `NUXT_ENV_PREVIEW_MODE_PASSWORD`: the password that users must have to enable preview mode;
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

<!--datocms-autoinclude-footer start-->

---

# What is DatoCMS?

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60" alt="DatoCMS - The Headless CMS for the Modern Web"></a>

[DatoCMS](https://www.datocms.com/) is the REST & GraphQL Headless CMS for the modern web.

Trusted by over 25,000 enterprise businesses, agencies, and individuals across the world, DatoCMS users create online content at scale from a central hub and distribute it via API. We ❤️ our [developers](https://www.datocms.com/team/best-cms-for-developers), [content editors](https://www.datocms.com/team/content-creators) and [marketers](https://www.datocms.com/team/cms-digital-marketing)!

**Why DatoCMS?**

- **API-First Architecture**: Built for both REST and GraphQL, enabling flexible content delivery
- **Just Enough Features**: We believe in keeping things simple, and giving you [the right feature-set tools](https://www.datocms.com/features) to get the job done
- **Developer Experience**: First-class TypeScript support with powerful developer tools

**Getting Started:**

- ⚡️ [Create Free Account](https://dashboard.datocms.com/signup) - Get started with DatoCMS in minutes
- 🔖 [Documentation](https://www.datocms.com/docs) - Comprehensive guides and API references
- ⚙️ [Community Support](https://community.datocms.com/) - Get help from our team and community
- 🆕 [Changelog](https://www.datocms.com/product-updates) - Latest features and improvements

**Official Libraries:**

- [**Content Delivery Client**](https://github.com/datocms/cda-client) - TypeScript GraphQL client for content fetching
- [**REST API Clients**](https://github.com/datocms/js-rest-api-clients) - Node.js/Browser clients for content management
- [**CLI Tools**](https://github.com/datocms/cli) - Command-line utilities for schema migrations (includes [Contentful](https://github.com/datocms/cli/tree/main/packages/cli-plugin-contentful) and [WordPress](https://github.com/datocms/cli/tree/main/packages/cli-plugin-wordpress) importers)

**Official Framework Integrations**

Helpers to manage SEO, images, video and Structured Text coming from your DatoCMS projects:

- [**React Components**](https://github.com/datocms/react-datocms)
- [**Vue Components**](https://github.com/datocms/vue-datocms)
- [**Svelte Components**](https://github.com/datocms/datocms-svelte)
- [**Astro Components**](https://github.com/datocms/astro-datocms)

**Additional Resources:**

- [**Plugin Examples**](https://github.com/datocms/plugins) - Example plugins we've made that extend the editor/admin dashboard
- [**Starter Projects**](https://www.datocms.com/marketplace/starters) - Example website implementations for popular frameworks
- [**All Public Repositories**](https://github.com/orgs/datocms/repositories?q=&type=public&language=&sort=stargazers)

<!--datocms-autoinclude-footer end-->
