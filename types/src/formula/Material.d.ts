/**
 * Find a unit shared by all materials. Or null if they are all unitless.
 *
 * @param {Material[]} materials
 * @returns {{ units: import("./Units").UnitStore|null, explicitUnits: boolean }}
 */
export function findSharedUnits(materials: Material[]): {
    units: import("./Units").UnitStore | null;
    explicitUnits: boolean;
};
/** @typedef {"MATERIAL"|"VECTOR"|"PRIMITIVE"|null} OperandType */
/**
 * @param {Material|UnitStore} lhs
 * @param {Material|UnitStore} rhs
 * @param {string} type
 * @param {string=} operator
 * @param {import("./Formula").TreeNode=} lhsNode
 * @param {import("./Formula").TreeNode=} rhsNode
 */
export function unitAlert(lhs: Material | UnitStore, rhs: Material | UnitStore, type: string, operator?: string | undefined, lhsNode?: import("./Formula").TreeNode | undefined, rhsNode?: import("./Formula").TreeNode | undefined): void;
export class Material {
    /**
     * @param {number} value
     * @param {import("./Units").UnitStore=} units
     * @param {boolean=} explicitUnits
     */
    constructor(value: number, units?: import("./Units").UnitStore | undefined, explicitUnits?: boolean | undefined);
    /** @type {number} */
    value: number;
    /** @type {import("./Units").UnitStore|undefined} */
    units: import("./Units").UnitStore | undefined;
    /** @type {boolean} */
    explicitUnits: boolean;
    /**
     * @returns {Material}
     */
    toNum(): Material;
    toString(): string;
    fullClone(): Material;
    /**
     * @param {import("./Units").UnitStore} newUnits
     *
     * @returns {Material}
     */
    forceUnits(newUnits: import("./Units").UnitStore): Material;
}
export type OperandType = "MATERIAL" | "VECTOR" | "PRIMITIVE" | null;
import { UnitStore } from "./Units.js";
