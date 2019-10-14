# Octions

## What is an _oction_?

**O**ctokit + A**ction** = **Oction** - it is a [GitHub Action](https://github.com/features/actions) that exposes single REST API call from [@octokit/routes](https://github.com/octokit/routes)

## Examples

### Close every issue immediatelly once it is opened

```yaml
on:
  issues:
    types:
      - opened

jobs:
  close-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - run: echo "${{ toJson(github.event) }}"
      - uses: maxkomarychev/octions/octions/issues/update@master
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          issue_number: ${{ github.event.issue.number }}
          state: closed
      - uses: maxkomarychev/octions/octions/issues/create-comment@master
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          issue_number: ${{ github.event.issue.number }}
          body: You can't create issues here!
```
