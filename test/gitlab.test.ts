import * as path from "path";

import GitUrl from "../src/index";

test("Get HTTPS url in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.com/build/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://gitlab.com/build/gitlink/blob/master/test/a.md");
});

test("Get SSH URL in GitLab", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.com:qinezh/gitlink",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://gitlab.com/qinezh/gitlink/blob/master/test/a.md");
});