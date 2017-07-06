import * as path from "path";

import ConfigInfo from "../src/configInfo";
import Section from "../src/section";
import GitUrls from "../src/index";

test("Get file URL in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlsCoreAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        section: new Section(12, 23),
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlsCoreAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23");
});

test("Get file URL in VSTS with SSH", async () => {
    const configInfo = {
        remoteUrl: "ssh://ssh@ssh.visualstudio.com:22/Collection/_git/repo",
        branchName: "master",
        relativePath: "test/file"
    };

    const link = await GitUrls["getUrlsCoreAsync"](configInfo);
    expect(link).toBe("https://ssh.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents");
});

test("Get selection block URL with column in VSTS", async () => {
    const configInfo = {
        remoteUrl: "https://vsts.visualstudio.com/Collection/_git/repo",
        branchName: "master",
        section: new Section(12, 23, 8, 9),
        relativePath: "test/file"
    }
    const link = await GitUrls["getUrlsCoreAsync"](configInfo);

    expect(link).toBe("https://vsts.visualstudio.com/Collection/_git/repo?path=%2Ftest%2Ffile&version=GBmaster&_a=contents&lineStyle=plain&line=12&lineEnd=23&lineStartColumn=8&lineEndColumn=9");
});