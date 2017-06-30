import * as fs from "fs-extra";
import * as path from "path";

import ConfigInfo from "./configInfo";
import HostBuilder from "./host/hostBuilder";

class GitLink {
    public static async getOnlineLinkAsync(filePath: string, startLine?: number, endLine?: number): Promise<string> {
        const repoRoot = this.getRepoRoot(filePath);
        if (!repoRoot) {
            throw new Error(`Can't find repo root for ${filePath}.`);
        }

        const configInfo = await this.parseConfigAsync(repoRoot);
        configInfo.relativePath = this.normarlize(path.relative(repoRoot, filePath));
        configInfo.startLine = startLine;
        configInfo.endLine = endLine;

        return this.getOnlineLinkCoreAsync(configInfo);
    }

    public static async getOnlineLinkCoreAsync(configInfo: ConfigInfo): Promise<string> {
        const host = HostBuilder.create(configInfo);
        let gitInfo = host.parse(configInfo);

        gitInfo.startLine = configInfo.startLine;
        gitInfo.endLine = configInfo.endLine;
        gitInfo.relativefilePath = configInfo.relativePath;

        return host.assemble(gitInfo);
    }

    public static async tryGetOnlineLinkAsync(filePath: string, startLine?: number, endLine?: number): Promise<string | null> {
        try {
            return this.getOnlineLinkAsync(filePath, startLine, endLine);
        } catch (err) {
            console.error(err);
        }

        return null;
    }

    private static async parseConfigAsync(repoRoot: string): Promise<ConfigInfo> {
        const info = await this.parseConfigCoreAsync(repoRoot);
        return info;
    }

    private static async parseConfigCoreAsync(repoRoot: string): Promise<ConfigInfo> {
        const configPath = path.join(repoRoot, ".git/config");
        const headPath = path.join(repoRoot, ".git/HEAD");

        const existConfig = await fs.exists(configPath);
        const existHead = await fs.exists(headPath);

        if (!existConfig || !existHead) {
            throw new Error(`No git config files found in ${repoRoot}.`);
        }

        const configContent = await fs.readFile(configPath, "utf8");
        const headContent = await fs.readFile(headPath, "utf8");

        const url = this.parseRemoteUrl(configContent);
        const branch = this.parseBranchName(headContent);

        if (!url) {
            throw new Error(`Can't get remote url from ${configPath}.`);
        }

        if (!branch) {
            throw new Error(`Can't get branch name from ${headPath}.`);
        }

        return {
            remoteUrl: url,
            branchName: branch,
            relativePath: undefined,
            startLine: undefined,
            endLine: undefined
        };
    }

    private static parseRemoteUrl(content: string): string | null {
        const regex = /\n\[remote \"origin\"\]\s+url\s*=\s*(.+)\n/;
        const matches = regex.exec(content);
        if (!matches) {
            return null;
        }

        return matches[1];
    }

    private static parseBranchName(content: string): string | null {
        const regex = /ref:\s+refs\/heads\/(\S+)/;
        const matches = regex.exec(content);
        if (!matches) {
            return null;
        }

        return matches[1];
    }

    private static getRepoRoot(filePath: string): string | null {
        let currentFolder = this.normarlize(path.dirname(filePath));
        while (true) {
            const configFolder = path.join(currentFolder, ".git");
            if (fs.existsSync(configFolder)) {
                return currentFolder;
            }

            let index = currentFolder.lastIndexOf('/');
            if (index < 0) {
                break;
            }

            currentFolder = currentFolder.substring(0, index);
        }
        return null;
    }

    private static normarlize(filePath: string): string {
        return filePath.replace(/\\/g, '/');
    }
}

export default GitLink;