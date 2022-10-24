# Azure App Configuration Service proxy

A super simple cache management for Azures App Configuration Services. Azures App Configuration Service comes with various limitations:

- limited number of requests per hour
- some SDKs can only fetch one setting at a time

On medium scale front-end applications these limitations make this service impossible to use. In order to make Azures solution somehow usable you can make use of this proxy. It caches your data for a defined period of time, allowing you to overcome the limitations of Azures solution.

## Table of contents

- 🚀 [Getting Started](#getting-started)
- ⚙️ [Build and Deploy](#build-and-deploy)
- 📝 [License](#license)

## Getting Started

To get started with using this proxy service you will need two things:

1. An Azure Web App Service - you will find the web.config file for the Windows stack in this repository
2. An [App Configuration Service](https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices)
3. An [Azure Application Insights Service](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net)

The Web App Service is where you will host and deploy this proxy. You will also throw in some configuration in order to expose the mandatory node environment variables to the application.
<img width="1356" alt="image" src="https://user-images.githubusercontent.com/12514384/197591071-4eaa52e9-b723-45a1-bee0-c8c35becb60c.png">


From the latter two you will use the **Application Insights Connection String** for initializing monitoring on your application and the **READ-ONLY** connection string from your App Configuration Service. Consult the image below:
![image](https://user-images.githubusercontent.com/12514384/197590675-793ab322-5236-4ac7-b63a-2b8601a3126f.png)

## Build and Deploy

Building the application is as simple as running one command:

```js
npm run build
```

You can either deploy the contents of `/dist` folder in your own custom way, or you can refer to the `.azure` folder for a fully fledged pipeline that you can run on Azure.

## License

[MIT](https://github.com/paulmorar/azure-app-configuration-proxy/blob/main/LICENSE.md)

