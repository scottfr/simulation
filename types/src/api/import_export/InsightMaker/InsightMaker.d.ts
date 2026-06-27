/**
 * @param {string} modelString
 *
 * @returns
 */
export function loadXML(modelString: string): ModelNode | null;
/**
 * @param {string} xml - Insight Maker model XML string
 */
export function loadInsightMaker(xml: string): Model;
import { ModelNode } from "../../../ModelNode.js";
import { Model } from "../../Model.js";
