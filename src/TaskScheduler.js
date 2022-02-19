import { mult, greaterThan, minus, eq, neq, lessThan } from "./formula/Formula.js";
import { Material } from "./formula/Material.js";
import Tree from "../vendor/avl/avl.js";


export class TaskQueue {
  constructor(config) {
    config = config || {};
    this.tasks = new Tree(compare);
    /** @type {(function(Material, Material, Material): void)[]} */
    this.onMoveEvents = [];
    this.setTime(config.start);
    this.debug = false;

    /**
     * @type {Material}
     */
    this.end = config.end;

    /**
     * @type {Object<number, boolean>}
     */
    this.states = {};

    /** @type {import("../vendor/avl/avl").Node} */
    this.cursor = null;
  }

  print() {
    console.log("Current Time: " + this.time.value);
    let cursor = this.tasks.minNode();
    while (cursor) {
      console.log(cursor.key.name);
      console.log("    Time: " + cursor.key.time.value);
      console.log("    Priority: " + cursor.key.priority);
      if (cursor.key.expires !== undefined) {
        console.log("    Expires: " + cursor.key.expires);
      }
      if (cursor.key.skip !== undefined) {
        console.log("    Skip: " + cursor.key.skip);
      }
      cursor = this.tasks.next(cursor);
    }
  }

  /**
   * @param {(function(Material, Material, Material): void)} event
   */
  addEvent(event) {
    this.onMoveEvents.push(event);
  }

  /**
   * @param {Material} timeChange
   * @param {Material} oldTime
   * @param {Material} newTime
   */
  fireEvents(timeChange, oldTime, newTime) {
    if (this.debug) {
      console.log("Firing Events");
    }
    for (let i = 0; i < this.onMoveEvents.length; i++) {
      this.onMoveEvents[i](timeChange, oldTime, newTime);
    }
  }

  /**
   * @param {Material} t
   */
  setTime(t) {
    if (this.time === undefined || neq(t, this.time)) {
      let oldTime = this.time;

      this.time = t;

      if (oldTime !== undefined) {
        this.fireEvents(minus(t, oldTime), oldTime, t);
      }

    }
  }

  /**
   * @param {Material} newTime
   */
  moveTo(newTime) {
    if (eq(this.time, newTime)) {
      return;
    } else {
      if (this.debug) {
        console.log("Shifting time to: " + newTime.value);
      }

      if (this.cursor) { // we have something defined
        let maxTime = this.tasks.max().time;
        let minTime = this.tasks.min().time;

        while (lessThan(this.time, newTime) && (!greaterThan(this.time, maxTime))) {
          this.step();
        }
        while (greaterThan(this.time, newTime) && greaterThan(this.time, minTime)) {
          this.stepBack();
        }
      }

      this.setTime(newTime);

      if (this.debug) {
        console.log("Time shift to  " + newTime.value + " completed.");
      }
    }
  }

  /**
   * @param {Task} task
   */
  add(task) {
    task.queue = this;

    this.tasks.insert(task);
  }

  goNext() {
    this.cursor = this.tasks.next(this.cursor);
  }

  goPrev() {
    this.cursor = this.tasks.prev(this.cursor);
  }

  step() {
    if (this.time === undefined) {
      this.cursor = this.tasks.minNode();
      this.setTime(this.cursor.key.time);
    }


    let current = this.cursor.key;
    if (current) {
      let dead = current.deadAction;
      current.execute();

      if ((!dead) && current.timeShift) {
        current.timeShift();
        return;
      }
      this.goNext();
    }

    if (this.cursor) {
      this.setTime(this.cursor.key.time);
    } else {
      this.goNext();
      this.setTime(mult(/** @type {Material} */ (this.tasks.max().time), new Material(10)));
    }
  }

  stepBack() {
    if (this.time === undefined) {
      this.cursor = this.tasks.minNode();
      this.setTime(this.cursor.key.time);
      return;
    }

    if (!this.cursor) {
      this.cursor = this.tasks.maxNode();
    } else {
      this.goPrev();
    }

    let t = this.cursor.key.time;
    while (this.cursor && eq(t, this.cursor.key.time)) {
      this.cursor.key.rollback();
      this.goPrev();
    }

    if (!this.cursor) {
      this.cursor = this.tasks.minNode();
    } else {
      this.goNext();
    }

    this.setTime(this.cursor.key.time);
  }

  /**
   * @returns {boolean}
   */
  atStart() {
    return this.time === undefined || this.cursor.key === this.tasks.min();
  }

