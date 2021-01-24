import * as path from "path";

import GitUrls from "../src/index";

test("Get HTTPS url in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "https://bitbucket.org/qinezh/git-urls.git",
        commit: "master",
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/git-urls/src/master/test/a.md");
});

test("Get SSH URL in BitBucket", async () => {
    const configInfo = {
        remoteUrl: "git@bitbucket.org:qinezh/git-urls.git",
        commit: "master",
        section: {
            startLine: 2,
            endLine: 3,
            startColumn: 4,
            endColumn: 5
        },
        relativePath: "test/a.md"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://bitbucket.org/qinezh/git-urls/src/master/test/a.md#a.md-2:3");
});
