import { AppConfigurationClient } from "@azure/app-configuration";

interface GetFeatureParams {
  client: AppConfigurationClient;
  feature: string;
}

export const getFeature = async ({
  client,
  feature,
}: GetFeatureParams): Promise<boolean> => {
  try {
    const result = await client.getConfigurationSetting(
      {
        key: `.appconfig.featureflag/${feature}`,
      },
      {
        requestOptions: {
          timeout: 3000,
          customHeaders: {
            "Cache-Control": "no-cache",
          },
        },
      }
    );

    return result?.value ? JSON.parse(result.value).enabled : false;
  } catch {
    return false;
  }
};
