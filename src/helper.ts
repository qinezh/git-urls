import * as fs from "fs-extra";
import * as path from "path";

import ConfigInfo from "./configInfo";

export default class Helper {
    public static async parseConfigAsync(repoRoot: string): Promise<Map<string, ConfigInfo>> {
        const configPath = path.join(repoRoot, ".git/config");
        const headPath = path.join(repoRoot, ".git/HEAD");

        const existConfig = await fs.exists(configPath);
        const existHead = await fs.exists(headPath);

        if (!existConfig || !existHead) {
            throw new Error(`No git config files found in ${repoRoot}.`);
        }

        const configContent = await fs.readFile(configPath, "utf8");
        const headContent = await fs.readFile(headPath, "utf8");

        const remoteMap = this.parseRemoteUrl(configContent);
        const branch = this.parseBranchName(headContent);

        if (!remoteMap) {
            throw new Error(`Can't get remote name/url from ${configPath}.`);
        }

        if (!branch) {
            throw new Error(`Can't get branch name from ${headPath}.`);
        }

        var configMap = new Map<string, ConfigInfo>();
        for (let [key, value] of remoteMap) {
            configMap.set(key, new ConfigInfo(value, branch))
        }

        return configMap;
    }

    public static getRepoRoot(filePath: string): string | null {
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

    public static normarlize(filePath: string): string {
        return filePath.replace(/\\/g, '/');
    }

    private static parseRemoteUrl(content: string): Map<string, string> | null {
        const regex = /\n\[remote \"(.+)\"\]\s+url\s*=\s*(.+)\n/gi;
        let result = new Map<string, string>();

        let matches = regex.exec(content);
        while (matches !== null) {
            if (matches.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            result.set(matches[1], matches[2]);
            matches = regex.exec(content);
        }

        if (result.size > 0) {
            return result;
        }

        return null;
    }

    private static parseBranchName(content: string): string | null {
        const regex = /ref:\s+refs\/heads\/(\S+)/;
        const matches = regex.exec(content);
        if (!matches) {
            return null;
        }

        return matches[1];
    }
}