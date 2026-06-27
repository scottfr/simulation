/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
export function ParseError(message: string, locator: any | null): void;
export class ParseError {
    /**
     * Creates an error that will not be caught by XMLReader aka the SAX parser.
     *
     * @param {string} message
     * @param {any?} locator Optional, can provide details about the location in the source
     * @constructor
     */
    constructor(message: string, locator: any | null);
    message: string;
    locator: any;
    name: string;
}
export function XMLReader(): void;
export class XMLReader {
    parse: (source: any, defaultNSMap: any, entityMap: any) => void;
}
