import * as path from "path";

import GitUrl from "../src/index";

test("Get current project's git online link", async () => {
    const link = await GitUrl.getOnlineLinkAsync(path.resolve("package.json"));
    expect(link).toMatch(/https:\/\/github.com\/.+\/git-urls\/blob\/.+\/package.json/);
});

test("Get HTTPS URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "https://github.com/build/git-urls.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "git@github.com:qinezh/git-urls",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/qinezh/git-urls/blob/master/test/a.md");
});

test("Get HTTP URL in GitHub", async () => {
    const configInfo = {
        remoteUrl: "http://github.com/qinezh/git-urls.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("http://github.com/qinezh/git-urls/blob/master/test/a.md");
});

test("Get HTTPS URL with username in GitHub", async () => {
    const configInfo = {
        remoteUrl: "https://qinezh@github.com/build/git-urls.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/build/git-urls/blob/master/test/a.md");
});

test("Get URL with space in file path in GitHub", async () => {
    const configInfo = {
        remoteUrl: "https://qinezh@github.com/build/git-urls.git",
        branchName: "master",
        startLine: undefined,
        endLine: undefined,
        relativePath: "test space in path/a.md"
    }
    const link = await GitUrl.getOnlineLinkCoreAsync(configInfo);

    expect(link).toBe("https://github.com/build/git-urls/blob/master/test%20space%20in%20path/a.md");
});