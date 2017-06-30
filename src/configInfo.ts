interface ConfigInfo {
    remoteUrl: string,
    branchName: string,
    startLine: number | undefined,
    endLine: number | undefined,
    relativePath: string | undefined
}

export default ConfigInfo;