  /**
   * @returns {boolean}
   */
  completed() {
    return this.time !== undefined && (greaterThan(this.time, this.end) || (!this.cursor));
  }

  /**
   * @param {Task} task
   */
  remove(task) {
    if (task === this.cursor.key) {
      this.goNext();
    }
    this.tasks.remove(task);
  }
}


let taskIdCounter = 0;

// new Task({name: "solver", time: t, action: fn(), rollback: fn(), priority: -10, expires: 1})
export class Task {
  /**
   * @param {Object} config
   * @param {string} config.name
   * @param {Material} config.time
   * @param {(function(Task) : void) & {task?: Task, reverse?: Task}} config.action
   * @param {function=} config.rollback
   * @param {number=} config.priority
   * @param {number=} config.expires
   * @param {number=} config.skip
   * @param {function=} config.timeShift
   * @param {any=} config.data
   * @param {string=} config.blocker
   */
  constructor(config) {
    /** @type {number} */
    this.id = taskIdCounter++; // must be numeric as we use it in equality comparisons
    this.name = config.name;
    this.time = config.time;

    if (!this.time) {
      throw new TypeError("Task time is missing.");
    }

    if (isNaN(this.time.value)) {
      throw new TypeError("Task time is a NaN.");
    }

    this.action = config.action;
    this.reverse = config.rollback;
    this.priority = config.priority || 0; // Lower priorities will be run before higher priorities at the same time
    this.expires = config.expires; // if defined, the number of times this is called before it expires
    this.skip = config.skip;
    this.timeShift = config.timeShift;
    this.data = config.data; // optional data object to be carried along, the task scheduler makes no use of this
    this.blocker = config.blocker;
    this.queue = undefined;

    this.deadAction = false; // once dead no longer executes
    this.deadReverse = false; // once dead no longer executes

    if (this.action) {
      this.action.task = this;
    }
    if (this.reverse) {
      this.action.reverse = this;
    }

  }

  execute() {
    if (this.action && (!this.deadAction) && ((!this.blocker) || !this.queue.states[this.blocker])) {
      if (this.skip !== undefined && this.skip > 0) {
        this.skip--;
        if (this.queue.debug) {
          console.log("Skipping: " + this.name);
        }
      } else {
        if (this.queue.debug) {
          console.log("%c Executing: " + this.name + " (Time: " + this.time.value + ")", "color:blue");
        }

        if (this.expires !== undefined) {
          this.expires--;
          if (this.queue.debug) {
            console.log("    Current count before expire: " + this.expires);
          }
          if (this.expires <= 0) {
            if (this.queue.debug) {
              console.log("    Task expired.");
            }
            this.deadAction = true;
          }
        }
      }


      this.action(this);
    }
  }

  rollback() {
    if (this.reverse && (!this.deadReverse) && ((!this.blocker) || !this.queue.states[this.blocker])) {
      if (this.queue.debug) {
        console.log("Rolling back: " + this.name + " (Time: " + this.time.value + ")");
      }

      if (this.expires !== undefined) {
        if (this.expires <= 0) {
          if (this.queue.debug) {
            console.log("    Rollback expired.");
          }
          this.deadReverse = true;
        }
      }

      this.reverse();
    }
  }

  /**
   * @param {Material} newTime
   */
  reschedule(newTime) {
    this.queue.remove(this);
    this.time = newTime;
    this.queue.add(this);
  }

  remove() {
    this.queue.remove(this);
  }

  kill() {
    this.deadAction = true;
    this.deadReverse = true;
  }

  /**
   * @param {string=} id
   */
  block(id) {
    id = id || this.blocker;
    this.queue.states[id] = true;
  }

  /**
   * @param {string=} id
   */
  unblock(id) {
    id = id || this.blocker;
    this.queue.states[id] = false;
  }

  toString() {
    return this.name + " - " + this.id;
  }
}



/**
 * Sorts by:
 *   - first by time
 *   - then by priority
 *   - then by creation order (id)
 *
 * @param {Task} a
 * @param {Task} b
 *
 * @returns {number}
 */
function compare(a, b) {
  if (eq(b.time, a.time)) {
    if (b.priority === a.priority) {
      if (b.id === a.id) {
        return 0;
      } else if (b.id < a.id) {
        return 1;
      } else {
        return -1;
      }
    } else if (b.priority < a.priority) {
      return 1;
    } else {
      return -1;
    }
  } else {
    if (lessThan(b.time, a.time)) {
      return 1;
    } else {
      return -1;
    }
  }
}
