import * as path from "path";

import GitUrls from "../src/index";

test("Get HTTPS url in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.com/build/git-urls.git",
        commit: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitLab", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.com:qinezh/git-urls",
        commit: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/qinezh/git-urls/blob/master/test/a.md");
});

test("Get HTTPS url in GitLab with company name", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.xyz.com/build/git-urls.git",
        commit: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.xyz.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitLab with company name", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.xyz.com:qinezh/git-urls",
        commit: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.xyz.com/qinezh/git-urls/blob/master/test/a.md");
});

test("Get URL with section in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://qinezh@gitlab.com/build/git-urls.git",
        commit: "master",
        section: {
            startLine: 2,
            endLine: 3,
            startColumn: 4,
            endColumn: 5
        },
        relativePath: "a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/build/git-urls/blob/master/a.md#L2-3");
});

test("Get URL with commit SHA in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.com/build/git-urls.git",
        commit: "59f76230dd5829a10aab717265b66c6b5849365e",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/build/git-urls/blob/59f76230dd5829a10aab717265b66c6b5849365e/test/a.md");
});
