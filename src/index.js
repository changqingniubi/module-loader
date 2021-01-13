
import Module from "./Module"
import code from "./code"
function getModuleFromString(code) {
  const scanModule = new Module();
  scanModule.compile(code);
  return scanModule.exports;
}
const module = getModuleFromString(code);
module.action();// ConardLi