import * as path from "path";

import GitLink from "../src/index";

test("Get HTTPS url in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "https://bitbucket.org/qinezh/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/gitlink/src/master/test/a.md");
});

test("Get SSH URL in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "git@bitbucket.org:qinezh/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/gitlink/src/master/test/a.md");
});