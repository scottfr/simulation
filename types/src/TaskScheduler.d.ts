export class TaskQueue {
    constructor(config: any);
    tasks: Tree;
    /** @type {(function(Material, Material, Material): void)[]} */
    onMoveEvents: ((arg0: Material, arg1: Material, arg2: Material) => void)[];
    debug: boolean;
    /**
     * @type {Material}
     */
    end: Material;
    /**
     * @type {Object<string, boolean>}
     */
    states: {
        [x: string]: boolean;
    };
    /** @type {import("../vendor/avl/avl").Node} */
    cursor: import("../vendor/avl/avl").Node;
    print(): void;
    /**
     * @param {(function(Material, Material, Material): void)} event
     */
    addEvent(event: ((arg0: Material, arg1: Material, arg2: Material) => void)): void;
    /**
     * @param {Material} timeChange
     * @param {Material} oldTime
     * @param {Material} newTime
     */
    fireEvents(timeChange: Material, oldTime: Material, newTime: Material): void;
    /**
     * @param {Material} t
     */
    setTime(t: Material): void;
    time: Material | undefined;
    /**
     * @param {Material} newTime
     */
    moveTo(newTime: Material): void;
    /**
     * @param {Task} task
     */
    add(task: Task): void;
    goNext(): void;
    goPrev(): void;
    step(): void;
    stepBack(): void;
    /**
     * @returns {boolean}
     */
    atStart(): boolean;
    /**
     * @returns {boolean}
     */
    completed(): boolean;
    /**
     * @param {Task} task
     */
    remove(task: Task): void;
}
export class Task {
    /**
     * @param {Object} config
     * @param {string} config.name
     * @param {Material} config.time
     * @param {(function(Task) : void) & {task?: Task, reverse?: Task}} config.action
     * @param {function=} config.rollback
     * @param {number=} config.priority
     * @param {number=} config.expires
     * @param {function=} config.timeShift
     * @param {any=} config.data
     * @param {string=} config.blocker
     */
    constructor(config: {
        name: string;
        time: Material;
        action: ((arg0: Task) => void) & {
            task?: Task;
            reverse?: Task;
        };
        rollback?: Function | undefined;
        priority?: number | undefined;
        expires?: number | undefined;
        timeShift?: Function | undefined;
        data?: any | undefined;
        blocker?: string | undefined;
    });
    /** @type {number} */
    id: number;
    name: string;
    time: Material;
    action: ((arg0: Task) => void) & {
        task?: Task;
        reverse?: Task;
    };
    reverse: Function | undefined;
    priority: number;
    expires: number | undefined;
    timeShift: Function | undefined;
    data: any;
    blocker: string | undefined;
    queue: any;
    deadAction: boolean;
    deadReverse: boolean;
    execute(): void;
    rollback(): void;
    /**
     * @param {Material} newTime
     */
    reschedule(newTime: Material): void;
    remove(): void;
    kill(): void;
    /**
     * @param {string=} id
     */
    block(id?: string | undefined): void;
    /**
     * @param {string=} id
     */
    unblock(id?: string | undefined): void;
    toString(): string;
}
import Tree from "../vendor/avl/avl.js";
import { Material } from "./formula/Material.js";
