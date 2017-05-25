'use strict';

import { Selection } from "./selection";

export class GitInfo {
    readonly siteName: string;
    readonly userName: string;
    readonly repoName: string;
    readonly branchName: string;
    readonly filePath: string;
    readonly selection?: Selection;
    readonly isHttp: boolean;

    constructor(siteName: string, userName: string, repoName: string, branchName: string, filePath: string, selection?: Selection, isHttp = false) {
        this.siteName = siteName;
        this.userName = userName;
        this.repoName = repoName;
        this.branchName = branchName;
        this.filePath = filePath;
        this.selection = selection;
        this.isHttp = isHttp;
    }

    public toLink(): string {
        if (!this.siteName) {
            throw new Error("site name in LinkInfo can't be null");
        }

        let siteName = this.siteName.substr(this.siteName.lastIndexOf("@") + 1) || this.siteName;
        let siteUrlSource = (siteName === "bitbucket.org") ? "src" : "blob";

        let prefix: string;
        if (this.isHttp) {
            prefix = `http://${siteName}/${this.userName}/${this.repoName}/${siteUrlSource}/${this.branchName}/${this.filePath}`;
        } else {
            prefix = `https://${siteName}/${this.userName}/${this.repoName}/${siteUrlSource}/${this.branchName}/${this.filePath}`;
        }

        if (this.selection) {
            let startIndex = this.selection.start + 1;
            let endIndex = this.selection.end + 1;

            if (startIndex === endIndex) {
                return `${prefix}#L${startIndex}`;
            }
            return `${prefix}#L${startIndex}-L${endIndex}`;
        }
        
        return `${prefix}`;
    }
}
