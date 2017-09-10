import * as path from "path";

import BasicHost from "./basicHost";
import GitInfo from "../gitInfo";

export default class BitBucket extends BasicHost {
    protected separateFolder = "src";

    assemble(info: GitInfo): string {
        let prefix = "https://";
        if (info.metadata && info.metadata["isHttp"]) {
            prefix = "http://";
        }
        const link = `${prefix}${info.hostName}/${info.userName}/${info.repoName}/${this.separateFolder}/${info.branchName}/${info.relativefilePath}`

        let fileName: string|null = null;
        if (info.relativefilePath) {
            fileName = path.basename(info.relativefilePath);
        }

        if (info.section && info.section.startLine && info.section.endLine && info.section.startLine !== info.section.endLine && fileName) {
            return `${link}#${fileName}-${info.section.startLine}:${info.section.endLine}`;
        } else if (info.section && info.section.startLine && fileName) {
            return `${link}#${fileName}-${info.section.startLine}`;
        } else {
            return link;
        }
    }
}