import * as path from "path";

import GitUrls from "../src/index";

test("Get HTTPS url in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "https://bitbucket.org/qinezh/git-urls.git",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/git-urls/src/master/test/a.md");
});

test("Get SSH URL in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "git@bitbucket.org:qinezh/git-urls.git",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/git-urls/src/master/test/a.md");
});