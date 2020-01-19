import Section from "./section";

export default class GitInfo {
    repoName: string;
    branchName: string;
    userName: string;
    hostName?: string;
    relativefilePath?: string;
    section?: Section;
    metadata?: object;

    constructor(repoName: string, branchName: string, userName: string, hostName?: string, relativeFilePath?: string, section?: Section, metadata?: object) {
        this.hostName = hostName;
        this.repoName = repoName;
        this.branchName = branchName;
        this.userName = userName;
        this.relativefilePath = relativeFilePath;
        this.section = section;
        this.metadata = metadata;
    }
}