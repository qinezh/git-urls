# git-urls

Get online link of file with git remote URL(support Github, GitLab, Bitbucket)

## Install

```bash
npm install git-urls
```

## Usage example

```javascript
import GitUrl from "git-urls";
import * as path from "path";

const f = async () => {
    return await GitUrl.getOnlineLinkAsync(__filename);
};

f().then(link => {
    console.log(link);
});
```
