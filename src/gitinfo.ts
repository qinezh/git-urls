import Section from "./section";

export default class GitInfo {
    repoName: string;
    branchName: string;
    userName: string;
    relativefilePath?: string;
    section?: Section;
    metadata?: object;

    constructor(repoName: string, branchName: string, userName: string, relativeFilePath?: string, section?: Section, metadata?: object) {
        this.repoName = repoName;
        this.branchName = branchName;
        this.userName = userName;
        this.relativefilePath = relativeFilePath;
        this.section = section;
        this.metadata = metadata;
    }
}