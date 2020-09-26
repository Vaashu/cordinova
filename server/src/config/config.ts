import configDev from './config.dev';
import configProd from './config.prod';
import { extend } from 'lodash';



// Extend the base configuration in all.js with environment
// specific configuration

const env = process.env.NODE_ENV || "dev";
const config = extend(
  configDev,
  (env === "prod" && configProd) || {}
)

export default config;
 