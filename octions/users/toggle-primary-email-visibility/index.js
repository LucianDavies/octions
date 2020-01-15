const core = require("@actions/core");
const { parse_array, parse_boolean, default_parse } = require('../../../src/utils/parse-input')
const _ = require('lodash')
const request = require('../../../src/utils/request')

const token = default_parse("token");
const email = default_parse("email");
const visibility = default_parse("visibility");
const file_output = default_parse("file_output");
const custom_outputs = default_parse("custom_outputs");


const previews = [
]

const inputs = {
  token,
  email,
  visibility,
  file_output,
  custom_outputs,
}


request(token, 
  "patch", 
  "/user/email/visibility", 
  previews,
  _.omit(inputs, ["token", "file_output", "custom_outputs"]),
  file_output,
  custom_outputs,
).then(result => {
    console.log("result", result);
  })
  .catch(error => {
    console.log("error", error);
    core.setFailed(error.message);
  });