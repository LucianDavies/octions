const core = require("@actions/core");
const { parse_array, parse_boolean, default_parse } = require('../../../src/utils/parse-input')
const _ = require('lodash')
const request = require('../../../src/utils/request')

const token = default_parse("token");
const owner = default_parse("owner");
const repo = default_parse("repo");
const https_enforced = parse_boolean("https_enforced");
const cname = default_parse("cname");
const source = default_parse("source");
const file_output = default_parse("file_output");
const custom_outputs = default_parse("custom_outputs");


const previews = [
]

const inputs = {
  token,
  owner,
  repo,
  cname,
  https_enforced,
  source,
  file_output,
  custom_outputs,
}


request(token, 
  "put", 
  "/repos/{owner}/{repo}/pages", 
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
