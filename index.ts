import express, { Request, Response } from "express";
import nodeCache from "node-cache";
import { setup } from "applicationinsights";
import { AppConfigurationClient } from "@azure/app-configuration";
import { getFeature } from "./utilities/get-feature";

const app = express();
const appCache = new nodeCache({ stdTTL: 300 });

const client = process.env.CONFIGURATION_CONNECTION_STRING
  ? new AppConfigurationClient(process.env.CONFIGURATION_CONNECTION_STRING)
  : undefined;

setup(process.env.INSIGHTS_CONNECTION_STRING).start();

const handleError = (res: Response, code: string, message: string) => {
  res.status(500).json({ code, message });
};

const fetchFeatureFlags = async (features: string[]) => {
  const responseObject: any = {};
  for (const featureKey of features) {
    if (appCache.has(featureKey)) {
      responseObject[featureKey] = appCache.get(featureKey);
    } else {
      appCache.del(featureKey);
      const fetchedData = await getFeature({ client, feature: featureKey });
      appCache.set(featureKey, fetchedData);
      responseObject[featureKey] = fetchedData;
    }
  }
  return responseObject;
};

app.get("/", async (req: Request, res: Response) => {
  if (!client) {
    handleError(
      res,
      "no_client_connection",
      "Did not initialize client correctly!"
    );
    return;
  }

  if (typeof req.query.feature === "string" && req.query.feature.length) {
    const parsedFeatures = req.query.feature.split(",");
    const responseObject = await fetchFeatureFlags(parsedFeatures);
    res.json(responseObject);
  } else {
    res.json({});
  }
});

app.get("/health-check", (_req: Request, res: Response) => {
  res.json({
    code: "healthy",
    message: "Everything works correctly!",
  });
});

app.get("/flush-cache", (_req: Request, res: Response) => {
  appCache.flushAll();
  res.json({
    code: "cache_flushed",
    message: "Cache has been flushed!",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`🚀 App listening on PORT ${port}!`));
