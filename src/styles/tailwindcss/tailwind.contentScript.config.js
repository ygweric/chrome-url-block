/** @type {import('tailwindcss').Config} */
import tailwindBaseConfig from "./tailwind.base.config";

console.log(tailwindBaseConfig);
module.exports = {
  ...tailwindBaseConfig,
  prefix: "rr-",
};
