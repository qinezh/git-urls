import * as fs from "fs-extra";
import * as path from "path";

import ConfigInfo from "./configInfo";
import HostBuilder from "./host/hostBuilder";
import Helper from "./helper";

export default class GitUrl {
    public static async getOnlineLinkAsync(filePath: string, startLine?: number, endLine?: number): Promise<string> {
        const repoRoot = Helper.getRepoRoot(filePath);
        if (!repoRoot) {
            throw new Error(`Can't find repo root for ${filePath}.`);
        }

        const configInfo = await Helper.parseConfigAsync(repoRoot);
        configInfo.relativePath = Helper.normarlize(path.relative(repoRoot, filePath));
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
}