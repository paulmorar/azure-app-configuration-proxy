# Azure App Configuration Service proxy

A super simple cache management for feature flags in Azures App Configuration Services.

Azures App Configuration Service comes with various limitations:

- limited number of requests per hour
- some SDKs can only fetch one setting at a time

On medium scale front-end applications these limitations make this service impossible to use. In order to make Azures solution somehow usable you can make use of this proxy. It caches your data for a defined period of time, allowing you to overcome the limitations of Azures solution.

## Table of contents

- 🚀 [Getting Started](#getting-started)
- ⚙️ [Build and Deploy](#build-and-deploy)
- ⁉️ [How to use](#how-to-use)
- 📝 [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have an Azure account. If you don't have one, you can create one at [Azure](https://azure.microsoft.com/).
- You have Node.js installed. You can download it from [Node.js](https://nodejs.org/).

## Getting Started

To get started with using this proxy service you will need three things:

1. An Azure Web App Service - you will find the web.config file for the Windows stack in this repository.
2. An [App Configuration Service](https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices).
3. An [Azure Application Insights Service](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net).

The Web App Service is where you will host and deploy this proxy. You will also need to configure it to expose the mandatory node environment variables to the application.
<img width="1356" alt="image" src="https://user-images.githubusercontent.com/12514384/197591071-4eaa52e9-b723-45a1-bee0-c8c35becb60c.png">

From the latter two you will use the **Application Insights Connection String** for initializing monitoring on your application and the **READ-ONLY** connection string from your App Configuration Service. Consult the image below:
![image](https://user-images.githubusercontent.com/12514384/197590675-793ab322-5236-4ac7-b63a-2b8601a3126f.png)

## Build and Deploy

Building the application is as simple as running one command:

```js
npm run build
```

You can either deploy the contents of `/dist` folder in your own custom way, or you can refer to the [.azure folder](https://github.com/paulmorar/azure-app-configuration-proxy/tree/main/.azure) for a demo pipeline that you can run on Azure.

## How to use

After you deploy this service to a web application, you will have 3 endpoints exposed:

- `/`
- `/flush-cache`
- `/health-check`

The main endpoint supports passing a query parmeter with the value containing your comma separated feature flags.

```js
/**
 * GET /?feature=first,second,third
 *
 * Example result
 */
{
  first: true,
  second: true,
  third: false
}
```

The flush cache endpoint provides you with full control on syncing the web service with the app configuration service.

```js
/**
 * GET /flush-cache
 *
 * Positive result
 */
{
  code: "cache_flushed",
  message: "Cache has been flushed!"
}
```

The health check endpoint allows you to integrate your service with various sanity checks within your infrastructure - this is, of course, optional. In case of a different response than the one below, you are most likely experiencing issues with the service.

```js
/**
 * GET /health-check
 *
 * Positive result
 */
{
  code: "healthy",
  message: "Everything works correctly!"
}
```

## License

[MIT](https://github.com/paulmorar/azure-app-configuration-proxy/blob/main/LICENSE.md)
