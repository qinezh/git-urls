# git-urls

Get online link of file with git remote URL(support Github, GitLab, Bitbucket, VSTS)

## Install

```bash
npm install git-urls
```

## Usage example

```javascript
import GitUrls from "git-urls";

const f = async () => {
    return await GitUrls.getUrlsAsync(__filename);
};

f().then(link => {
    console.log(link);
});
```
