import Host from "./host";
import GitInfo from "../gitInfo";
import ConfigInfo from "../configInfo";

export default abstract class BasicHost implements Host {
    private readonly regex = /(https?:\/\/|git@)([^\/:]+)(?:\/|:)([^\/:]+)(?:\/|:)([^\/:]+)/;

    protected abstract hostname;
    protected abstract separateFolder;

    parse(info: ConfigInfo): GitInfo {
        const matches = this.regex.exec(info.remoteUrl);
        if (!matches) {
            throw new Error(`Can't parse ${info.remoteUrl} with Default rules`);
        }

        const schema = matches[1];
        let isHttp = false;
        if (schema.startsWith("http://")) {
            isHttp = true;
        }

        let repoName = matches[4];
        if (repoName.endsWith(".git")) {
            repoName = repoName.substring(0, repoName.lastIndexOf(".git"));
        }

        return {
            repoName: repoName,
            branchName: info.branchName,
            userName: matches[3],
            metadata: { "isHttp": isHttp },
        }
    }

    assemble(info: GitInfo): string {
        let prefix = "https://";
        if (info.metadata && info.metadata["isHttp"]) {
            prefix = "http://";
        }
        const link = `${prefix}${this.hostname}/${info.userName}/${info.repoName}/${this.separateFolder}/${info.branchName}/${info.relativefilePath}`

        if (info.section && info.section.startLine && info.section.endLine && info.section.startLine !== info.section.endLine) {
            return `${link}#L${info.section.startLine}-L${info.section.endLine}`;
        } else if (info.section && info.section.startLine) {
            return `${link}#L${info.section.startLine}`;
        } else {
            return link;
        }
    }
}