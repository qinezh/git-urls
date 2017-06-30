import * as path from "path";

import GitUrl from "../src/index";

test("Get HTTPS url in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.com/build/git-urls.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://gitlab.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitLab", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.com:qinezh/git-urls",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://gitlab.com/qinezh/git-urls/blob/master/test/a.md");
});