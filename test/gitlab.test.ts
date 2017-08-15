import * as path from "path";

import GitUrls from "../src/index";

test("Get HTTPS url in GitLab", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.com/build/git-urls.git",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitLab", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.com:qinezh/git-urls",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.com/qinezh/git-urls/blob/master/test/a.md");
});

test("Get HTTPS url in GitLab with company name", async () => {
    const configInfo = {
        remoteUrl: "https://gitlab.xyz.com/build/git-urls.git",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.xyz.com/build/git-urls/blob/master/test/a.md");
});

test("Get SSH URL in GitLab with company name", async () => {
    const configInfo = {
        remoteUrl: "git@gitlab.xyz.com:qinezh/git-urls",
        branchName: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://gitlab.xyz.com/qinezh/git-urls/blob/master/test/a.md");
});