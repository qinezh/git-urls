import * as path from "path";

import GitLink from "../src/index";

test("Get current project's git online link", async () => {
    const link = await GitLink.getOnlineLinkAsync(path.resolve("package.json"));

    expect(link).toBe("https://github.com/qinezh/gitlink/blob/dev/package.json");
});

test("Get HTTPS URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "https://github.com/build/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/build/gitlink/blob/master/test/a.md");
});

test("Get SSH URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "git@github.com:qinezh/gitlink",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/qinezh/gitlink/blob/master/test/a.md");
});

test("Get HTTP URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "http://github.com/qinezh/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("http://github.com/qinezh/gitlink/blob/master/test/a.md");
});

test("Get HTTPS URL with username in GitHub", async () => {
    const configInfo = {
        remoteUrl: "https://qinezh@github.com/build/gitlink.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitLink.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/build/gitlink/blob/master/test/a.md");
});