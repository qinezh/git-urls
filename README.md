# gitlink

Get online link of file with git remote URL(support Github, GitLab, Bitbucket)

## Install

```bash
npm install gitlink
```

## Usage example

```javascript
import GitLink from "gitlink";
import * as path from "path";

const f = async () => {
    return await GitLink.getOnlineLinkAsync(__filename);
};

f().then(link => {
    console.log(link);
});
```
