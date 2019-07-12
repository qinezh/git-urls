import * as path from "path";

import ConfigInfo from "../src/configInfo";
import GitUrls from "../src/index";

test("Get file URL in DevOps", async () => {
    const configInfo = {
        remoteUrl: "https://dev.azure.com/my-org/my-project/_git/repo",
        branchName: "master",
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://dev.azure.com/my-org/my-project/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL in DevOps", async () => {
    const configInfo = {
        remoteUrl: "https://dev.azure.com/my-org/my-project/_git/repo",
        branchName: "master",
        section: {
            startLine: 12,
            endLine: 23
        },
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://dev.azure.com/my-org/my-project/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23");
});

test("Get file URL in DevOps with SSH", async () => {
    const configInfo = {
        remoteUrl: "my-tenant@ssh.dev.azure.com:22/my-org/my-project/repo",
        branchName: "master",
        relativePath: "test/file"
    };

    const link = await GitUrls["getUrlAsync"](configInfo);
    expect(link).toBe("https://dev.azure.com/my-org/my-project/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL with column in DevOps", async () => {
    const configInfo = {
        remoteUrl: "https://dev.azure.com/my-org/my-project/_git/repo",
        branchName: "master",
        section: {
            startLine: 12,
            endLine: 23,
            startColumn: 8,
            endColumn: 9
        },
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlAsync"](configInfo);

    expect(link).toBe("https://dev.azure.com/my-org/my-project/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23&lineStartColumn=8&lineEndColumn=9");
});
