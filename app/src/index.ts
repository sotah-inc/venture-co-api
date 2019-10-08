import { getApp, getLogger } from "@sotah-inc/api";
import { getEnvVar } from "@sotah-inc/core";
import { getConfig } from "@sotah-inc/server";
import process from "process";

const isGceEnv = getEnvVar("IS_GCE_ENV") === "1";

// logger init
const logger = getLogger({ level: "debug", isGceEnv });

(async () => {
  // gathering runtime configs
  const appPort = process.env["PORT"] || "8080";
  const natsHost: string = await getConfig("nats_host", "NATS_HOST");
  const natsPort: string = await getConfig("nats_port", "NATS_PORT");
  const dbHost: string = await getConfig("db_host", "DB_HOST");
  const dbPassword: string = await getConfig("db_password", "DB_PASSWORD");

  const app = await getApp({ logger, natsHost, natsPort, dbHost, dbPassword, isGceEnv });
  if (app === null) {
    logger.info("Failed to initialize app");
    process.exit(-1);

    return;
  }

  logger.info("Calling listen", { appPort });
  app.listen(appPort, () => logger.info("Listening", { port: appPort }));
  logger.info("Called listen", { appPort });
})();
