export default class Section {
    startLine: number;
    endLine?: number;
    lineStartColumn?: number;
    lineEndColumn?: number;

    constructor(startLine: number, endLine?: number, startColumn?: number, endColumn?: number) {
        this.startLine = startLine;
        this.endLine = endLine;
        this.lineStartColumn = startColumn;
        this.lineEndColumn = endColumn;
    }
}