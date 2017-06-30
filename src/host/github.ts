import Host from "./host";
import GitInfo from "../gitInfo";
import ConfigInfo from "../configInfo";

class GitHub implements Host {
    private readonly regex = /(https?:\/\/|git@)([^\/:]+)(?:\/|:)([^\/:]+)(?:\/|:)([^\/:]+)/;
    hostname = "github.com";
    separateFolder = "blob";

    parse(info: ConfigInfo): GitInfo {
        const matches = this.regex.exec(info.remoteUrl);
        if (!matches) {
            throw new Error(`Can't parse ${info.remoteUrl} with GitHub rules`);
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
            relativefilePath: undefined,
            startLine: undefined,
            endLine: undefined,
            isHttp: isHttp,
        }
    }

    assemble(info: GitInfo): string {
        const prefix = info.isHttp ? "http://" : "https://";
        const link = `${prefix}${this.hostname}/${info.userName}/${info.repoName}/${this.separateFolder}/${info.branchName}/${info.relativefilePath}`

        if (!info.startLine || !info.endLine) {
            return link;
        } else if (!info.endLine) {
            return `${link}#L${info.startLine}`;
        } else {
            return `${link}#L${info.startLine}-L${info.endLine}`;
        }
    }
}

export default GitHub;