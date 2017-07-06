import Section from "./section";

export default class ConfigInfo {
    remoteUrl: string;
    branchName: string;
    relativePath?: string;
    section?: Section;

    constructor(remoteUrl: string, branchName: string, relativePath?: string, section?: Section) {
        this.remoteUrl = remoteUrl;
        this.branchName = branchName;
        this.relativePath = relativePath;
        this.section = section;
    }
}