// @ts-nocheck
//#region node_modules/antlr4ng/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var IntStream;
((IntStream2) => {
	IntStream2.EOF = -1;
	IntStream2.UNKNOWN_SOURCE_NAME = "<unknown>";
})(IntStream || (IntStream = {}));
var Token;
((Token2) => {
	Token2.INVALID_TYPE = 0;
	Token2.EPSILON = -2;
	Token2.MIN_USER_TOKEN_TYPE = 1;
	Token2.EOF = IntStream.EOF;
	Token2.DEFAULT_CHANNEL = 0;
	Token2.HIDDEN_CHANNEL = 1;
	Token2.MIN_USER_CHANNEL_VALUE = 2;
})(Token || (Token = {}));
var isToken = /* @__PURE__ */ __name((candidate) => {
	const token = candidate;
	return token.tokenSource !== void 0 && token.channel !== void 0;
}, "isToken");
var BitSet = class {
	static {
		__name(this, "BitSet");
	}
	data;
	/**
	* Creates a new bit set. All bits are initially `false`.
	*
	* @param data Optional initial data.
	*/
	constructor(data) {
		if (data) this.data = new Uint32Array(data.map((value) => {
			return value >>> 0;
		}));
		else this.data = new Uint32Array(1);
	}
	/**
	* @returns an iterator over all set bits.
	*/
	[Symbol.iterator]() {
		const length = this.data.length;
		let currentIndex = 0;
		let currentWord = this.data[currentIndex];
		const words = this.data;
		return {
			[Symbol.iterator]() {
				return this;
			},
			next: /* @__PURE__ */ __name(() => {
				while (currentIndex < length) if (currentWord !== 0) {
					const t = currentWord & -currentWord;
					const value = (currentIndex << 5) + this.bitCount(t - 1);
					currentWord ^= t;
					return {
						done: false,
						value
					};
				} else {
					currentIndex++;
					if (currentIndex < length) currentWord = words[currentIndex];
				}
				return {
					done: true,
					value: void 0
				};
			}, "next")
		};
	}
	/**
	* Sets a single bit or all of the bits in this `BitSet` to `false`.
	*
	* @param index the index of the bit to be cleared, or undefined to clear all bits.
	*/
	clear(index) {
		if (index === void 0) this.data = new Uint32Array();
		else {
			this.resize(index);
			this.data[index >>> 5] &= ~(1 << index);
		}
	}
	/**
	* Performs a logical **OR** of this bit set with the bit set argument. This bit set is modified so that a bit in it
	* has the value `true` if and only if it either already had the value `true` or the corresponding bit in the bit
	* set argument has the value `true`.
	*
	* @param set the bit set to be ORed with.
	*/
	or(set) {
		const minCount = Math.min(this.data.length, set.data.length);
		for (let k = 0; k < minCount; ++k) this.data[k] |= set.data[k];
		if (this.data.length < set.data.length) {
			this.resize((set.data.length << 5) - 1);
			const c = set.data.length;
			for (let k = minCount; k < c; ++k) this.data[k] = set.data[k];
		}
	}
	/**
	* Returns the value of the bit with the specified index. The value is `true` if the bit with the index `bitIndex`
	* is currently set in this `BitSet`; otherwise, the result is `false`.
	*
	* @param index the bit index
	*
	* @returns the value of the bit with the specified index.
	*/
	get(index) {
		if (index < 0) throw new RangeError("index cannot be negative");
		const slot = index >>> 5;
		if (slot >= this.data.length) return false;
		return (this.data[slot] & 1 << index % 32) !== 0;
	}
	/**
	* @returns the number of set bits.
	*/
	get length() {
		let result = 0;
		const c = this.data.length;
		const w = this.data;
		for (let i = 0; i < c; i++) result += this.bitCount(w[i]);
		return result;
	}
	/**
	* @returns an array with indices of set bits.
	*/
	values() {
		const result = new Array(this.length);
		let pos = 0;
		const length = this.data.length;
		for (let k = 0; k < length; ++k) {
			let w = this.data[k];
			while (w !== 0) {
				const t = w & -w;
				result[pos++] = (k << 5) + this.bitCount(t - 1);
				w ^= t;
			}
		}
		return result;
	}
	/**
	* @returns the index of the first bit that is set to `true` that occurs on or after the specified starting index.
	* If no such bit exists then undefined is returned.
	*
	* @param fromIndex the index to start checking from (inclusive)
	*/
	nextSetBit(fromIndex) {
		if (fromIndex < 0) throw new RangeError("index cannot be negative");
		for (const index of this) if (index >= fromIndex) return index;
	}
	/**
	* Sets the bit at the specified index to `true`.
	*
	* @param index a bit index
	*/
	set(index) {
		if (index < 0) throw new RangeError("index cannot be negative");
		this.resize(index);
		this.data[index >>> 5] |= 1 << index % 32;
	}
	/**
	* @returns a string representation of this bit set.
	*/
	toString() {
		return "{" + this.values().join(", ") + "}";
	}
	resize(index) {
		const count = index + 32 >>> 5;
		if (count <= this.data.length) return;
		const data = new Uint32Array(count);
		data.set(this.data);
		data.fill(0, this.data.length);
		this.data = data;
	}
	bitCount(v) {
		v = v - (v >> 1 & 1431655765);
		v = (v & 858993459) + (v >> 2 & 858993459);
		v = v + (v >> 4) & 252645135;
		v = v + (v >> 8);
		v = v + (v >> 16);
		return v & 63;
	}
};
var c1 = 3432918353;
var c2 = 461845907;
var r1 = 15;
var r2 = 13;
var m = 5;
var n = 3864292196;
var MurmurHash = class _MurmurHash {
	static {
		__name(this, "MurmurHash");
	}
	static defaultSeed = 701;
	constructor() {}
	/**
	* Initialize the hash using the specified {@code seed}.
	*
	* @param seed the seed
	*
	* @returns the intermediate hash value
	*/
	static initialize(seed = _MurmurHash.defaultSeed) {
		return seed;
	}
	static updateFromComparable(hash, value) {
		return this.update(hash, value?.hashCode() ?? 0);
	}
	/**
	* Update the intermediate hash value for the next input {@code value}.
	*
	* @param hash The intermediate hash value.
	* @param value the value to add to the current hash.
	*
	* @returns the updated intermediate hash value
	*/
	static update(hash, value) {
		value = Math.imul(value, c1);
		value = value << r1 | value >>> 32 - r1;
		value = Math.imul(value, c2);
		hash = hash ^ value;
		hash = hash << r2 | hash >>> 32 - r2;
		hash = Math.imul(hash, m) + n;
		return hash;
	}
	/**
	* Apply the final computation steps to the intermediate value {@code hash}
	* to form the final result of the MurmurHash 3 hash function.
	*
	* @param hash The intermediate hash value.
	* @param entryCount The number of values added to the hash.
	*
	* @returns the final hash result
	*/
	static finish(hash, entryCount) {
		hash ^= entryCount * 4;
		hash ^= hash >>> 16;
		hash = Math.imul(hash, 2246822507);
		hash ^= hash >>> 13;
		hash = Math.imul(hash, 3266489909);
		hash ^= hash >>> 16;
		return hash;
	}
	/**
	* An all-in-one convenience method to compute a hash for a single value.
	*
	* @param value The value to hash.
	* @param seed The seed for the hash value.
	*
	* @returns The computed hash.
	*/
	static hashCode(value, seed) {
		return _MurmurHash.finish(_MurmurHash.update(seed ?? _MurmurHash.defaultSeed, value), 1);
	}
};
var ObjectEqualityComparator = class _ObjectEqualityComparator {
	static {
		__name(this, "ObjectEqualityComparator");
	}
	static instance = new _ObjectEqualityComparator();
	hashCode(obj) {
		if (obj == null) return 0;
		return obj.hashCode();
	}
	equals(a, b) {
		if (a == null) return b == null;
		return a.equals(b);
	}
};
var DefaultEqualityComparator = class _DefaultEqualityComparator {
	static {
		__name(this, "DefaultEqualityComparator");
	}
	static instance = new _DefaultEqualityComparator();
	hashCode(obj) {
		if (obj == null) return 0;
		return ObjectEqualityComparator.instance.hashCode(obj);
	}
	equals(a, b) {
		if (a == null) return b == null;
		if (typeof a === "string" || typeof a === "number") return a === b;
		return ObjectEqualityComparator.instance.equals(a, b);
	}
};
var HashSet = class _HashSet {
	static {
		__name(this, "HashSet");
	}
	static defaultLoadFactor = .75;
	static initialCapacity = 16;
	comparator;
	buckets;
	threshold;
	/** How many elements in set */
	itemCount = 0;
	constructor(comparatorOrSet, initialCapacity = _HashSet.initialCapacity) {
		if (comparatorOrSet instanceof _HashSet) {
			this.comparator = comparatorOrSet.comparator;
			this.buckets = comparatorOrSet.buckets.slice(0);
			for (let i = 0; i < this.buckets.length; i++) {
				const bucket = this.buckets[i];
				if (bucket) this.buckets[i] = bucket.slice(0);
			}
			this.itemCount = comparatorOrSet.itemCount;
			this.threshold = comparatorOrSet.threshold;
		} else {
			this.comparator = comparatorOrSet ?? DefaultEqualityComparator.instance;
			this.buckets = this.createBuckets(initialCapacity);
			this.threshold = Math.floor(_HashSet.initialCapacity * _HashSet.defaultLoadFactor);
		}
	}
	/**
	* Add `o` to set if not there; return existing value if already
	* there. This method performs the same operation as {@link #add} aside from
	* the return value.
	*
	* @param o the object to add to the set.
	*
	* @returns An existing element that equals to `o` if already in set, otherwise `o`.
	*/
	getOrAdd(o) {
		if (this.itemCount > this.threshold) this.expand();
		const b = this.getBucket(o);
		let bucket = this.buckets[b];
		if (!bucket) {
			bucket = [o];
			this.buckets[b] = bucket;
			++this.itemCount;
			return o;
		}
		for (const existing of bucket) if (this.comparator.equals(existing, o)) return existing;
		bucket.push(o);
		++this.itemCount;
		return o;
	}
	get(o) {
		if (o == null) return o;
		const b = this.getBucket(o);
		const bucket = this.buckets[b];
		if (!bucket) return;
		for (const e of bucket) if (this.comparator.equals(e, o)) return e;
	}
	/**
	* Removes the specified element from this set if it is present.
	*
	* @param o object to be removed from this set, if present.
	*
	* @returns `true` if the set contained the specified element.
	*/
	remove(o) {
		if (o == null) return false;
		const b = this.getBucket(o);
		const bucket = this.buckets[b];
		if (!bucket) return false;
		for (let i = 0; i < bucket.length; i++) {
			const existing = bucket[i];
			if (this.comparator.equals(existing, o)) {
				bucket.splice(i, 1);
				--this.itemCount;
				return true;
			}
		}
		return false;
	}
	hashCode() {
		let hash = MurmurHash.initialize();
		for (const bucket of this.buckets) {
			if (bucket == null) continue;
			for (const o of bucket) {
				if (o == null) break;
				hash = MurmurHash.update(hash, this.comparator.hashCode(o));
			}
		}
		hash = MurmurHash.finish(hash, this.size);
		return hash;
	}
	equals(o) {
		if (o === this) return true;
		if (!(o instanceof _HashSet)) return false;
		if (o.size !== this.size) return false;
		return this.containsAll(o);
	}
	add(t) {
		return this.getOrAdd(t) === t;
	}
	contains(o) {
		return this.containsFast(o);
	}
	containsFast(obj) {
		if (obj == null) return false;
		return this.get(obj) !== void 0;
	}
	*[Symbol.iterator]() {
		yield* this.toArray();
	}
	toArray() {
		const a = new Array(this.size);
		let i = 0;
		for (const bucket of this.buckets) {
			if (bucket == null) continue;
			for (const o of bucket) {
				if (o == null) break;
				a[i++] = o;
			}
		}
		return a;
	}
	containsAll(collection) {
		if (collection instanceof _HashSet) for (const bucket of collection.buckets) {
			if (bucket == null) continue;
			for (const o of bucket) {
				if (o == null) break;
				if (!this.containsFast(o)) return false;
			}
		}
		else for (const o of collection) if (!this.containsFast(o)) return false;
		return true;
	}
	addAll(c) {
		let changed = false;
		for (const o of c) if (this.getOrAdd(o) !== o) changed = true;
		return changed;
	}
	clear() {
		this.buckets = this.createBuckets(_HashSet.initialCapacity);
		this.itemCount = 0;
		this.threshold = Math.floor(_HashSet.initialCapacity * _HashSet.defaultLoadFactor);
	}
	toString() {
		if (this.size === 0) return "{}";
		let buf = "{";
		let first = true;
		for (const bucket of this.buckets) {
			if (bucket == null) continue;
			for (const o of bucket) {
				if (o == null) break;
				if (first) first = false;
				else buf += ", ";
				buf += o.toString();
			}
		}
		buf += "}";
		return buf;
	}
	toTableString() {
		let buf = "";
		for (const bucket of this.buckets) {
			if (bucket == null) {
				buf += "null\n";
				continue;
			}
			buf += "[";
			let first = true;
			for (const o of bucket) {
				if (first) first = false;
				else buf += " ";
				if (o == null) buf += "_";
				else buf += o.toString();
			}
			buf += "]\n";
		}
		return buf;
	}
	getBucket(o) {
		return this.comparator.hashCode(o) & this.buckets.length - 1;
	}
	expand() {
		const old = this.buckets;
		const newCapacity = this.buckets.length * 2;
		this.buckets = this.createBuckets(newCapacity);
		this.threshold = Math.floor(newCapacity * _HashSet.defaultLoadFactor);
		for (const bucket of old) {
			if (!bucket) continue;
			for (const o of bucket) {
				const b = this.getBucket(o);
				let newBucket = this.buckets[b];
				if (!newBucket) {
					newBucket = [];
					this.buckets[b] = newBucket;
				}
				newBucket.push(o);
			}
		}
	}
	get size() {
		return this.itemCount;
	}
	get isEmpty() {
		return this.itemCount === 0;
	}
	/**
	* Return an array of `T[]` with length `capacity`.
	*
	* @param capacity the length of the array to return
	* @returns the newly constructed array
	*/
	createBuckets(capacity) {
		return new Array(capacity);
	}
};
var Interval = class _Interval {
	static {
		__name(this, "Interval");
	}
	static INVALID_INTERVAL = new _Interval(-1, -2);
	static INTERVAL_POOL_MAX_VALUE = 1e3;
	static cache = [];
	start;
	stop;
	cachedHashCode;
	constructor(start, stop) {
		this.start = start;
		this.stop = stop;
		this.cachedHashCode = Math.imul(651 + start, 31) + stop;
	}
	/**
	* Creates a new interval from the given values.
	*
	* Interval objects are used readonly so share all with the
	* same single value a==b up to some max size. Use an array as a perfect hash.
	* Return shared object for 0..INTERVAL_POOL_MAX_VALUE or a new
	* Interval object with a..a in it.  On Java.g4, 218623 IntervalSets
	* have a..a (set with 1 element).
	*
	* @param a The start of the interval.
	* @param b The end of the interval (inclusive).
	*
	* @returns A cached or new interval.
	*/
	static of(a, b) {
		if (a !== b || a < 0 || a > _Interval.INTERVAL_POOL_MAX_VALUE) return new _Interval(a, b);
		if (!_Interval.cache[a]) _Interval.cache[a] = new _Interval(a, a);
		return _Interval.cache[a];
	}
	equals(o) {
		return this.start === o.start && this.stop === o.stop;
	}
	hashCode() {
		return this.cachedHashCode;
	}
	/** Does this start completely before other? Disjoint */
	startsBeforeDisjoint(other) {
		return this.start < other.start && this.stop < other.start;
	}
	/** Does this start at or before other? Nondisjoint */
	startsBeforeNonDisjoint(other) {
		return this.start <= other.start && this.stop >= other.start;
	}
	/** Does this.start start after other.stop? May or may not be disjoint */
	startsAfter(other) {
		return this.start > other.start;
	}
	/** Does this start completely after other? Disjoint */
	startsAfterDisjoint(other) {
		return this.start > other.stop;
	}
	/** Does this start after other? NonDisjoint */
	startsAfterNonDisjoint(other) {
		return this.start > other.start && this.start <= other.stop;
	}
	/** Are both ranges disjoint? I.e., no overlap? */
	disjoint(other) {
		return this.startsBeforeDisjoint(other) || this.startsAfterDisjoint(other);
	}
	/** Are two intervals adjacent such as 0..41 and 42..42? */
	adjacent(other) {
		return this.start === other.stop + 1 || this.stop === other.start - 1;
	}
	properlyContains(other) {
		return other.start >= this.start && other.stop <= this.stop;
	}
	/** Return the interval computed from combining this and other */
	union(other) {
		return _Interval.of(Math.min(this.start, other.start), Math.max(this.stop, other.stop));
	}
	/** Return the interval in common between this and o */
	intersection(other) {
		return _Interval.of(Math.max(this.start, other.start), Math.min(this.stop, other.stop));
	}
	/**
	* Return the interval with elements from this not in other;
	*  other must not be totally enclosed (properly contained)
	*  within this, which would result in two disjoint intervals
	*  instead of the single one returned by this method.
	*/
	differenceNotProperlyContained(other) {
		let diff = null;
		if (other.startsBeforeNonDisjoint(this)) diff = _Interval.of(Math.max(this.start, other.stop + 1), this.stop);
		else if (other.startsAfterNonDisjoint(this)) diff = _Interval.of(this.start, other.start - 1);
		return diff;
	}
	toString() {
		return `${this.start}..${this.stop}`;
	}
	get length() {
		if (this.stop < this.start) return 0;
		return this.stop - this.start + 1;
	}
};
var Vocabulary = class _Vocabulary {
	static {
		__name(this, "Vocabulary");
	}
	static EMPTY_NAMES = [];
	/**
	* Gets an empty {@link Vocabulary} instance.
	*
	*
	* No literal or symbol names are assigned to token types, so
	* {@link #getDisplayName(int)} returns the numeric value for all tokens
	* except {@link Token#EOF}.
	*/
	static EMPTY_VOCABULARY = new _Vocabulary(_Vocabulary.EMPTY_NAMES, _Vocabulary.EMPTY_NAMES, _Vocabulary.EMPTY_NAMES);
	maxTokenType;
	literalNames;
	symbolicNames;
	displayNames;
	/**
	* Constructs a new instance of {@link Vocabulary} from the specified
	* literal, symbolic, and display token names.
	*
	* @param literalNames The literal names assigned to tokens, or `null`
	* if no literal names are assigned.
	* @param symbolicNames The symbolic names assigned to tokens, or
	* `null` if no symbolic names are assigned.
	* @param displayNames The display names assigned to tokens, or `null`
	* to use the values in `literalNames` and `symbolicNames` as
	* the source of display names, as described in
	* {@link #getDisplayName(int)}.
	*/
	constructor(literalNames, symbolicNames, displayNames) {
		this.literalNames = literalNames ?? _Vocabulary.EMPTY_NAMES;
		this.symbolicNames = symbolicNames ?? _Vocabulary.EMPTY_NAMES;
		this.displayNames = displayNames ?? _Vocabulary.EMPTY_NAMES;
		this.maxTokenType = Math.max(this.displayNames.length, Math.max(this.literalNames.length, this.symbolicNames.length)) - 1;
	}
	/**
	* Returns a {@link Vocabulary} instance from the specified set of token
	* names. This method acts as a compatibility layer for the single
	* `tokenNames` array generated by previous releases of ANTLR.
	*
	* The resulting vocabulary instance returns `null` for
	* {@link getLiteralName getLiteralName(int)} and {@link getSymbolicName getSymbolicName(int)}, and the
	* value from `tokenNames` for the display names.
	*
	* @param tokenNames The token names, or `null` if no token names are
	* available.
	* @returns A {@link Vocabulary} instance which uses `tokenNames` for
	* the display names of tokens.
	*/
	static fromTokenNames(tokenNames) {
		if (tokenNames == null || tokenNames.length === 0) return _Vocabulary.EMPTY_VOCABULARY;
		const literalNames = [...tokenNames];
		const symbolicNames = [...tokenNames];
		for (let i = 0; i < tokenNames.length; i++) {
			const tokenName = tokenNames[i];
			if (tokenName == null) continue;
			if (tokenName.length > 0) {
				const firstChar = tokenName.codePointAt(0);
				if (firstChar === 39) {
					symbolicNames[i] = null;
					continue;
				} else if (firstChar >= 65 && firstChar <= 90) {
					literalNames[i] = null;
					continue;
				}
			}
			literalNames[i] = null;
			symbolicNames[i] = null;
		}
		return new _Vocabulary(literalNames, symbolicNames, tokenNames);
	}
	getMaxTokenType() {
		return this.maxTokenType;
	}
	getLiteralName(tokenType) {
		if (tokenType >= 0 && tokenType < this.literalNames.length) return this.literalNames[tokenType];
		return null;
	}
	getSymbolicName(tokenType) {
		if (tokenType >= 0 && tokenType < this.symbolicNames.length) return this.symbolicNames[tokenType];
		if (tokenType === Token.EOF) return "EOF";
		return null;
	}
	getDisplayName(tokenType) {
		if (tokenType >= 0 && tokenType < this.displayNames.length) {
			const displayName = this.displayNames[tokenType];
			if (displayName != null) return displayName;
		}
		const literalName = this.getLiteralName(tokenType);
		if (literalName != null) return literalName;
		const symbolicName = this.getSymbolicName(tokenType);
		if (symbolicName != null) return symbolicName;
		return `${tokenType}`;
	}
	getLiteralNames() {
		return this.literalNames;
	}
	getSymbolicNames() {
		return this.symbolicNames;
	}
	getDisplayNames() {
		return this.displayNames;
	}
};
var IntervalSet = class _IntervalSet {
	static {
		__name(this, "IntervalSet");
	}
	/** The list of sorted, disjoint intervals. */
	intervals = [];
	cachedHashCode;
	constructor(set) {
		if (set) if (Array.isArray(set)) for (const el of set) this.addOne(el);
		else this.addSet(set);
	}
	/** Create a set with all ints within range [a..b] (inclusive) */
	static of(a, b) {
		const s = new _IntervalSet();
		s.addRange(a, b);
		return s;
	}
	/** Combine all sets in the array and return the union of them */
	static or(sets) {
		const result = new _IntervalSet();
		for (const set of sets) result.addSet(set);
		return result;
	}
	[Symbol.iterator]() {
		return this.intervals[Symbol.iterator]();
	}
	get(index) {
		return this.intervals[index];
	}
	/**
	* Returns the minimum value contained in the set if not isNil().
	*
	* @returns the minimum value contained in the set.
	*/
	get minElement() {
		if (this.intervals.length === 0) return Token.INVALID_TYPE;
		return this.intervals[0].start;
	}
	/**
	* Returns the maximum value contained in the set if not isNil().
	*
	* @returns the maximum value contained in the set.
	*/
	get maxElement() {
		if (this.intervals.length === 0) return Token.INVALID_TYPE;
		return this.intervals[this.intervals.length - 1].stop;
	}
	clear() {
		this.cachedHashCode = void 0;
		this.intervals = [];
	}
	/**
	* Add a single element to the set.  An isolated element is stored
	*  as a range el..el.
	*/
	addOne(v) {
		this.addInterval(new Interval(v, v));
	}
	/**
	* Add interval; i.e., add all integers from a to b to set.
	*  If b < a, do nothing.
	*  Keep list in sorted order (by left range value).
	*  If overlap, combine ranges. For example,
	*  If this is {1..5, 10..20}, adding 6..7 yields
	*  {1..5, 6..7, 10..20}. Adding 4..8 yields {1..8, 10..20}.
	*/
	addRange(l, h) {
		this.addInterval(new Interval(l, h));
	}
	addInterval(addition) {
		this.cachedHashCode = void 0;
		if (this.intervals.length === 0) this.intervals.push(addition);
		else {
			for (let pos = 0; pos < this.intervals.length; pos++) {
				const existing = this.intervals[pos];
				if (addition.equals(existing)) return;
				if (addition.adjacent(existing) || !addition.disjoint(existing)) {
					const bigger = addition.union(existing);
					this.intervals[pos] = bigger;
					for (let sub = pos + 1; sub < this.intervals.length;) {
						const next = this.intervals[sub];
						if (!bigger.adjacent(next) && bigger.disjoint(next)) break;
						this.intervals.splice(sub, 1);
						this.intervals[pos] = bigger.union(next);
					}
					return;
				}
				if (addition.startsBeforeDisjoint(existing)) {
					this.intervals.splice(pos, 0, addition);
					return;
				}
			}
			this.intervals.push(addition);
		}
	}
	addSet(other) {
		other.intervals.forEach((toAdd) => {
			return this.addInterval(toAdd);
		}, this);
		return this;
	}
	complementWithVocabulary(vocabulary) {
		const result = new _IntervalSet();
		if (!vocabulary) return result;
		if (vocabulary.length === 0) return result;
		result.addSet(vocabulary);
		return result.subtract(this);
	}
	complement(minElement, maxElement) {
		const result = new _IntervalSet();
		result.addInterval(new Interval(minElement, maxElement));
		return result.subtract(this);
	}
	/** combine all sets in the array returned the or'd value */
	or(sets) {
		const result = new _IntervalSet();
		result.addSet(this);
		sets.forEach((set) => {
			return result.addSet(set);
		});
		return result;
	}
	and(other) {
		if (other.length === 0) return new _IntervalSet();
		const myIntervals = this.intervals;
		const theirIntervals = other.intervals;
		let intersection;
		const mySize = myIntervals.length;
		const theirSize = theirIntervals.length;
		let i = 0;
		let j = 0;
		while (i < mySize && j < theirSize) {
			const mine = myIntervals[i];
			const theirs = theirIntervals[j];
			if (mine.startsBeforeDisjoint(theirs)) i++;
			else if (theirs.startsBeforeDisjoint(mine)) j++;
			else if (mine.properlyContains(theirs)) {
				if (!intersection) intersection = new _IntervalSet();
				intersection.addInterval(mine.intersection(theirs));
				j++;
			} else if (theirs.properlyContains(mine)) {
				if (!intersection) intersection = new _IntervalSet();
				intersection.addInterval(mine.intersection(theirs));
				i++;
			} else if (!mine.disjoint(theirs)) {
				if (!intersection) intersection = new _IntervalSet();
				intersection.addInterval(mine.intersection(theirs));
				if (mine.startsAfterNonDisjoint(theirs)) j++;
				else if (theirs.startsAfterNonDisjoint(mine)) i++;
			}
		}
		if (!intersection) return new _IntervalSet();
		return intersection;
	}
	/**
	* Compute the set difference between two interval sets. The specific
	* operation is `left - right`. If either of the input sets is
	* `null`, it is treated as though it was an empty set.
	*/
	subtract(other) {
		if (this.length === 0) return new _IntervalSet();
		const result = new _IntervalSet(this);
		if (other.length === 0) return result;
		let resultI = 0;
		let rightI = 0;
		while (resultI < result.intervals.length && rightI < other.intervals.length) {
			const resultInterval = result.intervals[resultI];
			const rightInterval = other.intervals[rightI];
			if (rightInterval.stop < resultInterval.start) {
				rightI++;
				continue;
			}
			if (rightInterval.start > resultInterval.stop) {
				resultI++;
				continue;
			}
			let beforeCurrent;
			let afterCurrent;
			if (rightInterval.start > resultInterval.start) beforeCurrent = new Interval(resultInterval.start, rightInterval.start - 1);
			if (rightInterval.stop < resultInterval.stop) afterCurrent = new Interval(rightInterval.stop + 1, resultInterval.stop);
			if (beforeCurrent) if (afterCurrent) {
				result.intervals[resultI] = beforeCurrent;
				result.intervals.splice(resultI + 1, 0, afterCurrent);
				resultI++;
				rightI++;
			} else {
				result.intervals[resultI] = beforeCurrent;
				resultI++;
			}
			else if (afterCurrent) {
				result.intervals[resultI] = afterCurrent;
				rightI++;
			} else result.intervals.splice(resultI, 1);
		}
		return result;
	}
	contains(el) {
		const n2 = this.intervals.length;
		let l = 0;
		let r = n2 - 1;
		while (l <= r) {
			const m2 = Math.floor((l + r) / 2);
			const interval = this.intervals[m2];
			if (interval.stop < el) l = m2 + 1;
			else if (interval.start > el) r = m2 - 1;
			else return true;
		}
		return false;
	}
	removeRange(toRemove) {
		this.cachedHashCode = void 0;
		if (toRemove.start === toRemove.stop) this.removeOne(toRemove.start);
		else if (this.intervals !== null) {
			let pos = 0;
			for (const existing of this.intervals) {
				if (toRemove.stop <= existing.start) return;
				else if (toRemove.start > existing.start && toRemove.stop < existing.stop) {
					this.intervals[pos] = new Interval(existing.start, toRemove.start);
					const x = new Interval(toRemove.stop, existing.stop);
					this.intervals.splice(pos, 0, x);
					return;
				} else if (toRemove.start <= existing.start && toRemove.stop >= existing.stop) {
					this.intervals.splice(pos, 1);
					pos = pos - 1;
				} else if (toRemove.start < existing.stop) this.intervals[pos] = new Interval(existing.start, toRemove.start);
				else if (toRemove.stop < existing.stop) this.intervals[pos] = new Interval(toRemove.stop, existing.stop);
				pos += 1;
			}
		}
	}
	removeOne(value) {
		this.cachedHashCode = void 0;
		for (let i = 0; i < this.intervals.length; i++) {
			const existing = this.intervals[i];
			if (value < existing.start) return;
			else if (value === existing.start && value === existing.stop) {
				this.intervals.splice(i, 1);
				return;
			} else if (value === existing.start) {
				this.intervals[i] = new Interval(existing.start + 1, existing.stop);
				return;
			} else if (value === existing.stop) {
				this.intervals[i] = new Interval(existing.start, existing.stop - 1);
				return;
			} else if (value < existing.stop) {
				const replace = new Interval(existing.start, value - 1);
				this.intervals[i] = new Interval(value + 1, existing.stop);
				this.intervals.splice(i, 0, replace);
				return;
			}
		}
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			for (const interval of this.intervals) {
				hash = MurmurHash.update(hash, interval.start);
				hash = MurmurHash.update(hash, interval.stop);
			}
			this.cachedHashCode = MurmurHash.finish(hash, this.intervals.length * 2);
		}
		return this.cachedHashCode;
	}
	/**
	* Are two IntervalSets equal? Because all intervals are sorted and disjoint, equals is a simple linear walk over
	* both lists to make sure they are the same. Interval.equals() is used by the List.equals() method to check
	* the ranges.
	*/
	equals(other) {
		if (this === other) return true;
		if (this.intervals.length !== other.intervals.length) return false;
		for (let i = 0; i < this.intervals.length; i++) if (!this.intervals[i].equals(other.intervals[i])) return false;
		return true;
	}
	toString(elementsAreChar) {
		if (this.intervals.length === 0) return "{}";
		let result = "";
		if (this.length > 1) result += "{";
		for (let i = 0; i < this.intervals.length; ++i) {
			const interval = this.intervals[i];
			const start = interval.start;
			const stop = interval.stop;
			if (start === stop) if (start === Token.EOF) result += "<EOF>";
			else if (elementsAreChar) result += "'" + String.fromCodePoint(start) + "'";
			else result += start;
			else if (elementsAreChar) result += "'" + String.fromCodePoint(start) + "'..'" + String.fromCodePoint(stop) + "'";
			else result += start + ".." + stop;
			if (i < this.intervals.length - 1) result += ", ";
		}
		if (this.length > 1) result += "}";
		return result;
	}
	toStringWithVocabulary(vocabulary) {
		if (this.intervals.length === 0) return "{}";
		let result = "";
		if (this.length > 1) result += "{";
		for (let i = 0; i < this.intervals.length; ++i) {
			const interval = this.intervals[i];
			const start = interval.start;
			const stop = interval.stop;
			if (start === stop) if (start === Token.EOF) result += "<EOF>";
			else result += this.elementName(vocabulary, start);
			else for (let i2 = start; i2 <= stop; ++i2) {
				if (i2 > start) result += ", ";
				result += this.elementName(vocabulary, i2);
			}
			if (i < this.intervals.length - 1) result += ", ";
		}
		if (this.length > 1) result += "}";
		return result;
	}
	toStringWithRuleNames(ruleNames) {
		if (this.intervals.length === 0) return "{}";
		let result = "";
		if (this.length > 1) result += "{";
		const vocabulary = Vocabulary.fromTokenNames(ruleNames);
		for (let i = 0; i < this.intervals.length; ++i) {
			const interval = this.intervals[i];
			const start = interval.start;
			const stop = interval.stop;
			if (start === stop) if (start === Token.EOF) result += "<EOF>";
			else result += this.elementName(vocabulary, start);
			else for (let i2 = start; i2 <= stop; ++i2) {
				if (i2 > start) result += ", ";
				result += this.elementName(vocabulary, i2);
			}
			if (i < this.intervals.length - 1) result += ", ";
		}
		if (this.length > 1) result += "}";
		return result;
	}
	toArray() {
		const data = [];
		for (const interval of this.intervals) for (let j = interval.start; j <= interval.stop; j++) data.push(j);
		return data;
	}
	/** @returns the number of elements in this set. */
	get length() {
		let result = 0;
		for (const interval of this.intervals) result += interval.length;
		return result;
	}
	elementName(vocabulary, token) {
		if (token === Token.EOF) return "<EOF>";
		if (token === Token.EPSILON) return "<EPSILON>";
		return vocabulary.getDisplayName(token);
	}
};
var isComparable = /* @__PURE__ */ __name((candidate) => {
	return typeof candidate.equals === "function";
}, "isComparable");
var valueToString = /* @__PURE__ */ __name((v) => {
	return v === null ? "null" : v;
}, "valueToString");
var arrayToString = /* @__PURE__ */ __name((value) => {
	return Array.isArray(value) ? "[" + value.map(valueToString).join(", ") + "]" : "null";
}, "arrayToString");
var equalArrays = /* @__PURE__ */ __name((a, b) => {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		const left = a[i];
		const right = b[i];
		if (left === right) continue;
		if (!left || !left.equals(right)) return false;
	}
	return true;
}, "equalArrays");
var equalNumberArrays = /* @__PURE__ */ __name((a, b) => {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}, "equalNumberArrays");
var escapeWhitespace = /* @__PURE__ */ __name((s, escapeSpaces = false) => {
	s = s.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
	if (escapeSpaces) s = s.replace(/ /g, "·");
	return s;
}, "escapeWhitespace");
var SemanticContext = class _SemanticContext {
	static {
		__name(this, "SemanticContext");
	}
	cachedHashCode;
	static andContext(a, b) {
		if (a === null || a === _SemanticContext.NONE) return b;
		if (b === null || b === _SemanticContext.NONE) return a;
		const result = new AND(a, b);
		if (result.operands.length === 1) return result.operands[0];
		return result;
	}
	static orContext(a, b) {
		if (a === null) return b;
		if (b === null) return a;
		if (a === _SemanticContext.NONE || b === _SemanticContext.NONE) return _SemanticContext.NONE;
		const result = new OR(a, b);
		if (result.operands.length === 1) return result.operands[0];
		else return result;
	}
	static filterPrecedencePredicates(set) {
		const result = [];
		for (const context of set) if (context instanceof _SemanticContext.PrecedencePredicate) result.push(context);
		return result;
	}
	/**
	* Evaluate the precedence predicates for the context and reduce the result.
	*
	* @param _parser The parser instance.
	* @param _parserCallStack The current parser context object.
	* @returns The simplified semantic context after precedence predicates are
	* evaluated, which will be one of the following values.
	* - {@link NONE}: if the predicate simplifies to `true` after
	* precedence predicates are evaluated.
	* - `null`: if the predicate simplifies to `false` after
	* precedence predicates are evaluated.
	* - `this`: if the semantic context is not changed as a result of
	* precedence predicate evaluation.
	* - A non-`null` {@link SemanticContext}: the new simplified
	* semantic context after precedence predicates are evaluated.
	*/
	evalPrecedence(_parser, _parserCallStack) {
		return this;
	}
};
var AND = class _AND extends SemanticContext {
	static {
		__name(this, "AND");
	}
	operands;
	/**
	* A semantic context which is true whenever none of the contained contexts
	* is false
	*/
	constructor(a, b) {
		super();
		const operands = new HashSet();
		if (a instanceof _AND) a.operands.forEach((o) => {
			operands.add(o);
		});
		else operands.add(a);
		if (b instanceof _AND) b.operands.forEach((o) => {
			operands.add(o);
		});
		else operands.add(b);
		const precedencePredicates = SemanticContext.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			let reduced = null;
			precedencePredicates.forEach((p) => {
				if (reduced === null || p.precedence < reduced.precedence) reduced = p;
			});
			if (reduced) operands.add(reduced);
		}
		this.operands = operands.toArray();
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _AND)) return false;
		return equalArrays(this.operands, other.operands);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			for (const operand of this.operands) hash = MurmurHash.updateFromComparable(hash, operand);
			hash = MurmurHash.update(hash, 3813686060);
			this.cachedHashCode = MurmurHash.finish(hash, this.operands.length + 1);
		}
		return this.cachedHashCode;
	}
	/**
	* {@inheritDoc}
	*
	*
	* The evaluation of predicates by this context is short-circuiting, but
	* unordered.
	*/
	evaluate(parser, parserCallStack) {
		for (const operand of this.operands) if (!operand.evaluate(parser, parserCallStack)) return false;
		return true;
	}
	evalPrecedence(parser, parserCallStack) {
		let differs = false;
		const operands = [];
		for (const context of this.operands) {
			const evaluated = context.evalPrecedence(parser, parserCallStack);
			differs ||= evaluated !== context;
			if (evaluated === null) return null;
			else if (evaluated !== SemanticContext.NONE) operands.push(evaluated);
		}
		if (!differs) return this;
		if (operands.length === 0) return SemanticContext.NONE;
		let result = null;
		operands.forEach((o) => {
			result = result === null ? o : SemanticContext.andContext(result, o);
		});
		return result;
	}
	toString() {
		const s = this.operands.map((o) => {
			return o.toString();
		});
		return (s.length > 3 ? s.slice(3) : s).join("&&");
	}
};
var OR = class _OR extends SemanticContext {
	static {
		__name(this, "OR");
	}
	operands;
	/**
	* A semantic context which is true whenever at least one of the contained
	* contexts is true
	*/
	constructor(a, b) {
		super();
		const operands = new HashSet();
		if (a instanceof _OR) a.operands.forEach((o) => {
			operands.add(o);
		});
		else operands.add(a);
		if (b instanceof _OR) b.operands.forEach((o) => {
			operands.add(o);
		});
		else operands.add(b);
		const precedencePredicates = SemanticContext.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			const s = precedencePredicates.sort((a2, b2) => {
				return a2.compareTo(b2);
			});
			const reduced = s[s.length - 1];
			operands.add(reduced);
		}
		this.operands = operands.toArray();
	}
	equals(other) {
		if (this === other) return true;
		else if (!(other instanceof _OR)) return false;
		else return equalArrays(this.operands, other.operands);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			for (const operand of this.operands) hash = MurmurHash.updateFromComparable(hash, operand);
			hash = MurmurHash.update(hash, 3383313031);
			this.cachedHashCode = MurmurHash.finish(hash, this.operands.length + 1);
		}
		return this.cachedHashCode;
	}
	/**
	* The evaluation of predicates by this context is short-circuiting, but unordered.
	*/
	evaluate(parser, parserCallStack) {
		for (const operand of this.operands) if (operand.evaluate(parser, parserCallStack)) return true;
		return false;
	}
	evalPrecedence(parser, parserCallStack) {
		let differs = false;
		const operands = [];
		for (const context of this.operands) {
			const evaluated = context.evalPrecedence(parser, parserCallStack);
			differs ||= evaluated !== context;
			if (evaluated === SemanticContext.NONE) return SemanticContext.NONE;
			else if (evaluated !== null) operands.push(evaluated);
		}
		if (!differs) return this;
		if (operands.length === 0) return null;
		let result = null;
		operands.forEach((o) => {
			result = result === null ? o : SemanticContext.orContext(result, o);
		});
		return result;
	}
	toString() {
		const s = this.operands.map((o) => {
			return o.toString();
		});
		return (s.length > 3 ? s.slice(3) : s).join("||");
	}
};
((SemanticContext2) => {
	class Predicate extends SemanticContext2 {
		static {
			__name(this, "Predicate");
		}
		ruleIndex;
		predIndex;
		isCtxDependent;
		constructor(ruleIndex, predIndex, isCtxDependent) {
			super();
			this.ruleIndex = ruleIndex ?? -1;
			this.predIndex = predIndex ?? -1;
			this.isCtxDependent = isCtxDependent ?? false;
		}
		evaluate(parser, outerContext) {
			const localctx = this.isCtxDependent ? outerContext : null;
			return parser.sempred(localctx, this.ruleIndex, this.predIndex);
		}
		hashCode() {
			if (this.cachedHashCode === void 0) {
				let hashCode = MurmurHash.initialize();
				hashCode = MurmurHash.update(hashCode, this.ruleIndex);
				hashCode = MurmurHash.update(hashCode, this.predIndex);
				hashCode = MurmurHash.update(hashCode, this.isCtxDependent ? 1 : 0);
				hashCode = MurmurHash.finish(hashCode, 3);
				this.cachedHashCode = hashCode;
			}
			return this.cachedHashCode;
		}
		equals(other) {
			if (this === other) return true;
			return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
		}
		toString() {
			return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
		}
	}
	SemanticContext2.Predicate = Predicate;
	class PrecedencePredicate extends SemanticContext2 {
		static {
			__name(this, "PrecedencePredicate");
		}
		precedence;
		constructor(precedence) {
			super();
			this.precedence = precedence ?? 0;
		}
		evaluate(parser, outerContext) {
			return parser.precpred(outerContext, this.precedence);
		}
		evalPrecedence(parser, outerContext) {
			if (parser.precpred(outerContext ?? null, this.precedence)) return SemanticContext2.NONE;
			return null;
		}
		compareTo(other) {
			return this.precedence - other.precedence;
		}
		hashCode() {
			return 31 + this.precedence;
		}
		equals(other) {
			if (this === other) return true;
			return this.precedence === other.precedence;
		}
		toString() {
			return "{" + this.precedence + ">=prec}?";
		}
	}
	SemanticContext2.PrecedencePredicate = PrecedencePredicate;
	SemanticContext2.NONE = new Predicate();
})(SemanticContext || (SemanticContext = {}));
var ATNConfig = class _ATNConfig {
	static {
		__name(this, "ATNConfig");
	}
	/** The ATN state associated with this configuration */
	state;
	/** What alt (or lexer rule) is predicted by this configuration */
	alt;
	/**
	* We cannot execute predicates dependent upon local context unless
	* we know for sure we are in the correct context. Because there is
	* no way to do this efficiently, we simply cannot evaluate
	* dependent predicates unless we are in the rule that initially
	* invokes the ATN simulator.
	*
	* closure() tracks the depth of how far we dip into the outer context:
	* depth > 0.
	*/
	reachesIntoOuterContext = false;
	precedenceFilterSuppressed = false;
	get semanticContext() {
		return this.#semanticContext;
	}
	cachedHashCode;
	/**
	* The syntactic context is a graph-structured stack node whose
	* path(s) to the root is the rule invocation(s)
	* chain used to arrive at the state.  The semantic context is
	* the tree of semantic predicates encountered before reaching
	* an ATN state
	*/
	#context = null;
	#semanticContext;
	/** Never create config classes directly. Use the factory methods below. */
	constructor(c, state, context, semanticContext) {
		this.state = state;
		this.alt = c.alt;
		this.context = context;
		this.#semanticContext = semanticContext ?? SemanticContext.NONE;
		this.reachesIntoOuterContext = c.reachesIntoOuterContext;
		if (c.precedenceFilterSuppressed !== void 0) this.precedenceFilterSuppressed = c.precedenceFilterSuppressed;
	}
	static duplicate(old, semanticContext) {
		return new _ATNConfig(old, old.state, old.context, semanticContext ?? old.semanticContext);
	}
	static createWithContext(state, alt, context, semanticContext) {
		return new _ATNConfig({ alt }, state, context, semanticContext);
	}
	static createWithConfig(state, config, context) {
		return new _ATNConfig(config, state, context ?? config.context, config.semanticContext);
	}
	static createWithSemanticContext(state, c, semanticContext) {
		return new _ATNConfig(c, state ?? c.state, c.context, semanticContext);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hashCode = MurmurHash.initialize(7);
			hashCode = MurmurHash.update(hashCode, this.state.stateNumber);
			hashCode = MurmurHash.update(hashCode, this.alt);
			hashCode = MurmurHash.updateFromComparable(hashCode, this.#context);
			hashCode = MurmurHash.updateFromComparable(hashCode, this.semanticContext);
			hashCode = MurmurHash.finish(hashCode, 4);
			this.cachedHashCode = hashCode;
		}
		return this.cachedHashCode;
	}
	/**
	* The stack of invoking states leading to the rule/states associated
	* with this config.  We track only those contexts pushed during
	* execution of the ATN simulator.
	*/
	get context() {
		return this.#context;
	}
	set context(context) {
		this.#context = context;
		this.cachedHashCode = void 0;
	}
	/**
	* An ATN configuration is equal to another if both have
	* the same state, they predict the same alternative, and
	* syntactic/semantic contexts are the same.
	*/
	equals(other) {
		if (this === other) return true;
		return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
	}
	toString(_recog, showAlt = true) {
		let alt = "";
		if (showAlt) alt = "," + this.alt;
		return "(" + this.state + alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext ? ",up=" + this.reachesIntoOuterContext : "") + ")";
	}
};
var ATNState = class _ATNState {
	static {
		__name(this, "ATNState");
	}
	static INVALID_STATE_NUMBER = -1;
	static INVALID_TYPE = 0;
	static BASIC = 1;
	static RULE_START = 2;
	static BLOCK_START = 3;
	static PLUS_BLOCK_START = 4;
	static STAR_BLOCK_START = 5;
	static TOKEN_START = 6;
	static RULE_STOP = 7;
	static BLOCK_END = 8;
	static STAR_LOOP_BACK = 9;
	static STAR_LOOP_ENTRY = 10;
	static PLUS_LOOP_BACK = 11;
	static LOOP_END = 12;
	static stateType = _ATNState.INVALID_STATE_NUMBER;
	stateNumber = 0;
	ruleIndex = 0;
	epsilonOnlyTransitions = false;
	/** Used to cache lookahead during parsing, not used during construction */
	nextTokenWithinRule;
	/** Track the transitions emanating from this ATN state. */
	transitions = [];
	hashCode() {
		return this.stateNumber;
	}
	equals(other) {
		return this.stateNumber === other.stateNumber;
	}
	toString() {
		return `${this.stateNumber}`;
	}
	addTransitionAtIndex(index, transition) {
		if (this.transitions.length === 0) this.epsilonOnlyTransitions = transition.isEpsilon;
		else if (this.epsilonOnlyTransitions !== transition.isEpsilon) this.epsilonOnlyTransitions = false;
		this.transitions.splice(index, 0, transition);
	}
	addTransition(transition) {
		if (this.transitions.length === 0) this.epsilonOnlyTransitions = transition.isEpsilon;
		else if (this.epsilonOnlyTransitions !== transition.isEpsilon) this.epsilonOnlyTransitions = false;
		this.transitions.push(transition);
	}
	setTransition(i, e) {
		this.transitions.splice(i, 1, e);
	}
	removeTransition(index) {
		return this.transitions.splice(index, 1)[0];
	}
};
var PredictionContext = class _PredictionContext {
	static {
		__name(this, "PredictionContext");
	}
	/**
	* Represents `$` in an array in full context mode, when `$`
	* doesn't mean wildcard: `$ + x = [$,x]`. Here,
	* `$` = {@link EMPTY_RETURN_STATE}.
	*/
	static EMPTY_RETURN_STATE = 2147483647;
	static traceATNSimulator = false;
	cachedHashCode;
	constructor(cachedHashCode) {
		this.cachedHashCode = cachedHashCode;
	}
	static calculateEmptyHashCode() {
		let hash = MurmurHash.initialize(31);
		hash = MurmurHash.finish(hash, 0);
		return hash;
	}
	static calculateHashCodeSingle(parent, returnState) {
		let hash = MurmurHash.initialize(31);
		hash = MurmurHash.updateFromComparable(hash, parent);
		hash = MurmurHash.update(hash, returnState);
		hash = MurmurHash.finish(hash, 2);
		return hash;
	}
	static calculateHashCodeList(parents, returnStates) {
		let hash = MurmurHash.initialize(31);
		for (const parent of parents) hash = MurmurHash.updateFromComparable(hash, parent);
		for (const returnState of returnStates) hash = MurmurHash.update(hash, returnState);
		hash = MurmurHash.finish(hash, 2 * parents.length);
		return hash;
	}
	isEmpty() {
		return false;
	}
	hasEmptyPath() {
		return this.getReturnState(this.length - 1) === _PredictionContext.EMPTY_RETURN_STATE;
	}
	hashCode() {
		return this.cachedHashCode;
	}
	toString(_recog) {
		return "";
	}
};
var SingletonPredictionContext = class _SingletonPredictionContext extends PredictionContext {
	static {
		__name(this, "SingletonPredictionContext");
	}
	parent;
	returnState;
	constructor(parent, returnState) {
		super(parent ? PredictionContext.calculateHashCodeSingle(parent, returnState) : PredictionContext.calculateEmptyHashCode());
		this.parent = parent ?? null;
		this.returnState = returnState;
	}
	getParent(_index) {
		return this.parent;
	}
	getReturnState(_index) {
		return this.returnState;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _SingletonPredictionContext)) return false;
		if (this.hashCode() !== other.hashCode()) return false;
		if (this.returnState !== other.returnState) return false;
		if (this.parent == null) return other.parent == null;
		return this.parent.equals(other.parent);
	}
	toString() {
		const up = this.parent === null ? "" : this.parent.toString();
		if (up.length === 0) {
			if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) return "$";
			return "" + this.returnState;
		} else return "" + this.returnState + " " + up;
	}
	get length() {
		return 1;
	}
};
var EmptyPredictionContext = class _EmptyPredictionContext extends SingletonPredictionContext {
	static {
		__name(this, "EmptyPredictionContext");
	}
	/**
	* Represents `$` in local context prediction, which means wildcard.
	* `*+x = *`.
	*/
	static instance = new _EmptyPredictionContext();
	constructor() {
		super(void 0, PredictionContext.EMPTY_RETURN_STATE);
	}
	isEmpty() {
		return true;
	}
	getParent() {
		return null;
	}
	getReturnState() {
		return this.returnState;
	}
	equals(other) {
		return this === other;
	}
	toString() {
		return "$";
	}
};
var Transition = class {
	static {
		__name(this, "Transition");
	}
	static INVALID = 0;
	static EPSILON = 1;
	static RANGE = 2;
	static RULE = 3;
	static PREDICATE = 4;
	static ATOM = 5;
	static ACTION = 6;
	static SET = 7;
	static NOT_SET = 8;
	static WILDCARD = 9;
	static PRECEDENCE = 10;
	/** The target of this transition. */
	target;
	constructor(target) {
		this.target = target;
	}
	/**
	* Determines if the transition is an "epsilon" transition.
	*
	* The default implementation returns `false`.
	*
	* @returns `true` if traversing this transition in the ATN does not
	* consume an input symbol; otherwise, `false` if traversing this
	* transition consumes (matches) an input symbol.
	*/
	get isEpsilon() {
		return false;
	}
	get label() {
		return null;
	}
	toString() {
		return "";
	}
};
var SetTransition = class extends Transition {
	static {
		__name(this, "SetTransition");
	}
	set;
	constructor(target, set) {
		super(target);
		if (set) this.set = set;
		else this.set = IntervalSet.of(Token.INVALID_TYPE, Token.INVALID_TYPE);
	}
	get transitionType() {
		return Transition.SET;
	}
	get label() {
		return this.set;
	}
	matches(symbol, _minVocabSymbol, _maxVocabSymbol) {
		return this.set.contains(symbol);
	}
	toString() {
		return this.set.toString();
	}
};
var NotSetTransition = class extends SetTransition {
	static {
		__name(this, "NotSetTransition");
	}
	get transitionType() {
		return Transition.NOT_SET;
	}
	matches(symbol, minVocabSymbol, maxVocabSymbol) {
		return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !super.matches(symbol, minVocabSymbol, maxVocabSymbol);
	}
	toString() {
		return "~" + super.toString();
	}
};
var MapKeyEqualityComparator = class {
	static {
		__name(this, "MapKeyEqualityComparator");
	}
	keyComparator;
	constructor(keyComparator) {
		this.keyComparator = keyComparator;
	}
	hashCode(obj) {
		return this.keyComparator.hashCode(obj.key);
	}
	equals(a, b) {
		return this.keyComparator.equals(a.key, b.key);
	}
};
var HashMap = class _HashMap {
	static {
		__name(this, "HashMap");
	}
	backingStore;
	constructor(keyComparer) {
		if (keyComparer instanceof _HashMap) this.backingStore = new HashSet(keyComparer.backingStore);
		else {
			keyComparer = keyComparer ?? DefaultEqualityComparator.instance;
			this.backingStore = new HashSet(new MapKeyEqualityComparator(keyComparer));
		}
	}
	clear() {
		this.backingStore.clear();
	}
	containsKey(key) {
		return this.backingStore.contains({ key });
	}
	get(key) {
		const bucket = this.backingStore.get({ key });
		if (!bucket) return;
		return bucket.value;
	}
	get isEmpty() {
		return this.backingStore.isEmpty;
	}
	/**
	* Sets the value for a key in the map. If the key is not present in the map, it is added.
	* If the key is present, the value is updated and the old value is returned.
	*
	* @param key The key to set.
	* @param value The value to set.
	*
	* @returns The old value for the key, if present.
	*/
	set(key, value) {
		const element = this.backingStore.get({
			key,
			value
		});
		let result;
		if (!element) this.backingStore.add({
			key,
			value
		});
		else {
			result = element.value;
			element.value = value;
		}
		return result;
	}
	/**
	* Sets the value for a key in the map if the key is not already present. Otherwise the value is not changed and
	* the old value is returned.
	*
	* @param key The key to set.
	* @param value The value to set.
	*
	* @returns The current value for the key, if present.
	*/
	setIfAbsent(key, value) {
		const element = this.backingStore.get({
			key,
			value
		});
		let result;
		if (!element) this.backingStore.add({
			key,
			value
		});
		else result = element.value;
		return result;
	}
	keys() {
		return this.backingStore.toArray().map((bucket) => {
			return bucket.key;
		});
	}
	values() {
		return this.backingStore.toArray().map((bucket) => {
			return bucket.value;
		});
	}
	get size() {
		return this.backingStore.size;
	}
	hashCode() {
		return this.backingStore.hashCode();
	}
	equals(o) {
		return this.backingStore.equals(o.backingStore);
	}
};
var TerminalNode = class {
	static {
		__name(this, "TerminalNode");
	}
	parent = null;
	symbol;
	constructor(symbol) {
		this.symbol = symbol;
	}
	getChild(_i) {
		return null;
	}
	getSymbol() {
		return this.symbol;
	}
	getPayload() {
		return this.symbol;
	}
	getSourceInterval() {
		if (this.symbol === null) return Interval.INVALID_INTERVAL;
		const tokenIndex = this.symbol.tokenIndex;
		return new Interval(tokenIndex, tokenIndex);
	}
	getChildCount() {
		return 0;
	}
	accept(visitor) {
		return visitor.visitTerminal(this);
	}
	getText() {
		return this.symbol?.text ?? "";
	}
	toString() {
		if (this.symbol?.type === Token.EOF) return "<EOF>";
		else return this.symbol?.text ?? "";
	}
	toStringTree() {
		return this.toString();
	}
};
var ErrorNode = class extends TerminalNode {
	static {
		__name(this, "ErrorNode");
	}
	accept(visitor) {
		return visitor.visitErrorNode(this);
	}
};
var CommonToken = class _CommonToken {
	static {
		__name(this, "CommonToken");
	}
	/**
	* An empty tuple which is used as the default value of
	* {@link source} for tokens that do not have a source.
	*/
	static EMPTY_SOURCE = [null, null];
	/**
	* These properties share a field to reduce the memory footprint of
	* {@link CommonToken}. Tokens created by a {@link CommonTokenFactory} from
	* the same source and input stream share a reference to the same
	* {@link Pair} containing these values.
	*/
	source;
	tokenIndex;
	start;
	stop;
	/**
	* This is the backing field for {@link #getType} and {@link #setType}.
	*/
	type;
	/**
	* The (one-based) line number on which the 1st character of this token was.
	*/
	line;
	/**
	* The zero-based index of the first character position in its line.
	*/
	column;
	/**
	* The token's channel.
	*/
	channel;
	/**
	* This is the backing field for {@link getText} when the token text is
	* explicitly set in the constructor or via {@link setText}.
	*/
	#text;
	constructor(details) {
		this.type = details.type;
		this.source = details.source;
		this.tokenIndex = details.tokenIndex ?? -1;
		this.line = details.line ?? 0;
		this.column = details.column ?? -1;
		this.channel = details.channel ?? Token.DEFAULT_CHANNEL;
		this.start = details.start ?? 0;
		this.stop = details.stop ?? 0;
		this.#text = details.text;
		if (details.line === void 0 && details.source[0] !== null) this.line = details.source[0].line;
		if (details.column === void 0 && details.source[0] !== null) this.column = details.source[0].column;
	}
	/**
	* Constructs a new {@link CommonToken} as a copy of another {@link Token}.
	*
	* If `token` is also a {@link CommonToken} instance, the newly
	* constructed token will share a reference to the {@link #text} field and
	* the {@link Pair} stored in {@link source}. Otherwise, {@link text} will
	* be assigned the result of calling {@link getText}, and {@link source}
	* will be constructed from the result of {@link Token.getTokenSource} and
	* {@link Token#getInputStream}.
	*
	* @param token The token to copy.
	*/
	static fromToken(token) {
		const source = [token.tokenSource, token.inputStream];
		return new _CommonToken({
			type: token.type,
			line: token.line,
			tokenIndex: token.tokenIndex,
			column: token.column,
			channel: token.channel,
			start: token.start,
			stop: token.stop,
			text: token.text,
			source
		});
	}
	/**
	* Constructs a new {@link CommonToken} with the specified token type and text.
	*
	* @param type The token type.
	* @param text The text of the token.
	*/
	static fromType(type, text) {
		return new _CommonToken({
			type,
			text,
			source: _CommonToken.EMPTY_SOURCE
		});
	}
	static fromSource(source, type, channel, start, stop) {
		return new _CommonToken({
			type,
			channel,
			start,
			stop,
			source
		});
	}
	get tokenSource() {
		return this.source[0];
	}
	get inputStream() {
		return this.source[1];
	}
	set inputStream(input) {
		this.source[1] = input;
	}
	/**
	* Constructs a new {@link CommonToken} as a copy of another {@link Token}.
	*
	* If `oldToken` is also a {@link CommonToken} instance, the newly
	* constructed token will share a reference to the {@link text} field and
	* the {@link Pair} stored in {@link source}. Otherwise, {@link text} will
	* be assigned the result of calling {@link getText}, and {@link source}
	* will be constructed from the result of {@link Token.getTokenSource} and
	* {@link Token.getInputStream}.
	*/
	clone() {
		return new _CommonToken({
			source: this.source,
			type: this.type,
			channel: this.channel,
			start: this.start,
			stop: this.stop,
			tokenIndex: this.tokenIndex,
			line: this.line,
			column: this.column,
			text: this.#text
		});
	}
	toString(recognizer) {
		let channelStr = "";
		if (this.channel > 0) channelStr = ",channel=" + this.channel;
		let text = this.text;
		if (text) {
			text = text.replace(/\n/g, "\\n");
			text = text.replace(/\r/g, "\\r");
			text = text.replace(/\t/g, "\\t");
		} else text = "<no text>";
		let typeString = String(this.type);
		if (recognizer) typeString = recognizer.vocabulary.getDisplayName(this.type) ?? "<unknown>";
		return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + text + "',<" + typeString + ">" + channelStr + "," + this.line + ":" + this.column + "]";
	}
	get text() {
		if (this.#text !== void 0) return this.#text;
		const input = this.inputStream;
		if (!input) return;
		const n2 = input.size;
		if (this.start < n2 && this.stop < n2) return input.getTextFromRange(this.start, this.stop);
		return "<EOF>";
	}
	set text(text) {
		this.#text = text;
	}
	setText(text) {
		this.#text = text;
	}
	setType(ttype) {
		this.type = ttype;
	}
	setLine(line) {
		this.line = line;
	}
	setCharPositionInLine(pos) {
		this.column = pos;
	}
	setChannel(channel) {
		this.channel = channel;
	}
	setTokenIndex(index) {
		this.tokenIndex = index;
	}
};
var Trees = class _Trees {
	static {
		__name(this, "Trees");
	}
	/**
	* Print out a whole tree in LISP form. {@link getNodeText} is used on the
	* node payloads to get the text for the nodes.  Detect
	* parse trees and extract data appropriately.
	*/
	static toStringTree(tree, ruleNames, recog) {
		ruleNames = ruleNames ?? null;
		if (recog) ruleNames = recog.ruleNames;
		let s = _Trees.getNodeText(tree, ruleNames);
		s = escapeWhitespace(s, false);
		const c = tree.getChildCount();
		if (c === 0) return s;
		let res = "(" + s + " ";
		if (c > 0) {
			s = _Trees.toStringTree(tree.getChild(0), ruleNames);
			res = res.concat(s);
		}
		for (let i = 1; i < c; i++) {
			s = _Trees.toStringTree(tree.getChild(i), ruleNames);
			res = res.concat(" " + s);
		}
		res = res.concat(")");
		return res;
	}
	static getNodeText(t, ruleNames, recog) {
		ruleNames = ruleNames ?? null;
		if (recog) ruleNames = recog.ruleNames;
		if (ruleNames !== null) {
			if (t instanceof ParserRuleContext) {
				const altNumber = t.ruleContext.getAltNumber();
				if (altNumber !== 0) return ruleNames[t.ruleIndex] + ":" + altNumber;
				return ruleNames[t.ruleIndex];
			} else if (t instanceof ErrorNode) return t.toString();
			else if (t instanceof TerminalNode) return t.symbol.text;
		}
		const payload = t.getPayload();
		if (isToken(payload)) return payload.text;
		return String(t.getPayload());
	}
	/**
	* Return ordered list of all children of this node
	*/
	static getChildren(t) {
		const list = [];
		for (let i = 0; i < t.getChildCount(); i++) list.push(t.getChild(i));
		return list;
	}
	/**
	* Return a list of all ancestors of this node.  The first node of
	* list is the root and the last is the parent of this node.
	*/
	static getAncestors(t) {
		if (t.parent === null) return [];
		let ancestors = [];
		let p = t.parent;
		while (p !== null) {
			ancestors = [p].concat(ancestors);
			p = p.parent;
		}
		return ancestors;
	}
	/**
	* Return true if t is u's parent or a node on path to root from u.
	*/
	static isAncestorOf(t, u) {
		if (t === null || u === null || t.parent === null) return false;
		let p = u.parent;
		while (p !== null) {
			if (t === p) return true;
			p = p.parent;
		}
		return false;
	}
	static findAllTokenNodes(t, ttype) {
		return _Trees.findAllNodes(t, ttype, true);
	}
	static findAllRuleNodes(t, ruleIndex) {
		return _Trees.findAllNodes(t, ruleIndex, false);
	}
	static findAllNodes(t, index, findTokens) {
		const nodes = [];
		_Trees.doFindAllNodes(t, index, findTokens, nodes);
		return nodes;
	}
	static descendants(t) {
		let nodes = [t];
		for (let i = 0; i < t.getChildCount(); i++) nodes = nodes.concat(_Trees.descendants(t.getChild(i)));
		return nodes;
	}
	/**
	* Find smallest subtree of t enclosing range startTokenIndex..stopTokenIndex
	* inclusively using post order traversal. Recursive depth-first-search.
	*/
	static getRootOfSubtreeEnclosingRegion(t, startTokenIndex, stopTokenIndex) {
		const n2 = t.getChildCount();
		for (let i = 0; i < n2; i++) {
			const child = t.getChild(i);
			const r = this.getRootOfSubtreeEnclosingRegion(child, startTokenIndex, stopTokenIndex);
			if (r !== null) return r;
		}
		if (t instanceof ParserRuleContext) {
			if (startTokenIndex >= t.start.tokenIndex && (t.stop === null || stopTokenIndex <= t.stop.tokenIndex)) return t;
		}
		return null;
	}
	/**
	* Replace any subtree siblings of root that are completely to left
	* or right of lookahead range with a CommonToken(Token.INVALID_TYPE,"...")
	* node. The source interval for t is not altered to suit smaller range!
	*
	* WARNING: destructive to t.
	*/
	static stripChildrenOutOfRange(t, root, startIndex, stopIndex) {
		if (t === null) return;
		for (let i = 0; i < t.getChildCount(); i++) {
			const child = t.getChild(i);
			const range = child.getSourceInterval();
			if (t instanceof ParserRuleContext && (range.stop < startIndex || range.start > stopIndex)) {
				if (this.isAncestorOf(child, root)) {
					const abbrev = CommonToken.fromType(Token.INVALID_TYPE, "...");
					t.children[i] = new TerminalNode(abbrev);
				}
			}
		}
	}
	static doFindAllNodes(t, index, findTokens, nodes) {
		if (findTokens && t instanceof TerminalNode) {
			if (t.symbol?.type === index) nodes.push(t);
		} else if (!findTokens && t instanceof ParserRuleContext) {
			if (t.ruleIndex === index) nodes.push(t);
		}
		for (let i = 0; i < t.getChildCount(); i++) _Trees.doFindAllNodes(t.getChild(i), index, findTokens, nodes);
	}
};
var ParserRuleContext = class _ParserRuleContext {
	static {
		__name(this, "ParserRuleContext");
	}
	static empty = new _ParserRuleContext(null);
	start = null;
	stop = null;
	children = [];
	/**
	* What state invoked the rule associated with this context?
	*  The "return address" is the followState of invokingState
	*  If parent is null, this should be -1 this context object represents
	*  the start rule.
	*/
	invokingState;
	parent;
	/**
	* A rule context is a record of a single rule invocation. It knows
	* which context invoked it, if any. If there is no parent context, then
	* naturally the invoking state is not valid.  The parent link
	* provides a chain upwards from the current rule invocation to the root
	* of the invocation tree, forming a stack. We actually carry no
	* information about the rule associated with this context (except
	* when parsing). We keep only the state number of the invoking state from
	* the ATN submachine that invoked this. Contrast this with the s
	* pointer inside ParserRuleContext that tracks the current state
	* being "executed" for the current rule.
	*
	* The parent contexts are useful for computing lookahead sets and
	* getting error information.
	*
	* These objects are used during parsing and prediction.
	* For the special case of parsers, we use the subclass
	* ParserRuleContext.
	*/
	constructor(parent, invokingStateNumber = -1) {
		this.parent = parent;
		this.invokingState = invokingStateNumber;
	}
	/** Copy a context */
	copyFrom(ctx) {
		this.parent = ctx.parent;
		this.invokingState = ctx.invokingState;
		this.children.slice(0, this.children.length);
		this.start = ctx.start;
		this.stop = ctx.stop;
		if (ctx.children) ctx.children.forEach((child) => {
			if (child instanceof ErrorNode) {
				this.children.push(child);
				child.parent = this;
			}
		});
	}
	enterRule(_listener) {}
	exitRule(_listener) {}
	addChild(child) {
		this.children.push(child);
		return child;
	}
	/**
	* Used by enterOuterAlt to toss out a RuleContext previously added as
	* we entered a rule. If we have label, we will need to remove
	* generic ruleContext object.
	*/
	removeLastChild() {
		this.children.pop();
	}
	addTokenNode(token) {
		const node = new TerminalNode(token);
		this.children.push(node);
		node.parent = this;
		return node;
	}
	addErrorNode(errorNode) {
		errorNode.parent = this;
		this.children.push(errorNode);
		return errorNode;
	}
	getChild(i, type) {
		if (i < 0 || i >= this.children.length) return null;
		if (!type) return this.children[i];
		for (const child of this.children) if (child instanceof type) if (i === 0) return child;
		else i -= 1;
		return null;
	}
	getToken(ttype, i) {
		if (i < 0 || i >= this.children.length) return null;
		for (const child of this.children) if ("symbol" in child) {
			if (child.symbol?.type === ttype) if (i === 0) return child;
			else i -= 1;
		}
		return null;
	}
	getTokens(ttype) {
		const tokens = [];
		for (const child of this.children) if ("symbol" in child) {
			if (child.symbol?.type === ttype) tokens.push(child);
		}
		return tokens;
	}
	getRuleContext(index, ctxType) {
		return this.getChild(index, ctxType);
	}
	getRuleContexts(ctxType) {
		const contexts = [];
		for (const child of this.children) if (child instanceof ctxType) contexts.push(child);
		return contexts;
	}
	getChildCount() {
		return this.children.length;
	}
	getSourceInterval() {
		if (this.start === null) return Interval.INVALID_INTERVAL;
		if (this.stop === null || this.stop.tokenIndex < this.start.tokenIndex) return new Interval(this.start.tokenIndex, this.start.tokenIndex - 1);
		return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
	}
	depth() {
		let n2 = 0;
		let p = this;
		while (p !== null) {
			p = p.parent;
			n2 += 1;
		}
		return n2;
	}
	/**
	* A context is empty if there is no invoking state; meaning nobody call
	* current context.
	*/
	isEmpty() {
		return this.invokingState === -1;
	}
	get ruleContext() {
		return this;
	}
	get ruleIndex() {
		return -1;
	}
	getPayload() {
		return this;
	}
	getText() {
		if (this.children.length === 0) return "";
		return this.children.map((child) => {
			return child.getText();
		}).join("");
	}
	/**
	* For rule associated with this parse tree internal node, return
	* the outer alternative number used to match the input. Default
	* implementation does not compute nor store this alt num. Create
	* a subclass of ParserRuleContext with backing field and set
	* option contextSuperClass.
	* to set it.
	*/
	getAltNumber() {
		return ATN.INVALID_ALT_NUMBER;
	}
	/**
	* Set the outer alternative number for this context node. Default
	* implementation does nothing to avoid backing field overhead for
	* trees that don't need it.  Create
	* a subclass of ParserRuleContext with backing field and set
	* option contextSuperClass.
	*/
	setAltNumber(_altNumber) {}
	accept(visitor) {
		return visitor.visitChildren(this);
	}
	toStringTree(...args) {
		if (args.length < 2) return Trees.toStringTree(this, null, args[0]);
		return Trees.toStringTree(this, args[0], args[1]);
	}
	toString(ruleNames, stop) {
		ruleNames = ruleNames ?? null;
		stop = stop ?? null;
		let p = this;
		let s = "[";
		while (p !== null && p !== stop) {
			if (ruleNames === null) {
				if (!p.isEmpty()) s += p.invokingState;
			} else {
				const ri = p.ruleIndex;
				const ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
				s += ruleName;
			}
			if (p.parent !== null && (ruleNames !== null || !p.parent.isEmpty())) s += " ";
			p = p.parent;
		}
		s += "]";
		return s;
	}
};
var ArrayPredictionContext = class _ArrayPredictionContext extends PredictionContext {
	static {
		__name(this, "ArrayPredictionContext");
	}
	parents = [];
	returnStates = [];
	constructor(parents, returnStates) {
		super(PredictionContext.calculateHashCodeList(parents, returnStates));
		this.parents = parents;
		this.returnStates = returnStates;
		return this;
	}
	isEmpty() {
		return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
	}
	get length() {
		return this.returnStates.length;
	}
	getParent(index) {
		return this.parents[index];
	}
	getReturnState(index) {
		return this.returnStates[index];
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _ArrayPredictionContext) || this.hashCode() !== other.hashCode()) return false;
		return equalNumberArrays(this.returnStates, other.returnStates) && equalArrays(this.parents, other.parents);
	}
	toString() {
		if (this.isEmpty()) return "[]";
		const entries = [];
		for (let i = 0; i < this.returnStates.length; i++) {
			if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
				entries.push("$");
				continue;
			}
			entries.push(this.returnStates[i].toString());
			if (this.parents[i]) entries.push(this.parents[i].toString());
			else entries.push("null");
		}
		return `[${entries.join(", ")}]`;
	}
};
var createSingletonPredictionContext = /* @__PURE__ */ __name((parent, returnState) => {
	if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) return EmptyPredictionContext.instance;
	else return new SingletonPredictionContext(parent, returnState);
}, "createSingletonPredictionContext");
var predictionContextFromRuleContext = /* @__PURE__ */ __name((atn, outerContext) => {
	if (!outerContext) outerContext = ParserRuleContext.empty;
	if (!outerContext.parent || outerContext === ParserRuleContext.empty) return EmptyPredictionContext.instance;
	const parent = predictionContextFromRuleContext(atn, outerContext.parent);
	const transition = atn.states[outerContext.invokingState].transitions[0];
	return createSingletonPredictionContext(parent, transition.followState.stateNumber);
}, "predictionContextFromRuleContext");
var getCachedPredictionContext = /* @__PURE__ */ __name((context, contextCache, visited) => {
	if (context.isEmpty()) return context;
	let existing = visited.get(context);
	if (existing) return existing;
	existing = contextCache.get(context);
	if (existing) {
		visited.set(context, existing);
		return existing;
	}
	let changed = false;
	let parents = [];
	for (let i = 0; i < parents.length; i++) {
		const parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
		if (changed || parent !== context.getParent(i)) {
			if (!changed) {
				parents = [];
				for (let j = 0; j < context.length; j++) parents[j] = context.getParent(j);
				changed = true;
			}
			parents[i] = parent;
		}
	}
	if (!changed) {
		contextCache.add(context);
		visited.set(context, context);
		return context;
	}
	let updated;
	if (parents.length === 0) updated = EmptyPredictionContext.instance;
	else if (parents.length === 1) updated = createSingletonPredictionContext(parents[0] ?? void 0, context.getReturnState(0));
	else updated = new ArrayPredictionContext(parents, context.returnStates);
	contextCache.add(updated);
	visited.set(updated, updated);
	visited.set(context, updated);
	return updated;
}, "getCachedPredictionContext");
var merge = /* @__PURE__ */ __name((a, b, rootIsWildcard, mergeCache) => {
	if (a === b || a.equals(b)) return a;
	if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) return mergeSingletons(a, b, rootIsWildcard, mergeCache);
	if (rootIsWildcard) {
		if (a instanceof EmptyPredictionContext) return a;
		if (b instanceof EmptyPredictionContext) return b;
	}
	if (a instanceof SingletonPredictionContext) a = new ArrayPredictionContext([a.parent], [a.returnState]);
	if (b instanceof SingletonPredictionContext) b = new ArrayPredictionContext([b.parent], [b.returnState]);
	return mergeArrays(a, b, rootIsWildcard, mergeCache);
}, "merge");
var mergeArrays = /* @__PURE__ */ __name((a, b, rootIsWildcard, mergeCache) => {
	if (mergeCache) {
		let previous = mergeCache.get(a, b);
		if (previous) return previous;
		previous = mergeCache.get(b, a);
		if (previous) return previous;
	}
	let i = 0;
	let j = 0;
	let k = 0;
	let mergedReturnStates = new Array(a.returnStates.length + b.returnStates.length).fill(0);
	let mergedParents = new Array(a.returnStates.length + b.returnStates.length).fill(null);
	while (i < a.returnStates.length && j < b.returnStates.length) {
		const aParent = a.parents[i];
		const bParent = b.parents[j];
		if (a.returnStates[i] === b.returnStates[j]) {
			const payload = a.returnStates[i];
			if (payload === PredictionContext.EMPTY_RETURN_STATE && aParent === null && bParent === null || aParent !== null && bParent !== null && aParent === bParent) {
				mergedParents[k] = aParent;
				mergedReturnStates[k] = payload;
			} else {
				mergedParents[k] = merge(aParent, bParent, rootIsWildcard, mergeCache);
				mergedReturnStates[k] = payload;
			}
			i += 1;
			j += 1;
		} else if (a.returnStates[i] < b.returnStates[j]) {
			mergedParents[k] = aParent;
			mergedReturnStates[k] = a.returnStates[i];
			i += 1;
		} else {
			mergedParents[k] = bParent;
			mergedReturnStates[k] = b.returnStates[j];
			j += 1;
		}
		k += 1;
	}
	if (i < a.returnStates.length) for (let p = i; p < a.returnStates.length; p++) {
		mergedParents[k] = a.parents[p];
		mergedReturnStates[k] = a.returnStates[p];
		k += 1;
	}
	else for (let p = j; p < b.returnStates.length; p++) {
		mergedParents[k] = b.parents[p];
		mergedReturnStates[k] = b.returnStates[p];
		k += 1;
	}
	if (k < mergedParents.length) {
		if (k === 1) {
			const aNew = createSingletonPredictionContext(mergedParents[0] ?? void 0, mergedReturnStates[0]);
			if (mergeCache !== null) mergeCache.set(a, b, aNew);
			return aNew;
		}
		mergedParents = mergedParents.slice(0, k);
		mergedReturnStates = mergedReturnStates.slice(0, k);
	}
	const merged = new ArrayPredictionContext(mergedParents, mergedReturnStates);
	if (merged.equals(a)) {
		if (mergeCache !== null) mergeCache.set(a, b, a);
		if (PredictionContext.traceATNSimulator) console.log("mergeArrays a=" + a + ",b=" + b + " -> a");
		return a;
	}
	if (merged.equals(b)) {
		if (mergeCache !== null) mergeCache.set(a, b, b);
		return b;
	}
	combineCommonParents(mergedParents);
	if (mergeCache !== null) mergeCache.set(a, b, merged);
	if (PredictionContext.traceATNSimulator) console.log("mergeArrays a=" + a + ",b=" + b + " -> " + merged);
	return merged;
}, "mergeArrays");
var combineCommonParents = /* @__PURE__ */ __name((parents) => {
	const uniqueParents = new HashMap(ObjectEqualityComparator.instance);
	for (const parent of parents) if (parent) {
		if (!uniqueParents.containsKey(parent)) uniqueParents.set(parent, parent);
	}
	for (let q = 0; q < parents.length; q++) if (parents[q]) parents[q] = uniqueParents.get(parents[q]) ?? null;
}, "combineCommonParents");
var mergeSingletons = /* @__PURE__ */ __name((a, b, rootIsWildcard, mergeCache) => {
	if (mergeCache !== null) {
		let previous = mergeCache.get(a, b);
		if (previous !== null) return previous;
		previous = mergeCache.get(b, a);
		if (previous !== null) return previous;
	}
	const rootMerge = mergeRoot(a, b, rootIsWildcard);
	if (rootMerge !== null) {
		if (mergeCache !== null) mergeCache.set(a, b, rootMerge);
		return rootMerge;
	}
	if (a.returnState === b.returnState) {
		const parent = merge(a.parent, b.parent, rootIsWildcard, mergeCache);
		if (parent === a.parent) return a;
		if (parent === b.parent) return b;
		const spc = createSingletonPredictionContext(parent, a.returnState);
		if (mergeCache !== null) mergeCache.set(a, b, spc);
		return spc;
	} else {
		let singleParent = null;
		if (a === b || a.parent !== null && a.parent.equals(b.parent)) singleParent = a.parent;
		if (singleParent !== null) {
			const payloads2 = [a.returnState, b.returnState];
			if (a.returnState > b.returnState) {
				payloads2[0] = b.returnState;
				payloads2[1] = a.returnState;
			}
			const apc = new ArrayPredictionContext([singleParent, singleParent], payloads2);
			if (mergeCache !== null) mergeCache.set(a, b, apc);
			return apc;
		}
		const payloads = [a.returnState, b.returnState];
		let parents = [a.parent, b.parent];
		if (a.returnState > b.returnState) {
			payloads[0] = b.returnState;
			payloads[1] = a.returnState;
			parents = [b.parent, a.parent];
		}
		const aNew = new ArrayPredictionContext(parents, payloads);
		if (mergeCache !== null) mergeCache.set(a, b, aNew);
		return aNew;
	}
}, "mergeSingletons");
var mergeRoot = /* @__PURE__ */ __name((a, b, rootIsWildcard) => {
	if (rootIsWildcard) {
		if (a === EmptyPredictionContext.instance || b === EmptyPredictionContext.instance) return EmptyPredictionContext.instance;
	} else {
		if (a === EmptyPredictionContext.instance && b === EmptyPredictionContext.instance) return EmptyPredictionContext.instance;
		if (a === EmptyPredictionContext.instance) {
			const payloads = [b.returnState, PredictionContext.EMPTY_RETURN_STATE];
			return new ArrayPredictionContext([b.parent, null], payloads);
		}
		if (b === EmptyPredictionContext.instance) {
			const payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
			return new ArrayPredictionContext([a.parent, null], payloads);
		}
	}
	return null;
}, "mergeRoot");
var LL1Analyzer = class _LL1Analyzer {
	constructor(atn) {
		this.atn = atn;
	}
	static {
		__name(this, "LL1Analyzer");
	}
	/**
	* Special value added to the lookahead sets to indicate that we hit
	* a predicate during analysis if `seeThruPreds==false`.
	*/
	static hitPredicate = Token.INVALID_TYPE;
	/**
	* Calculates the SLL(1) expected lookahead set for each outgoing transition
	* of an {@link ATNState}. The returned array has one element for each
	* outgoing transition in `s`. If the closure from transition
	* _i_ leads to a semantic predicate before matching a symbol, the
	* element at index *i* of the result will be `undefined`.
	*
	* @param s the ATN state
	* @returns the expected symbols for each outgoing transition of `s`.
	*/
	getDecisionLookahead(s) {
		const count = s.transitions.length;
		const look = new Array(count);
		for (let alt = 0; alt < count; alt++) {
			const set = new IntervalSet();
			const lookBusy = new HashSet();
			this.doLook(s.transitions[alt].target, void 0, EmptyPredictionContext.instance, set, lookBusy, new BitSet(), false, false);
			if (set.length > 0 && !set.contains(_LL1Analyzer.hitPredicate)) look[alt] = set;
		}
		return look;
	}
	/**
	* Compute set of tokens that can follow `s` in the ATN in the
	* specified `ctx`.
	*
	* If `ctx` is `null` and the end of the rule containing
	* `s` is reached, {@link Token//EPSILON} is added to the result set.
	* If `ctx` is not `null` and the end of the outermost rule is
	* reached, {@link Token//EOF} is added to the result set.
	*
	* @param s the ATN state
	* @param stopState the ATN state to stop at. This can be a
	* {@link BlockEndState} to detect epsilon paths through a closure.
	* @param ctx the complete parser context, or `null` if the context
	* should be ignored
	*
	* @returns The set of tokens that can follow `s` in the ATN in the
	* specified `ctx`.
	*/
	look(s, stopState, ctx) {
		const r = new IntervalSet();
		const lookContext = ctx ? predictionContextFromRuleContext(this.atn, ctx) : null;
		this.doLook(s, stopState, lookContext, r, new HashSet(), new BitSet(), true, true);
		return r;
	}
	/**
	* Compute set of tokens that can follow `s` in the ATN in the
	* specified `ctx`.
	*
	* If `ctx` is `null` and `stopState` or the end of the
	* rule containing `s` is reached, {@link Token//EPSILON} is added to
	* the result set. If `ctx` is not `null` and `addEOF` is
	* `true` and `stopState` or the end of the outermost rule is
	* reached, {@link Token//EOF} is added to the result set.
	*
	* @param s the ATN state.
	* @param stopState the ATN state to stop at. This can be a
	* {@link BlockEndState} to detect epsilon paths through a closure.
	* @param ctx The outer context, or `null` if the outer context should
	* not be used.
	* @param look The result lookahead set.
	* @param lookBusy A set used for preventing epsilon closures in the ATN
	* from causing a stack overflow. Outside code should pass
	* `new CustomizedSet<ATNConfig>` for this argument.
	* @param calledRuleStack A set used for preventing left recursion in the
	* ATN from causing a stack overflow. Outside code should pass
	* `new BitSet()` for this argument.
	* @param seeThruPreds `true` to true semantic predicates as
	* implicitly `true` and "see through them", otherwise `false`
	* to treat semantic predicates as opaque and add {@link hitPredicate} to the
	* result if one is encountered.
	* @param addEOF Add {@link Token//EOF} to the result if the end of the
	* outermost context is reached. This parameter has no effect if `ctx`
	* is `null`.
	*/
	doLook(s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
		const c = ATNConfig.createWithContext(s, 0, ctx);
		if (lookBusy.get(c)) return;
		lookBusy.add(c);
		if (s === stopState) {
			if (!ctx) {
				look.addOne(Token.EPSILON);
				return;
			} else if (ctx.isEmpty() && addEOF) {
				look.addOne(Token.EOF);
				return;
			}
		}
		if (s.constructor.stateType === ATNState.RULE_STOP) {
			if (!ctx) {
				look.addOne(Token.EPSILON);
				return;
			} else if (ctx.isEmpty() && addEOF) {
				look.addOne(Token.EOF);
				return;
			}
			if (ctx !== EmptyPredictionContext.instance) {
				const removed = calledRuleStack.get(s.ruleIndex);
				try {
					calledRuleStack.clear(s.ruleIndex);
					for (let i = 0; i < ctx.length; i++) {
						const returnState = this.atn.states[ctx.getReturnState(i)];
						this.doLook(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
					}
				} finally {
					if (removed) calledRuleStack.set(s.ruleIndex);
				}
				return;
			}
		}
		for (const t of s.transitions) switch (t.transitionType) {
			case Transition.RULE: {
				if (calledRuleStack.get(t.target.ruleIndex)) continue;
				const newContext = createSingletonPredictionContext(ctx ?? void 0, t.followState.stateNumber);
				try {
					calledRuleStack.set(t.target.ruleIndex);
					this.doLook(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
				} finally {
					calledRuleStack.clear(t.target.ruleIndex);
				}
				break;
			}
			case Transition.PREDICATE:
			case Transition.PRECEDENCE:
				if (seeThruPreds) this.doLook(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
				else look.addOne(_LL1Analyzer.hitPredicate);
				break;
			case Transition.WILDCARD:
				look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
				break;
			default:
				if (t.isEpsilon) this.doLook(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
				else {
					let set = t.label;
					if (set) {
						if (t instanceof NotSetTransition) set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
						look.addSet(set);
					}
				}
				break;
		}
	}
};
var ATN = class {
	static {
		__name(this, "ATN");
	}
	static INVALID_ALT_NUMBER = 0;
	/** Represents the type of recognizer an ATN applies to */
	static LEXER = 0;
	static PARSER = 1;
	/**
	* Used for runtime deserialization of ATNs from strings
	* The type of the ATN.
	*/
	grammarType;
	/** The maximum value for any symbol recognized by a transition in the ATN. */
	maxTokenType;
	states = [];
	/**
	* Each subrule/rule is a decision point and we must track them so we
	* can go back later and build DFA predictors for them.  This includes
	* all the rules, subrules, optional blocks, ()+, ()* etc...
	*/
	decisionToState = [];
	/** Maps from rule index to starting state number. */
	ruleToStartState = [];
	/** Maps from rule index to stop state number. */
	ruleToStopState = [];
	modeNameToStartState = /* @__PURE__ */ new Map();
	/**
	* For lexer ATNs, this maps the rule index to the resulting token type.
	* For parser ATNs, this maps the rule index to the generated bypass token
	* type if the {@link ATNDeserializationOptions//isGenerateRuleBypassTransitions}
	* deserialization option was specified; otherwise, this is `null`
	*/
	ruleToTokenType = [];
	/**
	* For lexer ATNs, this is an array of {@link LexerAction} objects which may
	* be referenced by action transitions in the ATN
	*/
	lexerActions = [];
	modeToStartState = [];
	analyzer;
	constructor(grammarType, maxTokenType) {
		this.grammarType = grammarType;
		this.maxTokenType = maxTokenType;
		this.analyzer = new LL1Analyzer(this);
	}
	/**
	* Compute the set of valid tokens that can occur starting in state `s`.
	* If `ctx` is null, the set of tokens will not include what can follow
	* the rule surrounding `s`. In other words, the set will be
	* restricted to tokens reachable staying within `s`'s rule.
	*/
	nextTokens(atnState, ctx) {
		if (!ctx && atnState.nextTokenWithinRule) return atnState.nextTokenWithinRule;
		const next = this.analyzer.look(atnState, void 0, ctx);
		if (!ctx) atnState.nextTokenWithinRule = next;
		return next;
	}
	addState(state) {
		if (state) state.stateNumber = this.states.length;
		this.states.push(state);
	}
	removeState(state) {
		this.states[state.stateNumber] = null;
	}
	defineDecisionState(s) {
		this.decisionToState.push(s);
		s.decision = this.decisionToState.length - 1;
		return s.decision;
	}
	getDecisionState(decision) {
		if (this.decisionToState.length === 0) return null;
		else return this.decisionToState[decision];
	}
	getNumberOfDecisions() {
		return this.decisionToState.length;
	}
	/**
	* Computes the set of input symbols which could follow ATN state number
	* `stateNumber` in the specified full `context`. This method
	* considers the complete parser context, but does not evaluate semantic
	* predicates (i.e. all predicates encountered during the calculation are
	* assumed true). If a path in the ATN exists from the starting state to the
	* {@link RuleStopState} of the outermost context without matching any
	* symbols, {@link Token//EOF} is added to the returned set.
	*
	* If `context` is `null`, it is treated as
	* {@link ParserRuleContext//EMPTY}.
	*
	* @param stateNumber the ATN state number
	* @param context the full parse context
	*
	* @returns {IntervalSet} The set of potentially valid input symbols which could follow the
	* specified state in the specified context.
	*
	* @throws IllegalArgumentException if the ATN does not contain a state with
	* number `stateNumber`
	*/
	getExpectedTokens(stateNumber, context) {
		if (stateNumber < 0 || stateNumber >= this.states.length) throw new Error("Invalid state number.");
		const s = this.states[stateNumber];
		let following = this.nextTokens(s);
		if (!following.contains(Token.EPSILON)) return following;
		let ctx = context;
		const expected = new IntervalSet();
		expected.addSet(following);
		expected.removeOne(Token.EPSILON);
		while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
			const rt = this.states[ctx.invokingState].transitions[0];
			following = this.nextTokens(rt.followState);
			expected.addSet(following);
			expected.removeOne(Token.EPSILON);
			ctx = ctx.parent;
		}
		if (following.contains(Token.EPSILON)) expected.addOne(Token.EOF);
		return expected;
	}
};
var KeyTypeEqualityComparer = class _KeyTypeEqualityComparer {
	static {
		__name(this, "KeyTypeEqualityComparer");
	}
	static instance = new _KeyTypeEqualityComparer();
	hashCode(config) {
		let hashCode = 7;
		hashCode = 31 * hashCode + config.state.stateNumber;
		hashCode = 31 * hashCode + config.alt;
		hashCode = 31 * hashCode + config.semanticContext.hashCode();
		return hashCode;
	}
	equals(a, b) {
		if (a === b) return true;
		return a.state.stateNumber === b.state.stateNumber && a.alt === b.alt && a.semanticContext.equals(b.semanticContext);
	}
};
var ATNConfigSet = class {
	static {
		__name(this, "ATNConfigSet");
	}
	/**
	* The reason that we need this is because we don't want the hash map to use
	* the standard hash code and equals. We need all configurations with the
	* same
	* `(s,i,_,semctx)` to be equal. Unfortunately, this key effectively
	* doubles
	* the number of objects associated with ATNConfigs. The other solution is
	* to
	* use a hash table that lets us specify the equals/hashCode operation.
	* All configs but hashed by (s, i, _, pi) not including context. Wiped out
	* when we go readonly as this set becomes a DFA state
	*/
	configLookup = new HashSet(KeyTypeEqualityComparer.instance);
	configs = [];
	uniqueAlt = 0;
	/**
	* Used in parser and lexer. In lexer, it indicates we hit a pred
	* while computing a closure operation. Don't make a DFA state from this
	*/
	hasSemanticContext = false;
	dipsIntoOuterContext = false;
	/**
	* Indicates that this configuration set is part of a full context
	* LL prediction. It will be used to determine how to merge $. With SLL
	* it's a wildcard whereas it is not for LL context merge
	*/
	fullCtx = false;
	/**
	* Indicates that the set of configurations is read-only. Do not
	* allow any code to manipulate the set; DFA states will point at
	* the sets and they must not change. This does not protect the other
	* fields; in particular, conflictingAlts is set after
	* we've made this readonly
	*/
	readOnly = false;
	conflictingAlts = null;
	/**
	* Tracks the first config that has a rule stop state. Avoids frequent linear search for that, when adding
	* a DFA state in the lexer ATN simulator.
	*/
	firstStopState;
	#cachedHashCode = -1;
	constructor(fullCtxOrOldSet) {
		if (fullCtxOrOldSet !== void 0) if (typeof fullCtxOrOldSet === "boolean") this.fullCtx = fullCtxOrOldSet ?? true;
		else {
			const old = fullCtxOrOldSet;
			this.addAll(old.configs);
			this.uniqueAlt = old.uniqueAlt;
			this.conflictingAlts = old.conflictingAlts;
			this.hasSemanticContext = old.hasSemanticContext;
			this.dipsIntoOuterContext = old.dipsIntoOuterContext;
		}
	}
	[Symbol.iterator]() {
		return this.configs[Symbol.iterator]();
	}
	/**
	* Adding a new config means merging contexts with existing configs for
	* `(s, i, pi, _)`, where `s` is the {@link ATNConfig.state}, `i` is the {@link ATNConfig.alt}, and
	* `pi` is the {@link ATNConfig.semanticContext}. We use `(s,i,pi)` as key.
	*
	* This method updates {@link dipsIntoOuterContext} and
	* {@link hasSemanticContext} when necessary.
	*/
	add(config, mergeCache = null) {
		if (this.readOnly) throw new Error("This set is readonly");
		if (!this.firstStopState && config.state.constructor.stateType === ATNState.RULE_STOP) this.firstStopState = config;
		this.hasSemanticContext ||= config.semanticContext !== SemanticContext.NONE;
		this.dipsIntoOuterContext ||= config.reachesIntoOuterContext;
		const existing = this.configLookup.getOrAdd(config);
		if (existing === config) {
			this.#cachedHashCode = -1;
			this.configs.push(config);
			return;
		}
		const rootIsWildcard = !this.fullCtx;
		const merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
		existing.reachesIntoOuterContext ||= config.reachesIntoOuterContext;
		existing.precedenceFilterSuppressed ||= config.precedenceFilterSuppressed;
		existing.context = merged;
	}
	/** Return a List holding list of configs */
	get elements() {
		return this.configs;
	}
	/**
	* Gets the complete set of represented alternatives for the configuration set.
	*
	* @returns the set of represented alternatives in this configuration set
	*/
	getAlts() {
		const alts = new BitSet();
		for (const config of this.configs) alts.set(config.alt);
		return alts;
	}
	getPredicates() {
		const preds = [];
		for (const config of this.configs) if (config.semanticContext !== SemanticContext.NONE) preds.push(config.semanticContext);
		return preds;
	}
	getStates() {
		const states = new HashSet();
		for (const config of this.configs) states.add(config.state);
		return states;
	}
	optimizeConfigs(interpreter) {
		if (this.readOnly) throw new Error("This set is readonly");
		if (this.configLookup.size === 0) return;
		for (const config of this.configs) config.context = interpreter.getCachedContext(config.context);
	}
	addAll(coll) {
		for (const config of coll) this.add(config);
		return false;
	}
	equals(other) {
		if (this === other) return true;
		if (this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext && equalArrays(this.configs, other.configs)) return true;
		return false;
	}
	hashCode() {
		if (this.#cachedHashCode === -1) this.#cachedHashCode = this.computeHashCode();
		return this.#cachedHashCode;
	}
	get length() {
		return this.configs.length;
	}
	isEmpty() {
		return this.configs.length === 0;
	}
	contains(item) {
		if (this.configLookup === null) throw new Error("This method is not implemented for readonly sets.");
		return this.configLookup.contains(item);
	}
	containsFast(item) {
		if (this.configLookup === null) throw new Error("This method is not implemented for readonly sets.");
		return this.configLookup.contains(item);
	}
	clear() {
		if (this.readOnly) throw new Error("This set is readonly");
		this.configs = [];
		this.#cachedHashCode = -1;
		this.configLookup = new HashSet(KeyTypeEqualityComparer.instance);
	}
	setReadonly(readOnly) {
		this.readOnly = readOnly;
		if (readOnly) this.configLookup = null;
	}
	toString() {
		return arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
	}
	computeHashCode() {
		let hash = MurmurHash.initialize();
		this.configs.forEach((config) => {
			hash = MurmurHash.update(hash, config.hashCode());
		});
		hash = MurmurHash.finish(hash, this.configs.length);
		return hash;
	}
};
var BasicState = class extends ATNState {
	static {
		__name(this, "BasicState");
	}
	static stateType = ATNState.BASIC;
};
var DecisionState = class extends ATNState {
	static {
		__name(this, "DecisionState");
	}
	decision = -1;
	nonGreedy = false;
};
var BlockStartState = class extends DecisionState {
	static {
		__name(this, "BlockStartState");
	}
	endState;
};
var BlockEndState = class extends ATNState {
	static {
		__name(this, "BlockEndState");
	}
	static stateType = ATNState.BLOCK_END;
	startState;
};
var LoopEndState = class extends ATNState {
	static {
		__name(this, "LoopEndState");
	}
	static stateType = ATNState.LOOP_END;
	loopBackState;
};
var RuleStartState = class extends ATNState {
	static {
		__name(this, "RuleStartState");
	}
	static stateType = ATNState.RULE_START;
	stopState;
	isLeftRecursiveRule = false;
};
var RuleStopState = class extends ATNState {
	static {
		__name(this, "RuleStopState");
	}
	static stateType = ATNState.RULE_STOP;
};
var TokensStartState = class extends DecisionState {
	static {
		__name(this, "TokensStartState");
	}
	static stateType = ATNState.TOKEN_START;
};
var PlusLoopbackState = class extends DecisionState {
	static {
		__name(this, "PlusLoopbackState");
	}
	static stateType = ATNState.PLUS_LOOP_BACK;
};
var StarLoopbackState = class extends ATNState {
	static {
		__name(this, "StarLoopbackState");
	}
	static stateType = ATNState.STAR_LOOP_BACK;
};
var StarLoopEntryState = class extends DecisionState {
	static {
		__name(this, "StarLoopEntryState");
	}
	static stateType = ATNState.STAR_LOOP_ENTRY;
	loopBackState;
	/**
	* Indicates whether this state can benefit from a precedence DFA during SLL
	* decision making.
	*
	* This is a computed property that is calculated during ATN deserialization
	* and stored for use in {@link ParserATNSimulator} and
	* {@link ParserInterpreter}.
	*
	* @see `DFA.isPrecedenceDfa`
	*/
	precedenceRuleDecision = false;
};
var PlusBlockStartState = class extends BlockStartState {
	static {
		__name(this, "PlusBlockStartState");
	}
	static stateType = ATNState.PLUS_BLOCK_START;
	loopBackState;
};
var StarBlockStartState = class extends BlockStartState {
	static {
		__name(this, "StarBlockStartState");
	}
	static stateType = ATNState.STAR_BLOCK_START;
};
var BasicBlockStartState = class extends BlockStartState {
	static {
		__name(this, "BasicBlockStartState");
	}
	static stateType = ATNState.BLOCK_START;
};
var AtomTransition = class extends Transition {
	static {
		__name(this, "AtomTransition");
	}
	/** The token type or character value; or, signifies special label. */
	labelValue;
	#label;
	constructor(target, label) {
		super(target);
		this.labelValue = label;
		this.#label = IntervalSet.of(label, label);
	}
	get label() {
		return this.#label;
	}
	get transitionType() {
		return Transition.ATOM;
	}
	matches(symbol) {
		return this.labelValue === symbol;
	}
	toString() {
		return this.labelValue.toString();
	}
};
var RuleTransition = class extends Transition {
	static {
		__name(this, "RuleTransition");
	}
	ruleIndex;
	precedence;
	followState;
	constructor(ruleStart, ruleIndex, precedence, followState) {
		super(ruleStart);
		this.ruleIndex = ruleIndex;
		this.precedence = precedence;
		this.followState = followState;
	}
	get isEpsilon() {
		return true;
	}
	get transitionType() {
		return Transition.RULE;
	}
	matches(_symbol, _minVocabSymbol, _maxVocabSymbol) {
		return false;
	}
};
var RangeTransition = class extends Transition {
	static {
		__name(this, "RangeTransition");
	}
	start;
	stop;
	#label = new IntervalSet();
	constructor(target, start, stop) {
		super(target);
		this.start = start;
		this.stop = stop;
		this.#label.addRange(start, stop);
	}
	get label() {
		return this.#label;
	}
	get transitionType() {
		return Transition.RANGE;
	}
	matches(symbol, _minVocabSymbol, _maxVocabSymbol) {
		return symbol >= this.start && symbol <= this.stop;
	}
	toString() {
		return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
	}
};
var ActionTransition = class extends Transition {
	static {
		__name(this, "ActionTransition");
	}
	ruleIndex;
	actionIndex;
	isCtxDependent;
	constructor(target, ruleIndex, actionIndex, isCtxDependent) {
		super(target);
		this.ruleIndex = ruleIndex;
		this.actionIndex = actionIndex ?? -1;
		this.isCtxDependent = isCtxDependent ?? false;
	}
	get isEpsilon() {
		return true;
	}
	get transitionType() {
		return Transition.ACTION;
	}
	matches(_symbol, _minVocabSymbol, _maxVocabSymbol) {
		return false;
	}
	toString() {
		return "action_" + this.ruleIndex + ":" + this.actionIndex;
	}
};
var EpsilonTransition = class extends Transition {
	static {
		__name(this, "EpsilonTransition");
	}
	#outermostPrecedenceReturn;
	constructor(target, outermostPrecedenceReturn = -1) {
		super(target);
		this.#outermostPrecedenceReturn = outermostPrecedenceReturn;
	}
	/**
	* @returns the rule index of a precedence rule for which this transition is
	* returning from, where the precedence value is 0; otherwise, -1.
	*
	* @see ATNConfig.isPrecedenceFilterSuppressed()
	* @see ParserATNSimulator.applyPrecedenceFilter(ATNConfigSet)
	* @since 4.4.1
	*/
	get outermostPrecedenceReturn() {
		return this.#outermostPrecedenceReturn;
	}
	get isEpsilon() {
		return true;
	}
	get transitionType() {
		return Transition.EPSILON;
	}
	matches() {
		return false;
	}
	toString() {
		return "epsilon";
	}
};
var WildcardTransition = class extends Transition {
	static {
		__name(this, "WildcardTransition");
	}
	get transitionType() {
		return Transition.WILDCARD;
	}
	matches(symbol, minVocabSymbol, maxVocabSymbol) {
		return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
	}
	toString() {
		return ".";
	}
};
var AbstractPredicateTransition = class extends Transition {
	static {
		__name(this, "AbstractPredicateTransition");
	}
	constructor(target) {
		super(target);
	}
};
var PredicateTransition = class extends AbstractPredicateTransition {
	static {
		__name(this, "PredicateTransition");
	}
	ruleIndex;
	predIndex;
	isCtxDependent;
	constructor(target, ruleIndex, predIndex, isCtxDependent) {
		super(target);
		this.ruleIndex = ruleIndex;
		this.predIndex = predIndex;
		this.isCtxDependent = isCtxDependent;
	}
	get isEpsilon() {
		return true;
	}
	matches(_symbol, _minVocabSymbol, _maxVocabSymbol) {
		return false;
	}
	get transitionType() {
		return Transition.PREDICATE;
	}
	getPredicate() {
		return new SemanticContext.Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
	}
	toString() {
		return "pred_" + this.ruleIndex + ":" + this.predIndex;
	}
};
var PrecedencePredicateTransition = class extends AbstractPredicateTransition {
	static {
		__name(this, "PrecedencePredicateTransition");
	}
	precedence;
	constructor(target, precedence) {
		super(target);
		this.precedence = precedence;
	}
	get isEpsilon() {
		return true;
	}
	matches(_symbol, _minVocabSymbol, _maxVocabSymbol) {
		return false;
	}
	getPredicate() {
		return new SemanticContext.PrecedencePredicate(this.precedence);
	}
	get transitionType() {
		return Transition.PRECEDENCE;
	}
	toString() {
		return this.precedence + " >= _p";
	}
};
var LexerActionType = {
	CHANNEL: 0,
	CUSTOM: 1,
	MODE: 2,
	MORE: 3,
	POP_MODE: 4,
	PUSH_MODE: 5,
	SKIP: 6,
	TYPE: 7
};
var LexerSkipAction = class _LexerSkipAction {
	static {
		__name(this, "LexerSkipAction");
	}
	/** Provides a singleton instance of this parameter-less lexer action. */
	static instance = new _LexerSkipAction();
	actionType;
	isPositionDependent = false;
	constructor() {
		this.actionType = LexerActionType.SKIP;
	}
	equals(obj) {
		return obj === this;
	}
	hashCode() {
		return LexerActionType.SKIP;
	}
	execute(lexer) {
		lexer.skip();
	}
	toString() {
		return "skip";
	}
};
var LexerChannelAction = class _LexerChannelAction {
	static {
		__name(this, "LexerChannelAction");
	}
	channel;
	actionType;
	isPositionDependent = false;
	cachedHashCode;
	constructor(channel) {
		this.actionType = LexerActionType.CHANNEL;
		this.channel = channel;
	}
	/**
	* This action is implemented by calling {@link Lexer.setChannel} with the
	* value provided by {@link getChannel}.
	*/
	execute(lexer) {
		lexer.channel = this.channel;
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.actionType);
			hash = MurmurHash.update(hash, this.channel);
			this.cachedHashCode = MurmurHash.finish(hash, 2);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerChannelAction)) return false;
		return this.channel === other.channel;
	}
	toString() {
		return "channel(" + this.channel + ")";
	}
};
var LexerCustomAction = class _LexerCustomAction {
	static {
		__name(this, "LexerCustomAction");
	}
	ruleIndex;
	actionIndex;
	actionType;
	isPositionDependent = true;
	cachedHashCode;
	/**
	* Constructs a custom lexer action with the specified rule and action indexes.
	*
	* @param ruleIndex The rule index to use for calls to {@link Recognizer.action}.
	* @param actionIndex The action index to use for calls to {@link Recognizer.action}.
	*/
	constructor(ruleIndex, actionIndex) {
		this.actionType = LexerActionType.CUSTOM;
		this.ruleIndex = ruleIndex;
		this.actionIndex = actionIndex;
	}
	/**
	* Custom actions are implemented by calling {@link Lexer.action} with the
	* appropriate rule and action indexes.
	*/
	execute(lexer) {
		lexer.action(null, this.ruleIndex, this.actionIndex);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.actionType);
			hash = MurmurHash.update(hash, this.ruleIndex);
			hash = MurmurHash.update(hash, this.actionIndex);
			this.cachedHashCode = MurmurHash.finish(hash, 3);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerCustomAction)) return false;
		return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
	}
};
var LexerMoreAction = class _LexerMoreAction {
	static {
		__name(this, "LexerMoreAction");
	}
	static instance = new _LexerMoreAction();
	actionType;
	isPositionDependent = false;
	constructor() {
		this.actionType = LexerActionType.MORE;
	}
	equals(obj) {
		return obj === this;
	}
	hashCode() {
		return LexerActionType.MORE;
	}
	/**
	* This action is implemented by calling {@link Lexer.popMode}.
	*/
	execute(lexer) {
		lexer.more();
	}
	toString() {
		return "more";
	}
};
var LexerTypeAction = class _LexerTypeAction {
	static {
		__name(this, "LexerTypeAction");
	}
	type;
	actionType;
	isPositionDependent = false;
	cachedHashCode;
	constructor(type) {
		this.actionType = LexerActionType.TYPE;
		this.type = type;
	}
	execute(lexer) {
		lexer.type = this.type;
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.actionType);
			hash = MurmurHash.update(hash, this.type);
			this.cachedHashCode = MurmurHash.finish(hash, 2);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerTypeAction)) return false;
		return this.type === other.type;
	}
	toString() {
		return "type(" + this.type + ")";
	}
};
var LexerPushModeAction = class _LexerPushModeAction {
	static {
		__name(this, "LexerPushModeAction");
	}
	mode;
	actionType;
	isPositionDependent = false;
	cachedHashCode;
	constructor(mode) {
		this.actionType = LexerActionType.PUSH_MODE;
		this.mode = mode;
	}
	/**
	* This action is implemented by calling {@link Lexer.pushMode} with the
	* value provided by {@link getMode}.
	*/
	execute(lexer) {
		lexer.pushMode(this.mode);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.actionType);
			hash = MurmurHash.update(hash, this.mode);
			this.cachedHashCode = MurmurHash.finish(hash, 2);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerPushModeAction)) return false;
		return this.mode === other.mode;
	}
	toString() {
		return "pushMode(" + this.mode + ")";
	}
};
var LexerPopModeAction = class _LexerPopModeAction {
	static {
		__name(this, "LexerPopModeAction");
	}
	static instance = new _LexerPopModeAction();
	actionType;
	isPositionDependent = false;
	constructor() {
		this.actionType = LexerActionType.POP_MODE;
	}
	equals(obj) {
		return obj === this;
	}
	hashCode() {
		return LexerActionType.POP_MODE;
	}
	/**
	* This action is implemented by calling {@link Lexer//popMode}.
	*/
	execute(lexer) {
		lexer.popMode();
	}
	toString() {
		return "popMode";
	}
};
var LexerModeAction = class _LexerModeAction {
	static {
		__name(this, "LexerModeAction");
	}
	mode;
	actionType;
	isPositionDependent = false;
	cachedHashCode;
	constructor(mode) {
		this.actionType = LexerActionType.MODE;
		this.mode = mode;
	}
	/**
	* This action is implemented by calling {@link Lexer.mode} with the
	* value provided by {@link getMode}.
	*/
	execute(lexer) {
		lexer.mode = this.mode;
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.actionType);
			hash = MurmurHash.update(hash, this.mode);
			this.cachedHashCode = MurmurHash.finish(hash, 2);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerModeAction)) return false;
		return this.mode === other.mode;
	}
	toString() {
		return "mode(" + this.mode + ")";
	}
};
var ATNDeserializer = class _ATNDeserializer {
	static {
		__name(this, "ATNDeserializer");
	}
	static SERIALIZED_VERSION = 4;
	static stateTypeMapper = /* @__PURE__ */ new Map([
		[ATNState.INVALID_TYPE, void 0],
		[ATNState.BASIC, BasicState],
		[ATNState.RULE_START, RuleStartState],
		[ATNState.BLOCK_START, BasicBlockStartState],
		[ATNState.PLUS_BLOCK_START, PlusBlockStartState],
		[ATNState.STAR_BLOCK_START, StarBlockStartState],
		[ATNState.TOKEN_START, TokensStartState],
		[ATNState.RULE_STOP, RuleStopState],
		[ATNState.BLOCK_END, BlockEndState],
		[ATNState.STAR_LOOP_BACK, StarLoopbackState],
		[ATNState.STAR_LOOP_ENTRY, StarLoopEntryState],
		[ATNState.PLUS_LOOP_BACK, PlusLoopbackState],
		[ATNState.LOOP_END, LoopEndState]
	]);
	static lexerActionFactoryMapper = /* @__PURE__ */ new Map([
		[LexerActionType.CHANNEL, (data1) => {
			return new LexerChannelAction(data1);
		}],
		[LexerActionType.CUSTOM, (data1, data2) => {
			return new LexerCustomAction(data1, data2);
		}],
		[LexerActionType.MODE, (data1) => {
			return new LexerModeAction(data1);
		}],
		[LexerActionType.MORE, () => {
			return LexerMoreAction.instance;
		}],
		[LexerActionType.POP_MODE, () => {
			return LexerPopModeAction.instance;
		}],
		[LexerActionType.PUSH_MODE, (data1) => {
			return new LexerPushModeAction(data1);
		}],
		[LexerActionType.SKIP, () => {
			return LexerSkipAction.instance;
		}],
		[LexerActionType.TYPE, (data1) => {
			return new LexerTypeAction(data1);
		}]
	]);
	data = [];
	pos = 0;
	deserializationOptions;
	actionFactories;
	constructor(options) {
		if (!options) options = {
			readOnly: false,
			verifyATN: true,
			generateRuleBypassTransitions: false
		};
		this.deserializationOptions = options;
	}
	deserialize(data) {
		this.data = data;
		this.checkVersion();
		const atn = this.readATN();
		this.readStates(atn);
		this.readRules(atn);
		this.readModes(atn);
		const sets = [];
		this.readSets(atn, sets);
		this.readEdges(atn, sets);
		this.readDecisions(atn);
		this.readLexerActions(atn);
		this.markPrecedenceDecisions(atn);
		this.verifyATN(atn);
		if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATN.PARSER) {
			this.generateRuleBypassTransitions(atn);
			this.verifyATN(atn);
		}
		return atn;
	}
	checkVersion() {
		const version = this.data[this.pos++];
		if (version !== _ATNDeserializer.SERIALIZED_VERSION) throw new Error("Could not deserialize ATN with version " + version + " (expected " + _ATNDeserializer.SERIALIZED_VERSION + ").");
	}
	readATN() {
		const grammarType = this.data[this.pos++];
		const maxTokenType = this.data[this.pos++];
		return new ATN(grammarType, maxTokenType);
	}
	readStates(atn) {
		let j;
		let stateNumber;
		const loopBackStateNumbers = [];
		const endStateNumbers = [];
		const stateCount = this.data[this.pos++];
		for (let i = 0; i < stateCount; i++) {
			const stateType = this.data[this.pos++];
			if (stateType === ATNState.INVALID_TYPE) {
				atn.addState(null);
				continue;
			}
			const ruleIndex = this.data[this.pos++];
			const s = this.stateFactory(stateType, ruleIndex);
			if (stateType === ATNState.LOOP_END) {
				const loopBackStateNumber = this.data[this.pos++];
				loopBackStateNumbers.push([s, loopBackStateNumber]);
			} else if (s instanceof BlockStartState) {
				const endStateNumber = this.data[this.pos++];
				endStateNumbers.push([s, endStateNumber]);
			}
			atn.addState(s);
		}
		for (j = 0; j < loopBackStateNumbers.length; j++) {
			const pair = loopBackStateNumbers[j];
			pair[0].loopBackState = atn.states[pair[1]] ?? void 0;
		}
		for (j = 0; j < endStateNumbers.length; j++) {
			const pair = endStateNumbers[j];
			pair[0].endState = atn.states[pair[1]];
		}
		const numNonGreedyStates = this.data[this.pos++];
		for (j = 0; j < numNonGreedyStates; j++) {
			stateNumber = this.data[this.pos++];
			atn.states[stateNumber].nonGreedy = true;
		}
		const numPrecedenceStates = this.data[this.pos++];
		for (j = 0; j < numPrecedenceStates; j++) {
			stateNumber = this.data[this.pos++];
			atn.states[stateNumber].isLeftRecursiveRule = true;
		}
	}
	readRules(atn) {
		let i;
		const ruleCount = this.data[this.pos++];
		if (atn.grammarType === ATN.LEXER) {
			atn.ruleToTokenType = new Array(ruleCount);
			atn.ruleToTokenType.fill(0);
		}
		atn.ruleToStartState = new Array(ruleCount);
		atn.ruleToStartState.fill(null);
		for (i = 0; i < ruleCount; i++) {
			const s = this.data[this.pos++];
			atn.ruleToStartState[i] = atn.states[s];
			if (atn.grammarType === ATN.LEXER) {
				const tokenType = this.data[this.pos++];
				atn.ruleToTokenType[i] = tokenType;
			}
		}
		atn.ruleToStopState = new Array(ruleCount);
		atn.ruleToStopState.fill(null);
		for (i = 0; i < atn.states.length; i++) {
			const state = atn.states[i];
			if (!(state instanceof RuleStopState)) continue;
			atn.ruleToStopState[state.ruleIndex] = state;
			atn.ruleToStartState[state.ruleIndex].stopState = state;
		}
	}
	readModes(atn) {
		const modeCount = this.data[this.pos++];
		for (let i = 0; i < modeCount; i++) {
			const s = this.data[this.pos++];
			atn.modeToStartState.push(atn.states[s]);
		}
	}
	readSets(atn, sets) {
		const m2 = this.data[this.pos++];
		for (let i = 0; i < m2; i++) {
			const intervalSet = new IntervalSet();
			sets.push(intervalSet);
			const n2 = this.data[this.pos++];
			if (this.data[this.pos++] !== 0) intervalSet.addOne(-1);
			for (let j = 0; j < n2; j++) {
				const i1 = this.data[this.pos++];
				const i2 = this.data[this.pos++];
				intervalSet.addRange(i1, i2);
			}
		}
	}
	readEdges(atn, sets) {
		let i;
		let j;
		let state;
		let trans;
		let target;
		const edgeCount = this.data[this.pos++];
		for (i = 0; i < edgeCount; i++) {
			const src = this.data[this.pos++];
			const trg = this.data[this.pos++];
			const ttype = this.data[this.pos++];
			const arg1 = this.data[this.pos++];
			const arg2 = this.data[this.pos++];
			const arg3 = this.data[this.pos++];
			trans = this.edgeFactory(atn, ttype, trg, arg1, arg2, arg3, sets);
			atn.states[src].addTransition(trans);
		}
		for (i = 0; i < atn.states.length; i++) {
			state = atn.states[i];
			for (j = 0; j < state.transitions.length; j++) {
				const t = state.transitions[j];
				if (!(t instanceof RuleTransition)) continue;
				let outermostPrecedenceReturn = -1;
				if (atn.ruleToStartState[t.target.ruleIndex].isLeftRecursiveRule) {
					if (t.precedence === 0) outermostPrecedenceReturn = t.target.ruleIndex;
				}
				trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
				atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
			}
		}
		for (i = 0; i < atn.states.length; i++) {
			state = atn.states[i];
			if (state instanceof BlockStartState) {
				if (!state.endState) throw new Error("IllegalState");
				if (state.endState.startState) throw new Error("IllegalState");
				state.endState.startState = state;
			}
			if (state instanceof PlusLoopbackState) for (j = 0; j < state.transitions.length; j++) {
				target = state.transitions[j].target;
				if (target instanceof PlusBlockStartState) target.loopBackState = state;
			}
			else if (state instanceof StarLoopbackState) for (j = 0; j < state.transitions.length; j++) {
				target = state.transitions[j].target;
				if (target instanceof StarLoopEntryState) target.loopBackState = state;
			}
		}
	}
	readDecisions(atn) {
		const decisionCount = this.data[this.pos++];
		for (let i = 0; i < decisionCount; i++) {
			const s = this.data[this.pos++];
			const decState = atn.states[s];
			atn.decisionToState.push(decState);
			decState.decision = i;
		}
	}
	readLexerActions(atn) {
		if (atn.grammarType === ATN.LEXER) {
			const count = this.data[this.pos++];
			atn.lexerActions = [];
			for (let i = 0; i < count; i++) {
				const actionType = this.data[this.pos++];
				const data1 = this.data[this.pos++];
				const data2 = this.data[this.pos++];
				atn.lexerActions.push(this.lexerActionFactory(actionType, data1, data2));
			}
		}
	}
	generateRuleBypassTransitions(atn) {
		let i;
		const count = atn.ruleToStartState.length;
		for (i = 0; i < count; i++) atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
		for (i = 0; i < count; i++) this.generateRuleBypassTransition(atn, i);
	}
	generateRuleBypassTransition(atn, idx) {
		let i;
		let state;
		const bypassStart = new BasicBlockStartState();
		bypassStart.ruleIndex = idx;
		atn.addState(bypassStart);
		const bypassStop = new BlockEndState();
		bypassStop.ruleIndex = idx;
		atn.addState(bypassStop);
		bypassStart.endState = bypassStop;
		atn.defineDecisionState(bypassStart);
		bypassStop.startState = bypassStart;
		let excludeTransition = null;
		let endState = null;
		if (atn.ruleToStartState[idx].isLeftRecursiveRule) {
			endState = null;
			for (i = 0; i < atn.states.length; i++) {
				state = atn.states[i];
				if (this.stateIsEndStateFor(state, idx)) {
					endState = state;
					excludeTransition = state.loopBackState.transitions[0];
					break;
				}
			}
			if (excludeTransition === null) throw new Error("Couldn't identify final state of the precedence rule prefix section.");
		} else endState = atn.ruleToStopState[idx];
		for (i = 0; i < atn.states.length; i++) {
			state = atn.states[i];
			for (const transition of state.transitions) {
				if (transition === excludeTransition) continue;
				if (transition.target === endState) transition.target = bypassStop;
			}
		}
		const ruleToStartState = atn.ruleToStartState[idx];
		while (ruleToStartState.transitions.length > 0) {
			const transition = ruleToStartState.removeTransition(ruleToStartState.transitions.length - 1);
			bypassStart.addTransition(transition);
		}
		atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
		if (endState) bypassStop.addTransition(new EpsilonTransition(endState));
		const matchState = new BasicState();
		atn.addState(matchState);
		matchState.addTransition(new AtomTransition(bypassStop, atn.ruleToTokenType[idx]));
		bypassStart.addTransition(new EpsilonTransition(matchState));
	}
	stateIsEndStateFor(state, idx) {
		if (state.ruleIndex !== idx) return null;
		if (!(state instanceof StarLoopEntryState)) return null;
		const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
		if (!(maybeLoopEndState instanceof LoopEndState)) return null;
		if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) return state;
		else return null;
	}
	/**
	* Analyze the {@link StarLoopEntryState} states in the specified ATN to set
	* the {@link StarLoopEntryState} field to the correct value.
	*
	* @param atn The ATN.
	*/
	markPrecedenceDecisions(atn) {
		for (const state of atn.states) {
			if (!(state instanceof StarLoopEntryState)) continue;
			if (atn.ruleToStartState[state.ruleIndex].isLeftRecursiveRule) {
				const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
				if (maybeLoopEndState instanceof LoopEndState) {
					if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) state.precedenceRuleDecision = true;
				}
			}
		}
	}
	verifyATN(atn) {
		if (!this.deserializationOptions.verifyATN) return;
		for (const state of atn.states) {
			if (state === null) continue;
			this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
			if (state instanceof PlusBlockStartState) this.checkCondition(state.loopBackState !== null);
			else if (state instanceof StarLoopEntryState) {
				this.checkCondition(state.loopBackState !== null);
				this.checkCondition(state.transitions.length === 2);
				if (state.transitions[0].target instanceof StarBlockStartState) {
					this.checkCondition(state.transitions[1].target instanceof LoopEndState);
					this.checkCondition(!state.nonGreedy);
				} else if (state.transitions[0].target instanceof LoopEndState) {
					this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
					this.checkCondition(state.nonGreedy);
				} else throw new Error("IllegalState");
			} else if (state instanceof StarLoopbackState) {
				this.checkCondition(state.transitions.length === 1);
				this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
			} else if (state instanceof LoopEndState) this.checkCondition(state.loopBackState !== null);
			else if (state instanceof RuleStartState) this.checkCondition(state.stopState !== null);
			else if (state instanceof BlockStartState) this.checkCondition(state.endState !== null);
			else if (state instanceof BlockEndState) this.checkCondition(state.startState !== null);
			else if (state instanceof DecisionState) this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
			else this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
		}
	}
	checkCondition(condition, message) {
		if (!condition) {
			if (message === void 0 || message === null) message = "IllegalState";
			throw message;
		}
	}
	edgeFactory(atn, type, trg, arg1, arg2, arg3, sets) {
		const target = atn.states[trg];
		switch (type) {
			case Transition.EPSILON: return new EpsilonTransition(target);
			case Transition.RANGE: return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
			case Transition.RULE: return new RuleTransition(atn.states[arg1], arg2, arg3, target);
			case Transition.PREDICATE: return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
			case Transition.PRECEDENCE: return new PrecedencePredicateTransition(target, arg1);
			case Transition.ATOM: return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);
			case Transition.ACTION: return new ActionTransition(target, arg1, arg2, arg3 !== 0);
			case Transition.SET: return new SetTransition(target, sets[arg1]);
			case Transition.NOT_SET: return new NotSetTransition(target, sets[arg1]);
			case Transition.WILDCARD: return new WildcardTransition(target);
			default: throw new Error("The specified transition type: " + type + " is not valid.");
		}
	}
	stateFactory(type, ruleIndex) {
		const ctor = _ATNDeserializer.stateTypeMapper.get(type);
		if (!ctor) throw new Error("The specified state type " + type + " is not valid.");
		const s = new ctor();
		s.ruleIndex = ruleIndex;
		return s;
	}
	lexerActionFactory(type, data1, data2) {
		const factory = _ATNDeserializer.lexerActionFactoryMapper.get(type);
		if (!factory) throw new Error("The specified lexer action type " + type + " is not valid.");
		return factory(data1, data2);
	}
};
var OrderedHashMap = class _OrderedHashMap extends HashMap {
	static {
		__name(this, "OrderedHashMap");
	}
	#keys = [];
	clear() {
		super.clear();
		this.#keys = [];
	}
	get(key) {
		return super.get(key);
	}
	set(key, value) {
		const result = super.set(key, value);
		if (result === void 0) this.#keys.push(key);
		return result;
	}
	setIfAbsent(key, value) {
		const result = super.setIfAbsent(key, value);
		if (result === void 0) this.#keys.push(key);
		return result;
	}
	/**
	* @returns an iterable of the values in the map, in the order they were inserted.
	*/
	values() {
		return { [Symbol.iterator]: () => {
			let index = 0;
			return { next: /* @__PURE__ */ __name(() => {
				if (index < this.#keys.length) return {
					done: false,
					value: super.get(this.#keys[index++])
				};
				return {
					done: true,
					value: void 0
				};
			}, "next") };
		} };
	}
	/**
	* @returns an iterable of the keys in the map, in the order they were inserted.
	*/
	keys() {
		return this.#keys[Symbol.iterator]();
	}
	equals(o) {
		if (!(o instanceof _OrderedHashMap)) return false;
		return super.equals(o);
	}
};
var ATNSerializer = class _ATNSerializer {
	static {
		__name(this, "ATNSerializer");
	}
	atn;
	data = [];
	sets = new OrderedHashMap(ObjectEqualityComparator.instance);
	nonGreedyStates = [];
	precedenceStates = [];
	constructor(atn) {
		this.atn = atn;
	}
	static getSerialized(atn) {
		return new _ATNSerializer(atn).serialize();
	}
	static serializeSets(data, sets) {
		data.push(sets.length);
		for (const set of sets) {
			const containsEof = set.contains(Token.EOF);
			const intervals = [...set];
			if (containsEof && intervals[0].stop === Token.EOF) data.push(intervals.length - 1);
			else data.push(intervals.length);
			data.push(containsEof ? 1 : 0);
			for (const interval of intervals) {
				if (interval.start === Token.EOF) if (interval.stop === Token.EOF) continue;
				else data.push(0);
				else data.push(interval.start);
				data.push(interval.stop);
			}
		}
	}
	/**
	* Serialize state descriptors, edge descriptors, and decision -> state map
	*  into list of ints.  Likely out of date, but keeping as it could be helpful:
	*
	*      SERIALIZED_VERSION
	*      UUID (2 longs)
	* 		grammar-type, (ANTLRParser.LEXER, ...)
	*  	max token type,
	*  	num states,
	*  	state-0-type ruleIndex, state-1-type ruleIndex, ... state-i-type ruleIndex optional-arg ...
	*  	num rules,
	*  	rule-1-start-state rule-1-args, rule-2-start-state  rule-2-args, ...
	*  	(args are token type,actionIndex in lexer else 0,0)
	*      num modes,
	*      mode-0-start-state, mode-1-start-state, ... (parser has 0 modes)
	*      num unicode-bmp-sets
	*      bmp-set-0-interval-count intervals, bmp-set-1-interval-count intervals, ...
	*      num unicode-smp-sets
	*      smp-set-0-interval-count intervals, smp-set-1-interval-count intervals, ...
	*	num total edges,
	*      src, trg, edge-type, edge arg1, optional edge arg2 (present always), ...
	*      num decisions,
	*      decision-0-start-state, decision-1-start-state, ...
	*
	*  Convenient to pack into unsigned shorts to make as Java string.
	*/
	serialize() {
		this.addPreamble();
		const edgeCount = this.addEdges();
		this.addNonGreedyStates();
		this.addPrecedenceStates();
		this.addRuleStatesAndLexerTokenTypes();
		this.addModeStartStates();
		const setIndices = this.addSets();
		this.addEdges(edgeCount, setIndices);
		this.addDecisionStartStates();
		this.addLexerActions();
		return this.data;
	}
	addPreamble() {
		this.data.push(ATNDeserializer.SERIALIZED_VERSION);
		this.data.push(this.atn.grammarType);
		this.data.push(this.atn.maxTokenType);
	}
	addLexerActions() {
		if (this.atn.grammarType === ATN.LEXER) {
			this.data.push(this.atn.lexerActions.length);
			for (const action of this.atn.lexerActions) {
				this.data.push(action.actionType);
				switch (action.actionType) {
					case LexerActionType.CHANNEL: {
						const channel = action.channel;
						this.data.push(channel);
						this.data.push(0);
						break;
					}
					case LexerActionType.CUSTOM: {
						const ruleIndex = action.ruleIndex;
						const actionIndex = action.actionIndex;
						this.data.push(ruleIndex);
						this.data.push(actionIndex);
						break;
					}
					case LexerActionType.MODE: {
						const mode = action.mode;
						this.data.push(mode);
						this.data.push(0);
						break;
					}
					case LexerActionType.MORE:
						this.data.push(0);
						this.data.push(0);
						break;
					case LexerActionType.POP_MODE:
						this.data.push(0);
						this.data.push(0);
						break;
					case LexerActionType.PUSH_MODE: {
						const mode = action.mode;
						this.data.push(mode);
						this.data.push(0);
						break;
					}
					case LexerActionType.SKIP:
						this.data.push(0);
						this.data.push(0);
						break;
					case LexerActionType.TYPE: {
						const type = action.type;
						this.data.push(type);
						this.data.push(0);
						break;
					}
					default: throw new Error(`The specified lexer action type ${action.actionType} is not valid.`);
				}
			}
		}
	}
	addDecisionStartStates() {
		this.data.push(this.atn.decisionToState.length);
		for (const decStartState of this.atn.decisionToState) this.data.push(decStartState.stateNumber);
	}
	addEdges(...args) {
		switch (args.length) {
			case 0: {
				let edgeCount = 0;
				this.data.push(this.atn.states.length);
				for (const s of this.atn.states) {
					if (s === null) {
						this.data.push(ATNState.INVALID_TYPE);
						continue;
					}
					const stateType = s.constructor.stateType;
					if (s instanceof DecisionState && s.nonGreedy) this.nonGreedyStates.push(s.stateNumber);
					if (s instanceof RuleStartState && s.isLeftRecursiveRule) this.precedenceStates.push(s.stateNumber);
					this.data.push(stateType);
					this.data.push(s.ruleIndex);
					if (s.constructor.stateType === ATNState.LOOP_END) this.data.push(s.loopBackState.stateNumber);
					else if (s instanceof BlockStartState) this.data.push(s.endState.stateNumber);
					if (s.constructor.stateType !== ATNState.RULE_STOP) edgeCount += s.transitions.length;
					for (const t of s.transitions) {
						const edgeType = t.transitionType;
						if (edgeType === Transition.SET || edgeType === Transition.NOT_SET) {
							const st = t;
							this.sets.set(st.set, true);
						}
					}
				}
				return edgeCount;
			}
			case 2: {
				const [edgeCount, setIndices] = args;
				this.data.push(edgeCount);
				for (const s of this.atn.states) {
					if (s === null) continue;
					if (s.constructor.stateType === ATNState.RULE_STOP) continue;
					for (const t of s.transitions) {
						if (this.atn.states[t.target.stateNumber] === null) throw new Error("Cannot serialize a transition to a removed state.");
						const src = s.stateNumber;
						let trg = t.target.stateNumber;
						const edgeType = t.transitionType;
						let arg1 = 0;
						let arg2 = 0;
						let arg3 = 0;
						switch (edgeType) {
							case Transition.RULE:
								trg = t.followState.stateNumber;
								arg1 = t.target.stateNumber;
								arg2 = t.ruleIndex;
								arg3 = t.precedence;
								break;
							case Transition.PRECEDENCE:
								arg1 = t.precedence;
								break;
							case Transition.PREDICATE: {
								const pt = t;
								arg1 = pt.ruleIndex;
								arg2 = pt.predIndex;
								arg3 = pt.isCtxDependent ? 1 : 0;
								break;
							}
							case Transition.RANGE:
								arg1 = t.start;
								arg2 = t.stop;
								if (arg1 === Token.EOF) {
									arg1 = 0;
									arg3 = 1;
								}
								break;
							case Transition.ATOM:
								arg1 = t.labelValue;
								if (arg1 === Token.EOF) {
									arg1 = 0;
									arg3 = 1;
								}
								break;
							case Transition.ACTION: {
								const at = t;
								arg1 = at.ruleIndex;
								arg2 = at.actionIndex;
								arg3 = at.isCtxDependent ? 1 : 0;
								break;
							}
							case Transition.SET:
								arg1 = setIndices.get(t.set);
								break;
							case Transition.NOT_SET:
								arg1 = setIndices.get(t.set);
								break;
							case Transition.WILDCARD: break;
							default:
						}
						this.data.push(src);
						this.data.push(trg);
						this.data.push(edgeType);
						this.data.push(arg1);
						this.data.push(arg2);
						this.data.push(arg3);
					}
				}
				break;
			}
			default: throw new Error("Invalid number of arguments");
		}
	}
	addSets() {
		_ATNSerializer.serializeSets(this.data, [...this.sets.keys()]);
		const setIndices = new HashMap();
		let setIndex = 0;
		for (const s of this.sets.keys()) setIndices.set(s, setIndex++);
		return setIndices;
	}
	addModeStartStates() {
		const modeCount = this.atn.modeToStartState.length;
		this.data.push(modeCount);
		if (modeCount > 0) for (const modeStartState of this.atn.modeToStartState) this.data.push(modeStartState.stateNumber);
	}
	addRuleStatesAndLexerTokenTypes() {
		const ruleCount = this.atn.ruleToStartState.length;
		this.data.push(ruleCount);
		for (let r = 0; r < ruleCount; r++) {
			const ruleStartState = this.atn.ruleToStartState[r];
			this.data.push(ruleStartState.stateNumber);
			if (this.atn.grammarType === ATN.LEXER) this.data.push(this.atn.ruleToTokenType[r]);
		}
	}
	addPrecedenceStates() {
		this.data.push(this.precedenceStates.length);
		for (const state of this.precedenceStates) this.data.push(state);
	}
	addNonGreedyStates() {
		this.data.push(this.nonGreedyStates.length);
		for (const state of this.nonGreedyStates) this.data.push(state);
	}
};
var DFAState = class _DFAState {
	static {
		__name(this, "DFAState");
	}
	stateNumber = -1;
	configs;
	/**
	* `edges[symbol]` points to target of symbol. Shift up by 1 so (-1) {@link Token.EOF} maps to `edges[0]`.
	*/
	edges = [];
	isAcceptState = false;
	/**
	* If accept state, what ttype do we match or alt do we predict? This is set to {@link ATN.INVALID_ALT_NUMBER}
	* when {@link predicates} `!= null` or {@link requiresFullContext}.
	*/
	prediction = -1;
	lexerActionExecutor = null;
	/**
	* Indicates that this state was created during SLL prediction that discovered a conflict between the configurations
	* in the state. Future {@link ParserATNSimulator.execATN} invocations immediately jumped doing
	* full context prediction if this field is true.
	*/
	requiresFullContext = false;
	/**
	* During SLL parsing, this is a list of predicates associated with the ATN configurations of the DFA state.
	* When we have predicates, {@link requiresFullContext} is `false` since full context prediction evaluates
	* predicates on-the-fly. If this is not null, then {@link prediction} is `ATN.INVALID_ALT_NUMBER`.
	*
	* We only use these for non-{@link #requiresFullContext} but conflicting states. That
	* means we know from the context (it's $ or we don't dip into outer
	* context) that it's an ambiguity not a conflict.
	*
	* This list is computed by {@link ParserATNSimulator#predicateDFAState}.
	*/
	predicates = null;
	constructor(configs) {
		if (configs) this.configs = configs;
	}
	static fromState(stateNumber) {
		const result = new _DFAState();
		result.stateNumber = stateNumber;
		return result;
	}
	static fromConfigs(configs) {
		return new _DFAState(configs);
	}
	static hashCode(state) {
		return state.configs.hashCode();
	}
	/**
	* Two {@link DFAState} instances are equal if their ATN configuration sets
	* are the same. This method is used to see if a state already exists.
	*
	* Because the number of alternatives and number of ATN configurations are
	* finite, there is a finite number of DFA states that can be processed.
	* This is necessary to show that the algorithm terminates.
	*
	* Cannot test the DFA state numbers here because in
	* {@link ParserATNSimulator#addDFAState} we need to know if any other state
	* exists that has this exact set of ATN configurations. The
	* {@link #stateNumber} is irrelevant.
	*
	* @param a The first {@link DFAState}.
	* @param b The second {@link DFAState}.
	*
	* @returns `true` if the two states are equal, otherwise `false`.
	*/
	static equals(a, b) {
		return a.configs.equals(b.configs);
	}
	/**
	* @returns the set of all alts mentioned by all ATN configurations in this DFA state.
	*/
	getAltSet() {
		const alts = /* @__PURE__ */ new Set();
		for (const config of this.configs) alts.add(config.alt);
		if (alts.size === 0) return null;
		return alts;
	}
	toString() {
		let buf = "";
		buf += this.stateNumber;
		buf += ":";
		buf += this.configs ? this.configs.toString() : "";
		if (this.isAcceptState) {
			buf += "=>";
			if (this.predicates) buf += arrayToString(this.predicates);
			else buf += this.prediction;
		}
		return buf.toString();
	}
};
var ATNSimulator = class {
	static {
		__name(this, "ATNSimulator");
	}
	/** Must distinguish between missing edge and edge we know leads nowhere */
	static ERROR = DFAState.fromState(2147483647);
	atn;
	/**
	* The context cache maps all PredictionContext objects that are ==
	* to a single cached copy. This cache is shared across all contexts
	* in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
	* to use only cached nodes/graphs in addDFAState(). We don't want to
	* fill this during closure() since there are lots of contexts that
	* pop up but are not used ever again. It also greatly slows down closure().
	*
	* This cache makes a huge difference in memory and a little bit in speed.
	* For the Java grammar on java.*, it dropped the memory requirements
	* at the end from 25M to 16M. We don't store any of the full context
	* graphs in the DFA because they are limited to local context only,
	* but apparently there's a lot of repetition there as well. We optimize
	* the config contexts before storing the config set in the DFA states
	* by literally rebuilding them with cached subgraphs only.
	*
	* I tried a cache for use during closure operations, that was
	* whacked after each adaptivePredict(). It cost a little bit
	* more time I think and doesn't save on the overall footprint
	* so it's not worth the complexity.
	*/
	sharedContextCache;
	constructor(atn, sharedContextCache) {
		this.atn = atn;
		this.sharedContextCache = sharedContextCache;
		return this;
	}
	getCachedContext(context) {
		if (!this.sharedContextCache) return context;
		const visited = new HashMap(ObjectEqualityComparator.instance);
		return getCachedPredictionContext(context, this.sharedContextCache, visited);
	}
};
var CodePointTransitions = class _CodePointTransitions {
	static {
		__name(this, "CodePointTransitions");
	}
	/** @returns new {@link AtomTransition}     */
	static createWithCodePoint(target, codePoint) {
		return _CodePointTransitions.createWithCodePointRange(target, codePoint, codePoint);
	}
	/** @returns new {@link AtomTransition} if range represents one atom else {@link SetTransition}. */
	static createWithCodePointRange(target, codePointFrom, codePointTo) {
		return codePointFrom === codePointTo ? new AtomTransition(target, codePointFrom) : new RangeTransition(target, codePointFrom, codePointTo);
	}
};
var DecisionInfo = class {
	static {
		__name(this, "DecisionInfo");
	}
	/**
	* The decision number, which is an index into {@link ATN.decisionToState}.
	*/
	decision = 0;
	/**
	* The total number of times {@link ParserATNSimulator.adaptivePredict} was
	* invoked for this decision.
	*/
	invocations = 0;
	/**
	* The total time spent in {@link ParserATNSimulator.adaptivePredict} for
	* this decision, in nanoseconds.
	*
	* The value of this field contains the sum of differential results obtained
	* by {@link process.hrtime()}, and is not adjusted to compensate for JIT
	* and/or garbage collection overhead. For best accuracy, use a modern Node.js
	* version that provides precise results from {@link process.hrtime()}, and
	* perform profiling in a separate process which is warmed up by parsing the
	* input prior to profiling.
	*/
	timeInPrediction = 0;
	/**
	* The sum of the lookahead required for SLL prediction for this decision.
	* Note that SLL prediction is used before LL prediction for performance
	* reasons even when {@link PredictionMode.LL} or
	* {@link PredictionMode.LL_EXACT_AMBIG_DETECTION} is used.
	*/
	sllTotalLook = 0;
	/**
	* Gets the minimum lookahead required for any single SLL prediction to
	* complete for this decision, by reaching a unique prediction, reaching an
	* SLL conflict state, or encountering a syntax error.
	*/
	sllMinLook = 0;
	/**
	* Gets the maximum lookahead required for any single SLL prediction to
	* complete for this decision, by reaching a unique prediction, reaching an
	* SLL conflict state, or encountering a syntax error.
	*/
	sllMaxLook = 0;
	/**
	* Gets the {@link LookaheadEventInfo} associated with the event where the
	* {@link sllMaxLook} value was set.
	*/
	sllMaxLookEvent;
	/**
	* The sum of the lookahead required for LL prediction for this decision.
	* Note that LL prediction is only used when SLL prediction reaches a
	* conflict state.
	*/
	llTotalLook = 0;
	/**
	* Gets the minimum lookahead required for any single LL prediction to
	* complete for this decision. An LL prediction completes when the algorithm
	* reaches a unique prediction, a conflict state (for
	* {@link PredictionMode.LL}, an ambiguity state (for
	* {@link PredictionMode.LL_EXACT_AMBIG_DETECTION}, or a syntax error.
	*/
	llMinLook = 0;
	/**
	* Gets the maximum lookahead required for any single LL prediction to
	* complete for this decision. An LL prediction completes when the algorithm
	* reaches a unique prediction, a conflict state (for
	* {@link PredictionMode.LL}, an ambiguity state (for
	* {@link PredictionMode.LL_EXACT_AMBIG_DETECTION}, or a syntax error.
	*/
	llMaxLook = 0;
	/**
	* Gets the {@link LookaheadEventInfo} associated with the event where the
	* {@link llMaxLook} value was set.
	*/
	llMaxLookEvent;
	/**
	* A collection of {@link ContextSensitivityInfo} instances describing the
	* context sensitivities encountered during LL prediction for this decision.
	*/
	contextSensitivities;
	/**
	* A collection of {@link DecisionEventInfo} instances describing the parse errors
	* identified during calls to {@link ParserATNSimulator.adaptivePredict} for
	* this decision.
	*/
	errors;
	/**
	* A collection of {@link AmbiguityInfo} instances describing the
	* ambiguities encountered during LL prediction for this decision.
	*/
	ambiguities;
	/**
	* A collection of {@link PredicateEvalInfo} instances describing the
	* results of evaluating individual predicates during prediction for this
	* decision.
	*/
	predicateEvals;
	/**
	* The total number of ATN transitions required during SLL prediction for
	* this decision. An ATN transition is determined by the number of times the
	* DFA does not contain an edge that is required for prediction, resulting
	* in on-the-fly computation of that edge.
	/**
	* If DFA caching of SLL transitions is employed by the implementation, ATN
	* computation may cache the computed edge for efficient lookup during
	* future parsing of this decision. Otherwise, the SLL parsing algorithm
	* will use ATN transitions exclusively.
	*
	* @see sllDFATransitions
	* @see ParserATNSimulator.computeTargetState
	* @see LexerATNSimulator.computeTargetState
	*/
	sllATNTransitions = 0;
	/**
	* The total number of DFA transitions required during SLL prediction for
	* this decision.
	*
	* If the ATN simulator implementation does not use DFA caching for SLL
	* transitions, this value will be 0.
	*
	* @see ParserATNSimulator.getExistingTargetState
	* @see LexerATNSimulator.getExistingTargetState
	*/
	sllDFATransitions = 0;
	/**
	* Gets the total number of times SLL prediction completed in a conflict
	* state, resulting in fallback to LL prediction.
	*
	* Note that this value is not related to whether or not
	* {@link PredictionMode.SLL} may be used successfully with a particular
	* grammar. If the ambiguity resolution algorithm applied to the SLL
	* conflicts for this decision produce the same result as LL prediction for
	* this decision, {@link PredictionMode.SLL} would produce the same overall
	* parsing result as {@link PredictionMode.LL}.
	*/
	llFallback = 0;
	/**
	* The total number of ATN transitions required during LL prediction for
	* this decision. An ATN transition is determined by the number of times the
	* DFA does not contain an edge that is required for prediction, resulting
	* in on-the-fly computation of that edge.
	*
	* If DFA caching of LL transitions is employed by the implementation, ATN
	* computation may cache the computed edge for efficient lookup during
	* future parsing of this decision. Otherwise, the LL parsing algorithm will
	* use ATN transitions exclusively.
	*
	* @see llDFATransitions
	* @see ParserATNSimulator.computeTargetState
	* @see LexerATNSimulator.computeTargetState
	*/
	llATNTransitions = 0;
	/**
	* The total number of DFA transitions required during LL prediction for
	* this decision.
	*
	* If the ATN simulator implementation does not use DFA caching for LL
	* transitions, this value will be 0.
	*
	* @see ParserATNSimulator.getExistingTargetState
	* @see LexerATNSimulator.getExistingTargetState
	*/
	llDFATransitions = 0;
	/**
	* Constructs a new instance of the {@link DecisionInfo} class to contain
	* statistics for a particular decision.
	*
	* @param decision The decision number
	*/
	constructor(decision) {
		this.decision = decision;
		this.contextSensitivities = [];
		this.errors = [];
		this.ambiguities = [];
		this.predicateEvals = [];
	}
	toString() {
		return "{decision=" + this.decision + ", contextSensitivities=" + this.contextSensitivities.length + ", errors=" + this.errors.length + ", ambiguities=" + this.ambiguities.length + ", sllLookahead=" + this.sllTotalLook + ", sllATNTransitions=" + this.sllATNTransitions + ", sllDFATransitions=" + this.sllDFATransitions + ", llFallback=" + this.llFallback + ", llLookahead=" + this.llTotalLook + ", llATNTransitions=" + this.llATNTransitions + "}";
	}
};
var LexerATNConfig = class _LexerATNConfig extends ATNConfig {
	static {
		__name(this, "LexerATNConfig");
	}
	/**
	* This is the backing field for {@link #getLexerActionExecutor}.
	*/
	lexerActionExecutor;
	passedThroughNonGreedyDecision;
	constructor(config, state, context, lexerActionExecutor) {
		super(config, state, context ?? config.context, context ? SemanticContext.NONE : config.semanticContext);
		this.lexerActionExecutor = context ? lexerActionExecutor : config.lexerActionExecutor ?? null;
		this.passedThroughNonGreedyDecision = _LexerATNConfig.checkNonGreedyDecision(config, this.state);
		return this;
	}
	static createWithExecutor(config, state, lexerActionExecutor) {
		return new _LexerATNConfig(config, state, config.context, lexerActionExecutor);
	}
	static createWithConfig(state, config, context) {
		return new _LexerATNConfig(config, state, context ?? null, config.lexerActionExecutor);
	}
	static createWithContext(state, alt, context) {
		return new _LexerATNConfig({ alt }, state, context, null);
	}
	static checkNonGreedyDecision(source, target) {
		return source.passedThroughNonGreedyDecision || "nonGreedy" in target && target.nonGreedy;
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hashCode = MurmurHash.initialize(7);
			hashCode = MurmurHash.update(hashCode, this.state.stateNumber);
			hashCode = MurmurHash.update(hashCode, this.alt);
			hashCode = MurmurHash.updateFromComparable(hashCode, this.context);
			hashCode = MurmurHash.updateFromComparable(hashCode, this.semanticContext);
			hashCode = MurmurHash.update(hashCode, this.passedThroughNonGreedyDecision ? 1 : 0);
			hashCode = MurmurHash.updateFromComparable(hashCode, this.lexerActionExecutor);
			hashCode = MurmurHash.finish(hashCode, 6);
			this.cachedHashCode = hashCode;
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		return this.passedThroughNonGreedyDecision === other.passedThroughNonGreedyDecision && (this.lexerActionExecutor && other.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && super.equals(other);
	}
};
var BaseErrorListener = class {
	static {
		__name(this, "BaseErrorListener");
	}
	syntaxError(recognizer, offendingSymbol, line, column, msg, e) {}
	reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {}
	reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {}
	reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {}
};
var ConsoleErrorListener = class _ConsoleErrorListener extends BaseErrorListener {
	static {
		__name(this, "ConsoleErrorListener");
	}
	/**
	* Provides a default instance of {@link ConsoleErrorListener}.
	*/
	static instance = new _ConsoleErrorListener();
	syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, _e) {
		console.error("line " + line + ":" + charPositionInLine + " " + msg);
	}
};
var ProxyErrorListener = class extends BaseErrorListener {
	constructor(delegates) {
		super();
		this.delegates = delegates;
		return this;
	}
	static {
		__name(this, "ProxyErrorListener");
	}
	syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
		this.delegates.forEach((d) => {
			d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
		});
	}
	reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
		this.delegates.forEach((d) => {
			d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
		});
	}
	reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
		this.delegates.forEach((d) => {
			d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
		});
	}
	reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
		this.delegates.forEach((d) => {
			d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
		});
	}
};
var Recognizer = class _Recognizer {
	static {
		__name(this, "Recognizer");
	}
	static EOF = -1;
	static tokenTypeMapCache = /* @__PURE__ */ new Map();
	static ruleIndexMapCache = /* @__PURE__ */ new Map();
	interpreter;
	listeners = [ConsoleErrorListener.instance];
	stateNumber = -1;
	checkVersion(toolVersion) {
		const runtimeVersion = "4.13.1";
		if (runtimeVersion !== toolVersion) console.error("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
	}
	addErrorListener(listener) {
		this.listeners.push(listener);
	}
	removeErrorListeners() {
		this.listeners = [];
	}
	removeErrorListener(listener) {
		for (let i = 0; i < this.listeners.length; i++) if (this.listeners[i] === listener) {
			this.listeners.splice(i, 1);
			return;
		}
	}
	getErrorListeners() {
		return this.listeners;
	}
	getTokenTypeMap() {
		const vocabulary = this.vocabulary;
		let result = _Recognizer.tokenTypeMapCache.get(vocabulary);
		if (!result) {
			result = /* @__PURE__ */ new Map();
			for (let i = 0; i <= this.atn.maxTokenType; i++) {
				const literalName = vocabulary.getLiteralName(i);
				if (literalName) result.set(literalName, i);
				const symbolicName = vocabulary.getSymbolicName(i);
				if (symbolicName) result.set(symbolicName, i);
			}
			result.set("EOF", Token.EOF);
			_Recognizer.tokenTypeMapCache.set(vocabulary, result);
		}
		return result;
	}
	/**
	* Get a map from rule names to rule indexes.
	* Used for XPath and tree pattern compilation.
	*/
	getRuleIndexMap() {
		const ruleNames = this.ruleNames;
		let result = _Recognizer.ruleIndexMapCache.get(ruleNames);
		if (!result) {
			result = /* @__PURE__ */ new Map();
			ruleNames.forEach((ruleName, idx) => {
				return result.set(ruleName, idx);
			});
			_Recognizer.ruleIndexMapCache.set(ruleNames, result);
		}
		return result;
	}
	getTokenType(tokenName) {
		const ttype = this.getTokenTypeMap().get(tokenName);
		if (ttype) return ttype;
		return Token.INVALID_TYPE;
	}
	/** What is the error header, normally line/character position information? */
	getErrorHeader(e) {
		const line = e.offendingToken?.line;
		const column = e.offendingToken?.column;
		return "line " + line + ":" + column;
	}
	get errorListenerDispatch() {
		return new ProxyErrorListener(this.listeners);
	}
	/**
	* subclass needs to override these if there are semantic predicates or actions
	* that the ATN interp needs to execute
	*/
	sempred(_localctx, _ruleIndex, _actionIndex) {
		return true;
	}
	precpred(_localctx, _precedence) {
		return true;
	}
	action(_localctx, _ruleIndex, _actionIndex) {}
	get atn() {
		return this.interpreter.atn;
	}
	get state() {
		return this.stateNumber;
	}
	set state(state) {
		this.stateNumber = state;
	}
	getParseInfo() {}
};
var CommonTokenFactory = class _CommonTokenFactory {
	static {
		__name(this, "CommonTokenFactory");
	}
	/**
	* The default {@link CommonTokenFactory} instance.
	*
	*
	* This token factory does not explicitly copy token text when constructing
	* tokens.
	*/
	static DEFAULT = new _CommonTokenFactory();
	/**
	* Indicates whether {@link CommonToken.setText} should be called after
	* constructing tokens to explicitly set the text. This is useful for cases
	* where the input stream might not be able to provide arbitrary substrings
	* of text from the input after the lexer creates a token (e.g. the
	* implementation of {@link CharStream.getText} in
	* {@link UnbufferedCharStream} throws an
	* {@link UnsupportedOperationException}). Explicitly setting the token text
	* allows {@link Token.getText} to be called at any time regardless of the
	* input stream implementation.
	*
	*
	* The default value is `false` to avoid the performance and memory
	* overhead of copying text for every token unless explicitly requested.
	*/
	copyText = false;
	constructor(copyText) {
		this.copyText = copyText ?? false;
	}
	create(source, type, text, channel, start, stop, line, column) {
		const t = CommonToken.fromSource(source, type, channel, start, stop);
		t.line = line;
		t.column = column;
		if (text) t.text = text;
		else if (this.copyText && source[1] !== null) t.text = source[1].getTextFromRange(start, stop);
		return t;
	}
};
var RecognitionException = class _RecognitionException extends Error {
	static {
		__name(this, "RecognitionException");
	}
	ctx;
	/**
	* The current {@link Token} when an error occurred. Since not all streams
	* support accessing symbols by index, we have to track the {@link Token}
	* instance itself
	*/
	offendingToken = null;
	/**
	* Get the ATN state number the parser was in at the time the error
	* occurred. For {@link NoViableAltException} and
	* {@link LexerNoViableAltException} exceptions, this is the
	* {@link DecisionState} number. For others, it is the state whose outgoing
	* edge we couldn't match.
	*/
	offendingState = -1;
	recognizer;
	input;
	constructor(params) {
		super(params.message);
		if (Error.captureStackTrace) Error.captureStackTrace(this, _RecognitionException);
		this.message = params.message;
		this.recognizer = params.recognizer;
		this.input = params.input;
		this.ctx = params.ctx;
		if (this.recognizer !== null) this.offendingState = this.recognizer.state;
	}
	/**
	* Gets the set of input symbols which could potentially follow the
	* previously matched symbol at the time this exception was thrown.
	*
	* If the set of expected tokens is not known and could not be computed,
	* this method returns `null`.
	*
	* @returns The set of token types that could potentially follow the current
	* state in the ATN, or `null` if the information is not available.
	*/
	getExpectedTokens() {
		if (this.recognizer !== null && this.ctx !== null) return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
		else return null;
	}
	toString() {
		return this.message;
	}
};
var LexerNoViableAltException = class extends RecognitionException {
	static {
		__name(this, "LexerNoViableAltException");
	}
	startIndex;
	deadEndConfigs;
	constructor(lexer, input, startIndex, deadEndConfigs) {
		super({
			message: "",
			recognizer: lexer,
			input,
			ctx: null
		});
		this.startIndex = startIndex;
		this.deadEndConfigs = deadEndConfigs;
	}
	toString() {
		let symbol = "";
		if (this.input && this.startIndex >= 0 && this.startIndex < this.input.size) symbol = this.input.getTextFromRange(this.startIndex, this.startIndex);
		return `LexerNoViableAltException(${symbol})`;
	}
};
var Lexer = class _Lexer extends Recognizer {
	static {
		__name(this, "Lexer");
	}
	static DEFAULT_MODE = 0;
	static MORE = -2;
	static SKIP = -3;
	static DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
	static HIDDEN = Token.HIDDEN_CHANNEL;
	options = {
		minDFAEdge: 0,
		maxDFAEdge: 256,
		minCodePoint: 0,
		maxCodePoint: 1114111
	};
	/**
	* What character index in the stream did the current token start at?
	*  Needed, for example, to get the text for current token.  Set at
	*  the start of nextToken.
	*/
	tokenStartCharIndex = -1;
	/** The channel number for the current token */
	channel = 0;
	/** The token type for the current token */
	type = 0;
	mode = _Lexer.DEFAULT_MODE;
	/** The start column of the current token (the one that was last read by `nextToken`). */
	currentTokenColumn = 0;
	/**
	* The line on which the first character of the current token (the one that was last read by `nextToken`) resides.
	*/
	currentTokenStartLine = 0;
	input;
	/**
	* The goal of all lexer rules/methods is to create a token object.
	*  This is an instance variable as multiple rules may collaborate to
	*  create a single token.  nextToken will return this object after
	*  matching lexer rule(s).  If you subclass to allow multiple token
	*  emissions, then set this to the last token to be matched or
	*  something non-null so that the auto token emit mechanism will not
	*  emit another token.
	*/
	token = null;
	/**
	* Once we see EOF on char stream, next token will be EOF.
	* If you have DONE : EOF ; then you see DONE EOF.
	*/
	hitEOF = false;
	factory;
	#modeStack = [];
	/**
	* The text to be used for the next token. If this is not null, then the text
	* for the next token is fixed and is not subject to change in the normal
	* workflow of the lexer.
	*/
	#text;
	constructor(input, options) {
		super();
		this.options = {
			...this.options,
			...options
		};
		this.input = input;
		this.factory = CommonTokenFactory.DEFAULT;
	}
	reset(seekBack = true) {
		if (seekBack) this.input.seek(0);
		this.token = null;
		this.type = Token.INVALID_TYPE;
		this.channel = Token.DEFAULT_CHANNEL;
		this.tokenStartCharIndex = -1;
		this.currentTokenColumn = -1;
		this.currentTokenStartLine = -1;
		this.#text = void 0;
		this.hitEOF = false;
		this.mode = _Lexer.DEFAULT_MODE;
		this.#modeStack = [];
		this.interpreter.reset();
	}
	/** @returns a token from this source; i.e., match a token on the char stream. */
	nextToken() {
		if (this.input === null) throw new Error("nextToken requires a non-null input stream.");
		const tokenStartMarker = this.input.mark();
		try {
			while (true) {
				if (this.hitEOF) {
					this.emitEOF();
					return this.token;
				}
				this.token = null;
				this.channel = Token.DEFAULT_CHANNEL;
				this.tokenStartCharIndex = this.input.index;
				this.currentTokenColumn = this.interpreter.column;
				this.currentTokenStartLine = this.interpreter.line;
				this.#text = void 0;
				let continueOuter = false;
				while (true) {
					this.type = Token.INVALID_TYPE;
					let ttype = _Lexer.SKIP;
					try {
						ttype = this.interpreter.match(this.input, this.mode);
					} catch (e) {
						if (e instanceof LexerNoViableAltException) {
							this.notifyListeners(e);
							this.recover(e);
						} else throw e;
					}
					if (this.input.LA(1) === Token.EOF) this.hitEOF = true;
					if (this.type === Token.INVALID_TYPE) this.type = ttype;
					if (this.type === _Lexer.SKIP) {
						continueOuter = true;
						break;
					}
					if (this.type !== _Lexer.MORE) break;
				}
				if (continueOuter) continue;
				if (this.token === null) this.emit();
				return this.token;
			}
		} finally {
			this.input.release(tokenStartMarker);
		}
	}
	/**
	* Instruct the lexer to skip creating a token for current lexer rule
	* and look for another token. nextToken() knows to keep looking when
	* a lexer rule finishes with token set to SKIP_TOKEN. Recall that
	* if token==null at end of any token rule, it creates one for you
	* and emits it.
	*/
	skip() {
		this.type = _Lexer.SKIP;
	}
	more() {
		this.type = _Lexer.MORE;
	}
	pushMode(m2) {
		if (LexerATNSimulator.debug) console.log("pushMode " + m2);
		this.#modeStack.push(this.mode);
		this.mode = m2;
	}
	popMode() {
		if (this.#modeStack.length === 0) throw new Error("Empty Stack");
		if (LexerATNSimulator.debug) console.log("popMode back to " + this.#modeStack.slice(0, -1));
		this.mode = this.#modeStack.pop();
		return this.mode;
	}
	get modeStack() {
		return this.#modeStack;
	}
	/**
	* By default does not support multiple emits per nextToken invocation
	* for efficiency reasons. Subclass and override this method, nextToken,
	* and getToken (to push tokens into a list and pull from that list
	* rather than a single variable as this implementation does).
	*/
	emitToken(token) {
		this.token = token;
	}
	/**
	* The standard method called to automatically emit a token at the
	* outermost lexical rule. The token object should point into the
	* char buffer start..stop. If there is a text override in 'text',
	* use that to set the token's text. Override this method to emit
	* custom Token objects or provide a new factory.
	*/
	emit() {
		const t = this.factory.create([this, this.input], this.type, this.#text, this.channel, this.tokenStartCharIndex, this.getCharIndex() - 1, this.currentTokenStartLine, this.currentTokenColumn);
		this.emitToken(t);
		return t;
	}
	emitEOF() {
		const eof = this.factory.create([this, this.input], Token.EOF, void 0, Token.DEFAULT_CHANNEL, this.input.index, this.input.index - 1, this.line, this.column);
		this.emitToken(eof);
		return eof;
	}
	/** What is the index of the current character of lookahead? */
	getCharIndex() {
		return this.input.index;
	}
	/**
	* Return a list of all Token objects in input char stream.
	* Forces load of all tokens. Does not include EOF token.
	*/
	getAllTokens() {
		const tokens = [];
		let t = this.nextToken();
		while (t.type !== Token.EOF) {
			tokens.push(t);
			t = this.nextToken();
		}
		return tokens;
	}
	notifyListeners(e) {
		const start = this.tokenStartCharIndex;
		const stop = this.input.index;
		const text = this.input.getTextFromRange(start, stop);
		const msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
		this.errorListenerDispatch.syntaxError(this, null, this.currentTokenStartLine, this.currentTokenColumn, msg, e);
	}
	getErrorDisplay(s) {
		return s;
	}
	getErrorDisplayForChar(c) {
		if (c.charCodeAt(0) === Token.EOF) return "<EOF>";
		if (c === "\n") return "\\n";
		if (c === "	") return "\\t";
		if (c === "\r") return "\\r";
		return c;
	}
	getCharErrorDisplay(c) {
		return "'" + this.getErrorDisplayForChar(c) + "'";
	}
	/**
	* Lexers can normally match any char in it's vocabulary after matching
	* a token, so do the easy thing and just kill a character and hope
	* it all works out. You can instead use the rule invocation stack
	* to do sophisticated error recovery if you are in a fragment rule.
	*/
	recover(re) {
		if (this.input.LA(1) !== Token.EOF) if (re instanceof LexerNoViableAltException) this.interpreter.consume(this.input);
		else this.input.consume();
	}
	get inputStream() {
		return this.input;
	}
	set inputStream(input) {
		this.reset(false);
		this.input = input;
	}
	set tokenFactory(factory) {
		this.factory = factory;
	}
	get tokenFactory() {
		return this.factory;
	}
	get sourceName() {
		return this.input.getSourceName();
	}
	get line() {
		return this.interpreter.line;
	}
	set line(line) {
		this.interpreter.line = line;
	}
	get column() {
		return this.interpreter.column;
	}
	set column(column) {
		this.interpreter.column = column;
	}
	get text() {
		if (this.#text) return this.#text;
		else return this.interpreter.getText(this.input);
	}
	set text(text) {
		this.#text = text;
	}
};
var DFASerializer = class {
	static {
		__name(this, "DFASerializer");
	}
	dfa;
	vocabulary;
	constructor(dfa, vocabulary) {
		this.dfa = dfa;
		this.vocabulary = vocabulary;
	}
	toString() {
		if (!this.dfa.s0) return "";
		let buf = "";
		const states = this.dfa.getStates();
		for (const s of states) {
			let n2 = 0;
			n2 = s.edges.length;
			for (let i = 0; i < n2; i++) {
				const t = s.edges[i];
				if (t && t.stateNumber !== 2147483647) {
					buf += this.getStateString(s);
					const label = this.getEdgeLabel(i);
					buf += "-";
					buf += label;
					buf += "->";
					buf += this.getStateString(t);
					buf += "\n";
				}
			}
		}
		return buf;
	}
	getEdgeLabel(i) {
		return `${this.vocabulary.getDisplayName(i - 1)}`;
	}
	getStateString(s) {
		const n2 = s.stateNumber;
		const baseStateStr = (s.isAcceptState ? ":" : "") + "s" + n2 + (s.requiresFullContext ? "^" : "");
		if (s.isAcceptState) {
			if (s.predicates !== null) return `${baseStateStr}=>${s.predicates.toString()}`;
			return `${baseStateStr}=>${s.prediction}`;
		} else return `${baseStateStr}`;
	}
};
var LexerDFASerializer = class extends DFASerializer {
	static {
		__name(this, "LexerDFASerializer");
	}
	constructor(dfa) {
		super(dfa, Vocabulary.EMPTY_VOCABULARY);
	}
	getEdgeLabel = /* @__PURE__ */ __name((i) => {
		return "'" + String.fromCharCode(i) + "'";
	}, "getEdgeLabel");
};
var DFA = class {
	static {
		__name(this, "DFA");
	}
	s0;
	decision;
	/** From which ATN state did we create this DFA? */
	atnStartState;
	/**
	* Gets whether this DFA is a precedence DFA. Precedence DFAs use a special
	* start state {@link #s0} which is not stored in {@link #states}. The
	* {@link DFAState#edges} array for this start state contains outgoing edges
	* supplying individual start states corresponding to specific precedence
	* values.
	*
	* @returns `true` if this is a precedence DFA; otherwise, `false`.
	*/
	isPrecedenceDfa;
	/**
	* A mapping from an ATNConfigSet hash to a DFAState.
	* Used to quick look up the DFA state for a particular configuration set.
	*/
	states = /* @__PURE__ */ new Map();
	constructor(atnStartState, decision) {
		this.atnStartState = atnStartState;
		this.decision = decision ?? 0;
		let precedenceDfa = false;
		if (atnStartState instanceof StarLoopEntryState) {
			if (atnStartState.precedenceRuleDecision) {
				precedenceDfa = true;
				this.s0 = DFAState.fromState(-1);
			}
		}
		this.isPrecedenceDfa = precedenceDfa;
	}
	[Symbol.iterator] = () => {
		return this.states.values()[Symbol.iterator]();
	};
	/**
	* Get the start state for a specific precedence value.
	*
	* @param precedence The current precedence.
	@returns The start state corresponding to the specified precedence, or
	* `null` if no start state exists for the specified precedence.
	*
	* @throws IllegalStateException if this is not a precedence DFA.
	* @see #isPrecedenceDfa
	*/
	getPrecedenceStartState = /* @__PURE__ */ __name((precedence) => {
		if (!this.isPrecedenceDfa) throw new Error(`Only precedence DFAs may contain a precedence start state.`);
		if (!this.s0 || !this.s0.edges || precedence < 0 || precedence >= this.s0.edges.length) return;
		return this.s0.edges[precedence];
	}, "getPrecedenceStartState");
	/**
	* Set the start state for a specific precedence value.
	*
	* @param precedence The current precedence.
	* @param startState The start state corresponding to the specified precedence.
	*/
	setPrecedenceStartState = /* @__PURE__ */ __name((precedence, startState) => {
		if (!this.isPrecedenceDfa) throw new Error(`Only precedence DFAs may contain a precedence start state.`);
		if (precedence < 0 || !this.s0) return;
		this.s0.edges[precedence] = startState;
	}, "setPrecedenceStartState");
	/**
	* @returns a list of all states in this DFA, ordered by state number.
	*/
	getStates() {
		const result = [...this.states.values()];
		result.sort((o1, o2) => {
			return o1.stateNumber - o2.stateNumber;
		});
		return result;
	}
	getState(state) {
		return this.states.get(state.configs.hashCode()) ?? null;
	}
	getStateForConfigs(configs) {
		return this.states.get(configs.hashCode()) ?? null;
	}
	addState(state) {
		const hash = state.configs.hashCode();
		if (this.states.has(hash)) return;
		this.states.set(hash, state);
		state.stateNumber = this.states.size - 1;
	}
	toString(vocabulary) {
		if (!vocabulary) return this.toString(Vocabulary.EMPTY_VOCABULARY);
		if (!this.s0) return "";
		return new DFASerializer(this, vocabulary).toString() ?? "";
	}
	toLexerString() {
		if (!this.s0) return "";
		return new LexerDFASerializer(this).toString() ?? "";
	}
	get length() {
		return this.states.size;
	}
};
var LexerIndexedCustomAction = class _LexerIndexedCustomAction {
	static {
		__name(this, "LexerIndexedCustomAction");
	}
	offset;
	action;
	actionType;
	isPositionDependent = true;
	cachedHashCode;
	constructor(offset, action) {
		this.actionType = action.actionType;
		this.offset = offset;
		this.action = action;
	}
	/**
	* This method calls {@link execute} on the result of {@link getAction}
	* using the provided `lexer`.
	*/
	execute(lexer) {
		this.action.execute(lexer);
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hash = MurmurHash.initialize();
			hash = MurmurHash.update(hash, this.offset);
			hash = MurmurHash.updateFromComparable(hash, this.action);
			this.cachedHashCode = MurmurHash.finish(hash, 2);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof _LexerIndexedCustomAction)) return false;
		return this.offset === other.offset && this.action === other.action;
	}
};
var LexerActionExecutor = class _LexerActionExecutor {
	static {
		__name(this, "LexerActionExecutor");
	}
	lexerActions;
	actionType;
	isPositionDependent = false;
	cachedHashCode;
	/**
	* Represents an executor for a sequence of lexer actions which traversed during
	* the matching operation of a lexer rule (token).
	*
	* The executor tracks position information for position-dependent lexer actions
	* efficiently, ensuring that actions appearing only at the end of the rule do
	* not cause bloating of the {@link DFA} created for the lexer.
	*/
	constructor(lexerActions) {
		this.actionType = -1;
		this.lexerActions = lexerActions ?? [];
		return this;
	}
	/**
	* Creates a {@link LexerActionExecutor} which executes the actions for
	* the input `lexerActionExecutor` followed by a specified
	* `lexerAction`.
	*
	* @param lexerActionExecutor The executor for actions already traversed by
	* the lexer while matching a token within a particular
	* {@link LexerATNConfig}. If this is `null`, the method behaves as
	* though it were an empty executor.
	* @param lexerAction The lexer action to execute after the actions
	* specified in `lexerActionExecutor`.
	*
	* @returns {LexerActionExecutor} A {@link LexerActionExecutor} for executing the combine actions
	* of `lexerActionExecutor` and `lexerAction`.
	*/
	static append(lexerActionExecutor, lexerAction) {
		if (lexerActionExecutor === null) return new _LexerActionExecutor([lexerAction]);
		return new _LexerActionExecutor(lexerActionExecutor.lexerActions.concat([lexerAction]));
	}
	/**
	* Creates a {@link LexerActionExecutor} which encodes the current offset
	* for position-dependent lexer actions.
	*
	* Normally, when the executor encounters lexer actions where
	* {@link LexerAction//isPositionDependent} returns `true`, it calls
	* {@link IntStream.seek} on the input {@link CharStream} to set the input
	* position to the *end* of the current token. This behavior provides
	* for efficient DFA representation of lexer actions which appear at the end
	* of a lexer rule, even when the lexer rule matches a variable number of
	* characters.
	*
	* Prior to traversing a match transition in the ATN, the current offset
	* from the token start index is assigned to all position-dependent lexer
	* actions which have not already been assigned a fixed offset. By storing
	* the offsets relative to the token start index, the DFA representation of
	* lexer actions which appear in the middle of tokens remains efficient due
	* to sharing among tokens of the same length, regardless of their absolute
	* position in the input stream.
	*
	* If the current executor already has offsets assigned to all
	* position-dependent lexer actions, the method returns `this`.
	*
	* @param offset The current offset to assign to all position-dependent
	* lexer actions which do not already have offsets assigned.
	*
	* @returns {LexerActionExecutor} A {@link LexerActionExecutor} which stores input stream offsets
	* for all position-dependent lexer actions.
	*/
	fixOffsetBeforeMatch(offset) {
		let updatedLexerActions = null;
		for (let i = 0; i < this.lexerActions.length; i++) if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
			if (updatedLexerActions === null) updatedLexerActions = this.lexerActions.concat([]);
			updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
		}
		if (updatedLexerActions === null) return this;
		else return new _LexerActionExecutor(updatedLexerActions);
	}
	/**
	* Execute the actions encapsulated by this executor within the context of a
	* particular {@link Lexer}.
	*
	* This method calls {@link IntStream.seek} to set the position of the
	* `input` {@link CharStream} prior to calling
	* {@link LexerAction.execute} on a position-dependent action. Before the
	* method returns, the input position will be restored to the same position
	* it was in when the method was invoked.
	*
	* @param lexer The lexer instance.
	* @param input The input stream which is the source for the current token.
	* When this method is called, the current {@link IntStream.index} for
	* `input` should be the start of the following token, i.e. 1
	* character past the end of the current token.
	* @param startIndex The token start index. This value may be passed to
	* {@link IntStream.seek} to set the `input` position to the beginning
	* of the token.
	*/
	execute(lexer, input, startIndex) {
		if (input === void 0 || startIndex === void 0) return;
		let requiresSeek = false;
		const stopIndex = input.index;
		try {
			for (const lexerAction of this.lexerActions) {
				let action = lexerAction;
				if (lexerAction instanceof LexerIndexedCustomAction) {
					const offset = lexerAction.offset;
					input.seek(startIndex + offset);
					action = lexerAction.action;
					requiresSeek = startIndex + offset !== stopIndex;
				} else if (lexerAction.isPositionDependent) {
					input.seek(stopIndex);
					requiresSeek = false;
				}
				action.execute(lexer);
			}
		} finally {
			if (requiresSeek) input.seek(stopIndex);
		}
	}
	hashCode() {
		if (this.cachedHashCode === void 0) {
			let hashCode = MurmurHash.initialize(7);
			for (const lexerAction of this.lexerActions) hashCode = MurmurHash.update(hashCode, lexerAction.hashCode());
			this.cachedHashCode = MurmurHash.finish(hashCode, this.lexerActions.length);
		}
		return this.cachedHashCode;
	}
	equals(other) {
		if (this === other) return true;
		if (this.cachedHashCode !== other.cachedHashCode) return false;
		if (this.lexerActions.length !== other.lexerActions.length) return false;
		return this.lexerActions.every((action, index) => {
			return action.equals(other.lexerActions[index]);
		});
	}
};
var OrderedHashSet = class _OrderedHashSet extends HashSet {
	static {
		__name(this, "OrderedHashSet");
	}
	elements = [];
	getOrAdd(o) {
		const oldSize = this.size;
		const result = super.getOrAdd(o);
		if (this.size > oldSize) this.elements.push(o);
		return result;
	}
	equals(o) {
		if (!(o instanceof _OrderedHashSet)) return false;
		return super.equals(o);
	}
	clear() {
		super.clear();
		this.elements = [];
	}
	*[Symbol.iterator]() {
		yield* this.elements;
	}
	toArray() {
		return this.elements.slice(0);
	}
};
var OrderedATNConfigSet = class extends ATNConfigSet {
	static {
		__name(this, "OrderedATNConfigSet");
	}
	constructor() {
		super();
		this.configLookup = new OrderedHashSet();
	}
};
var LexerATNSimulator = class _LexerATNSimulator extends ATNSimulator {
	static {
		__name(this, "LexerATNSimulator");
	}
	static debug = false;
	decisionToDFA;
	recognizer = null;
	/**
	* The current token's starting index into the character stream.
	*  Shared across DFA to ATN simulation in case the ATN fails and the
	*  DFA did not have a previous accept state. In this case, we use the
	*  ATN-generated exception object.
	*/
	startIndex = -1;
	/** line number 1..n within the input */
	line = 1;
	/** The index of the character relative to the beginning of the line 0..n-1 */
	column = 0;
	mode = Lexer.DEFAULT_MODE;
	/** Used during DFA/ATN exec to record the most recent accept configuration info */
	prevAccept;
	options;
	/** Lookup table for lexer ATN config creation. */
	lexerATNConfigFactory;
	/**
	* When we hit an accept state in either the DFA or the ATN, we
	* have to notify the character stream to start buffering characters
	* via {@link IntStream//mark} and record the current state. The current sim state
	* includes the current index into the input, the current line,
	* and current character position in that line. Note that the Lexer is
	* tracking the starting line and characterization of the token. These
	* variables track the "state" of the simulator when it hits an accept state.
	*
	* We track these variables separately for the DFA and ATN simulation
	* because the DFA simulation often has to fail over to the ATN
	* simulation. If the ATN simulation fails, we need the DFA to fall
	* back to its previously accepted state, if any. If the ATN succeeds,
	* then the ATN does the accept and the DFA simulator that invoked it
	* can simply return the predicted token type.
	*/
	constructor(recog, atn, decisionToDFA, sharedContextCache) {
		super(atn, sharedContextCache);
		this.decisionToDFA = decisionToDFA;
		this.recognizer = recog;
		if (recog) this.options = recog.options;
		else this.options = {
			minDFAEdge: 0,
			maxDFAEdge: 256,
			minCodePoint: 0,
			maxCodePoint: 1114111
		};
	}
	match(input, mode) {
		this.mode = mode;
		const mark = input.mark();
		try {
			this.startIndex = input.index;
			this.prevAccept = void 0;
			const dfa = this.decisionToDFA[mode];
			if (!dfa.s0) return this.matchATN(input);
			return this.execATN(input, dfa.s0);
		} finally {
			input.release(mark);
		}
	}
	reset() {
		this.prevAccept = void 0;
		this.startIndex = -1;
		this.line = 1;
		this.column = 0;
		this.mode = Lexer.DEFAULT_MODE;
	}
	clearDFA() {
		for (let d = 0; d < this.decisionToDFA.length; d++) this.decisionToDFA[d] = new DFA(this.atn.getDecisionState(d), d);
	}
	getDFA(mode) {
		return this.decisionToDFA[mode];
	}
	/** @returns the text matched so far for the current token. */
	getText(input) {
		return input.getTextFromRange(this.startIndex, input.index - 1);
	}
	consume(input) {
		if (input.LA(1) === "\n".charCodeAt(0)) {
			this.line += 1;
			this.column = 0;
		} else this.column += 1;
		input.consume();
	}
	getTokenName(tt) {
		if (tt === Token.EOF) return "EOF";
		else return "'" + String.fromCharCode(tt) + "'";
	}
	matchATN(input) {
		const startState = this.atn.modeToStartState[this.mode];
		if (_LexerATNSimulator.debug) console.log("matchATN mode " + this.mode + " start: " + startState);
		const oldMode = this.mode;
		const s0Closure = this.computeStartState(input, startState);
		const suppressEdge = s0Closure.hasSemanticContext;
		s0Closure.hasSemanticContext = false;
		const next = this.addDFAState(s0Closure);
		if (!suppressEdge) this.decisionToDFA[this.mode].s0 = next;
		const predict = this.execATN(input, next);
		if (_LexerATNSimulator.debug) console.log("DFA after matchATN: " + this.decisionToDFA[oldMode].toLexerString());
		return predict;
	}
	execATN(input, state) {
		if (_LexerATNSimulator.debug) console.log("start state closure=" + state.configs);
		if (state.isAcceptState) this.captureSimState(input, state);
		let t = input.LA(1);
		while (true) {
			if (_LexerATNSimulator.debug) console.log("execATN loop starting closure: " + state.configs);
			let target = this.getExistingTargetState(state, t);
			if (!target) target = this.computeTargetState(input, state, t);
			if (target === ATNSimulator.ERROR) break;
			if (t !== Token.EOF) this.consume(input);
			if (target.isAcceptState) {
				this.captureSimState(input, target);
				if (t === Token.EOF) break;
			}
			t = input.LA(1);
			state = target;
		}
		return this.failOrAccept(input, state.configs, t);
	}
	/**
	* Get an existing target state for an edge in the DFA. If the target state
	* for the edge has not yet been computed or is otherwise not available,
	* this method returns `null`.
	*
	* @param s The current DFA state.
	* @param t The next input symbol.
	*
	* @returns The existing target DFA state for the given input symbol
	* `t`, or `null` if the target state for this edge is not already cached
	*/
	getExistingTargetState(s, t) {
		if (t >= this.options.minDFAEdge && t <= this.options.maxDFAEdge) {
			const target = s.edges[t - this.options.minDFAEdge];
			if (_LexerATNSimulator.debug && target) console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
			return target;
		}
	}
	/**
	* Compute a target state for an edge in the DFA, and attempt to add the computed state and corresponding
	* edge to the DFA.
	*
	* @param input The input stream
	* @param s The current DFA state
	* @param t The next input symbol
	*
	* @returns The computed target DFA state for the given input symbol `t`.
	*          If `t` does not lead to a valid DFA state, this method returns `ERROR`.
	*/
	computeTargetState(input, s, t) {
		const reach = new OrderedATNConfigSet();
		this.getReachableConfigSet(input, s.configs, reach, t);
		if (reach.length === 0) {
			if (!reach.hasSemanticContext) this.addDFAEdge(s, t, ATNSimulator.ERROR);
			return ATNSimulator.ERROR;
		}
		return this.addDFAEdge(s, t, null, reach);
	}
	failOrAccept(input, reach, t) {
		if (this.prevAccept?.dfaState) {
			const { dfaState, index, line, column } = this.prevAccept;
			this.accept(input, dfaState.lexerActionExecutor, this.startIndex, index, line, column);
			return dfaState.prediction;
		}
		if (t === Token.EOF && input.index === this.startIndex) return Token.EOF;
		throw new LexerNoViableAltException(this.recognizer, input, this.startIndex, reach);
	}
	/**
	* Given a starting configuration set, figure out all ATN configurations we can reach upon input `t`.
	* Parameter `reach` is a return parameter.
	*/
	getReachableConfigSet(input, closure, reach, t) {
		let skipAlt = ATN.INVALID_ALT_NUMBER;
		for (const cfg of closure) {
			const currentAltReachedAcceptState = cfg.alt === skipAlt;
			if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) continue;
			if (_LexerATNSimulator.debug) console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recognizer, true));
			for (const trans of cfg.state.transitions) {
				const target = this.getReachableTarget(trans, t);
				if (target) {
					let lexerActionExecutor = cfg.lexerActionExecutor;
					if (lexerActionExecutor) lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
					const treatEofAsEpsilon = t === Token.EOF;
					const config = LexerATNConfig.createWithExecutor(cfg, target, lexerActionExecutor);
					if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) skipAlt = cfg.alt;
				}
			}
		}
	}
	accept(input, lexerActionExecutor, startIndex, index, line, charPos) {
		if (_LexerATNSimulator.debug) console.log("ACTION %s\n", lexerActionExecutor);
		input.seek(index);
		this.line = line;
		this.column = charPos;
		if (lexerActionExecutor && this.recognizer) lexerActionExecutor.execute(this.recognizer, input, startIndex);
	}
	getReachableTarget(trans, t) {
		if (trans.matches(t, this.options.minCodePoint, this.options.maxCodePoint)) return trans.target;
		else return;
	}
	computeStartState(input, p) {
		const initialContext = EmptyPredictionContext.instance;
		const configs = new OrderedATNConfigSet();
		for (let i = 0; i < p.transitions.length; i++) {
			const target = p.transitions[i].target;
			const cfg = LexerATNConfig.createWithContext(target, i + 1, initialContext);
			this.closure(input, cfg, configs, false, false, false);
		}
		return configs;
	}
	/**
	* Since the alternatives within any lexer decision are ordered by
	* preference, this method stops pursuing the closure as soon as an accept
	* state is reached. After the first accept state is reached by depth-first
	* search from `config`, all other (potentially reachable) states for
	* this rule would have a lower priority.
	*
	* @returns {boolean} `true` if an accept state is reached, otherwise `false`.
	*/
	closure(input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
		let cfg = null;
		if (_LexerATNSimulator.debug) console.log("closure(" + config.toString(this.recognizer, true) + ")");
		if (config.state.constructor.stateType === ATNState.RULE_STOP) {
			if (_LexerATNSimulator.debug) if (this.recognizer !== null) console.log("closure at %s rule stop %s\n", this.recognizer.ruleNames[config.state.ruleIndex], config);
			else console.log("closure at rule stop %s\n", config);
			if (!config.context || config.context.hasEmptyPath()) if (!config.context || config.context.isEmpty()) {
				configs.add(config);
				return true;
			} else {
				configs.add(LexerATNConfig.createWithConfig(config.state, config, EmptyPredictionContext.instance));
				currentAltReachedAcceptState = true;
			}
			if (config.context && !config.context.isEmpty()) {
				for (let i = 0; i < config.context.length; i++) if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
					const newContext = config.context.getParent(i);
					const returnState = this.atn.states[config.context.getReturnState(i)];
					cfg = LexerATNConfig.createWithConfig(returnState, config, newContext);
					currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
				}
			}
			return currentAltReachedAcceptState;
		}
		if (!config.state.epsilonOnlyTransitions) {
			if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) configs.add(config);
		}
		for (const trans of config.state.transitions) {
			cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
			if (cfg) currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
		}
		return currentAltReachedAcceptState;
	}
	getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon) {
		if (!this.lexerATNConfigFactory) this.setupATNFactoryLookup();
		const factory = this.lexerATNConfigFactory[trans.transitionType];
		if (!factory) return null;
		return factory(input, config, trans, configs, speculative, treatEofAsEpsilon);
	}
	/**
	* Fills the lookup table for creating lexer ATN configs. This helps to avoid frequent checks of the transition
	* type, which determines the configuration of the created config.
	*/
	setupATNFactoryLookup() {
		this.lexerATNConfigFactory = [];
		this.lexerATNConfigFactory[Transition.RULE] = (input, config, trans) => {
			const newContext = createSingletonPredictionContext(config.context ?? void 0, trans.followState.stateNumber);
			return LexerATNConfig.createWithConfig(trans.target, config, newContext);
		};
		this.lexerATNConfigFactory[Transition.PRECEDENCE] = () => {
			throw new Error("Precedence predicates are not supported in lexers.");
		};
		this.lexerATNConfigFactory[Transition.PREDICATE] = (input, config, trans, configs, speculative) => {
			const pt = trans;
			if (_LexerATNSimulator.debug) console.log("EVAL rule " + pt.ruleIndex + ":" + pt.predIndex);
			configs.hasSemanticContext = true;
			if (this.evaluatePredicate(input, pt.ruleIndex, pt.predIndex, speculative)) return LexerATNConfig.createWithConfig(trans.target, config);
			return null;
		};
		this.lexerATNConfigFactory[Transition.ACTION] = (input, config, trans) => {
			if (config.context === null || config.context.hasEmptyPath()) {
				const lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
				return LexerATNConfig.createWithExecutor(config, trans.target, lexerActionExecutor);
			} else return LexerATNConfig.createWithConfig(trans.target, config);
		};
		this.lexerATNConfigFactory[Transition.EPSILON] = (input, config, trans) => {
			return LexerATNConfig.createWithConfig(trans.target, config);
		};
		const simple = /* @__PURE__ */ __name((input, config, trans, configs, speculative, treatEofAsEpsilon) => {
			if (treatEofAsEpsilon) {
				if (trans.matches(Token.EOF, this.options.minCodePoint, this.options.maxCodePoint)) return LexerATNConfig.createWithConfig(trans.target, config);
			}
			return null;
		}, "simple");
		this.lexerATNConfigFactory[Transition.ATOM] = simple;
		this.lexerATNConfigFactory[Transition.RANGE] = simple;
		this.lexerATNConfigFactory[Transition.SET] = simple;
	}
	/**
	* Evaluate a predicate specified in the lexer.
	*
	* If `speculative` is `true`, this method was called before
	* {@link consume} for the matched character. This method should call
	* {@link consume} before evaluating the predicate to ensure position
	* sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
	* and {@link Lexer}, properly reflect the current
	* lexer state. This method should restore `input` and the simulator
	* to the original state before returning (i.e. undo the actions made by the
	* call to {@link consume}.
	*
	* @param input The input stream.
	* @param ruleIndex The rule containing the predicate.
	* @param predIndex The index of the predicate within the rule.
	* @param speculative `true` if the current index in `input` is
	* one character before the predicate's location.
	*
	* @returns `true` if the specified predicate evaluates to
	* `true`.
	*/
	evaluatePredicate(input, ruleIndex, predIndex, speculative) {
		if (!this.recognizer) return true;
		if (!speculative) return this.recognizer.sempred(null, ruleIndex, predIndex);
		const savedColumn = this.column;
		const savedLine = this.line;
		const index = input.index;
		const marker = input.mark();
		try {
			this.consume(input);
			return this.recognizer.sempred(null, ruleIndex, predIndex);
		} finally {
			this.column = savedColumn;
			this.line = savedLine;
			input.seek(index);
			input.release(marker);
		}
	}
	captureSimState(input, dfaState) {
		this.prevAccept = {
			index: input.index,
			line: this.line,
			column: this.column,
			dfaState
		};
	}
	addDFAEdge(from, tk, to, configs) {
		if (!to && configs) {
			const suppressEdge = configs.hasSemanticContext;
			configs.hasSemanticContext = false;
			to = this.addDFAState(configs);
			if (suppressEdge) return to;
		}
		if (tk < this.options.minDFAEdge || tk > this.options.maxDFAEdge) return to;
		if (_LexerATNSimulator.debug) console.log("EDGE " + from + " -> " + to + " upon " + tk);
		from.edges[tk - this.options.minDFAEdge] = to;
		return to;
	}
	/**
	* Add a new DFA state if there isn't one with this set of configurations already. This method also detects
	* the first configuration containing an ATN rule stop state. Later, when traversing the DFA, we will know
	* which rule to accept.
	*/
	addDFAState(configs) {
		const dfa = this.decisionToDFA[this.mode];
		const existing = dfa.getStateForConfigs(configs);
		if (existing) return existing;
		const proposed = DFAState.fromConfigs(configs);
		const firstConfigWithRuleStopState = configs.firstStopState;
		if (firstConfigWithRuleStopState) {
			proposed.isAcceptState = true;
			proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
			proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
		}
		configs.setReadonly(true);
		dfa.addState(proposed);
		return proposed;
	}
};
var ParseInfo = class {
	static {
		__name(this, "ParseInfo");
	}
	atnSimulator;
	constructor(atnSimulator) {
		this.atnSimulator = atnSimulator;
	}
	/**
	* Gets an array of {@link DecisionInfo} instances containing the profiling
	* information gathered for each decision in the ATN.
	*
	* @returns An array of {@link DecisionInfo} instances, indexed by decision
	* number.
	*/
	getDecisionInfo() {
		return this.atnSimulator.getDecisionInfo();
	}
	/**
	* Gets the decision numbers for decisions that required one or more
	* full-context predictions during parsing. These are decisions for which
	* {@link DecisionInfo#llFallback} is non-zero.
	*
	* @returns A list of decision numbers which required one or more
	* full-context predictions during parsing.
	*/
	getLLDecisions() {
		const decisions = this.atnSimulator.getDecisionInfo();
		const result = new Array();
		for (let i = 0; i < decisions.length; i++) if (decisions[i].llFallback > 0) result.push(i);
		return result;
	}
	/**
	* Gets the total time spent during prediction across all decisions made
	* during parsing. This value is the sum of
	* {@link DecisionInfo#timeInPrediction} for all decisions.
	*/
	getTotalTimeInPrediction() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let t = 0;
		for (const decision of decisions) t += decision.timeInPrediction;
		return t;
	}
	/**
	* Gets the total number of SLL lookahead operations across all decisions
	* made during parsing. This value is the sum of
	* {@link DecisionInfo#sllTotalLook} for all decisions.
	*/
	getTotalSLLLookaheadOps() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let k = 0;
		for (const decision of decisions) k += decision.sllTotalLook;
		return k;
	}
	/**
	* Gets the total number of LL lookahead operations across all decisions
	* made during parsing. This value is the sum of
	* {@link DecisionInfo#llTotalLook} for all decisions.
	*/
	getTotalLLLookaheadOps() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let k = 0;
		for (const decision of decisions) k += decision.llTotalLook;
		return k;
	}
	/**
	* Gets the total number of ATN lookahead operations for SLL prediction
	* across all decisions made during parsing.
	*/
	getTotalSLLATNLookaheadOps() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let k = 0;
		for (const decision of decisions) k += decision.sllATNTransitions;
		return k;
	}
	/**
	* Gets the total number of ATN lookahead operations for LL prediction
	* across all decisions made during parsing.
	*/
	getTotalLLATNLookaheadOps() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let k = 0;
		for (const decision of decisions) k += decision.llATNTransitions;
		return k;
	}
	/**
	* Gets the total number of ATN lookahead operations for SLL and LL
	* prediction across all decisions made during parsing.
	*
	*
	* This value is the sum of {@link #getTotalSLLATNLookaheadOps} and
	* {@link #getTotalLLATNLookaheadOps}.
	*/
	getTotalATNLookaheadOps() {
		const decisions = this.atnSimulator.getDecisionInfo();
		let k = 0;
		for (const decision of decisions) {
			k += decision.sllATNTransitions;
			k += decision.llATNTransitions;
		}
		return k;
	}
	getDFASize(decision) {
		if (decision === void 0) {
			let n2 = 0;
			const decisionToDFA = this.atnSimulator.decisionToDFA;
			for (let i = 0; i < decisionToDFA.length; i++) n2 += this.getDFASize(i);
			return n2;
		} else return this.atnSimulator.decisionToDFA[decision].length;
	}
};
var NoViableAltException = class extends RecognitionException {
	static {
		__name(this, "NoViableAltException");
	}
	/** Which configurations did we try at input.index() that couldn't match input.LT(1)? */
	deadEndConfigs = null;
	/**
	* The token object at the start index; the input stream might
	* 	not be buffering tokens so get a reference to it. (At the
	*  time the error occurred, of course the stream needs to keep a
	*  buffer all of the tokens but later we might not have access to those.)
	*/
	startToken;
	constructor(recognizer, input = null, startToken = null, offendingToken = null, deadEndConfigs = null, ctx = null) {
		ctx = ctx ?? recognizer.context;
		offendingToken = offendingToken ?? recognizer.getCurrentToken();
		startToken = startToken ?? recognizer.getCurrentToken();
		input = input ?? recognizer.inputStream;
		super({
			message: "",
			recognizer,
			input,
			ctx
		});
		this.deadEndConfigs = deadEndConfigs;
		this.startToken = startToken;
		this.offendingToken = offendingToken;
	}
};
var DoubleDict = class {
	static {
		__name(this, "DoubleDict");
	}
	cacheMap;
	constructor() {
		this.cacheMap = new HashMap();
	}
	get(a, b) {
		const d = this.cacheMap.get(a) ?? null;
		return d === null ? null : d.get(b) ?? null;
	}
	set(a, b, o) {
		let d = this.cacheMap.get(a);
		if (!d) {
			d = new HashMap();
			this.cacheMap.set(a, d);
		}
		d.set(b, o);
	}
};
var SubsetEqualityComparer = class _SubsetEqualityComparer {
	static {
		__name(this, "SubsetEqualityComparer");
	}
	static instance = new _SubsetEqualityComparer();
	hashCode(config) {
		let hashCode = MurmurHash.initialize(7);
		hashCode = MurmurHash.update(hashCode, config.state.stateNumber);
		hashCode = MurmurHash.updateFromComparable(hashCode, config.context);
		hashCode = MurmurHash.finish(hashCode, 2);
		return hashCode;
	}
	equals(a, b) {
		return a.state.stateNumber === b.state.stateNumber && (a.context?.equals(b.context) ?? true);
	}
};
var PredictionMode = class _PredictionMode {
	static {
		__name(this, "PredictionMode");
	}
	/**
	* The SLL(*) prediction mode. This prediction mode ignores the current
	* parser context when making predictions. This is the fastest prediction
	* mode, and provides correct results for many grammars. This prediction
	* mode is more powerful than the prediction mode provided by ANTLR 3, but
	* may result in syntax errors for grammar and input combinations which are
	* not SLL.
	*
	*
	* When using this prediction mode, the parser will either return a correct
	* parse tree (i.e. the same parse tree that would be returned with the
	* {@link LL} prediction mode), or it will report a syntax error. If a
	* syntax error is encountered when using the {@link SLL} prediction mode,
	* it may be due to either an actual syntax error in the input or indicate
	* that the particular combination of grammar and input requires the more
	* powerful {@link LL} prediction abilities to complete successfully.
	*
	*
	* This prediction mode does not provide any guarantees for prediction
	* behavior for syntactically-incorrect inputs.
	*/
	static SLL = 0;
	/**
	* The LL(*) prediction mode. This prediction mode allows the current parser
	* context to be used for resolving SLL conflicts that occur during
	* prediction. This is the fastest prediction mode that guarantees correct
	* parse results for all combinations of grammars with syntactically correct
	* inputs.
	*
	*
	* When using this prediction mode, the parser will make correct decisions
	* for all syntactically-correct grammar and input combinations. However, in
	* cases where the grammar is truly ambiguous this prediction mode might not
	* report a precise answer for *exactly which* alternatives are
	* ambiguous.
	*
	*
	* This prediction mode does not provide any guarantees for prediction
	* behavior for syntactically-incorrect inputs.
	*/
	static LL = 1;
	/**
	*
	* The LL(*) prediction mode with exact ambiguity detection. In addition to
	* the correctness guarantees provided by the {@link LL} prediction mode,
	* this prediction mode instructs the prediction algorithm to determine the
	* complete and exact set of ambiguous alternatives for every ambiguous
	* decision encountered while parsing.
	*
	*
	* This prediction mode may be used for diagnosing ambiguities during
	* grammar development. Due to the performance overhead of calculating sets
	* of ambiguous alternatives, this prediction mode should be avoided when
	* the exact results are not necessary.
	*
	*
	* This prediction mode does not provide any guarantees for prediction
	* behavior for syntactically-incorrect inputs.
	*/
	static LL_EXACT_AMBIG_DETECTION = 2;
	/**
	*
	*Computes the SLL prediction termination condition.
	*
	*
	*This method computes the SLL prediction termination condition for both of
	*the following cases.
	*
	* - The usual SLL+LL fallback upon SLL conflict
	* - Pure SLL without LL fallback
	*
	***COMBINED SLL+LL PARSING**
	*
	*When LL-fallback is enabled upon SLL conflict, correct predictions are
	*ensured regardless of how the termination condition is computed by this
	*method. Due to the substantially higher cost of LL prediction, the
	*prediction should only fall back to LL when the additional lookahead
	*cannot lead to a unique SLL prediction.
	*
	*Assuming combined SLL+LL parsing, an SLL configuration set with only
	*conflicting subsets should fall back to full LL, even if the
	*configuration sets don't resolve to the same alternative (e.g.
	*`{1,2`} and `{3,4`}. If there is at least one non-conflicting
	*configuration, SLL could continue with the hopes that more lookahead will
	*resolve via one of those non-conflicting configurations.
	*
	*Here's the prediction termination rule them: SLL (for SLL+LL parsing)
	*stops when it sees only conflicting configuration subsets. In contrast,
	*full LL keeps going when there is uncertainty.
	*
	***HEURISTIC**
	*
	*As a heuristic, we stop prediction when we see any conflicting subset
	*unless we see a state that only has one alternative associated with it.
	*The single-alt-state thing lets prediction continue upon rules like
	*(otherwise, it would admit defeat too soon):
	*
	*`[12|1|[], 6|2|[], 12|2|[]]. s : (ID | ID ID?) ';' ;`
	*
	*When the ATN simulation reaches the state before `';'`, it has a
	*DFA state that looks like: `[12|1|[], 6|2|[], 12|2|[]]`. Naturally
	*`12|1|[]` and `12|2|[]` conflict, but we cannot stop
	*processing this node because alternative to has another way to continue,
	*via `[6|2|[]]`.
	*
	*It also let's us continue for this rule:
	*
	*`[1|1|[], 1|2|[], 8|3|[]] a : A | A | A B ;`
	*
	*After matching input A, we reach the stop state for rule A, state 1.
	*State 8 is the state right before B. Clearly alternatives 1 and 2
	*conflict and no amount of further lookahead will separate the two.
	*However, alternative 3 will be able to continue and so we do not stop
	*working on this state. In the previous example, we're concerned with
	*states associated with the conflicting alternatives. Here alt 3 is not
	*associated with the conflicting configs, but since we can continue
	*looking for input reasonably, don't declare the state done.
	*
	***PURE SLL PARSING**
	*
	*To handle pure SLL parsing, all we have to do is make sure that we
	*combine stack contexts for configurations that differ only by semantic
	*predicate. From there, we can do the usual SLL termination heuristic.
	*
	***PREDICATES IN SLL+LL PARSING**
	*
	*SLL decisions don't evaluate predicates until after they reach DFA stop
	*states because they need to create the DFA cache that works in all
	*semantic situations. In contrast, full LL evaluates predicates collected
	*during start state computation so it can ignore predicates thereafter.
	*This means that SLL termination detection can totally ignore semantic
	*predicates.
	*
	*Implementation-wise, {@link ATNConfigSet} combines stack contexts but not
	*semantic predicate contexts so we might see two configurations like the
	*following.
	*
	*`(s, 1, x, {`), (s, 1, x', {p})}
	*
	*Before testing these configurations against others, we have to merge
	*`x` and `x'` (without modifying the existing configurations).
	*For example, we test `(x+x')==x''` when looking for conflicts in
	*the following configurations.
	*
	*`(s, 1, x, {`), (s, 1, x', {p}), (s, 2, x'', {})}
	*
	*If the configuration set has predicates (as indicated by
	*{@link ATNConfigSet//hasSemanticContext}), this algorithm makes a copy of
	*the configurations to strip out all of the predicates so that a standard
	*{@link ATNConfigSet} will merge everything ignoring predicates.
	*/
	static hasSLLConflictTerminatingPrediction(mode, configs) {
		if (_PredictionMode.allConfigsInRuleStopStates(configs)) return true;
		if (mode === _PredictionMode.SLL) {
			if (configs.hasSemanticContext) {
				const dup = new ATNConfigSet();
				for (let c of configs) {
					c = ATNConfig.duplicate(c, SemanticContext.NONE);
					dup.add(c);
				}
				configs = dup;
			}
		}
		const altSets = _PredictionMode.getConflictingAltSubsets(configs);
		return _PredictionMode.hasConflictingAltSet(altSets) && !_PredictionMode.hasStateAssociatedWithOneAlt(configs);
	}
	/**
	* Checks if any configuration in `configs` is in a
	* {@link RuleStopState}. Configurations meeting this condition have reached
	* the end of the decision rule (local context) or end of start rule (full
	* context).
	*
	* @param configs the configuration set to test
	* @returns `true` if any configuration in `configs` is in a
	* {@link RuleStopState}, otherwise `false`
	*/
	static hasConfigInRuleStopState(configs) {
		for (const c of configs) if (c.state instanceof RuleStopState) return true;
		return false;
	}
	/**
	* Checks if all configurations in `configs` are in a
	* {@link RuleStopState}. Configurations meeting this condition have reached
	* the end of the decision rule (local context) or end of start rule (full
	* context).
	*
	* @param configs the configuration set to test
	* @returns `true` if all configurations in `configs` are in a
	* {@link RuleStopState}, otherwise `false`
	*/
	static allConfigsInRuleStopStates(configs) {
		for (const c of configs) if (!(c.state instanceof RuleStopState)) return false;
		return true;
	}
	/**
	*
	* Full LL prediction termination.
	*
	* Can we stop looking ahead during ATN simulation or is there some
	* uncertainty as to which alternative we will ultimately pick, after
	* consuming more input? Even if there are partial conflicts, we might know
	* that everything is going to resolve to the same minimum alternative. That
	* means we can stop since no more lookahead will change that fact. On the
	* other hand, there might be multiple conflicts that resolve to different
	* minimums. That means we need more look ahead to decide which of those
	* alternatives we should predict.
	*
	* The basic idea is to split the set of configurations `C`, into
	* conflicting subsets `(s, _, ctx, _)` and singleton subsets with
	* non-conflicting configurations. Two configurations conflict if they have
	* identical {@link ATNConfig.state} and {@link ATNConfig.context} values
	* but different {@link ATNConfig.alt} value, e.g. `(s, i, ctx, _)`
	* and `(s, j, ctx, _)` for `i!=j`.
	*
	* Reduce these configuration subsets to the set of possible alternatives.
	* You can compute the alternative subsets in one pass as follows:
	*
	* `A_s,ctx = {i | (s, i, ctx, _)`} for each configuration in
	* `C` holding `s` and `ctx` fixed.
	*
	* Or in pseudo-code, for each configuration `c` in `C`:
	*
	* ```
	* map[c] U= c.{@link ATNConfig.alt alt} // map hash/equals uses s and x, not
	* alt and not pred
	* ```
	*
	* The values in `map` are the set of `A_s,ctx` sets.
	*
	* If `|A_s,ctx|=1` then there is no conflict associated with
	* `s` and `ctx`.
	*
	* Reduce the subsets to singletons by choosing a minimum of each subset. If
	* the union of these alternative subsets is a singleton, then no amount of
	* more lookahead will help us. We will always pick that alternative. If,
	* however, there is more than one alternative, then we are uncertain which
	* alternative to predict and must continue looking for resolution. We may
	* or may not discover an ambiguity in the future, even if there are no
	* conflicting subsets this round.
	*
	* The biggest sin is to terminate early because it means we've made a
	* decision but were uncertain as to the eventual outcome. We haven't used
	* enough lookahead. On the other hand, announcing a conflict too late is no
	* big deal; you will still have the conflict. It's just inefficient. It
	* might even look until the end of file.
	*
	* No special consideration for semantic predicates is required because
	* predicates are evaluated on-the-fly for full LL prediction, ensuring that
	* no configuration contains a semantic context during the termination
	* check.
	*
	* **CONFLICTING CONFIGS**
	*
	* Two configurations `(s, i, x)` and `(s, j, x')`, conflict when `i!=j` but `x=x'`. Because we merge all
	* `(s, i, _)` configurations together, that means that there are at most `n` configurations associated with state
	* `s` for `n` possible alternatives in the decision. The merged stacks complicate the comparison of configuration
	* contexts `x` and `x'`. Sam checks to see if one is a subset of the other by calling merge and checking to see
	* if the merged result is either `x` or `x'`. If the `x` associated with lowest alternative `i` is the superset,
	* then `i` is the only possible prediction since the others resolve to `min(i)` as well. However, if `x` is
	* associated with `j>i` then at least one stack configuration for `j` is not in conflict with alternative `i`.
	* The algorithm should keep going, looking for more lookahead due to the uncertainty.
	*
	* For simplicity, I'm doing a equality check between `x` and `x'` that lets the algorithm continue to consume
	* lookahead longer than necessary. The reason I like the equality is of course the simplicity but also because
	* that is the test you need to detect the alternatives that are actually in conflict.
	*
	* **CONTINUE/STOP RULE**
	*
	* Continue if union of resolved alternative sets from non-conflicting and conflicting alternative subsets has more
	* than one alternative. We are uncertain about which alternative to predict.
	*
	* The complete set of alternatives, `[i for (_,i,_)]`, tells us which alternatives are still in the running for
	* the amount of input we've consumed at this point. The conflicting sets let us to strip away configurations that
	* won't lead to more states because we resolve conflicts to the configuration with a minimum alternate for the
	* conflicting set.
	*
	* **CASES**
	*
	* - no conflicts and more than 1 alternative in set => continue
	* -  `(s, 1, x)`, `(s, 2, x)`, `(s, 3, z)`, `(s', 1, y)`, `(s', 2, y)` yields non-conflicting set `{3`} U
	*   conflicting sets `min({1,2`)} U `min({1,2`)} = `{1,3`} => continue
	* - `(s, 1, x)`, `(s, 2, x)`, `(s', 1, y)`, `(s', 2, y)`, `(s'', 1, z)` yields non-conflicting set `{1`} U
	*   conflicting sets `min({1,2`)} U `min({1,2`)} = `{1`} => stop and predict 1
	* - `(s, 1, x)`, `(s, 2, x)`, `(s', 1, y)`, `(s', 2, y)` yields conflicting, reduced sets `{1`} U
	*   `{1`} = `{1`} => stop and predict 1, can announce ambiguity `{1,2`}
	* - `(s, 1, x)`, `(s, 2, x)`, `(s', 2, y)`, `(s', 3, y)` yields conflicting, reduced sets `{1`} U
	*   `{2`} = `{1,2`} => continue
	* - `(s, 1, x)`, `(s, 2, x)`, `(s', 3, y)`, `(s', 4, y)` yields conflicting, reduced sets `{1`} U
	*   `{3`} = `{1,3`} => continue
	*
	* **EXACT AMBIGUITY DETECTION**
	*
	*If all states report the same conflicting set of alternatives, then we
	*know we have the exact ambiguity set.
	*
	* `|A_*i*|>1` and `A_*i* = A_*j*` for all *i*, *j*.
	*
	* In other words, we continue examining lookahead until all `A_i` have more than one alternative and all `A_i`
	* are the same. If `A={{1,2`, {1,3}}}, then regular LL prediction would terminate because the resolved set
	* is `{1`}. To determine what the real ambiguity is, we have to know whether the ambiguity is between one and
	* two or one and three so we keep going. We can only stop prediction when we need exact ambiguity detection when
	* the sets look like `A={{1,2`}} or `{{1,2`,{1,2}}}, etc...
	*/
	static resolvesToJustOneViableAlt(altSets) {
		return _PredictionMode.getSingleViableAlt(altSets);
	}
	/**
	* Determines if every alternative subset in `altSets` contains more
	* than one alternative.
	*
	* @param altSets a collection of alternative subsets
	* @returns `true` if every {@link BitSet} in `altSets` has
	* {@link BitSet//cardinality cardinality} > 1, otherwise `false`
	*/
	static allSubsetsConflict(altSets) {
		return !_PredictionMode.hasNonConflictingAltSet(altSets);
	}
	/**
	* Determines if any single alternative subset in `altSets` contains
	* exactly one alternative.
	*
	* @param altSets a collection of alternative subsets
	* @returns `true` if `altSets` contains a {@link BitSet} with
	* {@link BitSet//cardinality cardinality} 1, otherwise `false`
	*/
	static hasNonConflictingAltSet(altSets) {
		for (const alts of altSets) if (alts.length === 1) return true;
		return false;
	}
	/**
	* Determines if any single alternative subset in `altSets` contains
	* more than one alternative.
	*
	* @param altSets a collection of alternative subsets
	* @returns `true` if `altSets` contains a {@link BitSet} with
	* {@link BitSet//cardinality cardinality} > 1, otherwise `false`
	*/
	static hasConflictingAltSet(altSets) {
		for (const alts of altSets) if (alts.length > 1) return true;
		return false;
	}
	/**
	* Determines if every alternative subset in `altSets` is equivalent.
	*
	* @param altSets a collection of alternative subsets
	* @returns `true` if every member of `altSets` is equal to the
	* others, otherwise `false`
	*/
	static allSubsetsEqual(altSets) {
		let first = null;
		for (const alts of altSets) if (first === null) first = alts;
		else if (alts !== first) return false;
		return true;
	}
	/**
	* Returns the unique alternative predicted by all alternative subsets in
	* `altSets`. If no such alternative exists, this method returns
	* {@link ATN.INVALID_ALT_NUMBER}.
	*
	* @param altSets a collection of alternative subsets
	*/
	static getUniqueAlt(altSets) {
		const all = _PredictionMode.getAlts(altSets);
		if (all.length === 1) return all.nextSetBit(0);
		else return ATN.INVALID_ALT_NUMBER;
	}
	/**
	* Gets the complete set of represented alternatives for a collection of
	* alternative subsets. This method returns the union of each {@link BitSet}
	* in `altSets`.
	*
	* @param altSets a collection of alternative subsets
	* @returns the set of represented alternatives in `altSets`
	*/
	static getAlts(altSets) {
		const all = new BitSet();
		altSets.forEach((alts) => {
			all.or(alts);
		});
		return all;
	}
	/**
	* This function gets the conflicting alt subsets from a configuration set.
	* For each configuration `c` in `configs`:
	*
	* ```
	* map[c] U= c.{@link ATNConfig.alt alt} // map hash/equals uses s and x, not
	* alt and not pred
	* ```
	*/
	static getConflictingAltSubsets(configs) {
		const configToAlts = new HashMap(SubsetEqualityComparer.instance);
		for (const cfg of configs) {
			let alts = configToAlts.get(cfg);
			if (!alts) {
				alts = new BitSet();
				configToAlts.set(cfg, alts);
			}
			alts.set(cfg.alt);
		}
		return Array.from(configToAlts.values());
	}
	/**
	* Get a map from state to alt subset from a configuration set. For each configuration `c` in `configs`:
	*
	* ```
	* map[c.state] = c.alt
	* ```
	*/
	static getStateToAltMap(configs) {
		const m2 = new HashMap(ObjectEqualityComparator.instance);
		for (const c of configs) {
			let alts = m2.get(c.state);
			if (!alts) {
				alts = new BitSet();
				m2.set(c.state, alts);
			}
			alts.set(c.alt);
		}
		return m2;
	}
	static hasStateAssociatedWithOneAlt(configs) {
		const counts = {};
		for (const c of configs) {
			const stateNumber = c.state.stateNumber;
			if (!counts[stateNumber]) counts[stateNumber] = 0;
			counts[stateNumber]++;
		}
		return Object.values(counts).some((count) => {
			return count === 1;
		});
	}
	static getSingleViableAlt(altSets) {
		let result = null;
		for (const alts of altSets) {
			const minAlt = alts.nextSetBit(0);
			if (result === null) result = minAlt;
			else if (result !== minAlt) return ATN.INVALID_ALT_NUMBER;
		}
		return result ?? 0;
	}
};
var ParserATNSimulator = class _ParserATNSimulator extends ATNSimulator {
	static {
		__name(this, "ParserATNSimulator");
	}
	static traceATNSimulator = false;
	static debug;
	static debugAdd = false;
	static debugClosure = false;
	static dfaDebug = false;
	static retryDebug = false;
	/** SLL, LL, or LL + exact ambig detection? */
	predictionMode;
	decisionToDFA;
	parser;
	/**
	* Each prediction operation uses a cache for merge of prediction contexts.
	* Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
	* isn't synchronized but we're ok since two threads shouldn't reuse same
	* parser/atn sim object because it can only handle one input at a time.
	* This maps graphs a and b to merged result c. (a,b)->c. We can avoid
	* the merge if we ever see a and b again.  Note that (b,a)->c should
	* also be examined during cache lookup.
	*/
	mergeCache = new DoubleDict();
	predictionState;
	constructor(recog, atn, decisionToDFA, sharedContextCache) {
		super(atn, sharedContextCache);
		this.parser = recog;
		this.decisionToDFA = decisionToDFA;
	}
	static getUniqueAlt(configs) {
		let alt = ATN.INVALID_ALT_NUMBER;
		for (const c of configs) if (alt === ATN.INVALID_ALT_NUMBER) alt = c.alt;
		else if (c.alt !== alt) return ATN.INVALID_ALT_NUMBER;
		return alt;
	}
	reset() {}
	clearDFA() {
		for (let d = 0; d < this.decisionToDFA.length; d++) this.decisionToDFA[d] = new DFA(this.atn.getDecisionState(d), d);
	}
	adaptivePredict(input, decision, outerContext) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.traceATNSimulator) console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
		const dfa = this.decisionToDFA[decision];
		this.predictionState = {
			input,
			startIndex: input.index,
			outerContext: outerContext ?? void 0,
			dfa
		};
		const m2 = input.mark();
		const index = input.index;
		try {
			let s0;
			if (dfa.isPrecedenceDfa) s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
			else s0 = dfa.s0;
			if (!s0) {
				if (!outerContext) outerContext = ParserRuleContext.empty;
				if (_ParserATNSimulator.debug) console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
				let s0_closure = this.computeStartState(dfa.atnStartState, ParserRuleContext.empty, false);
				if (dfa.isPrecedenceDfa) {
					s0_closure = this.applyPrecedenceFilter(s0_closure);
					s0 = this.addDFAState(dfa, DFAState.fromConfigs(s0_closure));
					dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
				} else {
					s0 = this.addDFAState(dfa, DFAState.fromConfigs(s0_closure));
					dfa.s0 = s0;
				}
			}
			const alt = this.execATN(dfa, s0, input, index, outerContext);
			if (_ParserATNSimulator.debug) console.log("DFA after predictATN: " + dfa.toString(this.parser.vocabulary));
			return alt;
		} finally {
			this.predictionState.dfa = void 0;
			this.mergeCache = new DoubleDict();
			input.seek(index);
			input.release(m2);
		}
	}
	/**
	* Performs ATN simulation to compute a predicted alternative based
	*  upon the remaining input, but also updates the DFA cache to avoid
	*  having to traverse the ATN again for the same input sequence.
	*
	* There are some key conditions we're looking for after computing a new
	* set of ATN configs (proposed DFA state):
	*       if the set is empty, there is no viable alternative for current symbol
	*       does the state uniquely predict an alternative?
	*       does the state have a conflict that would prevent us from
	*         putting it on the work list?
	*
	* We also have some key operations to do:
	*       add an edge from previous DFA state to potentially new DFA state, D,
	*         upon current symbol but only if adding to work list, which means in all
	*         cases except no viable alternative (and possibly non-greedy decisions?)
	*       collecting predicates and adding semantic context to DFA accept states
	*       adding rule context to context-sensitive DFA accept states
	*       consuming an input symbol
	*       reporting a conflict
	*       reporting an ambiguity
	*       reporting a context sensitivity
	*       reporting insufficient predicates
	*
	* cover these cases:
	*    dead end
	*    single alt
	*    single alt + preds
	*    conflict
	*    conflict + preds
	*/
	execATN(dfa, s0, input, startIndex, outerContext) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.traceATNSimulator) console.log("execATN decision " + dfa.decision + ", DFA state " + s0 + ", LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
		let alt;
		let previousState = s0;
		let t = input.LA(1);
		while (true) {
			let nextState = this.getExistingTargetState(previousState, t);
			if (!nextState) nextState = this.computeTargetState(dfa, previousState, t);
			if (nextState === ATNSimulator.ERROR) {
				const e = this.noViableAlt(input, outerContext, previousState.configs, startIndex);
				input.seek(startIndex);
				alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousState.configs, outerContext);
				if (alt !== ATN.INVALID_ALT_NUMBER) return alt;
				else throw e;
			}
			if (nextState.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
				let conflictingAlts = null;
				if (nextState.predicates !== null) {
					if (_ParserATNSimulator.debug) console.log("DFA state has preds in DFA sim LL failover");
					const conflictIndex = input.index;
					if (conflictIndex !== startIndex) input.seek(startIndex);
					conflictingAlts = this.evalSemanticContext(nextState.predicates, outerContext, true);
					if (conflictingAlts.length === 1) {
						if (_ParserATNSimulator.debug) console.log("Full LL avoided");
						return conflictingAlts.nextSetBit(0);
					}
					if (conflictIndex !== startIndex) input.seek(conflictIndex);
				}
				if (_ParserATNSimulator.dfaDebug) console.log("ctx sensitive state " + outerContext + " in " + nextState);
				const s0_closure = this.computeStartState(dfa.atnStartState, outerContext, true);
				this.reportAttemptingFullContext(dfa, conflictingAlts, nextState.configs, startIndex, input.index);
				alt = this.execATNWithFullContext(dfa, nextState, s0_closure, input, startIndex, outerContext);
				return alt;
			}
			if (nextState.isAcceptState) {
				if (nextState.predicates === null) return nextState.prediction;
				const stopIndex = input.index;
				input.seek(startIndex);
				const alts = this.evalSemanticContext(nextState.predicates, outerContext, true);
				if (alts.length === 0) throw this.noViableAlt(input, outerContext, nextState.configs, startIndex);
				if (alts.length === 1) return alts.nextSetBit(0);
				this.reportAmbiguity(dfa, nextState, startIndex, stopIndex, false, alts, nextState.configs);
				return alts.nextSetBit(0);
			}
			previousState = nextState;
			if (t !== Token.EOF) {
				input.consume();
				t = input.LA(1);
			}
		}
	}
	/**
	* Get an existing target state for an edge in the DFA. If the target state
	* for the edge has not yet been computed or is otherwise not available,
	* this method returns `null`.
	*
	* @param previousD The current DFA state
	* @param t The next input symbol
	* @returns The existing target DFA state for the given input symbol
	* `t`, or `null` if the target state for this edge is not
	* already cached
	*/
	getExistingTargetState(previousD, t) {
		return previousD.edges[t + 1];
	}
	/**
	* Compute a target state for an edge in the DFA, and attempt to add the
	* computed state and corresponding edge to the DFA.
	*
	* @param dfa The DFA
	* @param previousD The current DFA state
	* @param t The next input symbol
	*
	* @returns The computed target DFA state for the given input symbol
	* `t`. If `t` does not lead to a valid DFA state, this method
	* returns {@link ERROR
	*/
	computeTargetState(dfa, previousD, t) {
		const reach = this.computeReachSet(previousD.configs, t, false);
		if (reach === null) {
			this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
			return ATNSimulator.ERROR;
		}
		let D = DFAState.fromConfigs(reach);
		const predictedAlt = _ParserATNSimulator.getUniqueAlt(reach);
		if (_ParserATNSimulator.debug) {
			const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
			console.log("SLL altSubSets=" + arrayToString(altSubSets) + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
		}
		if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
			D.isAcceptState = true;
			D.configs.uniqueAlt = predictedAlt;
			D.prediction = predictedAlt;
		} else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
			D.configs.conflictingAlts = this.getConflictingAlts(reach);
			D.requiresFullContext = true;
			D.isAcceptState = true;
			D.prediction = D.configs.conflictingAlts.nextSetBit(0);
		}
		if (D.isAcceptState && D.configs.hasSemanticContext) {
			this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
			if (D.predicates !== null) D.prediction = ATN.INVALID_ALT_NUMBER;
		}
		D = this.addDFAEdge(dfa, previousD, t, D);
		return D;
	}
	getRuleName(index) {
		if (this.parser !== null && index >= 0) return this.parser.ruleNames[index];
		else return "<rule " + index + ">";
	}
	getTokenName(t) {
		if (t === Token.EOF) return "EOF";
		const displayName = (this.parser?.vocabulary ?? Vocabulary.EMPTY_VOCABULARY).getDisplayName(t);
		if (displayName === t.toString()) return displayName;
		return displayName + "<" + t + ">";
	}
	getLookaheadName(input) {
		return this.getTokenName(input.LA(1));
	}
	/**
	* Used for debugging in adaptivePredict around execATN but I cut
	* it out for clarity now that alg. works well. We can leave this
	* "dead" code for a bit
	*/
	dumpDeadEndConfigs(e) {
		console.log("dead end configs: ");
		const decs = e.deadEndConfigs;
		for (const c of decs) {
			let trans = "no edges";
			if (c.state.transitions.length > 0) {
				const t = c.state.transitions[0];
				if (t instanceof AtomTransition) trans = "Atom " + this.getTokenName(t.labelValue);
				else if (t instanceof SetTransition) trans = (t instanceof NotSetTransition ? "~" : "") + "Set " + t.label;
			}
			console.error(c.toString(this.parser, true) + ":" + trans);
		}
	}
	predicateDFAState(dfaState, decisionState) {
		const altCount = decisionState.transitions.length;
		const altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
		const altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, altCount);
		if (altToPred !== null) {
			dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
			dfaState.prediction = ATN.INVALID_ALT_NUMBER;
		} else dfaState.prediction = altsToCollectPredsFrom.nextSetBit(0);
	}
	execATNWithFullContext(dfa, D, s0, input, startIndex, outerContext) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.traceATNSimulator) console.log("execATNWithFullContext " + s0);
		const fullCtx = true;
		let foundExactAmbig = false;
		let reach;
		let previous = s0;
		input.seek(startIndex);
		let t = input.LA(1);
		let predictedAlt = -1;
		for (;;) {
			reach = this.computeReachSet(previous, t, fullCtx);
			if (reach === null) {
				const e = this.noViableAlt(input, outerContext, previous, startIndex);
				input.seek(startIndex);
				const alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
				if (alt !== ATN.INVALID_ALT_NUMBER) return alt;
				else throw e;
			}
			const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
			if (_ParserATNSimulator.debug) console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
			reach.uniqueAlt = _ParserATNSimulator.getUniqueAlt(reach);
			if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
				predictedAlt = reach.uniqueAlt;
				break;
			} else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
				predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);
				if (predictedAlt !== ATN.INVALID_ALT_NUMBER) break;
			} else if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
				foundExactAmbig = true;
				predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
				break;
			}
			previous = reach;
			if (t !== Token.EOF) {
				input.consume();
				t = input.LA(1);
			}
		}
		if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
			this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
			return predictedAlt;
		}
		this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, reach.getAlts(), reach);
		return predictedAlt;
	}
	computeReachSet(closure, t, fullCtx) {
		if (_ParserATNSimulator.debug) console.log("in computeReachSet, starting closure: " + closure);
		const intermediate = new ATNConfigSet(fullCtx);
		let skippedStopStates = null;
		for (const c of closure) {
			if (_ParserATNSimulator.debug) console.log("testing " + this.getTokenName(t) + " at " + c);
			if (c.state instanceof RuleStopState) {
				if (fullCtx || t === Token.EOF) {
					if (skippedStopStates === null) skippedStopStates = [];
					skippedStopStates.push(c);
				}
				continue;
			}
			for (const trans of c.state.transitions) {
				const target = this.getReachableTarget(trans, t);
				if (target !== null) {
					const cfg = ATNConfig.createWithConfig(target, c);
					intermediate.add(cfg, this.mergeCache);
					if (_ParserATNSimulator.debugAdd) console.log("added " + cfg + " to intermediate");
				}
			}
		}
		let reach = null;
		if (skippedStopStates === null && t !== Token.EOF) {
			if (intermediate.length === 1) reach = intermediate;
			else if (_ParserATNSimulator.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) reach = intermediate;
		}
		if (reach === null) {
			reach = new ATNConfigSet(fullCtx);
			const closureBusy = new HashSet();
			const treatEofAsEpsilon = t === Token.EOF;
			for (const config of intermediate) this.closure(config, reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
		}
		if (t === Token.EOF) reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
		if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) for (const config of skippedStopStates) reach.add(config, this.mergeCache);
		if (_ParserATNSimulator.traceATNSimulator) console.log("computeReachSet " + closure + " -> " + reach);
		if (reach.length === 0) return null;
		else return reach;
	}
	/**
	* Return a configuration set containing only the configurations from
	* `configs` which are in a {@link RuleStopState}. If all
	* configurations in `configs` are already in a rule stop state, this
	* method simply returns `configs`.
	*
	* When `lookToEndOfRule` is true, this method uses
	* {@link ATN.nextTokens} for each configuration in `configs` which is
	* not already in a rule stop state to see if a rule stop state is reachable
	* from the configuration via epsilon-only transitions.
	*
	* @param configs the configuration set to update
	* @param lookToEndOfRule when true, this method checks for rule stop states
	* reachable by epsilon-only transitions from each configuration in
	* `configs`.
	*
	* @returns `configs` if all configurations in `configs` are in a
	* rule stop state, otherwise return a new configuration set containing only
	* the configurations from `configs` which are in a rule stop state
	*/
	removeAllConfigsNotInRuleStopState(configs, lookToEndOfRule) {
		if (PredictionMode.allConfigsInRuleStopStates(configs)) return configs;
		const result = new ATNConfigSet(configs.fullCtx);
		for (const config of configs) {
			if (config.state instanceof RuleStopState) {
				result.add(config, this.mergeCache);
				continue;
			}
			if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
				if (this.atn.nextTokens(config.state).contains(Token.EPSILON)) {
					const endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
					result.add(ATNConfig.createWithConfig(endOfRuleState, config), this.mergeCache);
				}
			}
		}
		return result;
	}
	computeStartState(p, ctx, fullCtx) {
		const initialContext = predictionContextFromRuleContext(this.atn, ctx);
		const configs = new ATNConfigSet(fullCtx);
		if (_ParserATNSimulator.traceATNSimulator) console.log("computeStartState from ATN state " + p + " initialContext=" + initialContext.toString(this.parser));
		for (let i = 0; i < p.transitions.length; i++) {
			const target = p.transitions[i].target;
			const c = ATNConfig.createWithContext(target, i + 1, initialContext);
			const closureBusy = new HashSet();
			this.closure(c, configs, closureBusy, true, fullCtx, false);
		}
		return configs;
	}
	/**
	* This method transforms the start state computed by
	* {@link computeStartState} to the special start state used by a
	* precedence DFA for a particular precedence value. The transformation
	* process applies the following changes to the start state's configuration
	* set.
	*
	* 1. Evaluate the precedence predicates for each configuration using
	* {@link SemanticContext//evalPrecedence}.
	* 2. Remove all configurations which predict an alternative greater than
	* 1, for which another configuration that predicts alternative 1 is in the
	* same ATN state with the same prediction context. This transformation is
	* valid for the following reasons:
	* 3. The closure block cannot contain any epsilon transitions which bypass
	* the body of the closure, so all states reachable via alternative 1 are
	* part of the precedence alternatives of the transformed left-recursive
	* rule.
	* 4. The "primary" portion of a left recursive rule cannot contain an
	* epsilon transition, so the only way an alternative other than 1 can exist
	* in a state that is also reachable via alternative 1 is by nesting calls
	* to the left-recursive rule, with the outer calls not being at the
	* preferred precedence level.
	*
	*
	* The prediction context must be considered by this filter to address
	* situations like the following.
	*
	* `
	* ```
	* grammar TA;
	* prog: statement* EOF;
	* statement: letterA | statement letterA 'b' ;
	* letterA: 'a';
	* ```
	* `
	*
	* If the above grammar, the ATN state immediately before the token
	* reference `'a'` in `letterA` is reachable from the left edge
	* of both the primary and closure blocks of the left-recursive rule
	* `statement`. The prediction context associated with each of these
	* configurations distinguishes between them, and prevents the alternative
	* which stepped out to `prog` (and then back in to `statement`
	* from being eliminated by the filter.
	*
	* @param configs The configuration set computed by
	* {@link computeStartState} as the start state for the DFA.
	* @returns The transformed configuration set representing the start state
	* for a precedence DFA at a particular precedence level (determined by
	* calling {@link Parser//getPrecedence})
	*/
	applyPrecedenceFilter(configs) {
		const statesFromAlt1 = [];
		const configSet = new ATNConfigSet(configs.fullCtx);
		for (const config of configs) {
			if (config.alt !== 1) continue;
			const updatedContext = config.semanticContext.evalPrecedence(this.parser, this.predictionState.outerContext);
			if (updatedContext === null) continue;
			statesFromAlt1[config.state.stateNumber] = config.context;
			if (updatedContext !== config.semanticContext) configSet.add(ATNConfig.duplicate(config, updatedContext), this.mergeCache);
			else configSet.add(config, this.mergeCache);
		}
		for (const config of configs) {
			if (config.alt === 1) continue;
			if (!config.precedenceFilterSuppressed) {
				const context = statesFromAlt1[config.state.stateNumber] || null;
				if (context !== null && context.equals(config.context)) continue;
			}
			configSet.add(config, this.mergeCache);
		}
		return configSet;
	}
	getReachableTarget(trans, ttype) {
		if (trans.matches(ttype, 0, this.atn.maxTokenType)) return trans.target;
		else return null;
	}
	getPredsForAmbigAlts(ambigAlts, configs, altCount) {
		let altToPred = [];
		for (const c of configs) if (ambigAlts.get(c.alt)) altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] ?? null, c.semanticContext);
		let nPredAlts = 0;
		for (let i = 1; i < altCount + 1; i++) {
			const pred = altToPred[i] ?? null;
			if (pred === null) altToPred[i] = SemanticContext.NONE;
			else if (pred !== SemanticContext.NONE) nPredAlts += 1;
		}
		if (nPredAlts === 0) altToPred = null;
		if (_ParserATNSimulator.debug) console.log("getPredsForAmbigAlts result " + arrayToString(altToPred));
		return altToPred;
	}
	getPredicatePredictions(ambigAlts, altToPred) {
		const pairs = [];
		let containsPredicate = false;
		for (let i = 1; i < altToPred.length; i++) {
			const pred = altToPred[i];
			if (ambigAlts.get(i)) pairs.push({
				pred,
				alt: i
			});
			if (pred !== SemanticContext.NONE) containsPredicate = true;
		}
		if (!containsPredicate) return null;
		return pairs;
	}
	/**
	* This method is used to improve the localization of error messages by
	* choosing an alternative rather than throwing a
	* {@link NoViableAltException} in particular prediction scenarios where the
	* {@link ERROR} state was reached during ATN simulation.
	*
	*
	* The default implementation of this method uses the following
	* algorithm to identify an ATN configuration which successfully parsed the
	* decision entry rule. Choosing such an alternative ensures that the
	* {@link ParserRuleContext} returned by the calling rule will be complete
	* and valid, and the syntax error will be reported later at a more
	* localized location.
	*
	* - If a syntactically valid path or paths reach the end of the decision rule and
	* they are semantically valid if predicated, return the min associated alt.
	* - Else, if a semantically invalid but syntactically valid path exist
	* or paths exist, return the minimum associated alt.
	*
	* - Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.
	*
	*
	* In some scenarios, the algorithm described above could predict an
	* alternative which will result in a {@link FailedPredicateException} in
	* the parser. Specifically, this could occur if the *only* configuration
	* capable of successfully parsing to the end of the decision rule is
	* blocked by a semantic predicate. By choosing this alternative within
	* {@link adaptivePredict} instead of throwing a
	* {@link NoViableAltException}, the resulting
	* {@link FailedPredicateException} in the parser will identify the specific
	* predicate which is preventing the parser from successfully parsing the
	* decision rule, which helps developers identify and correct logic errors
	* in semantic predicates.
	*
	* @param configs The ATN configurations which were valid immediately before
	* the {@link ERROR} state was reached
	* @param outerContext The is the \gamma_0 initial parser context from the paper
	* or the parser stack at the instant before prediction commences.
	*
	* @returns The value to return from {@link adaptivePredict}, or
	* {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
	* identified and {@link adaptivePredict} should report an error instead
	*/
	getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(configs, outerContext) {
		const splitConfigs = this.splitAccordingToSemanticValidity(configs, outerContext);
		const semValidConfigs = splitConfigs[0];
		const semInvalidConfigs = splitConfigs[1];
		let alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
		if (alt !== ATN.INVALID_ALT_NUMBER) return alt;
		if (semInvalidConfigs.length > 0) {
			alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
			if (alt !== ATN.INVALID_ALT_NUMBER) return alt;
		}
		return ATN.INVALID_ALT_NUMBER;
	}
	getAltThatFinishedDecisionEntryRule(configs) {
		const alts = [];
		for (const c of configs) if (c.reachesIntoOuterContext || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
			if (alts.indexOf(c.alt) < 0) alts.push(c.alt);
		}
		if (alts.length === 0) return ATN.INVALID_ALT_NUMBER;
		else return Math.min(...alts);
	}
	/**
	* Walk the list of configurations and split them according to
	* those that have preds evaluating to true/false.  If no pred, assume
	* true pred and include in succeeded set.  Returns Pair of sets.
	*
	* Create a new set so as not to alter the incoming parameter.
	*
	* Assumption: the input stream has been restored to the starting point
	* prediction, which is where predicates need to evaluate.
	*/
	splitAccordingToSemanticValidity(configs, outerContext) {
		const succeeded = new ATNConfigSet(configs.fullCtx);
		const failed = new ATNConfigSet(configs.fullCtx);
		for (const c of configs) if (c.semanticContext !== SemanticContext.NONE) if (c.semanticContext.evaluate(this.parser, outerContext)) succeeded.add(c);
		else failed.add(c);
		else succeeded.add(c);
		return [succeeded, failed];
	}
	/**
	* Look through a list of predicate/alt pairs, returning alts for the
	* pairs that win. A `NONE` predicate indicates an alt containing an
	* unpredicated config which behaves as "always true." If !complete
	* then we stop at the first predicate that evaluates to true. This
	* includes pairs with null predicates.
	*/
	evalSemanticContext(predPredictions, outerContext, complete) {
		const predictions = new BitSet();
		for (const pair of predPredictions) {
			if (pair.pred === SemanticContext.NONE) {
				predictions.set(pair.alt);
				if (!complete) break;
				continue;
			}
			const predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
			if (_ParserATNSimulator.debug || _ParserATNSimulator.dfaDebug) console.log("eval pred " + pair + "=" + predicateEvaluationResult);
			if (predicateEvaluationResult) {
				predictions.set(pair.alt);
				if (!complete) break;
			}
		}
		return predictions;
	}
	closure(config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
		this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, 0, treatEofAsEpsilon);
	}
	closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
		if (_ParserATNSimulator.traceATNSimulator || _ParserATNSimulator.debugClosure) console.log("closure(" + config.toString(this.parser, true) + ")");
		if (config.state instanceof RuleStopState) {
			if (config.context && !config.context.isEmpty()) {
				for (let i = 0; i < config.context.length; i++) {
					if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
						if (fullCtx) {
							configs.add(ATNConfig.createWithConfig(config.state, config, EmptyPredictionContext.instance), this.mergeCache);
							continue;
						} else {
							if (_ParserATNSimulator.debug) console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
							this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
						}
						continue;
					}
					const returnState = this.atn.states[config.context.getReturnState(i)];
					const newContext = config.context.getParent(i);
					const c = ATNConfig.createWithContext(returnState, config.alt, newContext, config.semanticContext);
					c.reachesIntoOuterContext = config.reachesIntoOuterContext;
					this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
				}
				return;
			} else if (fullCtx) {
				configs.add(config, this.mergeCache);
				return;
			} else if (_ParserATNSimulator.debug) console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
		}
		this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
	}
	closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
		const p = config.state;
		if (!p.epsilonOnlyTransitions) configs.add(config, this.mergeCache);
		for (let i = 0; i < p.transitions.length; i++) {
			if (i === 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config)) continue;
			const t = p.transitions[i];
			const continueCollecting = collectPredicates && !(t instanceof ActionTransition);
			const c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
			if (c) {
				let newDepth = depth;
				if (config.state.constructor.stateType === ATNState.RULE_STOP) {
					if (this.predictionState.dfa && this.predictionState?.dfa.isPrecedenceDfa) {
						if (t.outermostPrecedenceReturn === this.predictionState?.dfa.atnStartState?.ruleIndex) c.precedenceFilterSuppressed = true;
					}
					c.reachesIntoOuterContext = true;
					if (closureBusy.getOrAdd(c) !== c) continue;
					configs.dipsIntoOuterContext = true;
					newDepth -= 1;
					if (_ParserATNSimulator.debug) console.log("dips into outer ctx: " + c);
				} else {
					if (!t.isEpsilon && closureBusy.getOrAdd(c) !== c) continue;
					if (t instanceof RuleTransition) {
						if (newDepth >= 0) newDepth += 1;
					}
				}
				this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
			}
		}
	}
	canDropLoopEntryEdgeInLeftRecursiveRule(config) {
		const p = config.state;
		if (p.constructor.stateType !== ATNState.STAR_LOOP_ENTRY || !config.context) return false;
		if (!p.precedenceRuleDecision || config.context.isEmpty() || config.context.hasEmptyPath()) return false;
		const numCtxs = config.context.length;
		for (let i = 0; i < numCtxs; i++) if (this.atn.states[config.context.getReturnState(i)].ruleIndex !== p.ruleIndex) return false;
		const blockEndStateNum = p.transitions[0].target.endState.stateNumber;
		const blockEndState = this.atn.states[blockEndStateNum];
		for (let i = 0; i < numCtxs; i++) {
			const returnStateNumber = config.context.getReturnState(i);
			const returnState = this.atn.states[returnStateNumber];
			if (returnState.transitions.length !== 1 || !returnState.transitions[0].isEpsilon) return false;
			const returnStateTarget = returnState.transitions[0].target;
			if (returnState.constructor.stateType === ATNState.BLOCK_END && returnStateTarget === p) continue;
			if (returnState === blockEndState) continue;
			if (returnStateTarget === blockEndState) continue;
			if (returnStateTarget.constructor.stateType === ATNState.BLOCK_END && returnStateTarget.transitions.length === 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target === p) continue;
			return false;
		}
		return true;
	}
	getEpsilonTarget(config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
		switch (t.transitionType) {
			case Transition.RULE: return this.ruleTransition(config, t);
			case Transition.PRECEDENCE: return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
			case Transition.PREDICATE: return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
			case Transition.ACTION:
				if (_ParserATNSimulator.debug) {
					const at = t;
					const index = at.actionIndex === -1 ? 65535 : at.actionIndex;
					console.log("ACTION edge " + at.ruleIndex + ":" + index);
				}
				return ATNConfig.createWithConfig(t.target, config);
			case Transition.EPSILON: return ATNConfig.createWithConfig(t.target, config);
			case Transition.ATOM:
			case Transition.RANGE:
			case Transition.SET:
				if (treatEofAsEpsilon) {
					if (t.matches(Token.EOF, 0, 1)) return ATNConfig.createWithConfig(t.target, config);
				}
				return null;
			default: return null;
		}
	}
	precedenceTransition(config, pt, collectPredicates, inContext, fullCtx) {
		if (_ParserATNSimulator.debug) {
			console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");
			if (this.parser !== null) console.log("context surrounding pred is " + arrayToString(this.parser.getRuleInvocationStack()));
		}
		let c = null;
		if (collectPredicates && inContext) if (fullCtx && this.predictionState?.input) {
			const currentPosition = this.predictionState.input.index;
			this.predictionState.input.seek(this.predictionState.startIndex);
			const predSucceeds = pt.getPredicate().evaluate(this.parser, this.predictionState.outerContext);
			this.predictionState.input.seek(currentPosition);
			if (predSucceeds) c = ATNConfig.createWithConfig(pt.target, config);
		} else {
			const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
			c = ATNConfig.createWithSemanticContext(pt.target, config, newSemCtx);
		}
		else c = ATNConfig.createWithConfig(pt.target, config);
		if (_ParserATNSimulator.debug) console.log("config from pred transition=" + c);
		return c;
	}
	predTransition(config, pt, collectPredicates, inContext, fullCtx) {
		if (_ParserATNSimulator.debug) {
			console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
			if (this.parser !== null) console.log("context surrounding pred is " + arrayToString(this.parser.getRuleInvocationStack()));
		}
		let c = null;
		if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) if (fullCtx && this.predictionState?.input) {
			const currentPosition = this.predictionState.input.index;
			this.predictionState.input.seek(this.predictionState.startIndex);
			const predSucceeds = pt.getPredicate().evaluate(this.parser, this.predictionState.outerContext);
			this.predictionState.input.seek(currentPosition);
			if (predSucceeds) c = ATNConfig.createWithConfig(pt.target, config);
		} else {
			const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
			c = ATNConfig.createWithSemanticContext(pt.target, config, newSemCtx);
		}
		else c = ATNConfig.createWithConfig(pt.target, config);
		if (_ParserATNSimulator.debug) console.log("config from pred transition=" + c);
		return c;
	}
	ruleTransition(config, t) {
		if (_ParserATNSimulator.debug) console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
		const returnState = t.followState;
		const newContext = createSingletonPredictionContext(config.context ?? void 0, returnState.stateNumber);
		return ATNConfig.createWithConfig(t.target, config, newContext);
	}
	getConflictingAlts(configs) {
		const altSets = PredictionMode.getConflictingAltSubsets(configs);
		return PredictionMode.getAlts(altSets);
	}
	/**
	* Sam pointed out a problem with the previous definition, v3, of
	* ambiguous states. If we have another state associated with conflicting
	* alternatives, we should keep going. For example, the following grammar
	*
	* s : (ID | ID ID?) ';' ;
	*
	* When the ATN simulation reaches the state before ';', it has a DFA
	* state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
	* 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
	* because alternative to has another way to continue, via [6|2|[]].
	* The key is that we have a single state that has config's only associated
	* with a single alternative, 2, and crucially the state transitions
	* among the configurations are all non-epsilon transitions. That means
	* we don't consider any conflicts that include alternative 2. So, we
	* ignore the conflict between alts 1 and 2. We ignore a set of
	* conflicting alts when there is an intersection with an alternative
	* associated with a single alt state in the state -> config-list map.
	*
	* It's also the case that we might have two conflicting configurations but
	* also a 3rd nonconflicting configuration for a different alternative:
	* [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
	*
	* a : A | A | A B ;
	*
	* After matching input A, we reach the stop state for rule A, state 1.
	* State 8 is the state right before B. Clearly alternatives 1 and 2
	* conflict and no amount of further lookahead will separate the two.
	* However, alternative 3 will be able to continue and so we do not
	* stop working on this state. In the previous example, we're concerned
	* with states associated with the conflicting alternatives. Here alt
	* 3 is not associated with the conflicting configs, but since we can continue
	* looking for input reasonably, I don't declare the state done. We
	* ignore a set of conflicting alts when we have an alternative
	* that we still need to pursue
	*/
	getConflictingAltsOrUniqueAlt(configs) {
		let conflictingAlts;
		if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
			conflictingAlts = new BitSet();
			conflictingAlts.set(configs.uniqueAlt);
		} else conflictingAlts = configs.conflictingAlts;
		return conflictingAlts;
	}
	noViableAlt(input, outerContext, configs, startIndex) {
		return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
	}
	/**
	* Add an edge to the DFA, if possible. This method calls
	* {@link addDFAState} to ensure the `to` state is present in the
	* DFA. If `from` is `null`, or if `t` is outside the
	* range of edges that can be represented in the DFA tables, this method
	* returns without adding the edge to the DFA.
	*
	* If `to` is `null`, this method returns `null`.
	* Otherwise, this method returns the {@link DFAState} returned by calling
	* {@link addDFAState} for the `to` state.
	*
	* @param dfa The DFA
	* @param from The source state for the edge
	* @param t The input symbol
	* @param to The target state for the edge
	*
	* @returns If `to` is `null`, this method returns `null`;
	* otherwise this method returns the result of calling {@link addDFAState}
	* on `to`
	*/
	addDFAEdge(dfa, from, t, to) {
		if (_ParserATNSimulator.debug) console.log("EDGE " + from + " -> " + to + " upon " + this.getTokenName(t));
		to = this.addDFAState(dfa, to);
		if (t < -1 || t > this.atn.maxTokenType) return to;
		if (_ParserATNSimulator.debug) console.log("DFA=\n" + dfa.toString(this.parser != null ? this.parser.vocabulary : Vocabulary.EMPTY_VOCABULARY));
		from.edges[t + 1] = to;
		return to;
	}
	/**
	* Add state `D` to the DFA if it is not already present, and return
	* the actual instance stored in the DFA. If a state equivalent to `D`
	* is already in the DFA, the existing state is returned. Otherwise this
	* method returns `D` after adding it to the DFA.
	*
	* If `D` is {@link ERROR}, this method returns {@link ERROR} and
	* does not change the DFA.
	*
	* @param dfa The dfa.
	* @param newState The DFA state to add.
	*
	* @returns The state stored in the DFA. This will be either the existing state if `newState` is already in
	*          the DFA, or `newState` itself if the state was not already present.
	*/
	addDFAState(dfa, newState) {
		if (newState === ATNSimulator.ERROR) return newState;
		const existing = dfa.getState(newState);
		if (existing !== null) return existing;
		if (!newState.configs.readOnly) {
			newState.configs.optimizeConfigs(this);
			newState.configs.setReadonly(true);
		}
		if (_ParserATNSimulator.traceATNSimulator) console.log("addDFAState new " + newState);
		dfa.addState(newState);
		return newState;
	}
	reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.retryDebug) {
			const interval = new Interval(startIndex, stopIndex + 1);
			console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.tokenStream.getTextFromInterval(interval));
		}
		this.parser.errorListenerDispatch.reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
	}
	reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.retryDebug) {
			const interval = new Interval(startIndex, stopIndex + 1);
			console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.tokenStream.getTextFromInterval(interval));
		}
		this.parser.errorListenerDispatch.reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
	}
	reportAmbiguity(dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
		if (_ParserATNSimulator.debug || _ParserATNSimulator.retryDebug) {
			const interval = new Interval(startIndex, stopIndex + 1);
			console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.tokenStream.getTextFromInterval(interval));
		}
		this.parser.errorListenerDispatch.reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
	}
};
var PredictionContextCache = class {
	static {
		__name(this, "PredictionContextCache");
	}
	cache = new HashMap(ObjectEqualityComparator.instance);
	/**
	* Add a context to the cache and return it. If the context already exists,
	* return that one instead and do not add a new context to the cache.
	* Protect shared cache from unsafe thread access.
	*
	* @param ctx tbd
	* @returns tbd
	*/
	add(ctx) {
		if (ctx === EmptyPredictionContext.instance) return ctx;
		const existing = this.cache.get(ctx);
		if (existing) return existing;
		this.cache.set(ctx, ctx);
		return ctx;
	}
	get(ctx) {
		return this.cache.get(ctx);
	}
	get length() {
		return this.cache.size;
	}
};
var ProfilingATNSimulator = class extends ParserATNSimulator {
	static {
		__name(this, "ProfilingATNSimulator");
	}
	decisions;
	numDecisions = 0;
	currentDecision = 0;
	currentState;
	/**
	* At the point of LL failover, we record how SLL would resolve the conflict so that
	*  we can determine whether or not a decision / input pair is context-sensitive.
	*  If LL gives a different result than SLL's predicted alternative, we have a
	*  context sensitivity for sure. The converse is not necessarily true, however.
	*  It's possible that after conflict resolution chooses minimum alternatives,
	*  SLL could get the same answer as LL. Regardless of whether or not the result indicates
	*  an ambiguity, it is not treated as a context sensitivity because LL prediction
	*  was not required in order to produce a correct prediction for this decision and input sequence.
	*  It may in fact still be a context sensitivity but we don't know by looking at the
	*  minimum alternatives for the current input.
	*/
	conflictingAltResolvedBySLL;
	sllStopIndex = 0;
	llStopIndex = 0;
	constructor(parser) {
		const sharedContextCache = parser.interpreter.sharedContextCache;
		super(parser, parser.interpreter.atn, parser.interpreter.decisionToDFA, sharedContextCache);
		if (sharedContextCache) {
			this.numDecisions = this.atn.decisionToState.length;
			this.decisions = new Array(this.numDecisions);
			for (let i = 0; i < this.numDecisions; i++) this.decisions[i] = new DecisionInfo(i);
		}
	}
	adaptivePredict(input, decision, outerContext) {
		try {
			this.sllStopIndex = -1;
			this.llStopIndex = -1;
			this.currentDecision = decision;
			const start = performance.now();
			const alt = super.adaptivePredict(input, decision, outerContext);
			const stop = performance.now();
			this.decisions[decision].timeInPrediction += stop - start;
			this.decisions[decision].invocations++;
			const sllLook = this.sllStopIndex - this.predictionState.startIndex + 1;
			this.decisions[decision].sllTotalLook += sllLook;
			this.decisions[decision].sllMinLook = this.decisions[decision].sllMinLook === 0 ? sllLook : Math.min(this.decisions[decision].sllMinLook, sllLook);
			if (sllLook > this.decisions[decision].sllMaxLook) {
				this.decisions[decision].sllMaxLook = sllLook;
				this.decisions[decision].sllMaxLookEvent = {
					decision,
					configs: null,
					predictedAlt: alt,
					input,
					startIndex: this.predictionState.startIndex,
					stopIndex: this.sllStopIndex,
					fullCtx: false
				};
			}
			if (this.llStopIndex >= 0) {
				const llLook = this.llStopIndex - this.predictionState.startIndex + 1;
				this.decisions[decision].llTotalLook += llLook;
				this.decisions[decision].llMinLook = this.decisions[decision].llMinLook === 0 ? llLook : Math.min(this.decisions[decision].llMinLook, llLook);
				if (llLook > this.decisions[decision].llMaxLook) {
					this.decisions[decision].llMaxLook = llLook;
					this.decisions[decision].llMaxLookEvent = {
						decision,
						configs: null,
						predictedAlt: alt,
						input,
						startIndex: this.predictionState.startIndex,
						stopIndex: this.llStopIndex,
						fullCtx: true
					};
				}
			}
			return alt;
		} finally {
			this.currentDecision = -1;
		}
	}
	getExistingTargetState(previousD, t) {
		this.sllStopIndex = this.predictionState.input.index;
		const existingTargetState = super.getExistingTargetState(previousD, t);
		if (existingTargetState !== void 0) {
			this.decisions[this.currentDecision].sllDFATransitions++;
			if (existingTargetState === ATNSimulator.ERROR) this.decisions[this.currentDecision].errors.push({
				decision: this.currentDecision,
				configs: previousD.configs,
				input: this.predictionState.input,
				startIndex: this.predictionState.startIndex,
				stopIndex: this.sllStopIndex,
				fullCtx: false
			});
		}
		this.currentState = existingTargetState;
		return existingTargetState;
	}
	computeTargetState(dfa, previousD, t) {
		const state = super.computeTargetState(dfa, previousD, t);
		this.currentState = state;
		return state;
	}
	computeReachSet(closure, t, fullCtx) {
		if (fullCtx && this.predictionState?.input) this.llStopIndex = this.predictionState.input.index;
		const reachConfigs = super.computeReachSet(closure, t, fullCtx);
		if (this.predictionState?.input) if (fullCtx) {
			this.decisions[this.currentDecision].llATNTransitions++;
			if (reachConfigs === null) this.decisions[this.currentDecision].errors.push({
				decision: this.currentDecision,
				configs: closure,
				input: this.predictionState.input,
				startIndex: this.predictionState.startIndex,
				stopIndex: this.sllStopIndex,
				fullCtx: true
			});
		} else {
			this.decisions[this.currentDecision].sllATNTransitions++;
			if (reachConfigs === null) this.decisions[this.currentDecision].errors.push({
				decision: this.currentDecision,
				configs: closure,
				input: this.predictionState.input,
				startIndex: this.predictionState.startIndex,
				stopIndex: this.sllStopIndex,
				fullCtx: false
			});
		}
		return reachConfigs;
	}
	reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex) {
		if (conflictingAlts !== null) this.conflictingAltResolvedBySLL = conflictingAlts.nextSetBit(0);
		else this.conflictingAltResolvedBySLL = configs.getAlts().nextSetBit(0);
		this.decisions[this.currentDecision].llFallback++;
		if (conflictingAlts) super.reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex);
	}
	reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex) {
		if (prediction !== this.conflictingAltResolvedBySLL && this.predictionState.input) this.decisions[this.currentDecision].contextSensitivities.push({
			decision: this.currentDecision,
			configs,
			input: this.predictionState.input,
			startIndex,
			stopIndex,
			fullCtx: true
		});
		super.reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex);
	}
	reportAmbiguity(dfa, state, startIndex, stopIndex, exact, ambigAlts, configs) {
		let prediction;
		if (ambigAlts) prediction = ambigAlts.nextSetBit(0);
		else prediction = configs.getAlts().nextSetBit(0);
		if (this.predictionState?.input) {
			if (configs.fullCtx && prediction !== this.conflictingAltResolvedBySLL) this.decisions[this.currentDecision].contextSensitivities.push({
				decision: this.currentDecision,
				configs,
				input: this.predictionState.input,
				startIndex,
				stopIndex,
				fullCtx: true
			});
			this.decisions[this.currentDecision].ambiguities.push({
				ambigAlts,
				decision: this.currentDecision,
				configs,
				input: this.predictionState.input,
				startIndex,
				stopIndex,
				fullCtx: configs.fullCtx
			});
		}
		super.reportAmbiguity(dfa, state, startIndex, stopIndex, exact, ambigAlts, configs);
	}
	getDecisionInfo() {
		return this.decisions;
	}
	getCurrentState() {
		return this.currentState;
	}
};
var PredPrediction;
((PredPrediction2) => {
	PredPrediction2.toString = /* @__PURE__ */ __name((prediction) => {
		return `(${prediction.pred}, ${prediction.alt})`;
	}, "toString");
})(PredPrediction || (PredPrediction = {}));
var ParseCancellationException = class extends Error {
	static {
		__name(this, "ParseCancellationException");
	}
	constructor(e) {
		super();
		this.cause = e;
	}
};
var InterpreterDataReader = class {
	static {
		__name(this, "InterpreterDataReader");
	}
	/**
	* The structure of the data file is very simple. Everything is line based with empty lines
	* separating the different parts. For lexers the layout is:
	* token literal names:
	* ...
	*
	* token symbolic names:
	* ...
	*
	* rule names:
	* ...
	*
	* channel names:
	* ...
	*
	* mode names:
	* ...
	*
	* atn:
	* a single line with comma separated int values, enclosed in a pair of squared brackets.
	*
	* Data for a parser does not contain channel and mode names.
	*/
	static parseInterpreterData(source) {
		const ruleNames = [];
		const channels = [];
		const modes = [];
		const literalNames = [];
		const symbolicNames = [];
		const lines = source.split("\n");
		let index = 0;
		let line = lines[index++];
		if (line !== "token literal names:") throw new Error("Unexpected data entry");
		do {
			line = lines[index++];
			if (line.length === 0) break;
			literalNames.push(line === "null" ? null : line);
		} while (true);
		line = lines[index++];
		if (line !== "token symbolic names:") throw new Error("Unexpected data entry");
		do {
			line = lines[index++];
			if (line.length === 0) break;
			symbolicNames.push(line === "null" ? null : line);
		} while (true);
		line = lines[index++];
		if (line !== "rule names:") throw new Error("Unexpected data entry");
		do {
			line = lines[index++];
			if (line.length === 0) break;
			ruleNames.push(line);
		} while (true);
		line = lines[index++];
		if (line === "channel names:") {
			do {
				line = lines[index++];
				if (line.length === 0) break;
				channels.push(line);
			} while (true);
			line = lines[index++];
			if (line !== "mode names:") throw new Error("Unexpected data entry");
			do {
				line = lines[index++];
				if (line.length === 0) break;
				modes.push(line);
			} while (true);
		}
		line = lines[index++];
		if (line !== "atn:") throw new Error("Unexpected data entry");
		line = lines[index++];
		const elements = line.split(",");
		let value;
		const serializedATN = [];
		for (let i = 0; i < elements.length; ++i) {
			const element = elements[i];
			if (element.startsWith("[")) value = Number(element.substring(1).trim());
			else if (element.endsWith("]")) value = Number(element.substring(0, element.length - 1).trim());
			else value = Number(element.trim());
			serializedATN[i] = value;
		}
		return {
			atn: new ATNDeserializer().deserialize(serializedATN),
			vocabulary: new Vocabulary(literalNames, symbolicNames, []),
			ruleNames,
			channels: channels.length > 0 ? channels : void 0,
			modes: modes.length > 0 ? modes : void 0
		};
	}
};
var AbstractParseTreeVisitor = class {
	static {
		__name(this, "AbstractParseTreeVisitor");
	}
	visit(tree) {
		return tree.accept(this);
	}
	visitChildren(node) {
		let result = this.defaultResult();
		const n2 = node.getChildCount();
		for (let i = 0; i < n2; i++) {
			if (!this.shouldVisitNextChild(node, result)) break;
			const c = node.getChild(i);
			if (c) {
				const childResult = c.accept(this);
				result = this.aggregateResult(result, childResult);
			}
		}
		return result;
	}
	visitTerminal(_node) {
		return this.defaultResult();
	}
	visitErrorNode(_node) {
		return this.defaultResult();
	}
	defaultResult() {
		return null;
	}
	shouldVisitNextChild(_node, _currentResult) {
		return true;
	}
	aggregateResult(aggregate, nextResult) {
		return nextResult;
	}
};
var ParseTreeWalker = class _ParseTreeWalker {
	static {
		__name(this, "ParseTreeWalker");
	}
	static DEFAULT = new _ParseTreeWalker();
	/**
	* Performs a walk on the given parse tree starting at the root and going down recursively
	* with depth-first search. On each node, {@link ParseTreeWalker.enterRule} is called before
	* recursively walking down into child nodes, then
	* {@link ParseTreeWalker.exitRule} is called after the recursive call to wind up.
	*
	* @param listener The listener used by the walker to process grammar rules
	* @param t The parse tree to be walked on
	*/
	walk(listener, t) {
		if (t instanceof ErrorNode) listener.visitErrorNode(t);
		else if (t instanceof TerminalNode) listener.visitTerminal(t);
		else {
			const r = t;
			this.enterRule(listener, r);
			for (let i = 0; i < t.getChildCount(); i++) this.walk(listener, t.getChild(i));
			this.exitRule(listener, r);
		}
	}
	/**
	* Enters a grammar rule by first triggering the generic event {@link ParseTreeListener.enterEveryRule}
	* then by triggering the event specific to the given parse tree node
	*
	* @param listener The listener responding to the trigger events
	* @param r The grammar rule containing the rule context
	*/
	enterRule(listener, r) {
		const ctx = r.ruleContext;
		listener.enterEveryRule(ctx);
		ctx.enterRule(listener);
	}
	/**
	* Exits a grammar rule by first triggering the event specific to the given parse tree node
	* then by triggering the generic event {@link ParseTreeListener.exitEveryRule}
	*
	* @param listener The listener responding to the trigger events
	* @param r The grammar rule containing the rule context
	*/
	exitRule(listener, r) {
		const ctx = r.ruleContext;
		ctx.exitRule(listener);
		listener.exitEveryRule(ctx);
	}
};
var CharStream;
((CharStream2) => {
	CharStream2.fromString = /* @__PURE__ */ __name((str) => {
		return new CharStreamImpl(str);
	}, "fromString");
})(CharStream || (CharStream = {}));
var CharStreamImpl = class {
	static {
		__name(this, "CharStreamImpl");
	}
	name = "";
	index = 0;
	data;
	constructor(input) {
		const codePoints = [];
		for (const char of input) codePoints.push(char.codePointAt(0));
		this.data = new Uint32Array(codePoints);
	}
	/**
	* Reset the stream so that it's in the same state it was
	* when the object was created *except* the data array is not
	* touched.
	*/
	reset() {
		this.index = 0;
	}
	consume() {
		if (this.index >= this.data.length) throw new Error("cannot consume EOF");
		this.index += 1;
	}
	LA(offset) {
		if (offset === 0) return 0;
		if (offset < 0) offset += 1;
		const pos = this.index + offset - 1;
		if (pos < 0 || pos >= this.data.length) return Token.EOF;
		return this.data[pos];
	}
	mark() {
		return -1;
	}
	release(_marker) {}
	/**
	* consume() ahead until p==_index; can't just set p=_index as we must
	* update line and column. If we seek backwards, just set p
	*/
	seek(index) {
		if (index <= this.index) {
			this.index = index;
			return;
		}
		this.index = Math.min(index, this.data.length);
	}
	getTextFromRange(start, stop) {
		stop = stop ?? this.data.length - 1;
		if (stop >= this.data.length) stop = this.data.length - 1;
		if (start >= this.data.length) return "";
		return this.stringFromRange(start, stop + 1);
	}
	getTextFromInterval(interval) {
		const start = interval.start;
		let stop = interval.stop;
		if (stop >= this.data.length) stop = this.data.length - 1;
		if (start >= this.data.length) return "";
		return this.stringFromRange(start, stop + 1);
	}
	toString() {
		return this.stringFromRange(0);
	}
	get size() {
		return this.data.length;
	}
	getSourceName() {
		if (this.name) return this.name;
		return IntStream.UNKNOWN_SOURCE_NAME;
	}
	stringFromRange(start, stop) {
		const data = this.data.slice(start, stop);
		let result = "";
		data.forEach((value) => {
			result += String.fromCodePoint(value);
		});
		return result;
	}
};
var isWritableToken = /* @__PURE__ */ __name((candidate) => {
	return candidate.setText !== void 0;
}, "isWritableToken");
var BufferedTokenStream = class {
	static {
		__name(this, "BufferedTokenStream");
	}
	/**
	* The {@link TokenSource} from which tokens for this stream are fetched.
	*/
	tokenSource;
	/**
	* A collection of all tokens fetched from the token source. The list is
	* considered a complete view of the input once {@link fetchedEOF} is set
	* to `true`.
	*/
	tokens = [];
	/**
	* The index into {@link tokens} of the current token (next token to
	* {@link consume}). {@link tokens}`[p]` should be
	* {@link LT LT(1)}.
	*
	* This field is set to -1 when the stream is first constructed or when
	* {@link setTokenSource} is called, indicating that the first token has
	* not yet been fetched from the token source. For additional information,
	* see the documentation of {@link IntStream} for a description of
	* Initializing Methods.
	*/
	p = -1;
	/**
	* Indicates whether the {@link Token.EOF} token has been fetched from
	* {@link tokenSource} and added to {@link tokens}. This field improves
	* performance for the following cases:
	*
	* - {@link consume}: The lookahead check in {@link consume} to prevent
	* consuming the EOF symbol is optimized by checking the values of
	* {@link fetchedEOF} and {@link p} instead of calling {@link LA}.
	* - {@link fetch}: The check to prevent adding multiple EOF symbols into
	* {@link tokens} is trivial with this field.
	*/
	fetchedEOF = false;
	constructor(tokenSource) {
		this.tokenSource = tokenSource;
	}
	mark() {
		return 0;
	}
	release(_marker) {}
	reset() {
		this.seek(0);
	}
	seek(index) {
		this.lazyInit();
		this.p = this.adjustSeekIndex(index);
	}
	get size() {
		return this.tokens.length;
	}
	get index() {
		return this.p;
	}
	get(index) {
		this.lazyInit();
		return this.tokens[index];
	}
	consume() {
		let skipEofCheck = false;
		if (this.p >= 0) if (this.fetchedEOF) skipEofCheck = this.p < this.tokens.length - 1;
		else skipEofCheck = this.p < this.tokens.length;
		else skipEofCheck = false;
		if (!skipEofCheck && this.LA(1) === Token.EOF) throw new Error("cannot consume EOF");
		if (this.sync(this.p + 1)) this.p = this.adjustSeekIndex(this.p + 1);
	}
	/**
	* Make sure index `i` in tokens has a token.
	*
	* @returns {boolean} `true` if a token is located at index `i`, otherwise `false`.
	*/
	sync(i) {
		const n2 = i - this.tokens.length + 1;
		if (n2 > 0) return this.fetch(n2) >= n2;
		return true;
	}
	/**
	* Add `n` elements to buffer.
	*
	* @returns {number} The actual number of elements added to the buffer.
	*/
	fetch(n2) {
		if (this.fetchedEOF) return 0;
		for (let i = 0; i < n2; i++) {
			const t = this.tokenSource.nextToken();
			if (isWritableToken(t)) t.tokenIndex = this.tokens.length;
			this.tokens.push(t);
			if (t.type === Token.EOF) {
				this.fetchedEOF = true;
				return i + 1;
			}
		}
		return n2;
	}
	/** Get all tokens from start..stop, inclusively. */
	getTokens(start, stop, types) {
		this.lazyInit();
		if (start === void 0 && stop === void 0) return this.tokens;
		start ??= 0;
		if (stop === void 0) stop = this.tokens.length - 1;
		if (start < 0 || stop >= this.tokens.length || stop < 0 || start >= this.tokens.length) throw new RangeError("start " + start + " or stop " + stop + " not in 0.." + (this.tokens.length - 1));
		if (start > stop) return [];
		if (types === void 0) return this.tokens.slice(start, stop + 1);
		const subset = [];
		if (stop >= this.tokens.length) stop = this.tokens.length - 1;
		for (let i = start; i < stop; i++) {
			const t = this.tokens[i];
			if (t.type === Token.EOF) {
				subset.push(t);
				break;
			}
			if (types.has(t.type)) subset.push(t);
		}
		return subset;
	}
	LA(k) {
		return this.LT(k)?.type ?? Token.INVALID_TYPE;
	}
	LB(k) {
		if (this.p - k < 0) return null;
		return this.tokens[this.p - k];
	}
	LT(k) {
		this.lazyInit();
		if (k === 0) return null;
		if (k < 0) return this.LB(-k);
		const i = this.p + k - 1;
		this.sync(i);
		if (i >= this.tokens.length) return this.tokens[this.tokens.length - 1];
		return this.tokens[i];
	}
	/**
	* Allowed derived classes to modify the behavior of operations which change
	* the current stream position by adjusting the target token index of a seek
	* operation. The default implementation simply returns `i`. If an
	* exception is thrown in this method, the current stream index should not be
	* changed.
	*
	* For example, {@link CommonTokenStream} overrides this method to ensure that
	* the seek target is always an on-channel token.
	*
	* @param  i The target token index.
	*
	* @returns The adjusted target token index.
	*/
	adjustSeekIndex(i) {
		return i;
	}
	lazyInit() {
		if (this.p === -1) this.setup();
	}
	setup() {
		this.sync(0);
		this.p = this.adjustSeekIndex(0);
	}
	/** Reset this token stream by setting its token source. */
	setTokenSource(tokenSource) {
		this.tokenSource = tokenSource;
		this.tokens = [];
		this.p = -1;
		this.fetchedEOF = false;
	}
	/**
	* Given a starting index, return the index of the next token on channel.
	* Return i if tokens[i] is on channel. Return -1 if there are no tokens
	* on channel between i and EOF.
	*/
	nextTokenOnChannel(i, channel) {
		this.sync(i);
		if (i >= this.tokens.length) return -1;
		let token = this.tokens[i];
		while (token.channel !== channel) {
			if (token.type === Token.EOF) return -1;
			i += 1;
			this.sync(i);
			token = this.tokens[i];
		}
		return i;
	}
	/**
	* Given a starting index, return the index of the previous token on
	* channel. Return `i` if `tokens[i]` is on channel. Return -1
	* if there are no tokens on channel between `i` and 0.
	*
	* If `i` specifies an index at or after the EOF token, the EOF token
	* index is returned. This is due to the fact that the EOF token is treated
	* as though it were on every channel.
	*/
	previousTokenOnChannel(i, channel) {
		if (i >= this.tokens.length) return this.tokens.length - 1;
		while (i >= 0) {
			const token = this.tokens[i];
			if (token.type === Token.EOF || token.channel === channel) return i;
			--i;
		}
		return i;
	}
	/**
	* Collect all tokens on specified channel to the right of
	* the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
	* EOF. If channel is -1, find any non default channel token.
	*/
	getHiddenTokensToRight(tokenIndex, channel) {
		if (channel === void 0) channel = -1;
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) throw new Error(`${tokenIndex} not in 0..${this.tokens.length - 1}`);
		const nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		const from = tokenIndex + 1;
		const to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
		return this.filterForChannel(from, to, channel);
	}
	/**
	* Collect all tokens on specified channel to the left of
	* the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
	* If channel is -1, find any non default channel token.
	*/
	getHiddenTokensToLeft(tokenIndex, channel) {
		if (channel === void 0) channel = -1;
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) throw new Error(`${tokenIndex} not in 0..${this.tokens.length - 1}`);
		const prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		if (prevOnChannel === tokenIndex - 1) return;
		const from = prevOnChannel + 1;
		const to = tokenIndex - 1;
		return this.filterForChannel(from, to, channel);
	}
	filterForChannel(left, right, channel) {
		const hidden = [];
		for (let i = left; i < right + 1; i++) {
			const t = this.tokens[i];
			if (channel === -1) {
				if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) hidden.push(t);
			} else if (t.channel === channel) hidden.push(t);
		}
		if (hidden.length === 0) return;
		return hidden;
	}
	getSourceName() {
		return this.tokenSource.sourceName;
	}
	/** Get the text of all tokens in this buffer. */
	getText() {
		return this.getTextFromInterval(Interval.of(0, this.size - 1));
	}
	getTextFromInterval(interval) {
		const start = interval.start;
		let stop = interval.stop;
		if (start < 0 || stop < 0) return "";
		this.sync(stop);
		if (stop >= this.tokens.length) stop = this.tokens.length - 1;
		let result = "";
		for (let i = start; i <= stop; ++i) {
			const t = this.tokens[i];
			if (t.type === Token.EOF) break;
			result += t.text;
		}
		return result;
	}
	getTextFromContext(ctx) {
		return this.getTextFromInterval(ctx.getSourceInterval());
	}
	getTextFromRange(start, stop) {
		if (start !== null && stop !== null) return this.getTextFromInterval(Interval.of(start.tokenIndex, stop.tokenIndex));
		return "";
	}
	/** Get all tokens from lexer until EOF. */
	fill() {
		this.lazyInit();
		while (this.fetch(1e3) === 1e3);
	}
	setLine(line) {
		this.tokenSource.line = line;
	}
	setColumn(column) {
		this.tokenSource.column = column;
	}
};
var CommonTokenStream = class extends BufferedTokenStream {
	static {
		__name(this, "CommonTokenStream");
	}
	/**
	* Specifies the channel to use for filtering tokens.
	*
	*
	* The default value is {@link Token.DEFAULT_CHANNEL}, which matches the
	* default channel assigned to tokens created by the lexer.
	*/
	channel = Token.DEFAULT_CHANNEL;
	constructor(lexer, channel) {
		super(lexer);
		this.channel = channel ?? Token.DEFAULT_CHANNEL;
	}
	adjustSeekIndex(i) {
		return this.nextTokenOnChannel(i, this.channel);
	}
	LB(k) {
		if (k === 0 || this.index - k < 0) return null;
		let i = this.index;
		let n2 = 1;
		while (n2 <= k) {
			i = this.previousTokenOnChannel(i - 1, this.channel);
			n2 += 1;
		}
		if (i < 0) return null;
		return this.tokens[i];
	}
	LT(k) {
		this.lazyInit();
		if (k === 0) return null;
		if (k < 0) return this.LB(-k);
		let i = this.index;
		let n2 = 1;
		while (n2 < k) {
			if (this.sync(i + 1)) i = this.nextTokenOnChannel(i + 1, this.channel);
			n2 += 1;
		}
		return this.tokens[i];
	}
	getNumberOfOnChannelTokens() {
		let n2 = 0;
		this.fill();
		for (const t of this.tokens) {
			if (t.channel === this.channel) n2 += 1;
			if (t.type === Token.EOF) break;
		}
		return n2;
	}
};
var XPathLexer = class _XPathLexer extends Lexer {
	static {
		__name(this, "XPathLexer");
	}
	static TOKEN_REF = 1;
	static RULE_REF = 2;
	static ANYWHERE = 3;
	static ROOT = 4;
	static WILDCARD = 5;
	static BANG = 6;
	static ID = 7;
	static STRING = 8;
	static channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
	static literalNames = [
		null,
		null,
		null,
		"'//'",
		"'/'",
		"'*'",
		"'!'"
	];
	static symbolicNames = [
		null,
		"TOKEN_REF",
		"RULE_REF",
		"ANYWHERE",
		"ROOT",
		"WILDCARD",
		"BANG",
		"ID",
		"STRING"
	];
	static modeNames = ["DEFAULT_MODE"];
	static ruleNames = [
		"ANYWHERE",
		"ROOT",
		"WILDCARD",
		"BANG",
		"ID",
		"NameChar",
		"NameStartChar",
		"STRING"
	];
	constructor(input) {
		super(input);
		this.interpreter = new LexerATNSimulator(this, _XPathLexer._ATN, _XPathLexer.decisionsToDFA, new PredictionContextCache());
	}
	get grammarFileName() {
		return "XPathLexer.g4";
	}
	get literalNames() {
		return _XPathLexer.literalNames;
	}
	get symbolicNames() {
		return _XPathLexer.symbolicNames;
	}
	get ruleNames() {
		return _XPathLexer.ruleNames;
	}
	get serializedATN() {
		return _XPathLexer._serializedATN;
	}
	get channelNames() {
		return _XPathLexer.channelNames;
	}
	get modeNames() {
		return _XPathLexer.modeNames;
	}
	action(localContext, ruleIndex, actionIndex) {
		switch (ruleIndex) {
			case 4:
				this.ID_action(localContext, actionIndex);
				break;
		}
	}
	ID_action(localContext, actionIndex) {
		switch (actionIndex) {
			case 0:
				const text = this.text;
				if (text.charAt(0) === text.charAt(0).toUpperCase()) this.type = _XPathLexer.TOKEN_REF;
				else this.type = _XPathLexer.RULE_REF;
				break;
		}
	}
	static _serializedATN = [
		4,
		0,
		8,
		48,
		6,
		-1,
		2,
		0,
		7,
		0,
		2,
		1,
		7,
		1,
		2,
		2,
		7,
		2,
		2,
		3,
		7,
		3,
		2,
		4,
		7,
		4,
		2,
		5,
		7,
		5,
		2,
		6,
		7,
		6,
		2,
		7,
		7,
		7,
		1,
		0,
		1,
		0,
		1,
		0,
		1,
		1,
		1,
		1,
		1,
		2,
		1,
		2,
		1,
		3,
		1,
		3,
		1,
		4,
		1,
		4,
		5,
		4,
		29,
		8,
		4,
		10,
		4,
		12,
		4,
		32,
		9,
		4,
		1,
		4,
		1,
		4,
		1,
		5,
		1,
		5,
		1,
		6,
		1,
		6,
		1,
		7,
		1,
		7,
		5,
		7,
		42,
		8,
		7,
		10,
		7,
		12,
		7,
		45,
		9,
		7,
		1,
		7,
		1,
		7,
		1,
		43,
		0,
		8,
		1,
		3,
		3,
		4,
		5,
		5,
		7,
		6,
		9,
		7,
		11,
		0,
		13,
		0,
		15,
		8,
		1,
		0,
		2,
		784,
		0,
		0,
		8,
		14,
		27,
		48,
		57,
		65,
		90,
		95,
		95,
		97,
		122,
		127,
		159,
		170,
		170,
		173,
		173,
		181,
		181,
		186,
		186,
		192,
		214,
		216,
		246,
		248,
		705,
		710,
		721,
		736,
		740,
		748,
		748,
		750,
		750,
		768,
		884,
		886,
		887,
		890,
		893,
		895,
		895,
		902,
		902,
		904,
		906,
		908,
		908,
		910,
		929,
		931,
		1013,
		1015,
		1153,
		1155,
		1159,
		1162,
		1327,
		1329,
		1366,
		1369,
		1369,
		1376,
		1416,
		1425,
		1469,
		1471,
		1471,
		1473,
		1474,
		1476,
		1477,
		1479,
		1479,
		1488,
		1514,
		1519,
		1522,
		1536,
		1541,
		1552,
		1562,
		1564,
		1564,
		1568,
		1641,
		1646,
		1747,
		1749,
		1757,
		1759,
		1768,
		1770,
		1788,
		1791,
		1791,
		1807,
		1866,
		1869,
		1969,
		1984,
		2037,
		2042,
		2042,
		2045,
		2045,
		2048,
		2093,
		2112,
		2139,
		2144,
		2154,
		2160,
		2183,
		2185,
		2190,
		2192,
		2193,
		2200,
		2403,
		2406,
		2415,
		2417,
		2435,
		2437,
		2444,
		2447,
		2448,
		2451,
		2472,
		2474,
		2480,
		2482,
		2482,
		2486,
		2489,
		2492,
		2500,
		2503,
		2504,
		2507,
		2510,
		2519,
		2519,
		2524,
		2525,
		2527,
		2531,
		2534,
		2545,
		2556,
		2556,
		2558,
		2558,
		2561,
		2563,
		2565,
		2570,
		2575,
		2576,
		2579,
		2600,
		2602,
		2608,
		2610,
		2611,
		2613,
		2614,
		2616,
		2617,
		2620,
		2620,
		2622,
		2626,
		2631,
		2632,
		2635,
		2637,
		2641,
		2641,
		2649,
		2652,
		2654,
		2654,
		2662,
		2677,
		2689,
		2691,
		2693,
		2701,
		2703,
		2705,
		2707,
		2728,
		2730,
		2736,
		2738,
		2739,
		2741,
		2745,
		2748,
		2757,
		2759,
		2761,
		2763,
		2765,
		2768,
		2768,
		2784,
		2787,
		2790,
		2799,
		2809,
		2815,
		2817,
		2819,
		2821,
		2828,
		2831,
		2832,
		2835,
		2856,
		2858,
		2864,
		2866,
		2867,
		2869,
		2873,
		2876,
		2884,
		2887,
		2888,
		2891,
		2893,
		2901,
		2903,
		2908,
		2909,
		2911,
		2915,
		2918,
		2927,
		2929,
		2929,
		2946,
		2947,
		2949,
		2954,
		2958,
		2960,
		2962,
		2965,
		2969,
		2970,
		2972,
		2972,
		2974,
		2975,
		2979,
		2980,
		2984,
		2986,
		2990,
		3001,
		3006,
		3010,
		3014,
		3016,
		3018,
		3021,
		3024,
		3024,
		3031,
		3031,
		3046,
		3055,
		3072,
		3084,
		3086,
		3088,
		3090,
		3112,
		3114,
		3129,
		3132,
		3140,
		3142,
		3144,
		3146,
		3149,
		3157,
		3158,
		3160,
		3162,
		3165,
		3165,
		3168,
		3171,
		3174,
		3183,
		3200,
		3203,
		3205,
		3212,
		3214,
		3216,
		3218,
		3240,
		3242,
		3251,
		3253,
		3257,
		3260,
		3268,
		3270,
		3272,
		3274,
		3277,
		3285,
		3286,
		3293,
		3294,
		3296,
		3299,
		3302,
		3311,
		3313,
		3315,
		3328,
		3340,
		3342,
		3344,
		3346,
		3396,
		3398,
		3400,
		3402,
		3406,
		3412,
		3415,
		3423,
		3427,
		3430,
		3439,
		3450,
		3455,
		3457,
		3459,
		3461,
		3478,
		3482,
		3505,
		3507,
		3515,
		3517,
		3517,
		3520,
		3526,
		3530,
		3530,
		3535,
		3540,
		3542,
		3542,
		3544,
		3551,
		3558,
		3567,
		3570,
		3571,
		3585,
		3642,
		3648,
		3662,
		3664,
		3673,
		3713,
		3714,
		3716,
		3716,
		3718,
		3722,
		3724,
		3747,
		3749,
		3749,
		3751,
		3773,
		3776,
		3780,
		3782,
		3782,
		3784,
		3790,
		3792,
		3801,
		3804,
		3807,
		3840,
		3840,
		3864,
		3865,
		3872,
		3881,
		3893,
		3893,
		3895,
		3895,
		3897,
		3897,
		3902,
		3911,
		3913,
		3948,
		3953,
		3972,
		3974,
		3991,
		3993,
		4028,
		4038,
		4038,
		4096,
		4169,
		4176,
		4253,
		4256,
		4293,
		4295,
		4295,
		4301,
		4301,
		4304,
		4346,
		4348,
		4680,
		4682,
		4685,
		4688,
		4694,
		4696,
		4696,
		4698,
		4701,
		4704,
		4744,
		4746,
		4749,
		4752,
		4784,
		4786,
		4789,
		4792,
		4798,
		4800,
		4800,
		4802,
		4805,
		4808,
		4822,
		4824,
		4880,
		4882,
		4885,
		4888,
		4954,
		4957,
		4959,
		4992,
		5007,
		5024,
		5109,
		5112,
		5117,
		5121,
		5740,
		5743,
		5759,
		5761,
		5786,
		5792,
		5866,
		5870,
		5880,
		5888,
		5909,
		5919,
		5940,
		5952,
		5971,
		5984,
		5996,
		5998,
		6e3,
		6002,
		6003,
		6016,
		6099,
		6103,
		6103,
		6108,
		6109,
		6112,
		6121,
		6155,
		6169,
		6176,
		6264,
		6272,
		6314,
		6320,
		6389,
		6400,
		6430,
		6432,
		6443,
		6448,
		6459,
		6470,
		6509,
		6512,
		6516,
		6528,
		6571,
		6576,
		6601,
		6608,
		6617,
		6656,
		6683,
		6688,
		6750,
		6752,
		6780,
		6783,
		6793,
		6800,
		6809,
		6823,
		6823,
		6832,
		6845,
		6847,
		6862,
		6912,
		6988,
		6992,
		7001,
		7019,
		7027,
		7040,
		7155,
		7168,
		7223,
		7232,
		7241,
		7245,
		7293,
		7296,
		7304,
		7312,
		7354,
		7357,
		7359,
		7376,
		7378,
		7380,
		7418,
		7424,
		7957,
		7960,
		7965,
		7968,
		8005,
		8008,
		8013,
		8016,
		8023,
		8025,
		8025,
		8027,
		8027,
		8029,
		8029,
		8031,
		8061,
		8064,
		8116,
		8118,
		8124,
		8126,
		8126,
		8130,
		8132,
		8134,
		8140,
		8144,
		8147,
		8150,
		8155,
		8160,
		8172,
		8178,
		8180,
		8182,
		8188,
		8203,
		8207,
		8234,
		8238,
		8255,
		8256,
		8276,
		8276,
		8288,
		8292,
		8294,
		8303,
		8305,
		8305,
		8319,
		8319,
		8336,
		8348,
		8400,
		8412,
		8417,
		8417,
		8421,
		8432,
		8450,
		8450,
		8455,
		8455,
		8458,
		8467,
		8469,
		8469,
		8473,
		8477,
		8484,
		8484,
		8486,
		8486,
		8488,
		8488,
		8490,
		8493,
		8495,
		8505,
		8508,
		8511,
		8517,
		8521,
		8526,
		8526,
		8544,
		8584,
		11264,
		11492,
		11499,
		11507,
		11520,
		11557,
		11559,
		11559,
		11565,
		11565,
		11568,
		11623,
		11631,
		11631,
		11647,
		11670,
		11680,
		11686,
		11688,
		11694,
		11696,
		11702,
		11704,
		11710,
		11712,
		11718,
		11720,
		11726,
		11728,
		11734,
		11736,
		11742,
		11744,
		11775,
		11823,
		11823,
		12293,
		12295,
		12321,
		12335,
		12337,
		12341,
		12344,
		12348,
		12353,
		12438,
		12441,
		12442,
		12445,
		12447,
		12449,
		12538,
		12540,
		12543,
		12549,
		12591,
		12593,
		12686,
		12704,
		12735,
		12784,
		12799,
		13312,
		19903,
		19968,
		42124,
		42192,
		42237,
		42240,
		42508,
		42512,
		42539,
		42560,
		42607,
		42612,
		42621,
		42623,
		42737,
		42775,
		42783,
		42786,
		42888,
		42891,
		42954,
		42960,
		42961,
		42963,
		42963,
		42965,
		42969,
		42994,
		43047,
		43052,
		43052,
		43072,
		43123,
		43136,
		43205,
		43216,
		43225,
		43232,
		43255,
		43259,
		43259,
		43261,
		43309,
		43312,
		43347,
		43360,
		43388,
		43392,
		43456,
		43471,
		43481,
		43488,
		43518,
		43520,
		43574,
		43584,
		43597,
		43600,
		43609,
		43616,
		43638,
		43642,
		43714,
		43739,
		43741,
		43744,
		43759,
		43762,
		43766,
		43777,
		43782,
		43785,
		43790,
		43793,
		43798,
		43808,
		43814,
		43816,
		43822,
		43824,
		43866,
		43868,
		43881,
		43888,
		44010,
		44012,
		44013,
		44016,
		44025,
		44032,
		55203,
		55216,
		55238,
		55243,
		55291,
		63744,
		64109,
		64112,
		64217,
		64256,
		64262,
		64275,
		64279,
		64285,
		64296,
		64298,
		64310,
		64312,
		64316,
		64318,
		64318,
		64320,
		64321,
		64323,
		64324,
		64326,
		64433,
		64467,
		64829,
		64848,
		64911,
		64914,
		64967,
		65008,
		65019,
		65024,
		65039,
		65056,
		65071,
		65075,
		65076,
		65101,
		65103,
		65136,
		65140,
		65142,
		65276,
		65279,
		65279,
		65296,
		65305,
		65313,
		65338,
		65343,
		65343,
		65345,
		65370,
		65382,
		65470,
		65474,
		65479,
		65482,
		65487,
		65490,
		65495,
		65498,
		65500,
		65529,
		65531,
		65536,
		65547,
		65549,
		65574,
		65576,
		65594,
		65596,
		65597,
		65599,
		65613,
		65616,
		65629,
		65664,
		65786,
		65856,
		65908,
		66045,
		66045,
		66176,
		66204,
		66208,
		66256,
		66272,
		66272,
		66304,
		66335,
		66349,
		66378,
		66384,
		66426,
		66432,
		66461,
		66464,
		66499,
		66504,
		66511,
		66513,
		66517,
		66560,
		66717,
		66720,
		66729,
		66736,
		66771,
		66776,
		66811,
		66816,
		66855,
		66864,
		66915,
		66928,
		66938,
		66940,
		66954,
		66956,
		66962,
		66964,
		66965,
		66967,
		66977,
		66979,
		66993,
		66995,
		67001,
		67003,
		67004,
		67072,
		67382,
		67392,
		67413,
		67424,
		67431,
		67456,
		67461,
		67463,
		67504,
		67506,
		67514,
		67584,
		67589,
		67592,
		67592,
		67594,
		67637,
		67639,
		67640,
		67644,
		67644,
		67647,
		67669,
		67680,
		67702,
		67712,
		67742,
		67808,
		67826,
		67828,
		67829,
		67840,
		67861,
		67872,
		67897,
		67968,
		68023,
		68030,
		68031,
		68096,
		68099,
		68101,
		68102,
		68108,
		68115,
		68117,
		68119,
		68121,
		68149,
		68152,
		68154,
		68159,
		68159,
		68192,
		68220,
		68224,
		68252,
		68288,
		68295,
		68297,
		68326,
		68352,
		68405,
		68416,
		68437,
		68448,
		68466,
		68480,
		68497,
		68608,
		68680,
		68736,
		68786,
		68800,
		68850,
		68864,
		68903,
		68912,
		68921,
		69248,
		69289,
		69291,
		69292,
		69296,
		69297,
		69373,
		69404,
		69415,
		69415,
		69424,
		69456,
		69488,
		69509,
		69552,
		69572,
		69600,
		69622,
		69632,
		69702,
		69734,
		69749,
		69759,
		69818,
		69821,
		69821,
		69826,
		69826,
		69837,
		69837,
		69840,
		69864,
		69872,
		69881,
		69888,
		69940,
		69942,
		69951,
		69956,
		69959,
		69968,
		70003,
		70006,
		70006,
		70016,
		70084,
		70089,
		70092,
		70094,
		70106,
		70108,
		70108,
		70144,
		70161,
		70163,
		70199,
		70206,
		70209,
		70272,
		70278,
		70280,
		70280,
		70282,
		70285,
		70287,
		70301,
		70303,
		70312,
		70320,
		70378,
		70384,
		70393,
		70400,
		70403,
		70405,
		70412,
		70415,
		70416,
		70419,
		70440,
		70442,
		70448,
		70450,
		70451,
		70453,
		70457,
		70459,
		70468,
		70471,
		70472,
		70475,
		70477,
		70480,
		70480,
		70487,
		70487,
		70493,
		70499,
		70502,
		70508,
		70512,
		70516,
		70656,
		70730,
		70736,
		70745,
		70750,
		70753,
		70784,
		70853,
		70855,
		70855,
		70864,
		70873,
		71040,
		71093,
		71096,
		71104,
		71128,
		71133,
		71168,
		71232,
		71236,
		71236,
		71248,
		71257,
		71296,
		71352,
		71360,
		71369,
		71424,
		71450,
		71453,
		71467,
		71472,
		71481,
		71488,
		71494,
		71680,
		71738,
		71840,
		71913,
		71935,
		71942,
		71945,
		71945,
		71948,
		71955,
		71957,
		71958,
		71960,
		71989,
		71991,
		71992,
		71995,
		72003,
		72016,
		72025,
		72096,
		72103,
		72106,
		72151,
		72154,
		72161,
		72163,
		72164,
		72192,
		72254,
		72263,
		72263,
		72272,
		72345,
		72349,
		72349,
		72368,
		72440,
		72704,
		72712,
		72714,
		72758,
		72760,
		72768,
		72784,
		72793,
		72818,
		72847,
		72850,
		72871,
		72873,
		72886,
		72960,
		72966,
		72968,
		72969,
		72971,
		73014,
		73018,
		73018,
		73020,
		73021,
		73023,
		73031,
		73040,
		73049,
		73056,
		73061,
		73063,
		73064,
		73066,
		73102,
		73104,
		73105,
		73107,
		73112,
		73120,
		73129,
		73440,
		73462,
		73472,
		73488,
		73490,
		73530,
		73534,
		73538,
		73552,
		73561,
		73648,
		73648,
		73728,
		74649,
		74752,
		74862,
		74880,
		75075,
		77712,
		77808,
		77824,
		78933,
		82944,
		83526,
		92160,
		92728,
		92736,
		92766,
		92768,
		92777,
		92784,
		92862,
		92864,
		92873,
		92880,
		92909,
		92912,
		92916,
		92928,
		92982,
		92992,
		92995,
		93008,
		93017,
		93027,
		93047,
		93053,
		93071,
		93760,
		93823,
		93952,
		94026,
		94031,
		94087,
		94095,
		94111,
		94176,
		94177,
		94179,
		94180,
		94192,
		94193,
		94208,
		100343,
		100352,
		101589,
		101632,
		101640,
		110576,
		110579,
		110581,
		110587,
		110589,
		110590,
		110592,
		110882,
		110898,
		110898,
		110928,
		110930,
		110933,
		110933,
		110948,
		110951,
		110960,
		111355,
		113664,
		113770,
		113776,
		113788,
		113792,
		113800,
		113808,
		113817,
		113821,
		113822,
		113824,
		113827,
		118528,
		118573,
		118576,
		118598,
		119141,
		119145,
		119149,
		119170,
		119173,
		119179,
		119210,
		119213,
		119362,
		119364,
		119808,
		119892,
		119894,
		119964,
		119966,
		119967,
		119970,
		119970,
		119973,
		119974,
		119977,
		119980,
		119982,
		119993,
		119995,
		119995,
		119997,
		120003,
		120005,
		120069,
		120071,
		120074,
		120077,
		120084,
		120086,
		120092,
		120094,
		120121,
		120123,
		120126,
		120128,
		120132,
		120134,
		120134,
		120138,
		120144,
		120146,
		120485,
		120488,
		120512,
		120514,
		120538,
		120540,
		120570,
		120572,
		120596,
		120598,
		120628,
		120630,
		120654,
		120656,
		120686,
		120688,
		120712,
		120714,
		120744,
		120746,
		120770,
		120772,
		120779,
		120782,
		120831,
		121344,
		121398,
		121403,
		121452,
		121461,
		121461,
		121476,
		121476,
		121499,
		121503,
		121505,
		121519,
		122624,
		122654,
		122661,
		122666,
		122880,
		122886,
		122888,
		122904,
		122907,
		122913,
		122915,
		122916,
		122918,
		122922,
		122928,
		122989,
		123023,
		123023,
		123136,
		123180,
		123184,
		123197,
		123200,
		123209,
		123214,
		123214,
		123536,
		123566,
		123584,
		123641,
		124112,
		124153,
		124896,
		124902,
		124904,
		124907,
		124909,
		124910,
		124912,
		124926,
		124928,
		125124,
		125136,
		125142,
		125184,
		125259,
		125264,
		125273,
		126464,
		126467,
		126469,
		126495,
		126497,
		126498,
		126500,
		126500,
		126503,
		126503,
		126505,
		126514,
		126516,
		126519,
		126521,
		126521,
		126523,
		126523,
		126530,
		126530,
		126535,
		126535,
		126537,
		126537,
		126539,
		126539,
		126541,
		126543,
		126545,
		126546,
		126548,
		126548,
		126551,
		126551,
		126553,
		126553,
		126555,
		126555,
		126557,
		126557,
		126559,
		126559,
		126561,
		126562,
		126564,
		126564,
		126567,
		126570,
		126572,
		126578,
		126580,
		126583,
		126585,
		126588,
		126590,
		126590,
		126592,
		126601,
		126603,
		126619,
		126625,
		126627,
		126629,
		126633,
		126635,
		126651,
		130032,
		130041,
		131072,
		173791,
		173824,
		177977,
		177984,
		178205,
		178208,
		183969,
		183984,
		191456,
		194560,
		195101,
		196608,
		201546,
		201552,
		205743,
		917505,
		917505,
		917536,
		917631,
		917760,
		917999,
		662,
		0,
		65,
		90,
		97,
		122,
		170,
		170,
		181,
		181,
		186,
		186,
		192,
		214,
		216,
		246,
		248,
		705,
		710,
		721,
		736,
		740,
		748,
		748,
		750,
		750,
		880,
		884,
		886,
		887,
		890,
		893,
		895,
		895,
		902,
		902,
		904,
		906,
		908,
		908,
		910,
		929,
		931,
		1013,
		1015,
		1153,
		1162,
		1327,
		1329,
		1366,
		1369,
		1369,
		1376,
		1416,
		1488,
		1514,
		1519,
		1522,
		1568,
		1610,
		1646,
		1647,
		1649,
		1747,
		1749,
		1749,
		1765,
		1766,
		1774,
		1775,
		1786,
		1788,
		1791,
		1791,
		1808,
		1808,
		1810,
		1839,
		1869,
		1957,
		1969,
		1969,
		1994,
		2026,
		2036,
		2037,
		2042,
		2042,
		2048,
		2069,
		2074,
		2074,
		2084,
		2084,
		2088,
		2088,
		2112,
		2136,
		2144,
		2154,
		2160,
		2183,
		2185,
		2190,
		2208,
		2249,
		2308,
		2361,
		2365,
		2365,
		2384,
		2384,
		2392,
		2401,
		2417,
		2432,
		2437,
		2444,
		2447,
		2448,
		2451,
		2472,
		2474,
		2480,
		2482,
		2482,
		2486,
		2489,
		2493,
		2493,
		2510,
		2510,
		2524,
		2525,
		2527,
		2529,
		2544,
		2545,
		2556,
		2556,
		2565,
		2570,
		2575,
		2576,
		2579,
		2600,
		2602,
		2608,
		2610,
		2611,
		2613,
		2614,
		2616,
		2617,
		2649,
		2652,
		2654,
		2654,
		2674,
		2676,
		2693,
		2701,
		2703,
		2705,
		2707,
		2728,
		2730,
		2736,
		2738,
		2739,
		2741,
		2745,
		2749,
		2749,
		2768,
		2768,
		2784,
		2785,
		2809,
		2809,
		2821,
		2828,
		2831,
		2832,
		2835,
		2856,
		2858,
		2864,
		2866,
		2867,
		2869,
		2873,
		2877,
		2877,
		2908,
		2909,
		2911,
		2913,
		2929,
		2929,
		2947,
		2947,
		2949,
		2954,
		2958,
		2960,
		2962,
		2965,
		2969,
		2970,
		2972,
		2972,
		2974,
		2975,
		2979,
		2980,
		2984,
		2986,
		2990,
		3001,
		3024,
		3024,
		3077,
		3084,
		3086,
		3088,
		3090,
		3112,
		3114,
		3129,
		3133,
		3133,
		3160,
		3162,
		3165,
		3165,
		3168,
		3169,
		3200,
		3200,
		3205,
		3212,
		3214,
		3216,
		3218,
		3240,
		3242,
		3251,
		3253,
		3257,
		3261,
		3261,
		3293,
		3294,
		3296,
		3297,
		3313,
		3314,
		3332,
		3340,
		3342,
		3344,
		3346,
		3386,
		3389,
		3389,
		3406,
		3406,
		3412,
		3414,
		3423,
		3425,
		3450,
		3455,
		3461,
		3478,
		3482,
		3505,
		3507,
		3515,
		3517,
		3517,
		3520,
		3526,
		3585,
		3632,
		3634,
		3635,
		3648,
		3654,
		3713,
		3714,
		3716,
		3716,
		3718,
		3722,
		3724,
		3747,
		3749,
		3749,
		3751,
		3760,
		3762,
		3763,
		3773,
		3773,
		3776,
		3780,
		3782,
		3782,
		3804,
		3807,
		3840,
		3840,
		3904,
		3911,
		3913,
		3948,
		3976,
		3980,
		4096,
		4138,
		4159,
		4159,
		4176,
		4181,
		4186,
		4189,
		4193,
		4193,
		4197,
		4198,
		4206,
		4208,
		4213,
		4225,
		4238,
		4238,
		4256,
		4293,
		4295,
		4295,
		4301,
		4301,
		4304,
		4346,
		4348,
		4680,
		4682,
		4685,
		4688,
		4694,
		4696,
		4696,
		4698,
		4701,
		4704,
		4744,
		4746,
		4749,
		4752,
		4784,
		4786,
		4789,
		4792,
		4798,
		4800,
		4800,
		4802,
		4805,
		4808,
		4822,
		4824,
		4880,
		4882,
		4885,
		4888,
		4954,
		4992,
		5007,
		5024,
		5109,
		5112,
		5117,
		5121,
		5740,
		5743,
		5759,
		5761,
		5786,
		5792,
		5866,
		5870,
		5880,
		5888,
		5905,
		5919,
		5937,
		5952,
		5969,
		5984,
		5996,
		5998,
		6e3,
		6016,
		6067,
		6103,
		6103,
		6108,
		6108,
		6176,
		6264,
		6272,
		6276,
		6279,
		6312,
		6314,
		6314,
		6320,
		6389,
		6400,
		6430,
		6480,
		6509,
		6512,
		6516,
		6528,
		6571,
		6576,
		6601,
		6656,
		6678,
		6688,
		6740,
		6823,
		6823,
		6917,
		6963,
		6981,
		6988,
		7043,
		7072,
		7086,
		7087,
		7098,
		7141,
		7168,
		7203,
		7245,
		7247,
		7258,
		7293,
		7296,
		7304,
		7312,
		7354,
		7357,
		7359,
		7401,
		7404,
		7406,
		7411,
		7413,
		7414,
		7418,
		7418,
		7424,
		7615,
		7680,
		7957,
		7960,
		7965,
		7968,
		8005,
		8008,
		8013,
		8016,
		8023,
		8025,
		8025,
		8027,
		8027,
		8029,
		8029,
		8031,
		8061,
		8064,
		8116,
		8118,
		8124,
		8126,
		8126,
		8130,
		8132,
		8134,
		8140,
		8144,
		8147,
		8150,
		8155,
		8160,
		8172,
		8178,
		8180,
		8182,
		8188,
		8305,
		8305,
		8319,
		8319,
		8336,
		8348,
		8450,
		8450,
		8455,
		8455,
		8458,
		8467,
		8469,
		8469,
		8473,
		8477,
		8484,
		8484,
		8486,
		8486,
		8488,
		8488,
		8490,
		8493,
		8495,
		8505,
		8508,
		8511,
		8517,
		8521,
		8526,
		8526,
		8544,
		8584,
		11264,
		11492,
		11499,
		11502,
		11506,
		11507,
		11520,
		11557,
		11559,
		11559,
		11565,
		11565,
		11568,
		11623,
		11631,
		11631,
		11648,
		11670,
		11680,
		11686,
		11688,
		11694,
		11696,
		11702,
		11704,
		11710,
		11712,
		11718,
		11720,
		11726,
		11728,
		11734,
		11736,
		11742,
		11823,
		11823,
		12293,
		12295,
		12321,
		12329,
		12337,
		12341,
		12344,
		12348,
		12353,
		12438,
		12445,
		12447,
		12449,
		12538,
		12540,
		12543,
		12549,
		12591,
		12593,
		12686,
		12704,
		12735,
		12784,
		12799,
		13312,
		19903,
		19968,
		42124,
		42192,
		42237,
		42240,
		42508,
		42512,
		42527,
		42538,
		42539,
		42560,
		42606,
		42623,
		42653,
		42656,
		42735,
		42775,
		42783,
		42786,
		42888,
		42891,
		42954,
		42960,
		42961,
		42963,
		42963,
		42965,
		42969,
		42994,
		43009,
		43011,
		43013,
		43015,
		43018,
		43020,
		43042,
		43072,
		43123,
		43138,
		43187,
		43250,
		43255,
		43259,
		43259,
		43261,
		43262,
		43274,
		43301,
		43312,
		43334,
		43360,
		43388,
		43396,
		43442,
		43471,
		43471,
		43488,
		43492,
		43494,
		43503,
		43514,
		43518,
		43520,
		43560,
		43584,
		43586,
		43588,
		43595,
		43616,
		43638,
		43642,
		43642,
		43646,
		43695,
		43697,
		43697,
		43701,
		43702,
		43705,
		43709,
		43712,
		43712,
		43714,
		43714,
		43739,
		43741,
		43744,
		43754,
		43762,
		43764,
		43777,
		43782,
		43785,
		43790,
		43793,
		43798,
		43808,
		43814,
		43816,
		43822,
		43824,
		43866,
		43868,
		43881,
		43888,
		44002,
		44032,
		55203,
		55216,
		55238,
		55243,
		55291,
		63744,
		64109,
		64112,
		64217,
		64256,
		64262,
		64275,
		64279,
		64285,
		64285,
		64287,
		64296,
		64298,
		64310,
		64312,
		64316,
		64318,
		64318,
		64320,
		64321,
		64323,
		64324,
		64326,
		64433,
		64467,
		64829,
		64848,
		64911,
		64914,
		64967,
		65008,
		65019,
		65136,
		65140,
		65142,
		65276,
		65313,
		65338,
		65345,
		65370,
		65382,
		65470,
		65474,
		65479,
		65482,
		65487,
		65490,
		65495,
		65498,
		65500,
		65536,
		65547,
		65549,
		65574,
		65576,
		65594,
		65596,
		65597,
		65599,
		65613,
		65616,
		65629,
		65664,
		65786,
		65856,
		65908,
		66176,
		66204,
		66208,
		66256,
		66304,
		66335,
		66349,
		66378,
		66384,
		66421,
		66432,
		66461,
		66464,
		66499,
		66504,
		66511,
		66513,
		66517,
		66560,
		66717,
		66736,
		66771,
		66776,
		66811,
		66816,
		66855,
		66864,
		66915,
		66928,
		66938,
		66940,
		66954,
		66956,
		66962,
		66964,
		66965,
		66967,
		66977,
		66979,
		66993,
		66995,
		67001,
		67003,
		67004,
		67072,
		67382,
		67392,
		67413,
		67424,
		67431,
		67456,
		67461,
		67463,
		67504,
		67506,
		67514,
		67584,
		67589,
		67592,
		67592,
		67594,
		67637,
		67639,
		67640,
		67644,
		67644,
		67647,
		67669,
		67680,
		67702,
		67712,
		67742,
		67808,
		67826,
		67828,
		67829,
		67840,
		67861,
		67872,
		67897,
		67968,
		68023,
		68030,
		68031,
		68096,
		68096,
		68112,
		68115,
		68117,
		68119,
		68121,
		68149,
		68192,
		68220,
		68224,
		68252,
		68288,
		68295,
		68297,
		68324,
		68352,
		68405,
		68416,
		68437,
		68448,
		68466,
		68480,
		68497,
		68608,
		68680,
		68736,
		68786,
		68800,
		68850,
		68864,
		68899,
		69248,
		69289,
		69296,
		69297,
		69376,
		69404,
		69415,
		69415,
		69424,
		69445,
		69488,
		69505,
		69552,
		69572,
		69600,
		69622,
		69635,
		69687,
		69745,
		69746,
		69749,
		69749,
		69763,
		69807,
		69840,
		69864,
		69891,
		69926,
		69956,
		69956,
		69959,
		69959,
		69968,
		70002,
		70006,
		70006,
		70019,
		70066,
		70081,
		70084,
		70106,
		70106,
		70108,
		70108,
		70144,
		70161,
		70163,
		70187,
		70207,
		70208,
		70272,
		70278,
		70280,
		70280,
		70282,
		70285,
		70287,
		70301,
		70303,
		70312,
		70320,
		70366,
		70405,
		70412,
		70415,
		70416,
		70419,
		70440,
		70442,
		70448,
		70450,
		70451,
		70453,
		70457,
		70461,
		70461,
		70480,
		70480,
		70493,
		70497,
		70656,
		70708,
		70727,
		70730,
		70751,
		70753,
		70784,
		70831,
		70852,
		70853,
		70855,
		70855,
		71040,
		71086,
		71128,
		71131,
		71168,
		71215,
		71236,
		71236,
		71296,
		71338,
		71352,
		71352,
		71424,
		71450,
		71488,
		71494,
		71680,
		71723,
		71840,
		71903,
		71935,
		71942,
		71945,
		71945,
		71948,
		71955,
		71957,
		71958,
		71960,
		71983,
		71999,
		71999,
		72001,
		72001,
		72096,
		72103,
		72106,
		72144,
		72161,
		72161,
		72163,
		72163,
		72192,
		72192,
		72203,
		72242,
		72250,
		72250,
		72272,
		72272,
		72284,
		72329,
		72349,
		72349,
		72368,
		72440,
		72704,
		72712,
		72714,
		72750,
		72768,
		72768,
		72818,
		72847,
		72960,
		72966,
		72968,
		72969,
		72971,
		73008,
		73030,
		73030,
		73056,
		73061,
		73063,
		73064,
		73066,
		73097,
		73112,
		73112,
		73440,
		73458,
		73474,
		73474,
		73476,
		73488,
		73490,
		73523,
		73648,
		73648,
		73728,
		74649,
		74752,
		74862,
		74880,
		75075,
		77712,
		77808,
		77824,
		78895,
		78913,
		78918,
		82944,
		83526,
		92160,
		92728,
		92736,
		92766,
		92784,
		92862,
		92880,
		92909,
		92928,
		92975,
		92992,
		92995,
		93027,
		93047,
		93053,
		93071,
		93760,
		93823,
		93952,
		94026,
		94032,
		94032,
		94099,
		94111,
		94176,
		94177,
		94179,
		94179,
		94208,
		100343,
		100352,
		101589,
		101632,
		101640,
		110576,
		110579,
		110581,
		110587,
		110589,
		110590,
		110592,
		110882,
		110898,
		110898,
		110928,
		110930,
		110933,
		110933,
		110948,
		110951,
		110960,
		111355,
		113664,
		113770,
		113776,
		113788,
		113792,
		113800,
		113808,
		113817,
		119808,
		119892,
		119894,
		119964,
		119966,
		119967,
		119970,
		119970,
		119973,
		119974,
		119977,
		119980,
		119982,
		119993,
		119995,
		119995,
		119997,
		120003,
		120005,
		120069,
		120071,
		120074,
		120077,
		120084,
		120086,
		120092,
		120094,
		120121,
		120123,
		120126,
		120128,
		120132,
		120134,
		120134,
		120138,
		120144,
		120146,
		120485,
		120488,
		120512,
		120514,
		120538,
		120540,
		120570,
		120572,
		120596,
		120598,
		120628,
		120630,
		120654,
		120656,
		120686,
		120688,
		120712,
		120714,
		120744,
		120746,
		120770,
		120772,
		120779,
		122624,
		122654,
		122661,
		122666,
		122928,
		122989,
		123136,
		123180,
		123191,
		123197,
		123214,
		123214,
		123536,
		123565,
		123584,
		123627,
		124112,
		124139,
		124896,
		124902,
		124904,
		124907,
		124909,
		124910,
		124912,
		124926,
		124928,
		125124,
		125184,
		125251,
		125259,
		125259,
		126464,
		126467,
		126469,
		126495,
		126497,
		126498,
		126500,
		126500,
		126503,
		126503,
		126505,
		126514,
		126516,
		126519,
		126521,
		126521,
		126523,
		126523,
		126530,
		126530,
		126535,
		126535,
		126537,
		126537,
		126539,
		126539,
		126541,
		126543,
		126545,
		126546,
		126548,
		126548,
		126551,
		126551,
		126553,
		126553,
		126555,
		126555,
		126557,
		126557,
		126559,
		126559,
		126561,
		126562,
		126564,
		126564,
		126567,
		126570,
		126572,
		126578,
		126580,
		126583,
		126585,
		126588,
		126590,
		126590,
		126592,
		126601,
		126603,
		126619,
		126625,
		126627,
		126629,
		126633,
		126635,
		126651,
		131072,
		173791,
		173824,
		177977,
		177984,
		178205,
		178208,
		183969,
		183984,
		191456,
		194560,
		195101,
		196608,
		201546,
		201552,
		205743,
		47,
		0,
		1,
		1,
		0,
		0,
		0,
		0,
		3,
		1,
		0,
		0,
		0,
		0,
		5,
		1,
		0,
		0,
		0,
		0,
		7,
		1,
		0,
		0,
		0,
		0,
		9,
		1,
		0,
		0,
		0,
		0,
		15,
		1,
		0,
		0,
		0,
		1,
		17,
		1,
		0,
		0,
		0,
		3,
		20,
		1,
		0,
		0,
		0,
		5,
		22,
		1,
		0,
		0,
		0,
		7,
		24,
		1,
		0,
		0,
		0,
		9,
		26,
		1,
		0,
		0,
		0,
		11,
		35,
		1,
		0,
		0,
		0,
		13,
		37,
		1,
		0,
		0,
		0,
		15,
		39,
		1,
		0,
		0,
		0,
		17,
		18,
		5,
		47,
		0,
		0,
		18,
		19,
		5,
		47,
		0,
		0,
		19,
		2,
		1,
		0,
		0,
		0,
		20,
		21,
		5,
		47,
		0,
		0,
		21,
		4,
		1,
		0,
		0,
		0,
		22,
		23,
		5,
		42,
		0,
		0,
		23,
		6,
		1,
		0,
		0,
		0,
		24,
		25,
		5,
		33,
		0,
		0,
		25,
		8,
		1,
		0,
		0,
		0,
		26,
		30,
		3,
		13,
		6,
		0,
		27,
		29,
		3,
		11,
		5,
		0,
		28,
		27,
		1,
		0,
		0,
		0,
		29,
		32,
		1,
		0,
		0,
		0,
		30,
		28,
		1,
		0,
		0,
		0,
		30,
		31,
		1,
		0,
		0,
		0,
		31,
		33,
		1,
		0,
		0,
		0,
		32,
		30,
		1,
		0,
		0,
		0,
		33,
		34,
		6,
		4,
		0,
		0,
		34,
		10,
		1,
		0,
		0,
		0,
		35,
		36,
		7,
		0,
		0,
		0,
		36,
		12,
		1,
		0,
		0,
		0,
		37,
		38,
		7,
		1,
		0,
		0,
		38,
		14,
		1,
		0,
		0,
		0,
		39,
		43,
		5,
		39,
		0,
		0,
		40,
		42,
		9,
		0,
		0,
		0,
		41,
		40,
		1,
		0,
		0,
		0,
		42,
		45,
		1,
		0,
		0,
		0,
		43,
		44,
		1,
		0,
		0,
		0,
		43,
		41,
		1,
		0,
		0,
		0,
		44,
		46,
		1,
		0,
		0,
		0,
		45,
		43,
		1,
		0,
		0,
		0,
		46,
		47,
		5,
		39,
		0,
		0,
		47,
		16,
		1,
		0,
		0,
		0,
		3,
		0,
		30,
		43,
		1,
		1,
		4,
		0
	];
	static __ATN;
	static get _ATN() {
		if (!_XPathLexer.__ATN) _XPathLexer.__ATN = new ATNDeserializer().deserialize(_XPathLexer._serializedATN);
		return _XPathLexer.__ATN;
	}
	static vocabulary = new Vocabulary(_XPathLexer.literalNames, _XPathLexer.symbolicNames, []);
	get vocabulary() {
		return _XPathLexer.vocabulary;
	}
	static decisionsToDFA = _XPathLexer._ATN.decisionToState.map((ds, index) => {
		return new DFA(ds, index);
	});
};
var XPathLexerErrorListener = class extends BaseErrorListener {
	static {
		__name(this, "XPathLexerErrorListener");
	}
	syntaxError(_recognizer, _offendingSymbol, _line, _charPositionInLine, _msg, _e) {}
};
var XPathElement = class {
	static {
		__name(this, "XPathElement");
	}
	invert;
	nodeName;
	/**
	* Construct element like `/ID` or `ID` or `/*` etc... `nodeName` is undefined if just node
	*
	* @param nodeName The name of the node; may be undefined for any node.
	*/
	constructor(nodeName) {
		this.nodeName = nodeName;
		this.invert = false;
	}
	toString() {
		return "XPathElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathRuleAnywhereElement = class extends XPathElement {
	static {
		__name(this, "XPathRuleAnywhereElement");
	}
	ruleIndex;
	constructor(ruleName, ruleIndex) {
		super(ruleName);
		this.ruleIndex = ruleIndex;
	}
	evaluate(t) {
		return Trees.findAllRuleNodes(t, this.ruleIndex);
	}
	toString() {
		return "XPathRuleAnywhereElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathRuleElement = class extends XPathElement {
	static {
		__name(this, "XPathRuleElement");
	}
	ruleIndex;
	constructor(ruleName, ruleIndex) {
		super(ruleName);
		this.ruleIndex = ruleIndex;
	}
	evaluate(t) {
		const nodes = [];
		for (const c of Trees.getChildren(t)) if (c instanceof ParserRuleContext) {
			if (c.ruleIndex === this.ruleIndex && !this.invert || c.ruleIndex !== this.ruleIndex && this.invert) nodes.push(c);
		}
		return nodes;
	}
	toString() {
		return "XPathRuleElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathTokenAnywhereElement = class extends XPathElement {
	static {
		__name(this, "XPathTokenAnywhereElement");
	}
	tokenType;
	constructor(tokenName, tokenType) {
		super(tokenName);
		this.tokenType = tokenType;
	}
	evaluate(t) {
		return Trees.findAllTokenNodes(t, this.tokenType);
	}
	toString() {
		return "XPathTokenAnywhereElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathTokenElement = class extends XPathElement {
	static {
		__name(this, "XPathTokenElement");
	}
	tokenType;
	constructor(tokenName, tokenType) {
		super(tokenName);
		this.tokenType = tokenType;
	}
	evaluate(t) {
		const nodes = [];
		for (const c of Trees.getChildren(t)) if (c instanceof TerminalNode && c.symbol) {
			if (c.symbol.type === this.tokenType && !this.invert || c.symbol.type !== this.tokenType && this.invert) nodes.push(c);
		}
		return nodes;
	}
	toString() {
		return "XPathTokenElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathWildcardAnywhereElement = class extends XPathElement {
	static {
		__name(this, "XPathWildcardAnywhereElement");
	}
	constructor() {
		super(XPath.WILDCARD);
	}
	evaluate(t) {
		if (this.invert) return [];
		return Trees.descendants(t);
	}
	toString() {
		return "XPathWildcardAnywhereElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPathWildcardElement = class extends XPathElement {
	static {
		__name(this, "XPathWildcardElement");
	}
	constructor() {
		super(XPath.WILDCARD);
	}
	evaluate(t) {
		const kids = [];
		if (this.invert) return kids;
		for (const c of Trees.getChildren(t)) kids.push(c);
		return kids;
	}
	toString() {
		return "XPathWildcardElement[" + (this.invert ? "!" : "") + this.nodeName + "]";
	}
};
var XPath = class _XPath {
	static {
		__name(this, "XPath");
	}
	static WILDCARD = "*";
	static NOT = "!";
	path;
	elements;
	parser;
	constructor(parser, path) {
		this.parser = parser;
		this.path = path;
		this.elements = this.split(path);
	}
	static findAll(tree, xpath, parser) {
		return new _XPath(parser, xpath).evaluate(tree);
	}
	split(path) {
		const lexer = new XPathLexer(CharStream.fromString(path));
		lexer.recover = (e) => {
			throw e;
		};
		lexer.removeErrorListeners();
		lexer.addErrorListener(new XPathLexerErrorListener());
		const tokenStream = new CommonTokenStream(lexer);
		try {
			tokenStream.fill();
		} catch (e) {
			if (e instanceof LexerNoViableAltException) {
				const msg = "Invalid tokens or characters at index " + lexer.column + " in path '" + path + "' -- " + e.message;
				throw new RangeError(msg);
			}
			throw e;
		}
		const tokens = tokenStream.getTokens();
		const elements = [];
		const n2 = tokens.length;
		let i = 0;
		loop: while (i < n2) {
			const el = tokens[i];
			let next;
			switch (el.type) {
				case XPathLexer.ROOT:
				case XPathLexer.ANYWHERE:
					const anywhere = el.type === XPathLexer.ANYWHERE;
					i++;
					next = tokens[i];
					const invert = next.type === XPathLexer.BANG;
					if (invert) {
						i++;
						next = tokens[i];
					}
					const pathElement = this.getXPathElement(next, anywhere);
					pathElement.invert = invert;
					elements.push(pathElement);
					i++;
					break;
				case XPathLexer.TOKEN_REF:
				case XPathLexer.RULE_REF:
				case XPathLexer.WILDCARD:
					elements.push(this.getXPathElement(el, false));
					++i;
					break;
				case Token.EOF: break loop;
				default: throw new Error("Unknown path element " + el);
			}
		}
		return elements;
	}
	/**
	* Return a list of all nodes starting at `t` as root that satisfy the
	* path. The root `/` is relative to the node passed to {@link evaluate}.
	*/
	evaluate(t) {
		const dummyRoot = new ParserRuleContext(null);
		dummyRoot.addChild(t);
		let work = /* @__PURE__ */ new Set([dummyRoot]);
		let i = 0;
		while (i < this.elements.length) {
			const next = /* @__PURE__ */ new Set();
			for (const node of work) if (node.getChildCount() > 0) this.elements[i].evaluate(node).forEach((tree) => {
				next.add(tree);
			}, next);
			i++;
			work = next;
		}
		return work;
	}
	/**
	* Convert word like `*` or `ID` or `expr` to a path
	* element. `anywhere` is `true` if `//` precedes the
	* word.
	*/
	getXPathElement(wordToken, anywhere) {
		if (wordToken.type === Token.EOF) throw new Error("Missing path element at end of path");
		const word = wordToken.text;
		if (word == null) throw new Error("Expected wordToken to have text content.");
		const ttype = this.parser.getTokenType(word);
		const ruleIndex = this.parser.getRuleIndex(word);
		switch (wordToken.type) {
			case XPathLexer.WILDCARD: return anywhere ? new XPathWildcardAnywhereElement() : new XPathWildcardElement();
			case XPathLexer.TOKEN_REF:
			case XPathLexer.STRING:
				if (ttype === Token.INVALID_TYPE) throw new Error(word + " at index " + wordToken.start + " isn't a valid token name");
				return anywhere ? new XPathTokenAnywhereElement(word, ttype) : new XPathTokenElement(word, ttype);
			default:
				if (ruleIndex === -1) throw new Error(word + " at index " + wordToken.start + " isn't a valid rule name");
				return anywhere ? new XPathRuleAnywhereElement(word, ruleIndex) : new XPathRuleElement(word, ruleIndex);
		}
	}
};
var Chunk = class {
	static {
		__name(this, "Chunk");
	}
};
var ParseTreeMatch = class {
	static {
		__name(this, "ParseTreeMatch");
	}
	/**
	* This is the backing field for {@link #getTree()}.
	*/
	tree;
	/**
	* This is the backing field for {@link #getPattern()}.
	*/
	pattern;
	/**
	* This is the backing field for {@link #getLabels()}.
	*/
	labels;
	/**
	* This is the backing field for {@link #getMismatchedNode()}.
	*/
	mismatchedNode;
	/**
	* Constructs a new instance of {@link ParseTreeMatch} from the specified
	* parse tree and pattern.
	*
	* @param tree The parse tree to match against the pattern.
	* @param pattern The parse tree pattern.
	* @param labels A mapping from label names to collections of
	* {@link ParseTree} objects located by the tree pattern matching process.
	* @param mismatchedNode The first node which failed to match the tree
	* pattern during the matching process.
	*/
	constructor(tree, pattern, labels, mismatchedNode) {
		this.tree = tree;
		this.pattern = pattern;
		this.labels = labels;
		this.mismatchedNode = mismatchedNode;
	}
	/**
	* Get the last node associated with a specific `label`.
	*
	* For example, for pattern `<id:ID>`, `get("id")` returns the
	* node matched for that `ID`. If more than one node
	* matched the specified label, only the last is returned. If there is
	* no node associated with the label, this returns `null`.
	*
	* Pattern tags like `<ID>` and `<expr>` without labels are
	* considered to be labeled with `ID` and `expr`, respectively.
	*
	* @param label The label to check.
	*
	* @returns The last {@link ParseTree} to match a tag with the specified
	* label, or `null` if no parse tree matched a tag with the label.
	*/
	get(label) {
		const parseTrees = this.labels.get(label);
		if (!parseTrees || parseTrees.length === 0) return null;
		return parseTrees[parseTrees.length - 1];
	}
	/**
	* Return all nodes matching a rule or token tag with the specified label.
	*
	* If the `label` is the name of a parser rule or token in the
	* grammar, the resulting list will contain both the parse trees matching
	* rule or tags explicitly labeled with the label and the complete set of
	* parse trees matching the labeled and unlabeled tags in the pattern for
	* the parser rule or token. For example, if `label` is `"foo"`,
	* the result will contain *all* of the following.
	*
	* - Parse tree nodes matching tags of the form `<foo:anyRuleName>` and
	* `<foo:AnyTokenName>`.
	* - Parse tree nodes matching tags of the form `<anyLabel:foo>`.
	* - Parse tree nodes matching tags of the form `<foo>`.
	*
	* @param label The label.
	*
	* @returns A collection of all {@link ParseTree} nodes matching tags with
	* the specified `label`. If no nodes matched the label, an empty list
	* is returned.
	*/
	getAll(label) {
		return this.labels.get(label) ?? [];
	}
	/**
	* Return a mapping from label -> [list of nodes].
	*
	* The map includes special entries corresponding to the names of rules and
	* tokens referenced in tags in the original pattern. For additional
	* information, see the description of {@link getAll(String)}.
	*
	* @returns A mapping from labels to parse tree nodes. If the parse tree
	* pattern did not contain any rule or token tags, this map will be empty.
	*/
	getLabels() {
		return this.labels;
	}
	/**
	* Get the node at which we first detected a mismatch.
	*
	* @returns the node at which we first detected a mismatch, or `null`
	* if the match was successful.
	*/
	getMismatchedNode() {
		return this.mismatchedNode;
	}
	/**
	* Gets a value indicating whether the match operation succeeded.
	*
	* @returns `true` if the match operation succeeded; otherwise, `false`.
	*/
	succeeded() {
		return !this.mismatchedNode;
	}
	/**
	* Get the tree pattern we are matching against.
	*
	* @returns The tree pattern we are matching against.
	*/
	getPattern() {
		return this.pattern;
	}
	/**
	* Get the parse tree we are trying to match to a pattern.
	*
	* @returns The {@link ParseTree} we are trying to match to a pattern.
	*/
	getTree() {
		return this.tree;
	}
	toString() {
		return `Match ${this.succeeded() ? "succeeded" : "failed"}; found ${this.getLabels().size} labels`;
	}
};
var ParseTreePattern = class {
	static {
		__name(this, "ParseTreePattern");
	}
	/**
	* This is the backing field for {@link #getPatternRuleIndex()}.
	*/
	patternRuleIndex;
	/**
	* This is the backing field for {@link #getPattern()}.
	*/
	pattern;
	/**
	* This is the backing field for {@link #getPatternTree()}.
	*/
	patternTree;
	/**
	* This is the backing field for {@link #getMatcher()}.
	*/
	matcher;
	/**
	* Construct a new instance of the {@link ParseTreePattern} class.
	*
	* @param matcher The {@link ParseTreePatternMatcher} which created this
	* tree pattern.
	* @param pattern The tree pattern in concrete syntax form.
	* @param patternRuleIndex The parser rule which serves as the root of the
	* tree pattern.
	* @param patternTree The tree pattern in {@link ParseTree} form.
	*/
	constructor(matcher, pattern, patternRuleIndex, patternTree) {
		this.matcher = matcher;
		this.patternRuleIndex = patternRuleIndex;
		this.pattern = pattern;
		this.patternTree = patternTree;
	}
	/**
	* Match a specific parse tree against this tree pattern.
	*
	* @param tree The parse tree to match against this tree pattern.
	* @returns A {@link ParseTreeMatch} object describing the result of the
	* match operation. The {@link ParseTreeMatch#succeeded()} method can be
	* used to determine whether or not the match was successful.
	*/
	match(tree) {
		return this.matcher.match(tree, this);
	}
	/**
	* Determine whether or not a parse tree matches this tree pattern.
	*
	* @param tree The parse tree to match against this tree pattern.
	* @returns `true` if `tree` is a match for the current tree
	* pattern; otherwise, `false`.
	*/
	matches(tree) {
		return this.matcher.match(tree, this).succeeded();
	}
	/**
	* Find all nodes using XPath and then try to match those subtrees against
	* this tree pattern.
	*
	* @param tree The {@link ParseTree} to match against this pattern.
	* @param xpath An expression matching the nodes
	*
	* @returns A collection of {@link ParseTreeMatch} objects describing the
	* successful matches. Unsuccessful matches are omitted from the result,
	* regardless of the reason for the failure.
	*/
	findAll(tree, xpath) {
		const subtrees = XPath.findAll(tree, xpath, this.matcher.getParser());
		const matches = new Array();
		for (const t of subtrees) {
			const match = this.match(t);
			if (match.succeeded()) matches.push(match);
		}
		return matches;
	}
	/**
	* Get the {@link ParseTreePatternMatcher} which created this tree pattern.
	*
	* @returns The {@link ParseTreePatternMatcher} which created this tree
	* pattern.
	*/
	getMatcher() {
		return this.matcher;
	}
	/**
	* Get the tree pattern in concrete syntax form.
	*
	* @returns The tree pattern in concrete syntax form.
	*/
	getPattern() {
		return this.pattern;
	}
	/**
	* Get the parser rule which serves as the outermost rule for the tree
	* pattern.
	*
	* @returns The parser rule which serves as the outermost rule for the tree
	* pattern.
	*/
	getPatternRuleIndex() {
		return this.patternRuleIndex;
	}
	/**
	* Get the tree pattern as a {@link ParseTree}. The rule and token tags from
	* the pattern are present in the parse tree as terminal nodes with a symbol
	* of type {@link RuleTagToken} or {@link TokenTagToken}.
	*
	* @returns The tree pattern as a {@link ParseTree}.
	*/
	getPatternTree() {
		return this.patternTree;
	}
};
var InputMismatchException = class extends RecognitionException {
	static {
		__name(this, "InputMismatchException");
	}
	constructor(recognizer) {
		super({
			message: "",
			recognizer,
			input: recognizer.inputStream,
			ctx: recognizer.context
		});
		this.offendingToken = recognizer.getCurrentToken();
	}
};
var FailedPredicateException = class extends RecognitionException {
	static {
		__name(this, "FailedPredicateException");
	}
	ruleIndex = 0;
	predicateIndex = 0;
	predicate;
	constructor(recognizer, predicate, message = null) {
		super({
			message: formatMessage(predicate ?? "no predicate", message ?? null),
			recognizer,
			input: recognizer.inputStream,
			ctx: recognizer.context
		});
		const trans = recognizer.atn.states[recognizer.state].transitions[0];
		if (trans instanceof PredicateTransition) {
			this.ruleIndex = trans.ruleIndex;
			this.predicateIndex = trans.predIndex;
		} else {
			this.ruleIndex = 0;
			this.predicateIndex = 0;
		}
		this.predicate = predicate;
		this.offendingToken = recognizer.getCurrentToken();
	}
};
var formatMessage = /* @__PURE__ */ __name((predicate, message) => {
	if (message !== null) return message;
	return "failed predicate: {" + predicate + "}?";
}, "formatMessage");
var DefaultErrorStrategy = class {
	static {
		__name(this, "DefaultErrorStrategy");
	}
	/**
	* Indicates whether the error strategy is currently "recovering from an
	* error". This is used to suppress reporting multiple error messages while
	* attempting to recover from a detected syntax error.
	*
	* @see #inErrorRecoveryMode
	*/
	errorRecoveryMode = false;
	/**
	* The index into the input stream where the last error occurred.
	* 	This is used to prevent infinite loops where an error is found
	*  but no token is consumed during recovery...another error is found,
	*  ad nauseam.  This is a failsafe mechanism to guarantee that at least
	*  one token/tree node is consumed for two errors.
	*/
	lastErrorIndex = -1;
	lastErrorStates = new IntervalSet();
	/**
	* This field is used to propagate information about the lookahead following
	* the previous match. Since prediction prefers completing the current rule
	* to error recovery efforts, error reporting may occur later than the
	* original point where it was discoverable. The original context is used to
	* compute the true expected sets as though the reporting occurred as early
	* as possible.
	*/
	nextTokensContext = null;
	nextTokenState = 0;
	/**
	* The default implementation simply calls {@link endErrorCondition} to
	* ensure that the handler is not in error recovery mode.
	*/
	reset(recognizer) {
		this.endErrorCondition(recognizer);
	}
	/**
	* This method is called to enter error recovery mode when a recognition
	* exception is reported.
	*
	* @param _recognizer the parser instance
	*/
	beginErrorCondition(_recognizer) {
		this.errorRecoveryMode = true;
	}
	inErrorRecoveryMode(_recognizer) {
		return this.errorRecoveryMode;
	}
	/**
	* This method is called to leave error recovery mode after recovering from
	* a recognition exception.
	*/
	endErrorCondition(_recognizer) {
		this.errorRecoveryMode = false;
		this.lastErrorStates = new IntervalSet();
		this.lastErrorIndex = -1;
	}
	/**
	* The default implementation simply calls {@link endErrorCondition}.
	*/
	reportMatch(recognizer) {
		this.endErrorCondition(recognizer);
	}
	/**
	* The default implementation returns immediately if the handler is already
	* in error recovery mode. Otherwise, it calls {@link beginErrorCondition}
	* and dispatches the reporting task based on the runtime type of `e`
	* according to the following table.
	*
	* - {@link NoViableAltException}: Dispatches the call to {@link reportNoViableAlternative}
	* - {@link InputMismatchException}: Dispatches the call to {@link reportInputMismatch}
	* - {@link FailedPredicateException}: Dispatches the call to {@link reportFailedPredicate}
	* - All other types: calls {@link Parser.notifyErrorListeners} to report the exception
	*/
	reportError(recognizer, e) {
		if (this.inErrorRecoveryMode(recognizer)) return;
		this.beginErrorCondition(recognizer);
		if (e instanceof NoViableAltException) this.reportNoViableAlternative(recognizer, e);
		else if (e instanceof InputMismatchException) this.reportInputMismatch(recognizer, e);
		else if (e instanceof FailedPredicateException) this.reportFailedPredicate(recognizer, e);
		else recognizer.notifyErrorListeners(e.message, e.offendingToken, e);
	}
	/**
	* The default implementation resynchronizes the parser by consuming tokens
	* until we find one in the resynchronization set--loosely the set of tokens
	* that can follow the current rule.
	*
	*/
	recover(recognizer, _e) {
		if (this.lastErrorIndex === recognizer.inputStream?.index && this.lastErrorStates.contains(recognizer.state)) recognizer.consume();
		this.lastErrorIndex = recognizer.inputStream?.index ?? 0;
		this.lastErrorStates.addOne(recognizer.state);
		const followSet = this.getErrorRecoverySet(recognizer);
		this.consumeUntil(recognizer, followSet);
	}
	/**
	* The default implementation of {@link ANTLRErrorStrategy.sync} makes sure
	* that the current lookahead symbol is consistent with what were expecting
	* at this point in the ATN. You can call this anytime but ANTLR only
	* generates code to check before subrules/loops and each iteration.
	*
	* Implements Jim Idle's magic sync mechanism in closures and optional
	* subrules. E.g.,
	*
	* ```
	* a : sync ( stuff sync )* ;
	* sync : {consume to what can follow sync} ;
	* ```
	*
	* At the start of a sub rule upon error, {@link sync} performs single
	* token deletion, if possible. If it can't do that, it bails on the current
	* rule and uses the default error recovery, which consumes until the
	* resynchronization set of the current rule.
	*
	* If the sub rule is optional (`(...)?`, `(...)*`, or block
	* with an empty alternative), then the expected set includes what follows
	* the subrule.
	*
	* During loop iteration, it consumes until it sees a token that can start a
	* sub rule or what follows loop. Yes, that is pretty aggressive. We opt to
	* stay in the loop as long as possible.
	*
	* **ORIGINS**
	*
	* Previous versions of ANTLR did a poor job of their recovery within loops.
	* A single mismatch token or missing token would force the parser to bail
	* out of the entire rules surrounding the loop. So, for rule
	*
	* ```
	* classDef : 'class' ID '{' member* '}'
	* ```
	*
	* input with an extra token between members would force the parser to
	* consume until it found the next class definition rather than the next
	* member definition of the current class.
	*
	* This functionality cost a little bit of effort because the parser has to
	* compare token set at the start of the loop and at each iteration. If for
	* some reason speed is suffering for you, you can turn off this
	* functionality by simply overriding this method as a blank { }.
	*
	*/
	sync(recognizer) {
		if (this.inErrorRecoveryMode(recognizer)) return;
		const s = recognizer.atn.states[recognizer.state];
		const la = recognizer.tokenStream.LA(1);
		const nextTokens = recognizer.atn.nextTokens(s);
		if (nextTokens.contains(la)) {
			this.nextTokensContext = null;
			this.nextTokenState = ATNState.INVALID_STATE_NUMBER;
			return;
		}
		if (nextTokens.contains(Token.EPSILON)) {
			if (this.nextTokensContext === null) {
				this.nextTokensContext = recognizer.context;
				this.nextTokenState = recognizer.state;
			}
			return;
		}
		switch (s.constructor.stateType) {
			case ATNState.BLOCK_START:
			case ATNState.STAR_BLOCK_START:
			case ATNState.PLUS_BLOCK_START:
			case ATNState.STAR_LOOP_ENTRY:
				if (this.singleTokenDeletion(recognizer) !== null) return;
				throw new InputMismatchException(recognizer);
			case ATNState.PLUS_LOOP_BACK:
			case ATNState.STAR_LOOP_BACK: {
				this.reportUnwantedToken(recognizer);
				const expecting = new IntervalSet();
				expecting.addSet(recognizer.getExpectedTokens());
				const whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
				this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
				break;
			}
			default:
		}
	}
	/**
	* This is called by {@link reportError} when the exception is a
	* {@link NoViableAltException}.
	*
	* @see reportError
	*
	* @param recognizer the parser instance
	* @param e the recognition exception
	*/
	reportNoViableAlternative(recognizer, e) {
		if (e.message.length > 0) {
			recognizer.notifyErrorListeners(e.message, e.offendingToken, e);
			return;
		}
		const tokens = recognizer.tokenStream;
		let input;
		if (tokens !== null && e.startToken) if (e.startToken.type === Token.EOF) input = "<EOF>";
		else input = tokens.getTextFromRange(e.startToken, e.offendingToken);
		else input = "<unknown input>";
		const msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
		recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	}
	/**
	* This is called by {@link reportError} when the exception is an {@link InputMismatchException}.
	*
	* @see reportError
	*
	* @param recognizer the parser instance
	* @param e the recognition exception
	*/
	reportInputMismatch(recognizer, e) {
		if (e.message.length > 0) {
			recognizer.notifyErrorListeners(e.message, e.offendingToken, e);
			return;
		}
		const msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toStringWithVocabulary(recognizer.vocabulary);
		recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	}
	/**
	* This is called by {@link reportError} when the exception is a
	* {@link FailedPredicateException}.
	*
	* @see reportError
	*
	* @param recognizer the parser instance
	* @param e the recognition exception
	*/
	reportFailedPredicate(recognizer, e) {
		const msg = "rule " + recognizer.ruleNames[recognizer.context.ruleIndex] + " " + e.message;
		recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	}
	/**
	* This method is called to report a syntax error which requires the removal
	* of a token from the input stream. At the time this method is called, the
	* erroneous symbol is current `LT(1)` symbol and has not yet been
	* removed from the input stream. When this method returns,
	* `recognizer` is in error recovery mode.
	*
	* This method is called when {@link singleTokenDeletion} identifies
	* single-token deletion as a viable recovery strategy for a mismatched
	* input error.
	*
	* The default implementation simply returns if the handler is already in
	* error recovery mode. Otherwise, it calls {@link beginErrorCondition} to
	* enter error recovery mode, followed by calling
	* {@link Parser.notifyErrorListeners}.
	*
	* @param recognizer the parser instance
	*/
	reportUnwantedToken(recognizer) {
		if (this.inErrorRecoveryMode(recognizer)) return;
		this.beginErrorCondition(recognizer);
		const t = recognizer.getCurrentToken();
		const tokenName = this.getTokenErrorDisplay(t);
		const expecting = this.getExpectedTokens(recognizer);
		const msg = "extraneous input " + tokenName + " expecting " + expecting.toStringWithVocabulary(recognizer.vocabulary);
		recognizer.notifyErrorListeners(msg, t, null);
	}
	/**
	* This method is called to report a syntax error which requires the
	* insertion of a missing token into the input stream. At the time this
	* method is called, the missing token has not yet been inserted. When this
	* method returns, `recognizer` is in error recovery mode.
	*
	* This method is called when {@link singleTokenInsertion} identifies
	* single-token insertion as a viable recovery strategy for a mismatched
	* input error.
	*
	* The default implementation simply returns if the handler is already in
	* error recovery mode. Otherwise, it calls {@link beginErrorCondition} to
	* enter error recovery mode, followed by calling
	* {@link Parser.notifyErrorListeners}.
	*
	* @param recognizer the parser instance
	*/
	reportMissingToken(recognizer) {
		if (this.inErrorRecoveryMode(recognizer)) return;
		this.beginErrorCondition(recognizer);
		const t = recognizer.getCurrentToken();
		const msg = "missing " + this.getExpectedTokens(recognizer).toStringWithVocabulary(recognizer.vocabulary) + " at " + this.getTokenErrorDisplay(t);
		recognizer.notifyErrorListeners(msg, t, null);
	}
	/**
	* The default implementation attempts to recover from the mismatched input
	* by using single token insertion and deletion as described below. If the
	* recovery attempt fails, this method throws an
	* {@link InputMismatchException}.
	*
	* **EXTRA TOKEN** (single token deletion)
	*
	* `LA(1)` is not what we are looking for. If `LA(2)` has the
	* right token, however, then assume `LA(1)` is some extra spurious
	* token and delete it. Then consume and return the next token (which was
	* the `LA(2)` token) as the successful result of the match operation.
	*
	* This recovery strategy is implemented by {@link singleTokenDeletion}.
	*
	* **MISSING TOKEN** (single token insertion)
	*
	* If current token (at `LA(1)`) is consistent with what could come
	* after the expected `LA(1)` token, then assume the token is missing
	* and use the parser's {@link TokenFactory} to create it on the fly. The
	* "insertion" is performed by returning the created token as the successful
	* result of the match operation.
	*
	* This recovery strategy is implemented by {@link singleTokenInsertion}.
	*
	* **EXAMPLE**
	*
	* For example, Input `i=(3;` is clearly missing the `')'`. When
	* the parser returns from the nested call to `expr`, it will have
	* call chain:
	*
	* ```
	* stat -> expr -> atom
	* ```
	*
	* and it will be trying to match the `')'` at this point in the
	* derivation:
	*
	* ```
	* => ID '=' '(' INT ')' ('+' atom)* ';'
	* ^
	* ```
	*
	* The attempt to match `')'` will fail when it sees `';'` and
	* call {@link recoverInline}. To recover, it sees that `LA(1)==';'`
	* is in the set of tokens that can follow the `')'` token reference
	* in rule `atom`. It can assume that you forgot the `')'`.
	*/
	recoverInline(recognizer) {
		const matchedSymbol = this.singleTokenDeletion(recognizer);
		if (matchedSymbol) {
			recognizer.consume();
			return matchedSymbol;
		}
		if (this.singleTokenInsertion(recognizer)) return this.getMissingSymbol(recognizer);
		throw new InputMismatchException(recognizer);
	}
	/**
	* This method implements the single-token insertion inline error recovery
	* strategy. It is called by {@link recoverInline} if the single-token
	* deletion strategy fails to recover from the mismatched input. If this
	* method returns `true`, `recognizer` will be in error recovery
	* mode.
	*
	* This method determines whether or not single-token insertion is viable by
	* checking if the `LA(1)` input symbol could be successfully matched
	* if it were instead the `LA(2)` symbol. If this method returns
	* `true`, the caller is responsible for creating and inserting a
	* token with the correct type to produce this behavior.
	*
	* @param recognizer the parser instance
	* @returns `true` if single-token insertion is a viable recovery
	* strategy for the current mismatched input, otherwise `false`
	*/
	singleTokenInsertion(recognizer) {
		const currentSymbolType = recognizer.tokenStream?.LA(1) ?? -1;
		const atn = recognizer.atn;
		const next = atn.states[recognizer.state].transitions[0].target;
		if (atn.nextTokens(next, recognizer.context ?? void 0).contains(currentSymbolType)) {
			this.reportMissingToken(recognizer);
			return true;
		}
		return false;
	}
	/**
	* This method implements the single-token deletion inline error recovery
	* strategy. It is called by {@link recoverInline} to attempt to recover
	* from mismatched input. If this method returns null, the parser and error
	* handler state will not have changed. If this method returns non-null,
	* `recognizer` will *not* be in error recovery mode since the
	* returned token was a successful match.
	*
	* If the single-token deletion is successful, this method calls
	* {@link reportUnwantedToken} to report the error, followed by
	* {@link Parser.consume} to actually "delete" the extraneous token. Then,
	* before returning {@link reportMatch} is called to signal a successful
	* match.
	*
	* @param recognizer the parser instance
	* @returns the successfully matched {@link Token} instance if single-token
	* deletion successfully recovers from the mismatched input, otherwise
	* `null`
	*/
	singleTokenDeletion(recognizer) {
		const nextTokenType = recognizer.tokenStream?.LA(2) ?? -1;
		if (this.getExpectedTokens(recognizer).contains(nextTokenType)) {
			this.reportUnwantedToken(recognizer);
			recognizer.consume();
			const matchedSymbol = recognizer.getCurrentToken();
			this.reportMatch(recognizer);
			return matchedSymbol;
		}
		return null;
	}
	/**
	* Conjure up a missing token during error recovery.
	*
	* The recognizer attempts to recover from single missing
	* symbols. But, actions might refer to that missing symbol.
	* For example, x=ID {f($x);}. The action clearly assumes
	* that there has been an identifier matched previously and that
	* $x points at that token. If that token is missing, but
	* the next token in the stream is what we want we assume that
	* this token is missing and we keep going. Because we
	* have to return some token to replace the missing token,
	* we have to conjure one up. This method gives the user control
	* over the tokens returned for missing tokens. Mostly,
	* you will want to create something special for identifier
	* tokens. For literals such as '{' and ',', the default
	* action in the parser or tree parser works. It simply creates
	* a CommonToken of the appropriate type. The text will be the token.
	* If you change what tokens must be created by the lexer,
	* override this method to create the appropriate tokens.
	*/
	getMissingSymbol(recognizer) {
		const currentSymbol = recognizer.getCurrentToken();
		const expecting = this.getExpectedTokens(recognizer);
		let expectedTokenType = Token.INVALID_TYPE;
		if (expecting.length !== 0) expectedTokenType = expecting.minElement;
		let tokenText;
		if (expectedTokenType === Token.EOF) tokenText = "<missing EOF>";
		else tokenText = "<missing " + recognizer.vocabulary.getDisplayName(expectedTokenType) + ">";
		let current = currentSymbol;
		const lookBack = recognizer.tokenStream?.LT(-1);
		if (current.type === Token.EOF && lookBack !== null) current = lookBack;
		return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
	}
	getExpectedTokens(recognizer) {
		return recognizer.getExpectedTokens();
	}
	/**
	* How should a token be displayed in an error message? The default
	* is to display just the text, but during development you might
	* want to have a lot of information spit out. Override in that case
	* to use t.toString() (which, for CommonToken, dumps everything about
	* the token). This is better than forcing you to override a method in
	* your token objects because you don't have to go modify your lexer
	* so that it creates a new Java type.
	*/
	getTokenErrorDisplay(t) {
		if (t === null) return "<no token>";
		let s = t.text;
		if (!s) if (t.type === Token.EOF) s = "<EOF>";
		else s = "<" + t.type + ">";
		return this.escapeWSAndQuote(s);
	}
	escapeWSAndQuote(s) {
		s = s.replace(/\n/g, "\\n");
		s = s.replace(/\r/g, "\\r");
		s = s.replace(/\t/g, "\\t");
		return "'" + s + "'";
	}
	/**
	* Compute the error recovery set for the current rule. During
	* rule invocation, the parser pushes the set of tokens that can
	* follow that rule reference on the stack; this amounts to
	* computing FIRST of what follows the rule reference in the
	* enclosing rule. See LinearApproximator.FIRST().
	* This local follow set only includes tokens
	* from within the rule; i.e., the FIRST computation done by
	* ANTLR stops at the end of a rule.
	*
	* EXAMPLE
	*
	* When you find a "no viable alt exception", the input is not
	* consistent with any of the alternatives for rule r. The best
	* thing to do is to consume tokens until you see something that
	* can legally follow a call to r//or* any rule that called r.
	* You don't want the exact set of viable next tokens because the
	* input might just be missing a token--you might consume the
	* rest of the input looking for one of the missing tokens.
	*
	* Consider grammar:
	*
	* a : '[' b ']'
	* | '(' b ')'
	* ;
	* b : c '^' INT ;
	* c : ID
	* | INT
	* ;
	*
	* At each rule invocation, the set of tokens that could follow
	* that rule is pushed on a stack. Here are the various
	* context-sensitive follow sets:
	*
	* FOLLOW(b1_in_a) = FIRST(']') = ']'
	* FOLLOW(b2_in_a) = FIRST(')') = ')'
	* FOLLOW(c_in_b) = FIRST('^') = '^'
	*
	* Upon erroneous input "[]", the call chain is
	*
	* a -> b -> c
	*
	* and, hence, the follow context stack is:
	*
	* depth follow set start of rule execution
	* 0 <EOF> a (from main())
	* 1 ']' b
	* 2 '^' c
	*
	* Notice that ')' is not included, because b would have to have
	* been called from a different context in rule a for ')' to be
	* included.
	*
	* For error recovery, we cannot consider FOLLOW(c)
	* (context-sensitive or otherwise). We need the combined set of
	* all context-sensitive FOLLOW sets--the set of all tokens that
	* could follow any reference in the call chain. We need to
	* resync to one of those tokens. Note that FOLLOW(c)='^' and if
	* we resync'd to that token, we'd consume until EOF. We need to
	* sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
	* In this case, for input "[]", LA(1) is ']' and in the set, so we would
	* not consume anything. After printing an error, rule c would
	* return normally. Rule b would not find the required '^' though.
	* At this point, it gets a mismatched token error and throws an
	* exception (since LA(1) is not in the viable following token
	* set). The rule exception handler tries to recover, but finds
	* the same recovery set and doesn't consume anything. Rule b
	* exits normally returning to rule a. Now it finds the ']' (and
	* with the successful match exits errorRecovery mode).
	*
	* So, you can see that the parser walks up the call chain looking
	* for the token that was a member of the recovery set.
	*
	* Errors are not generated in errorRecovery mode.
	*
	* ANTLR's error recovery mechanism is based upon original ideas:
	*
	* "Algorithms + Data Structures = Programs" by Niklaus Wirth
	*
	* and
	*
	* "A note on error recovery in recursive descent parsers":
	* http://portal.acm.org/citation.cfm?id=947902.947905
	*
	* Later, Josef Grosch had some good ideas:
	*
	* "Efficient and Comfortable Error Recovery in Recursive Descent
	* Parsers":
	* ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
	*
	* Like Grosch I implement context-sensitive FOLLOW sets that are combined
	* at run-time upon error to avoid overhead during parsing.
	*/
	getErrorRecoverySet(recognizer) {
		const atn = recognizer.atn;
		let ctx = recognizer.context;
		const recoverSet = new IntervalSet();
		while (ctx !== null && ctx.invokingState >= 0) {
			const rt = atn.states[ctx.invokingState].transitions[0];
			const follow = atn.nextTokens(rt.followState);
			recoverSet.addSet(follow);
			ctx = ctx.parent;
		}
		recoverSet.removeOne(Token.EPSILON);
		return recoverSet;
	}
	/** Consume tokens until one matches the given token set. */
	consumeUntil(recognizer, set) {
		let ttype = recognizer.tokenStream?.LA(1) ?? -1;
		while (ttype !== Token.EOF && !set.contains(ttype)) {
			recognizer.consume();
			ttype = recognizer.tokenStream?.LA(1) ?? -1;
		}
	}
};
var BailErrorStrategy = class extends DefaultErrorStrategy {
	static {
		__name(this, "BailErrorStrategy");
	}
	/**
	* Instead of recovering from exception `e`, re-throw it wrapped
	* in a {@link ParseCancellationException} so it is not caught by the
	* rule function catches. Use {@link Exception//getCause()} to get the
	* original {@link RecognitionException}.
	*/
	recover(recognizer, e) {
		throw new ParseCancellationException(e);
	}
	/**
	* Make sure we don't attempt to recover inline; if the parser
	* successfully recovers, it won't throw an exception.
	*/
	recoverInline(recognizer) {
		throw new ParseCancellationException(new InputMismatchException(recognizer));
	}
	sync(_recognizer) {}
};
var ListTokenSource = class {
	static {
		__name(this, "ListTokenSource");
	}
	/**
	* The name of the input source. If this value is `null`, a call to
	* {@link #getSourceName} should return the source name used to create the
	* the next token in {@link #tokens} (or the previous token if the end of
	* the input has been reached).
	*/
	sourceName;
	tokenFactory = CommonTokenFactory.DEFAULT;
	/**
	* The wrapped collection of {@link Token} objects to return.
	*/
	tokens = [];
	/**
	* The index into {@link tokens} of token to return by the next call to
	* {@link #nextToken}. The end of the input is indicated by this value
	* being greater than or equal to the number of items in {@link #tokens}.
	*/
	i = 0;
	/**
	* This field caches the EOF token for the token source.
	*/
	eofToken = null;
	constructor(tokens, sourceName) {
		this.tokens = tokens;
		this.sourceName = sourceName ?? "";
	}
	get column() {
		if (this.i < this.tokens.length) return this.tokens[this.i].column;
		if (this.eofToken !== null) return this.eofToken.column;
		if (this.tokens.length > 0) {
			const lastToken = this.tokens[this.tokens.length - 1];
			const tokenText = lastToken.text;
			if (tokenText) {
				const lastNewLine = tokenText.lastIndexOf("\n");
				if (lastNewLine >= 0) return tokenText.length - lastNewLine - 1;
			}
			return lastToken.column + lastToken.stop - lastToken.start + 1;
		}
		return 0;
	}
	nextToken() {
		if (this.i >= this.tokens.length) {
			if (this.eofToken === null) {
				let start = -1;
				if (this.tokens.length > 0) {
					const previousStop = this.tokens[this.tokens.length - 1].stop;
					if (previousStop !== -1) start = previousStop + 1;
				}
				const stop = Math.max(-1, start - 1);
				this.eofToken = this.tokenFactory.create([this, this.inputStream], Token.EOF, "EOF", Token.DEFAULT_CHANNEL, start, stop, this.line, this.column);
			}
			return this.eofToken;
		}
		const t = this.tokens[this.i];
		if (this.i === this.tokens.length - 1 && t.type === Token.EOF) this.eofToken = t;
		this.i++;
		return t;
	}
	get line() {
		if (this.i < this.tokens.length) return this.tokens[this.i].line;
		if (this.eofToken !== null) return this.eofToken.line;
		if (this.tokens.length > 0) {
			const lastToken = this.tokens[this.tokens.length - 1];
			let line = lastToken.line;
			const tokenText = lastToken.text;
			if (tokenText) {
				for (const char of tokenText) if (char === "\n") line++;
			}
			return line;
		}
		return 1;
	}
	get inputStream() {
		if (this.i < this.tokens.length) return this.tokens[this.i].inputStream;
		if (this.eofToken !== null) return this.eofToken.inputStream;
		if (this.tokens.length > 0) return this.tokens[this.tokens.length - 1].inputStream;
		return null;
	}
	getSourceName() {
		if (this.sourceName !== null) return this.sourceName;
		const inputStream = this.inputStream;
		if (inputStream !== null) return inputStream.getSourceName();
		return "List";
	}
};
var InterpreterRuleContext = class extends ParserRuleContext {
	static {
		__name(this, "InterpreterRuleContext");
	}
	/** This is the backing field for {@link #getRuleIndex}. */
	#ruleIndex;
	constructor(ruleIndex, parent, invokingStateNumber) {
		super(parent, invokingStateNumber);
		this.#ruleIndex = ruleIndex;
	}
	get ruleIndex() {
		return this.#ruleIndex;
	}
};
var TraceListener = class {
	static {
		__name(this, "TraceListener");
	}
	parser;
	constructor(parser) {
		this.parser = parser;
	}
	enterEveryRule(ctx) {
		console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser.inputStream?.LT(1)?.text);
	}
	visitTerminal(node) {
		console.log("consume " + node.getSymbol() + " rule " + this.parser.ruleNames[this.parser.context.ruleIndex]);
	}
	exitEveryRule(ctx) {
		console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser.inputStream?.LT(1)?.text);
	}
	visitErrorNode(_node) {}
};
var Parser = class extends Recognizer {
	static {
		__name(this, "Parser");
	}
	/** For testing only. */
	printer = null;
	/**
	* Specifies whether or not the parser should construct a parse tree during
	* the parsing process. The default value is `true`.
	*
	* @see #getBuildParseTree
	* @see #setBuildParseTree
	*/
	buildParseTrees = true;
	/**
	* The error handling strategy for the parser. The default value is a new
	* instance of {@link DefaultErrorStrategy}.
	*
	* @see #getErrorHandler
	* @see #setErrorHandler
	*/
	errorHandler = new DefaultErrorStrategy();
	/**
	* The {@link ParserRuleContext} object for the currently executing rule.
	* This is always non-null during the parsing process.
	*/
	context = null;
	precedenceStack = [];
	/**
	* The list of {@link ParseTreeListener} listeners registered to receive
	* events during the parse.
	*
	* @see #addParseListener
	*/
	parseListeners = null;
	/**
	* The number of syntax errors reported during parsing. This value is
	* incremented each time {@link #notifyErrorListeners} is called.
	*/
	syntaxErrors = 0;
	/** Indicates parser has matched EOF token. See {@link #exitRule()}. */
	matchedEOF = false;
	/**
	* When {@link #setTrace}`(true)` is called, a reference to the
	* {@link TraceListener} is stored here so it can be easily removed in a
	* later call to {@link #setTrace}`(false)`. The listener itself is
	* implemented as a parser listener so this field is not directly used by
	* other parser methods.
	*/
	tracer = null;
	/**
	* This field holds the deserialized {@link ATN} with bypass alternatives, created
	* lazily upon first demand. In 4.10 I changed from map<serializedATNString, ATN>
	* since we only need one per parser object and also it complicates other targets
	* that don't use ATN strings.
	*
	* @see ATNDeserializationOptions#isGenerateRuleBypassTransitions()
	*/
	bypassAltsAtnCache = null;
	#inputStream;
	/**
	* This is all the parsing support code essentially. Most of it is error recovery stuff.
	*/
	constructor(input) {
		super();
		this.precedenceStack.push(0);
		this.syntaxErrors = 0;
		this.#inputStream = input;
	}
	/** reset the parser's state */
	reset(rewindInputStream = true) {
		if (rewindInputStream) this.inputStream.seek(0);
		this.errorHandler.reset(this);
		this.context = null;
		this.syntaxErrors = 0;
		this.matchedEOF = false;
		this.setTrace(false);
		this.precedenceStack = [];
		this.precedenceStack.push(0);
		if (this.interpreter) this.interpreter.reset();
	}
	/**
	* Match current input symbol against `ttype`. If the symbol type
	* matches, {@link ANTLRErrorStrategy//reportMatch} and {@link consume} are
	* called to complete the match process.
	*
	* If the symbol type does not match,
	* {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	* strategy to attempt recovery. If {@link buildParseTree} is
	* `true` and the token index of the symbol returned by
	* {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	* the parse tree by calling {@link ParserRuleContext//addErrorNode}.
	*
	* @param ttype the token type to match
	* @returns the matched symbol
	* @throws RecognitionException if the current input symbol did not match
	* `ttype` and the error strategy could not recover from the
	* mismatched symbol
	*/
	match(ttype) {
		let t = this.getCurrentToken();
		if (t.type === ttype) {
			if (ttype === Token.EOF) this.matchedEOF = true;
			this.errorHandler.reportMatch(this);
			this.consume();
		} else {
			t = this.errorHandler.recoverInline(this);
			if (this.buildParseTrees && t.tokenIndex === -1) this.context.addErrorNode(this.createErrorNode(this.context, t));
		}
		return t;
	}
	/**
	* Match current input symbol as a wildcard. If the symbol type matches
	* (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
	* and {@link consume} are called to complete the match process.
	*
	* If the symbol type does not match,
	* {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	* strategy to attempt recovery. If {@link buildParseTree} is
	* `true` and the token index of the symbol returned by
	* {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	* the parse tree by calling {@link ParserRuleContext//addErrorNode}.
	*
	* @returns the matched symbol
	* @throws RecognitionException if the current input symbol did not match
	* a wildcard and the error strategy could not recover from the mismatched
	* symbol
	*/
	matchWildcard() {
		let t = this.getCurrentToken();
		if (t.type > 0) {
			this.errorHandler.reportMatch(this);
			this.consume();
		} else {
			t = this.errorHandler.recoverInline(this);
			if (this.buildParseTrees && t.tokenIndex === -1) this.context.addErrorNode(this.createErrorNode(this.context, t));
		}
		return t;
	}
	getParseListeners() {
		return this.parseListeners ?? [];
	}
	/**
	* Registers `listener` to receive events during the parsing process.
	*
	* To support output-preserving grammar transformations (including but not
	* limited to left-recursion removal, automated left-factoring, and
	* optimized code generation), calls to listener methods during the parse
	* may differ substantially from calls made by
	* {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
	* particular, rule entry and exit events may occur in a different order
	* during the parse than after the parser. In addition, calls to certain
	* rule entry methods may be omitted.
	*
	* With the following specific exceptions, calls to listener events are
	* deterministic*, i.e. for identical input the calls to listener
	* methods will be the same.
	*
	* - Alterations to the grammar used to generate code may change the
	* behavior of the listener calls.
	* - Alterations to the command line options passed to ANTLR 4 when
	* generating the parser may change the behavior of the listener calls.
	* - Changing the version of the ANTLR Tool used to generate the parser
	* may change the behavior of the listener calls.
	*
	* @param listener the listener to add
	*
	* @throws NullPointerException if {@code} listener is `null`
	*/
	addParseListener(listener) {
		if (listener === null) throw new Error("listener");
		if (this.parseListeners === null) this.parseListeners = [];
		this.parseListeners.push(listener);
	}
	/**
	* Remove `listener` from the list of parse listeners.
	*
	* If `listener` is `null` or has not been added as a parse
	* listener, this method does nothing.
	*
	* @param listener the listener to remove
	*/
	removeParseListener(listener) {
		if (this.parseListeners !== null && listener !== null) {
			const idx = this.parseListeners.indexOf(listener);
			if (idx >= 0) this.parseListeners.splice(idx, 1);
			if (this.parseListeners.length === 0) this.parseListeners = null;
		}
	}
	removeParseListeners() {
		this.parseListeners = null;
	}
	triggerEnterRuleEvent() {
		if (this.parseListeners !== null) {
			const ctx = this.context;
			this.parseListeners.forEach((listener) => {
				listener.enterEveryRule(ctx);
				ctx.enterRule(listener);
			});
		}
	}
	/**
	* Notify any parse listeners of an exit rule event.
	*
	* @see //addParseListener
	*/
	triggerExitRuleEvent() {
		if (this.parseListeners !== null) {
			const ctx = this.context;
			this.parseListeners.slice(0).reverse().forEach((listener) => {
				ctx.exitRule(listener);
				listener.exitEveryRule(ctx);
			});
		}
	}
	getTokenFactory() {
		return this.inputStream.tokenSource.tokenFactory;
	}
	setTokenFactory(factory) {
		this.inputStream.tokenSource.tokenFactory = factory;
	}
	/**
	* The preferred method of getting a tree pattern. For example, here's a
	* sample use:
	*
	* ```
	* const t = parser.expr();
	* const p = parser.compileParseTreePattern("<ID>+0", MyParser.RULE_expr);
	* const m = p.match(t);
	* const id = m.get("ID");
	* ```
	*/
	compileParseTreePattern(pattern, patternRuleIndex, lexer) {
		if (!lexer) {
			if (this.tokenStream !== null) {
				const tokenSource = this.tokenStream.tokenSource;
				if (tokenSource instanceof Lexer) lexer = tokenSource;
			}
		}
		if (!lexer) throw new Error("Parser can't discover a lexer to use");
		return new ParseTreePatternMatcher(lexer, this).compile(pattern, patternRuleIndex);
	}
	/**
	* The ATN with bypass alternatives is expensive to create so we create it
	* lazily.
	*
	* @throws UnsupportedOperationException if the current parser does not
	* implement the {@link getSerializedATN()} method.
	*/
	getATNWithBypassAlts() {
		const serializedAtn = this.serializedATN;
		if (serializedAtn === null) throw new Error("The current parser does not support an ATN with bypass alternatives.");
		if (this.bypassAltsAtnCache !== null) return this.bypassAltsAtnCache;
		this.bypassAltsAtnCache = new ATNDeserializer({
			readOnly: false,
			verifyATN: true,
			generateRuleBypassTransitions: true
		}).deserialize(serializedAtn);
		return this.bypassAltsAtnCache;
	}
	/**
	* Gets the number of syntax errors reported during parsing. This value is
	* incremented each time {@link notifyErrorListeners} is called.
	*/
	get numberOfSyntaxErrors() {
		return this.syntaxErrors;
	}
	get inputStream() {
		return this.#inputStream;
	}
	set inputStream(input) {
		this.tokenStream = input;
	}
	get tokenStream() {
		return this.#inputStream;
	}
	/** Set the token stream and reset the parser. */
	set tokenStream(input) {
		this.reset(false);
		this.#inputStream = input;
	}
	/**
	* Match needs to return the current input symbol, which gets put
	* into the label for the associated token ref; e.g., x=ID.
	*/
	getCurrentToken() {
		return this.inputStream.LT(1);
	}
	notifyErrorListeners(msg, offendingToken, err) {
		offendingToken = offendingToken ?? null;
		err = err ?? null;
		if (offendingToken === null) offendingToken = this.getCurrentToken();
		this.syntaxErrors += 1;
		const line = offendingToken.line;
		const column = offendingToken.column;
		this.errorListenerDispatch.syntaxError(this, offendingToken, line, column, msg, err);
	}
	/**
	* Consume and return the {@link getCurrentToken current symbol}.
	*
	* E.g., given the following input with `A` being the current
	* lookahead symbol, this function moves the cursor to `B` and returns
	* `A`.
	*
	* ```
	* A B
	* ^
	* ```
	*
	* If the parser is not in error recovery mode, the consumed symbol is added
	* to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
	* {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
	* If the parser *is* in error recovery mode, the consumed symbol is
	* added to the parse tree using
	* {@link ParserRuleContext//addErrorNode(Token)}, and
	* {@link ParseTreeListener//visitErrorNode} is called on any parse
	* listeners.
	*/
	consume() {
		const o = this.getCurrentToken();
		if (o.type !== Token.EOF) this.tokenStream.consume();
		const hasListener = this.parseListeners !== null && this.parseListeners.length > 0;
		if (this.buildParseTrees || hasListener) {
			let node;
			if (this.errorHandler.inErrorRecoveryMode(this)) node = this.context.addErrorNode(this.createErrorNode(this.context, o));
			else node = this.context.addTokenNode(o);
			if (hasListener) this.parseListeners.forEach((listener) => {
				if (node instanceof ErrorNode) listener.visitErrorNode(node);
				else listener.visitTerminal(node);
			});
		}
		return o;
	}
	addContextToParseTree() {
		if (this.context?.parent) this.context.parent.addChild(this.context);
	}
	/**
	* Always called by generated parsers upon entry to a rule. Access field
	* {@link context} get the current context.
	*/
	enterRule(localctx, state, _ruleIndex) {
		this.state = state;
		this.context = localctx;
		this.context.start = this.inputStream.LT(1);
		if (this.buildParseTrees) this.addContextToParseTree();
		this.triggerEnterRuleEvent();
	}
	exitRule() {
		if (this.matchedEOF) this.context.stop = this.inputStream.LT(1);
		else this.context.stop = this.inputStream.LT(-1);
		this.triggerExitRuleEvent();
		this.state = this.context.invokingState;
		this.context = this.context.parent;
	}
	enterOuterAlt(localctx, altNum) {
		localctx.setAltNumber(altNum);
		if (this.buildParseTrees && this.context !== localctx) {
			if (this.context?.parent) {
				this.context.parent.removeLastChild();
				this.context.parent.addChild(localctx);
			}
		}
		this.context = localctx;
	}
	/**
	* Get the precedence level for the top-most precedence rule.
	*
	* @returns The precedence level for the top-most precedence rule, or -1 if
	* the parser context is not nested within a precedence rule.
	*/
	getPrecedence() {
		if (this.precedenceStack.length === 0) return -1;
		return this.precedenceStack[this.precedenceStack.length - 1];
	}
	enterRecursionRule(localctx, state, ruleIndex, precedence) {
		this.state = state;
		this.precedenceStack.push(precedence);
		this.context = localctx;
		this.context.start = this.inputStream.LT(1);
		this.triggerEnterRuleEvent();
	}
	/** Like {@link enterRule} but for recursive rules. */
	pushNewRecursionContext(localctx, state, _ruleIndex) {
		const previous = this.context;
		previous.parent = localctx;
		previous.invokingState = state;
		previous.stop = this.inputStream.LT(-1);
		this.context = localctx;
		this.context.start = previous.start;
		if (this.buildParseTrees) this.context.addChild(previous);
		this.triggerEnterRuleEvent();
	}
	unrollRecursionContexts(parent) {
		this.precedenceStack.pop();
		this.context.stop = this.inputStream.LT(-1);
		const retCtx = this.context;
		const parseListeners = this.getParseListeners();
		if (parseListeners !== null && parseListeners.length > 0) while (this.context !== parent) {
			this.triggerExitRuleEvent();
			this.context = this.context.parent;
		}
		else this.context = parent;
		retCtx.parent = parent;
		if (this.buildParseTrees && parent !== null) parent.addChild(retCtx);
	}
	getInvokingContext(ruleIndex) {
		let ctx = this.context;
		while (ctx !== null) {
			if (ctx.ruleIndex === ruleIndex) return ctx;
			ctx = ctx.parent;
		}
		return null;
	}
	precpred(_localctx, precedence) {
		return precedence >= this.precedenceStack[this.precedenceStack.length - 1];
	}
	/**
	* Checks whether or not `symbol` can follow the current state in the
	* ATN. The behavior of this method is equivalent to the following, but is
	* implemented such that the complete context-sensitive follow set does not
	* need to be explicitly constructed.
	*
	* ```
	* return getExpectedTokens().contains(symbol);
	* ```
	*
	* @param symbol the symbol type to check
	* @returns `true` if `symbol` can follow the current state in
	* the ATN, otherwise `false`.
	*/
	isExpectedToken(symbol) {
		const atn = this.interpreter.atn;
		let ctx = this.context;
		const s = atn.states[this.state];
		let following = atn.nextTokens(s);
		if (following.contains(symbol)) return true;
		if (!following.contains(Token.EPSILON)) return false;
		while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
			const rt = atn.states[ctx.invokingState].transitions[0];
			following = atn.nextTokens(rt.followState);
			if (following.contains(symbol)) return true;
			ctx = ctx.parent;
		}
		if (following.contains(Token.EPSILON) && symbol === Token.EOF) return true;
		else return false;
	}
	/**
	* Computes the set of input symbols which could follow the current parser
	* state and context, as given by {@link getState} and {@link getContext},
	* respectively.
	*
	* {@link ATN.getExpectedTokens ATN.getExpectedTokens(int, RuleContext)}
	*/
	getExpectedTokens() {
		return this.interpreter.atn.getExpectedTokens(this.state, this.context);
	}
	getExpectedTokensWithinCurrentRule() {
		const atn = this.interpreter.atn;
		const s = atn.states[this.state];
		return atn.nextTokens(s);
	}
	/** Get a rule's index (i.e., `RULE_ruleName` field) or -1 if not found. */
	getRuleIndex(ruleName) {
		return this.getRuleIndexMap().get(ruleName) ?? -1;
	}
	/**
	* @returns an array of string of the rule names in your parser instance
	* leading up to a call to the current rule. You could override if
	* you want more details such as the file/line info of where
	* in the ATN a rule is invoked.
	*
	* this is very useful for error messages.
	*/
	getRuleInvocationStack(p) {
		p = p ?? null;
		if (p === null) p = this.context;
		const stack = [];
		while (p !== null) {
			const ruleIndex = p.ruleIndex;
			if (ruleIndex < 0) stack.push("n/a");
			else stack.push(this.ruleNames[ruleIndex]);
			p = p.parent;
		}
		return stack;
	}
	/**
	* For debugging and other purposes.
	*
	* TODO: this differs from the Java version. Change it.
	*/
	getDFAStrings() {
		return this.interpreter.decisionToDFA.toString();
	}
	/** For debugging and other purposes. */
	dumpDFA() {
		let seenOne = false;
		for (const dfa of this.interpreter.decisionToDFA) if (dfa.length > 0) {
			if (seenOne) console.log();
			if (this.printer) {
				this.printer.println("Decision " + dfa.decision + ":");
				this.printer.print(dfa.toString(this.vocabulary));
			}
			seenOne = true;
		}
	}
	getSourceName() {
		return this.inputStream.getSourceName();
	}
	getParseInfo() {
		const interp = this.interpreter;
		if (interp instanceof ProfilingATNSimulator) return new ParseInfo(interp);
	}
	setProfile(profile) {
		const interp = this.interpreter;
		const saveMode = interp.predictionMode;
		if (profile) {
			if (!(interp instanceof ProfilingATNSimulator)) this.interpreter = new ProfilingATNSimulator(this);
		} else if (interp instanceof ProfilingATNSimulator) {
			const sharedContextCache = interp.sharedContextCache;
			if (sharedContextCache) this.interpreter = new ParserATNSimulator(this, this.atn, interp.decisionToDFA, sharedContextCache);
		}
		this.interpreter.predictionMode = saveMode;
	}
	/**
	* During a parse is sometimes useful to listen in on the rule entry and exit
	* events as well as token matches. this is for quick and dirty debugging.
	*/
	setTrace(trace) {
		if (!trace) {
			this.removeParseListener(this.tracer);
			this.tracer = null;
		} else {
			if (this.tracer !== null) this.removeParseListener(this.tracer);
			this.tracer = new TraceListener(this);
			this.addParseListener(this.tracer);
		}
	}
	createTerminalNode(parent, t) {
		return new TerminalNode(t);
	}
	createErrorNode(parent, t) {
		return new ErrorNode(t);
	}
};
var ParserInterpreter = class extends Parser {
	static {
		__name(this, "ParserInterpreter");
	}
	rootContext;
	overrideDecisionRoot = null;
	parentContextStack = [];
	overrideDecisionAlt = -1;
	overrideDecisionReached = false;
	decisionToDFA;
	sharedContextCache = new PredictionContextCache();
	pushRecursionContextStates;
	#overrideDecision = -1;
	#overrideDecisionInputIndex = -1;
	#grammarFileName;
	#atn;
	#ruleNames;
	#vocabulary;
	constructor(grammarFileName, vocabulary, ruleNames, atn, input) {
		super(input);
		this.#grammarFileName = grammarFileName;
		this.#atn = atn;
		this.#ruleNames = ruleNames.slice(0);
		this.#vocabulary = vocabulary;
		this.pushRecursionContextStates = new BitSet();
		for (const state of atn.states) if (state instanceof StarLoopEntryState && state.precedenceRuleDecision) this.pushRecursionContextStates.set(state.stateNumber);
		this.decisionToDFA = atn.decisionToState.map((ds, i) => {
			return new DFA(ds, i);
		});
		this.interpreter = new ParserATNSimulator(this, atn, this.decisionToDFA, this.sharedContextCache);
	}
	reset() {
		super.reset();
		this.overrideDecisionReached = false;
		this.overrideDecisionRoot = null;
	}
	get atn() {
		return this.#atn;
	}
	get vocabulary() {
		return this.#vocabulary;
	}
	get ruleNames() {
		return this.#ruleNames;
	}
	get grammarFileName() {
		return this.#grammarFileName;
	}
	get atnState() {
		return this.#atn.states[this.state];
	}
	parse(startRuleIndex) {
		const startRuleStartState = this.#atn.ruleToStartState[startRuleIndex];
		this.rootContext = this.createInterpreterRuleContext(null, ATNState.INVALID_STATE_NUMBER, startRuleIndex);
		if (startRuleStartState.isLeftRecursiveRule) this.enterRecursionRule(this.rootContext, startRuleStartState.stateNumber, startRuleIndex, 0);
		else this.enterRule(this.rootContext, startRuleStartState.stateNumber, startRuleIndex);
		while (true) {
			const p = this.atnState;
			switch (p.constructor.stateType) {
				case ATNState.RULE_STOP:
					if (this.context?.isEmpty()) if (startRuleStartState.isLeftRecursiveRule) {
						const result = this.context;
						const parentContext = this.parentContextStack.pop();
						this.unrollRecursionContexts(parentContext[0]);
						return result;
					} else {
						this.exitRule();
						return this.rootContext;
					}
					this.visitRuleStopState(p);
					break;
				default:
					try {
						this.visitState(p);
					} catch (e) {
						if (e instanceof RecognitionException) {
							this.state = this.#atn.ruleToStopState[p.ruleIndex].stateNumber;
							this.errorHandler.reportError(this, e);
							this.recover(e);
						} else throw e;
					}
					break;
			}
		}
	}
	addDecisionOverride(decision, tokenIndex, forcedAlt) {
		this.#overrideDecision = decision;
		this.#overrideDecisionInputIndex = tokenIndex;
		this.overrideDecisionAlt = forcedAlt;
	}
	get overrideDecision() {
		return this.#overrideDecision;
	}
	get overrideDecisionInputIndex() {
		return this.#overrideDecisionInputIndex;
	}
	enterRecursionRule(localctx, state, ruleIndex, precedence) {
		this.parentContextStack.push([this.context, localctx.invokingState]);
		super.enterRecursionRule(localctx, state, ruleIndex, precedence);
	}
	get serializedATN() {
		throw new Error("The ParserInterpreter does not support the serializedATN property.");
	}
	visitState(p) {
		let predictedAlt = 1;
		if (p instanceof DecisionState) predictedAlt = this.visitDecisionState(p);
		const transition = p.transitions[predictedAlt - 1];
		switch (transition.transitionType) {
			case Transition.EPSILON:
				if (this.pushRecursionContextStates.get(p.stateNumber) && !(transition.target.constructor.stateType === ATNState.LOOP_END)) {
					const parentContext = this.parentContextStack[this.parentContextStack.length - 1];
					const localctx = this.createInterpreterRuleContext(parentContext[0], parentContext[1], this.context.ruleIndex);
					this.pushNewRecursionContext(localctx, this.#atn.ruleToStartState[p.ruleIndex].stateNumber, this.context.ruleIndex);
				}
				break;
			case Transition.ATOM:
				this.match(transition.label.minElement);
				break;
			case Transition.RANGE:
			case Transition.SET:
			case Transition.NOT_SET:
				if (!transition.matches(this.inputStream.LA(1), Token.MIN_USER_TOKEN_TYPE, 65535)) this.recoverInline();
				this.matchWildcard();
				break;
			case Transition.WILDCARD:
				this.matchWildcard();
				break;
			case Transition.RULE:
				const ruleStartState = transition.target;
				const ruleIndex = ruleStartState.ruleIndex;
				const newContext = this.createInterpreterRuleContext(this.context, p.stateNumber, ruleIndex);
				if (ruleStartState.isLeftRecursiveRule) this.enterRecursionRule(newContext, ruleStartState.stateNumber, ruleIndex, transition.precedence);
				else this.enterRule(newContext, transition.target.stateNumber, ruleIndex);
				break;
			case Transition.PREDICATE:
				const predicateTransition = transition;
				if (!this.sempred(this.context, predicateTransition.ruleIndex, predicateTransition.predIndex)) throw new FailedPredicateException(this);
				break;
			case Transition.ACTION:
				const actionTransition = transition;
				this.action(this.context, actionTransition.ruleIndex, actionTransition.actionIndex);
				break;
			case Transition.PRECEDENCE:
				if (!this.precpred(this.context, transition.precedence)) {
					const precedence = transition.precedence;
					throw new FailedPredicateException(this, `precpred(_ctx, ${precedence})`);
				}
				break;
			default: throw new Error("UnsupportedOperationException: Unrecognized ATN transition type.");
		}
		this.state = transition.target.stateNumber;
	}
	visitDecisionState(p) {
		let predictedAlt = 1;
		if (p.transitions.length > 1) {
			this.errorHandler.sync(this);
			const decision = p.decision;
			if (decision === this.#overrideDecision && this.inputStream.index === this.#overrideDecisionInputIndex && !this.overrideDecisionReached) {
				predictedAlt = this.overrideDecisionAlt;
				this.overrideDecisionReached = true;
			} else predictedAlt = this.interpreter.adaptivePredict(this.inputStream, decision, this.context);
		}
		return predictedAlt;
	}
	createInterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
		return new InterpreterRuleContext(ruleIndex, parent, invokingStateNumber);
	}
	visitRuleStopState(p) {
		if (this.#atn.ruleToStartState[p.ruleIndex].isLeftRecursiveRule) {
			const [parentContext, state] = this.parentContextStack.pop();
			this.unrollRecursionContexts(parentContext);
			this.state = state;
		} else this.exitRule();
		this.state = this.#atn.states[this.state].transitions[0].followState.stateNumber;
	}
	recover(e) {
		const i = this.inputStream.index;
		this.errorHandler.recover(this, e);
		if (this.inputStream.index === i) {
			const tok = e.offendingToken;
			if (!tok) throw new Error("Expected exception to have an offending token");
			const source = tok.tokenSource;
			const sourcePair = [source, source?.inputStream ?? null];
			if (e instanceof InputMismatchException) {
				const expectedTokens = e.getExpectedTokens();
				if (!expectedTokens) throw new Error("Expected the exception to provide expected tokens");
				let expectedTokenType = Token.INVALID_TYPE;
				if (expectedTokens.length !== 0) expectedTokenType = expectedTokens.minElement;
				const errToken = this.getTokenFactory().create(sourcePair, expectedTokenType, tok.text, Token.DEFAULT_CHANNEL, -1, -1, tok.line, tok.column);
				this.context.addErrorNode(this.createErrorNode(this.context, errToken));
			} else {
				const errToken = this.getTokenFactory().create(sourcePair, Token.INVALID_TYPE, tok.text, Token.DEFAULT_CHANNEL, -1, -1, tok.line, tok.column);
				this.context.addErrorNode(this.createErrorNode(this.context, errToken));
			}
		}
	}
	recoverInline() {
		return this.errorHandler.recoverInline(this);
	}
};
var MultiMap = class extends Map {
	static {
		__name(this, "MultiMap");
	}
	map(key, value) {
		let elementsForKey = this.get(key);
		if (!elementsForKey) {
			elementsForKey = new Array();
			this.set(key, elementsForKey);
		}
		elementsForKey.push(value);
	}
	getPairs() {
		const pairs = new Array();
		for (const key of this.keys()) {
			const keys = this.get(key) ?? [];
			for (const value of keys) pairs.push([key, value]);
		}
		return pairs;
	}
	toString() {
		const entries = [];
		this.forEach((value, key) => {
			entries.push(`${key}=[${value.join(", ")}]`);
		});
		return `{${entries.join(", ")}}`;
	}
};
var CannotInvokeStartRuleError = class extends Error {
	static {
		__name(this, "CannotInvokeStartRuleError");
	}
	constructor(e) {
		super();
		this.cause = e;
	}
};
var RuleTagToken = class {
	static {
		__name(this, "RuleTagToken");
	}
	/** The name of the label associated with the rule tag. */
	label;
	/** The name of the parser rule associated with this rule tag. */
	ruleName;
	/**
	* The token type for the current token. This is the token type assigned to
	* the bypass alternative for the rule during ATN deserialization.
	*/
	bypassTokenType;
	constructor(ruleName, bypassTokenType, label) {
		this.ruleName = ruleName;
		this.bypassTokenType = bypassTokenType;
		this.label = label;
	}
	/**
	* Rule tag tokens are always placed on the {@link #DEFAULT_CHANNEL}.
	*/
	get channel() {
		return Token.DEFAULT_CHANNEL;
	}
	/**
	* This method returns the rule tag formatted with `<` and `>`
	* delimiters.
	*/
	get text() {
		if (this.label !== void 0) return "<" + this.label + ":" + this.ruleName + ">";
		return "<" + this.ruleName + ">";
	}
	/**
	* Rule tag tokens have types assigned according to the rule bypass
	* transitions created during ATN deserialization.
	*/
	get type() {
		return this.bypassTokenType;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns 0.
	*/
	get line() {
		return 0;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns -1.
	*/
	get column() {
		return -1;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns -1.
	*/
	get tokenIndex() {
		return -1;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns -1.
	*/
	get start() {
		return -1;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns -1.
	*/
	get stop() {
		return -1;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns `null`.
	*/
	get tokenSource() {
		return null;
	}
	/**
	* The implementation for {@link RuleTagToken} always returns `null`.
	*/
	get inputStream() {
		return null;
	}
	/**
	* The implementation for {@link RuleTagToken} returns a string of the form
	* `ruleName:bypassTokenType`.
	*/
	toString() {
		return this.ruleName + ":" + this.bypassTokenType;
	}
};
var StartRuleDoesNotConsumeFullPatternError = class extends Error {
	static {
		__name(this, "StartRuleDoesNotConsumeFullPatternError");
	}
};
var TagChunk = class extends Chunk {
	static {
		__name(this, "TagChunk");
	}
	tag;
	label;
	constructor(...args) {
		let label;
		let tag;
		if (args.length === 1) tag = args[0];
		else {
			label = args[0];
			tag = args[1];
		}
		super();
		if (!tag) throw new Error("tag cannot be null or empty");
		this.label = label;
		this.tag = tag;
	}
	/**
	* @returns a text representation of the tag chunk. Labeled tags
	* are returned in the form `label:tag`, and unlabeled tags are
	* returned as just the tag name.
	*/
	toString() {
		if (this.label !== void 0) return this.label + ":" + this.tag;
		return this.tag;
	}
};
var TextChunk = class extends Chunk {
	static {
		__name(this, "TextChunk");
	}
	text;
	/**
	* Constructs a new instance of {@link TextChunk} with the specified text.
	*
	* @param text The text of this chunk.
	*/
	constructor(text) {
		super();
		this.text = text;
	}
	/**
	* @returns the result of {@link #getText()} in single quotes.
	*/
	toString() {
		return "'" + this.text + "'";
	}
};
var TokenTagToken = class extends CommonToken {
	static {
		__name(this, "TokenTagToken");
	}
	tokenName;
	/**
	* The name of the label associated with the rule tag, or undefined if this is an unlabeled rule tag.
	*/
	label;
	constructor(tokenName, type, label) {
		super({
			type,
			source: CommonToken.EMPTY_SOURCE
		});
		this.tokenName = tokenName;
		this.label = label;
	}
	/**
	*
	* @returns the token tag formatted with `<` and `>` delimiters.
	*/
	get text() {
		if (this.label !== void 0) return "<" + this.label + ":" + this.tokenName + ">";
		return "<" + this.tokenName + ">";
	}
	/**
	* @returns a string of the form `tokenName:type`.
	*/
	toString() {
		return this.tokenName + ":" + this.type;
	}
};
var ParseTreePatternMatcher = class {
	static {
		__name(this, "ParseTreePatternMatcher");
	}
	start = "<";
	stop = ">";
	escape = "\\";
	/**
	* This is the backing field for {@link #getLexer()}.
	*/
	lexer;
	/**
	* This is the backing field for {@link #getParser()}.
	*/
	parser;
	/**
	* Constructs a {@link ParseTreePatternMatcher} or from a {@link Lexer} and
	* {@link Parser} object. The lexer input stream is altered for tokenizing
	* the tree patterns. The parser is used as a convenient mechanism to get
	* the grammar name, plus token, rule names.
	*/
	constructor(lexer, parser) {
		this.lexer = lexer;
		this.parser = parser;
	}
	/**
	* Set the delimiters used for marking rule and token tags within concrete
	* syntax used by the tree pattern parser.
	*
	* @param start The start delimiter.
	* @param stop The stop delimiter.
	* @param escapeLeft The escape sequence to use for escaping a start or stop delimiter.
	*
	* @throws Error if `start` is `null` or empty.
	* @throws Error if `stop` is `null` or empty.
	*/
	setDelimiters(start, stop, escapeLeft) {
		if (start === null || start.length === 0) throw new Error("start cannot be null or empty");
		if (stop === null || stop.length === 0) throw new Error("stop cannot be null or empty");
		this.start = start;
		this.stop = stop;
		this.escape = escapeLeft;
	}
	matches(...args) {
		switch (args.length) {
			case 2: {
				const [tree, pattern] = args;
				const labels = new MultiMap();
				return this.matchImpl(tree, pattern.getPatternTree(), labels) === null;
			}
			case 3: {
				const [tree, pattern, patternRuleIndex] = args;
				const p = this.compile(pattern, patternRuleIndex);
				return this.matches(tree, p);
			}
			default: throw new Error("Invalid number of arguments");
		}
	}
	match(...args) {
		switch (args.length) {
			case 2: {
				const [tree, pattern] = args;
				const labels = new MultiMap();
				return new ParseTreeMatch(tree, pattern, labels, this.matchImpl(tree, pattern.getPatternTree(), labels));
			}
			case 3: {
				const [tree, pattern, patternRuleIndex] = args;
				const p = this.compile(pattern, patternRuleIndex);
				return this.match(tree, p);
			}
			default: throw new Error("Invalid number of arguments");
		}
	}
	/**
	* For repeated use of a tree pattern, compile it to a
	* {@link ParseTreePattern} using this method.
	*/
	compile(pattern, patternRuleIndex) {
		const tokens = new CommonTokenStream(new ListTokenSource(this.tokenize(pattern)));
		const parserInterp = new ParserInterpreter(this.parser.grammarFileName, this.parser.vocabulary, this.parser.ruleNames, this.parser.getATNWithBypassAlts(), tokens);
		parserInterp.removeErrorListeners();
		let tree = null;
		try {
			parserInterp.errorHandler = new BailErrorStrategy();
			tree = parserInterp.parse(patternRuleIndex);
		} catch (error) {
			if (error instanceof ParseCancellationException) throw error.cause;
			else if (error instanceof RecognitionException) throw error;
			else if (error instanceof Error) throw new CannotInvokeStartRuleError(error);
			else throw error;
		}
		if (tokens.LA(1) !== Token.EOF) throw new StartRuleDoesNotConsumeFullPatternError();
		return new ParseTreePattern(this, pattern, patternRuleIndex, tree);
	}
	/**
	* Used to convert the tree pattern string into a series of tokens. The
	* input stream is reset.
	*/
	getLexer() {
		return this.lexer;
	}
	/**
	* Used to collect to the grammar file name, token names, rule names for
	* used to parse the pattern into a parse tree.
	*/
	getParser() {
		return this.parser;
	}
	tokenize(pattern) {
		const chunks = this.split(pattern);
		const tokens = new Array();
		for (const chunk of chunks) if (chunk instanceof TagChunk) {
			const tagChunk = chunk;
			const char = tagChunk.tag[0];
			if (char === char.toUpperCase()) {
				const ttype = this.parser.getTokenType(tagChunk.tag);
				if (ttype === Token.INVALID_TYPE) throw new Error("Unknown token " + tagChunk.tag + " in pattern: " + pattern);
				const t = new TokenTagToken(tagChunk.tag, ttype, tagChunk.label);
				tokens.push(t);
			} else if (char === char.toLowerCase()) {
				const ruleIndex = this.parser.getRuleIndex(tagChunk.tag);
				if (ruleIndex === -1) throw new Error("Unknown rule " + tagChunk.tag + " in pattern: " + pattern);
				const ruleImaginaryTokenType = this.parser.getATNWithBypassAlts().ruleToTokenType[ruleIndex];
				tokens.push(new RuleTagToken(tagChunk.tag, ruleImaginaryTokenType, tagChunk.label));
			} else throw new Error("invalid tag: " + tagChunk.tag + " in pattern: " + pattern);
		} else {
			const textChunk = chunk;
			const input = CharStream.fromString(textChunk.text);
			this.lexer.inputStream = input;
			let t = this.lexer.nextToken();
			while (t.type !== Token.EOF) {
				tokens.push(t);
				t = this.lexer.nextToken();
			}
		}
		return tokens;
	}
	/**
	* Split `<ID> = <e:expr> ;` into 4 chunks for tokenizing by {@link #tokenize}.
	*/
	split(pattern) {
		let p = 0;
		const n2 = pattern.length;
		const chunks = new Array();
		const starts = new Array();
		const stops = new Array();
		while (p < n2) if (p === pattern.indexOf(this.escape + this.start, p)) p += this.escape.length + this.start.length;
		else if (p === pattern.indexOf(this.escape + this.stop, p)) p += this.escape.length + this.stop.length;
		else if (p === pattern.indexOf(this.start, p)) {
			starts.push(p);
			p += this.start.length;
		} else if (p === pattern.indexOf(this.stop, p)) {
			stops.push(p);
			p += this.stop.length;
		} else p++;
		if (starts.length > stops.length) throw new Error("unterminated tag in pattern: " + pattern);
		if (starts.length < stops.length) throw new Error("missing start tag in pattern: " + pattern);
		const tagCount = starts.length;
		for (let i = 0; i < tagCount; i++) if (starts[i] >= stops[i]) throw new Error("tag delimiters out of order in pattern: " + pattern);
		if (tagCount === 0) {
			const text = pattern.substring(0, n2);
			chunks.push(new TextChunk(text));
		}
		if (tagCount > 0 && starts[0] > 0) {
			const text = pattern.substring(0, starts[0]);
			chunks.push(new TextChunk(text));
		}
		for (let i = 0; i < tagCount; i++) {
			const tag = pattern.substring(starts[i] + this.start.length, stops[i]);
			let ruleOrToken = tag;
			let label;
			const colon = tag.indexOf(":");
			if (colon >= 0) {
				label = tag.substring(0, colon);
				ruleOrToken = tag.substring(colon + 1, tag.length);
			}
			chunks.push(new TagChunk(label, ruleOrToken));
			if (i + 1 < tagCount) {
				const text = pattern.substring(stops[i] + this.stop.length, starts[i + 1]);
				chunks.push(new TextChunk(text));
			}
		}
		if (tagCount > 0) {
			const afterLastTag = stops[tagCount - 1] + this.stop.length;
			if (afterLastTag < n2) {
				const text = pattern.substring(afterLastTag, n2);
				chunks.push(new TextChunk(text));
			}
		}
		for (let i = 0; i < chunks.length; i++) {
			const c = chunks[i];
			if (c instanceof TextChunk) {
				const tc = c;
				const unescaped = tc.text.replaceAll(this.escape, "");
				if (unescaped.length < tc.text.length) chunks[i] = new TextChunk(unescaped);
			}
		}
		return chunks;
	}
	/**
	* Recursively walk `tree` against `patternTree`, filling
	* `match.`{@link ParseTreeMatch#labels labels}.
	*
	* @returns the first node encountered in `tree` which does not match
	* a corresponding node in `patternTree`, or `null` if the match
	* was successful. The specific node returned depends on the matching
	* algorithm used by the implementation, and may be overridden.
	*/
	matchImpl(tree, patternTree, labels) {
		if (tree instanceof TerminalNode && patternTree instanceof TerminalNode) {
			const t1 = tree;
			const t2 = patternTree;
			let mismatchedNode;
			if (t1.getSymbol().type === t2.getSymbol().type) {
				if (t2.getSymbol() instanceof TokenTagToken) {
					const tokenTagToken = t2.getSymbol();
					labels.map(tokenTagToken.tokenName, tree);
					if (tokenTagToken.label !== void 0) labels.map(tokenTagToken.label, tree);
				} else if (t1.getText() === t2.getText()) {} else if (!mismatchedNode) mismatchedNode = t1;
			} else if (!mismatchedNode) mismatchedNode = t1;
			return mismatchedNode;
		}
		if (tree instanceof ParserRuleContext && patternTree instanceof ParserRuleContext) {
			let mismatchedNode;
			const ruleTagToken = this.getRuleTagToken(patternTree);
			if (ruleTagToken) {
				if (tree.ruleIndex === patternTree.ruleIndex) {
					labels.map(ruleTagToken.ruleName, tree);
					if (ruleTagToken.label) labels.map(ruleTagToken.label, tree);
				} else if (!mismatchedNode) mismatchedNode = tree;
				return mismatchedNode;
			}
			if (tree.getChildCount() !== patternTree.getChildCount()) {
				if (!mismatchedNode) mismatchedNode = tree;
				return mismatchedNode;
			}
			const n2 = tree.getChildCount();
			for (let i = 0; i < n2; i++) {
				const childMatch = this.matchImpl(tree.getChild(i), patternTree.getChild(i), labels);
				if (childMatch) return childMatch;
			}
			return mismatchedNode;
		}
		return tree;
	}
	/**
	* Is `t` `(expr <expr>)` subtree?
	*/
	getRuleTagToken(t) {
		if (t instanceof ParserRuleContext) {
			if (t.getChildCount() === 1 && t.getChild(0) instanceof TerminalNode) {
				const c = t.getChild(0);
				if (c.getSymbol() instanceof RuleTagToken) return c.getSymbol();
			}
		}
	}
};
var DiagnosticErrorListener = class extends BaseErrorListener {
	static {
		__name(this, "DiagnosticErrorListener");
	}
	/**
	* When `true`, only exactly known ambiguities are reported.
	*/
	exactOnly;
	constructor(exactOnly) {
		super();
		this.exactOnly = exactOnly ?? true;
	}
	reportAmbiguity = /* @__PURE__ */ __name((recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) => {
		if (this.exactOnly && !exact) return;
		const message = `reportAmbiguity d=${this.getDecisionDescription(recognizer, dfa)}: ambigAlts=${this.getConflictingAlts(ambigAlts, configs)}, input='${recognizer.tokenStream?.getTextFromInterval(Interval.of(startIndex, stopIndex))}'`;
		recognizer.notifyErrorListeners(message, null, null);
	}, "reportAmbiguity");
	reportAttemptingFullContext = /* @__PURE__ */ __name((recognizer, dfa, startIndex, stopIndex, _conflictingAlts, _configs) => {
		const message = `reportAttemptingFullContext d=${this.getDecisionDescription(recognizer, dfa)}, input='${recognizer.tokenStream?.getTextFromInterval(Interval.of(startIndex, stopIndex))}'`;
		recognizer.notifyErrorListeners(message, null, null);
	}, "reportAttemptingFullContext");
	reportContextSensitivity = /* @__PURE__ */ __name((recognizer, dfa, startIndex, stopIndex, _prediction, _configs) => {
		const message = `reportContextSensitivity d=${this.getDecisionDescription(recognizer, dfa)}, input='${recognizer.tokenStream?.getTextFromInterval(Interval.of(startIndex, stopIndex))}'`;
		recognizer.notifyErrorListeners(message, null, null);
	}, "reportContextSensitivity");
	getDecisionDescription = /* @__PURE__ */ __name((recognizer, dfa) => {
		const decision = dfa.decision;
		const ruleIndex = dfa.atnStartState.ruleIndex;
		const ruleNames = recognizer.ruleNames;
		if (ruleIndex < 0 || ruleIndex >= ruleNames.length) return decision.toString();
		const ruleName = ruleNames[ruleIndex];
		if (ruleName.length === 0) return decision.toString();
		return `${decision} (${ruleName})`;
	}, "getDecisionDescription");
	/**
	* Computes the set of conflicting or ambiguous alternatives from a
	* configuration set, if that information was not already provided by the
	* parser.
	*
	* @param reportedAlts The set of conflicting or ambiguous alternatives, as
	* reported by the parser.
	* @param configs The conflicting or ambiguous configuration set.
	* @returns Returns `reportedAlts` if it is not `null`, otherwise
	* returns the set of alternatives represented in `configs`.
	*/
	getConflictingAlts = /* @__PURE__ */ __name((reportedAlts, configs) => {
		if (reportedAlts) return reportedAlts;
		const result = new BitSet();
		for (let i = 0; i < configs.configs.length; i++) result.set(configs.configs[i].alt);
		return result;
	}, "getConflictingAlts");
};
var LexerInterpreter = class extends Lexer {
	static {
		__name(this, "LexerInterpreter");
	}
	decisionToDFA;
	sharedContextCache = new PredictionContextCache();
	#grammarFileName;
	#atn;
	#ruleNames;
	#channelNames;
	#modeNames;
	#vocabulary;
	constructor(grammarFileName, vocabulary, ruleNames, channelNames, modeNames, atn, input) {
		super(input);
		if (atn.grammarType !== ATN.LEXER) throw new Error("IllegalArgumentException: The ATN must be a lexer ATN.");
		this.#grammarFileName = grammarFileName;
		this.#atn = atn;
		this.#ruleNames = ruleNames.slice(0);
		this.#channelNames = channelNames.slice(0);
		this.#modeNames = modeNames.slice(0);
		this.#vocabulary = vocabulary;
		this.decisionToDFA = atn.decisionToState.map((ds, i) => {
			return new DFA(ds, i);
		});
		this.interpreter = new LexerATNSimulator(this, atn, this.decisionToDFA, this.sharedContextCache);
	}
	get atn() {
		return this.#atn;
	}
	get grammarFileName() {
		return this.#grammarFileName;
	}
	get ruleNames() {
		return this.#ruleNames;
	}
	get channelNames() {
		return this.#channelNames;
	}
	get modeNames() {
		return this.#modeNames;
	}
	get vocabulary() {
		return this.#vocabulary;
	}
	get serializedATN() {
		throw new Error("The LexerInterpreter does not support the serializedATN property.");
	}
};
var RuntimeMetaData = class _RuntimeMetaData {
	static {
		__name(this, "RuntimeMetaData");
	}
	/**
	* A compile-time constant containing the current version of the ANTLR 4
	* runtime library.
	*
	* This compile-time constant value allows generated parsers and other
	* libraries to include a literal reference to the version of the ANTLR 4
	* runtime library the code was compiled against. At each release, we
	* change this value.
	*
	* Version numbers are assumed to have the form
	*
	* major.minor.patch.revision-suffix,
	*
	* with the individual components defined as follows.
	*
	* - major is a required non-negative integer, and is equal to `4` for ANTLR 4.
	* - minor is a required non-negative integer.
	* - patch is an optional non-negative integer. When patch is omitted, the `.` (dot) appearing before it is
	*   also omitted.
	* - revision is an optional non-negative integer, and may only be included when patch is also included.
	*   When revision is omitted, the `.` (dot) appearing before it is also omitted.
	* - suffix is an optional string. When suffix is omitted, the `-` (hyphen-minus) appearing before it is also
	*   omitted.
	*/
	static VERSION = "4.13.1";
	/**
	* Gets the currently executing version of the ANTLR 4 runtime library.
	*
	* This method provides runtime access to the {@link VERSION} field, as
	* opposed to directly referencing the field as a compile-time constant.
	*
	* @returns The currently executing version of the ANTLR 4 library
	*/
	static getRuntimeVersion() {
		return _RuntimeMetaData.VERSION;
	}
	/**
	* This method provides the ability to detect mismatches between the version
	* of ANTLR 4 used to generate a parser, the version of the ANTLR runtime a
	* parser was compiled against, and the version of the ANTLR runtime which
	* is currently executing.
	*
	* The version check is designed to detect the following two specific
	* scenarios.
	*
	* - The ANTLR Tool version used for code generation does not match the
	* currently executing runtime version.
	* - The ANTLR Runtime version referenced at the time a parser was
	* compiled does not match the currently executing runtime version.
	*
	*
	* Starting with ANTLR 4.3, the code generator emits a call to this method
	* using two constants in each generated lexer and parser: a hard-coded
	* constant indicating the version of the tool used to generate the parser
	* and a reference to the compile-time constant {@link VERSION}. At
	* runtime, this method is called during the initialization of the generated
	* parser to detect mismatched versions, and notify the registered listeners
	* prior to creating instances of the parser.
	*
	*
	* This method does not perform any detection or filtering of semantic
	* changes between tool and runtime versions. It simply checks for a
	* version match and emits an error to stderr if a difference
	* is detected.
	*
	*
	* Note that some breaking changes between releases could result in other
	* types of runtime exceptions, such as a {@link LinkageError}, prior to
	* calling this method. In these cases, the underlying version mismatch will
	* not be reported here. This method is primarily intended to
	* notify users of potential semantic changes between releases that do not
	* result in binary compatibility problems which would be detected by the
	* class loader. As with semantic changes, changes that break binary
	* compatibility between releases are mentioned in the release notes
	* accompanying the affected release.
	*
	*
	* **Additional note for target developers:** The version check
	* implemented by this class is designed to address specific compatibility
	* concerns that may arise during the execution of Java applications. Other
	* targets should consider the implementation of this method in the context
	* of that target's known execution environment, which may or may not
	* resemble the design provided for the Java target.
	*
	* @param generatingToolVersion The version of the tool used to generate a parser.
	* This value may be null when called from user code that was not generated
	* by, and does not reference, the ANTLR 4 Tool itself.
	* @param compileTimeVersion The version of the runtime the parser was
	* compiled against. This should always be passed using a direct reference
	* to {@link VERSION}.
	*/
	static checkVersion(generatingToolVersion, compileTimeVersion) {
		const runtimeVersion = _RuntimeMetaData.VERSION;
		let runtimeConflictsWithGeneratingTool = false;
		let runtimeConflictsWithCompileTimeTool = false;
		runtimeConflictsWithGeneratingTool = runtimeVersion !== generatingToolVersion && _RuntimeMetaData.getMajorMinorVersion(runtimeVersion) !== _RuntimeMetaData.getMajorMinorVersion(generatingToolVersion);
		runtimeConflictsWithCompileTimeTool = runtimeVersion !== compileTimeVersion && _RuntimeMetaData.getMajorMinorVersion(runtimeVersion) !== _RuntimeMetaData.getMajorMinorVersion(compileTimeVersion);
		if (runtimeConflictsWithGeneratingTool) console.error(`ANTLR Tool version ${generatingToolVersion} used for code generation does not match the current runtime version ${runtimeVersion}`);
		if (runtimeConflictsWithCompileTimeTool) console.error(`ANTLR Runtime version ${compileTimeVersion} used for parser compilation does not match the current runtime version ${runtimeVersion}`);
	}
	/**
	* Gets the major and minor version numbers from a version string. For
	* details about the syntax of the input `version`.
	* E.g., from x.y.z return x.y.
	*
	* @param version The complete version string.
	* @returns A string of the form *major*.*minor* containing
	* only the major and minor components of the version string.
	*/
	static getMajorMinorVersion(version) {
		const firstDot = version.indexOf(".");
		const secondDot = firstDot >= 0 ? version.indexOf(".", firstDot + 1) : -1;
		const firstDash = version.indexOf("-");
		let referenceLength = version.length;
		if (secondDot >= 0) referenceLength = Math.min(referenceLength, secondDot);
		if (firstDash >= 0) referenceLength = Math.min(referenceLength, firstDash);
		return version.substring(0, referenceLength);
	}
};
var TokenStreamRewriter = class _TokenStreamRewriter {
	static {
		__name(this, "TokenStreamRewriter");
	}
	static DEFAULT_PROGRAM_NAME = "default";
	static PROGRAM_INIT_SIZE = 100;
	static MIN_TOKEN_INDEX = 0;
	/** Our source stream */
	tokens;
	/**
	* You may have multiple, named streams of rewrite operations.
	*  I'm calling these things "programs."
	*  Maps String (name) -> rewrite (List)
	*/
	programs = /* @__PURE__ */ new Map();
	/** Map String (program name) -> Integer index */
	lastRewriteTokenIndexes;
	/**
	* @param tokens The token stream to modify
	*/
	constructor(tokens) {
		this.tokens = tokens;
	}
	getTokenStream() {
		return this.tokens;
	}
	/**
	* Insert the supplied text after the specified token (or token index)
	*/
	insertAfter(tokenOrIndex, text, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		let index;
		if (typeof tokenOrIndex === "number") index = tokenOrIndex;
		else index = tokenOrIndex.tokenIndex;
		const rewrites = this.getProgram(programName);
		const op = new InsertAfterOp(this.tokens, index, rewrites.length, text);
		rewrites.push(op);
	}
	/**
	* Insert the supplied text before the specified token (or token index)
	*/
	insertBefore(tokenOrIndex, text, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		let index;
		if (typeof tokenOrIndex === "number") index = tokenOrIndex;
		else index = tokenOrIndex.tokenIndex;
		const rewrites = this.getProgram(programName);
		const op = new InsertBeforeOp(this.tokens, index, rewrites.length, text);
		rewrites.push(op);
	}
	/**
	* Replace the specified token with the supplied text
	*/
	replaceSingle(tokenOrIndex, text, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		this.replace(tokenOrIndex, tokenOrIndex, text, programName);
	}
	/**
	* Replace the specified range of tokens with the supplied text.
	*/
	replace(from, to, text, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		if (typeof from !== "number") from = from.tokenIndex;
		if (typeof to !== "number") to = to.tokenIndex;
		if (from > to || from < 0 || to < 0 || to >= this.tokens.size) throw new RangeError(`replace: range invalid: ${from}..${to}(size=${this.tokens.size})`);
		const rewrites = this.getProgram(programName);
		const op = new ReplaceOp(this.tokens, from, to, rewrites.length, text);
		rewrites.push(op);
	}
	/**
	* Delete the specified range of tokens
	*/
	delete(from, to, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		if (to == null) to = from;
		this.replace(from, to, null, programName);
	}
	getProgram(name) {
		let is = this.programs.get(name);
		if (is == null) is = this.initializeProgram(name);
		return is;
	}
	initializeProgram(name) {
		const is = [];
		this.programs.set(name, is);
		return is;
	}
	/**
	* @returns the text from the original tokens altered per the instructions given to this rewriter
	*/
	getText(intervalOrProgram, programName = _TokenStreamRewriter.DEFAULT_PROGRAM_NAME) {
		let interval;
		if (intervalOrProgram instanceof Interval) interval = intervalOrProgram;
		else interval = new Interval(0, this.tokens.size - 1);
		if (typeof intervalOrProgram === "string") programName = intervalOrProgram;
		const rewrites = this.programs.get(programName);
		let start = interval.start;
		let stop = interval.stop;
		if (stop > this.tokens.size - 1) stop = this.tokens.size - 1;
		if (start < 0) start = 0;
		if (rewrites == null || rewrites.length === 0) return this.tokens.getTextFromInterval(new Interval(start, stop));
		const buf = [];
		const indexToOp = this.reduceToSingleOperationPerIndex(rewrites);
		let i = start;
		while (i <= stop && i < this.tokens.size) {
			const op = indexToOp.get(i);
			indexToOp.delete(i);
			const t = this.tokens.get(i);
			if (op == null) {
				if (t.type !== Token.EOF) buf.push(String(t.text));
				i++;
			} else i = op.execute(buf);
		}
		if (stop === this.tokens.size - 1) {
			for (const op of indexToOp.values()) if (op && op.index >= this.tokens.size - 1) buf.push(String(op.text));
		}
		return buf.join("");
	}
	/**
	* @returns a map from token index to operation
	*/
	reduceToSingleOperationPerIndex(rewrites) {
		for (let i = 0; i < rewrites.length; i++) {
			const op = rewrites[i];
			if (op == null) continue;
			if (!(op instanceof ReplaceOp)) continue;
			const rop = op;
			const inserts = this.getKindOfOps(rewrites, InsertBeforeOp, i);
			for (const iop of inserts) if (iop.index === rop.index) {
				rewrites[iop.instructionIndex] = null;
				rop.text = String(iop.text) + (rop.text != null ? rop.text.toString() : "");
			} else if (iop.index > rop.index && iop.index <= rop.lastIndex) rewrites[iop.instructionIndex] = null;
			const prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, i);
			for (const prevRop of prevReplaces) {
				if (prevRop.index >= rop.index && prevRop.lastIndex <= rop.lastIndex) {
					rewrites[prevRop.instructionIndex] = null;
					continue;
				}
				const disjoint = prevRop.lastIndex < rop.index || prevRop.index > rop.lastIndex;
				if (prevRop.text == null && rop.text == null && !disjoint) {
					rewrites[prevRop.instructionIndex] = null;
					rop.index = Math.min(prevRop.index, rop.index);
					rop.lastIndex = Math.max(prevRop.lastIndex, rop.lastIndex);
				} else if (!disjoint) throw new Error(`replace op boundaries of ${rop} overlap with previous ${prevRop}`);
			}
		}
		for (let i = 0; i < rewrites.length; i++) {
			const op = rewrites[i];
			if (op == null) continue;
			if (!(op instanceof InsertBeforeOp)) continue;
			const iop = op;
			const prevInserts = this.getKindOfOps(rewrites, InsertBeforeOp, i);
			for (const prevIop of prevInserts) if (prevIop.index === iop.index) {
				if (prevIop instanceof InsertAfterOp) {
					iop.text = this.catOpText(prevIop.text, iop.text);
					rewrites[prevIop.instructionIndex] = null;
				} else if (prevIop instanceof InsertBeforeOp) {
					iop.text = this.catOpText(iop.text, prevIop.text);
					rewrites[prevIop.instructionIndex] = null;
				}
			}
			const prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, i);
			for (const rop of prevReplaces) {
				if (iop.index === rop.index) {
					rop.text = this.catOpText(iop.text, rop.text);
					rewrites[i] = null;
					continue;
				}
				if (iop.index >= rop.index && iop.index <= rop.lastIndex) throw new Error(`insert op ${iop} within boundaries of previous ${rop}`);
			}
		}
		const m2 = /* @__PURE__ */ new Map();
		for (const op of rewrites) {
			if (op == null) continue;
			if (m2.get(op.index) != null) throw new Error("should only be one op per index");
			m2.set(op.index, op);
		}
		return m2;
	}
	catOpText(a, b) {
		let x = "";
		let y = "";
		if (a != null) x = a.toString();
		if (b != null) y = b.toString();
		return x + y;
	}
	/**
	* Get all operations before an index of a particular kind
	*/
	getKindOfOps(rewrites, kind, before) {
		return rewrites.slice(0, before).filter((op) => {
			return op && op instanceof kind;
		});
	}
};
var RewriteOperation = class {
	static {
		__name(this, "RewriteOperation");
	}
	/** What index into rewrites List are we? */
	instructionIndex;
	/** Token buffer index. */
	index;
	text;
	tokens;
	constructor(tokens, index, instructionIndex, text) {
		this.tokens = tokens;
		this.instructionIndex = instructionIndex;
		this.index = index;
		this.text = text === void 0 ? "" : text;
	}
	execute(_buf) {
		return this.index;
	}
	toString() {
		return "<RewriteOperation@" + this.tokens.get(this.index) + ":\"" + this.text + "\">";
	}
};
var InsertBeforeOp = class extends RewriteOperation {
	static {
		__name(this, "InsertBeforeOp");
	}
	constructor(tokens, index, instructionIndex, text) {
		super(tokens, index, instructionIndex, text);
	}
	/**
	* @returns the index of the next token to operate on
	*/
	execute(buf) {
		if (this.text) buf.push(this.text.toString());
		if (this.tokens.get(this.index).type !== Token.EOF) buf.push(String(this.tokens.get(this.index).text));
		return this.index + 1;
	}
	toString() {
		return "<InsertBeforeOp@" + this.tokens.get(this.index) + ":\"" + this.text + "\">";
	}
};
var InsertAfterOp = class extends InsertBeforeOp {
	static {
		__name(this, "InsertAfterOp");
	}
	constructor(tokens, index, instructionIndex, text) {
		super(tokens, index + 1, instructionIndex, text);
	}
	toString() {
		return "<InsertAfterOp@" + this.tokens.get(this.index) + ":\"" + this.text + "\">";
	}
};
var ReplaceOp = class extends RewriteOperation {
	static {
		__name(this, "ReplaceOp");
	}
	lastIndex;
	constructor(tokens, from, to, instructionIndex, text) {
		super(tokens, from, instructionIndex, text);
		this.lastIndex = to;
	}
	/**
	* @returns the index of the next token to operate on
	*/
	execute(buf) {
		if (this.text) buf.push(this.text.toString());
		return this.lastIndex + 1;
	}
	toString() {
		if (this.text == null) return "<DeleteOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ">";
		return "<ReplaceOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ":\"" + this.text + "\">";
	}
};
var UnbufferedTokenStream = class {
	static {
		__name(this, "UnbufferedTokenStream");
	}
	tokenSource;
	/**
	* A moving window buffer of the data being scanned. While there's a marker,
	* we keep adding to buffer. Otherwise, {@link #consume consume()} resets so
	* we start filling at index 0 again.
	*/
	tokens;
	/**
	* The number of tokens currently in {@link #tokens tokens}.
	*
	* This is not the buffer capacity, that's `tokens.length`.
	*/
	n;
	/**
	* 0..n-1 index into {@link #tokens tokens} of next token.
	*
	* The `LT(1)` token is `tokens[p]`. If `p == n`, we are
	* out of buffered tokens.
	*/
	p = 0;
	/**
	* Count up with {@link #mark mark()} and down with
	* {@link #release release()}. When we `release()` the last mark,
	* `numMarkers` reaches 0 and we reset the buffer. Copy
	* `tokens[p]..tokens[n-1]` to `tokens[0]..tokens[(n-1)-p]`.
	*/
	numMarkers = 0;
	/**
	* This is the `LT(-1)` token for the current position.
	*/
	lastToken;
	/**
	* When `numMarkers > 0`, this is the `LT(-1)` token for the
	* first token in {@link #tokens}. Otherwise, this is `null`.
	*/
	lastTokenBufferStart;
	/**
	* Absolute token index. It's the index of the token about to be read via
	* `LT(1)`. Goes from 0 to the number of tokens in the entire stream,
	* although the stream size is unknown before the end is reached.
	*
	* This value is used to set the token indexes if the stream provides tokens
	* that implement {@link WritableToken}.
	*/
	currentTokenIndex = 0;
	constructor(tokenSource, bufferSize) {
		this.tokenSource = tokenSource;
		bufferSize = bufferSize ?? 256;
		this.tokens = new Array(bufferSize);
		this.n = 0;
		this.fill(1);
	}
	get(i) {
		const bufferStartIndex = this.getBufferStartIndex();
		if (i < bufferStartIndex || i >= bufferStartIndex + this.n) throw new Error("get(" + i + ") outside buffer: " + bufferStartIndex + ".." + (bufferStartIndex + this.n));
		return this.tokens[i - bufferStartIndex];
	}
	LT(i) {
		if (i === -1) return this.lastToken;
		this.sync(i);
		const index = this.p + i - 1;
		if (index < 0) throw new Error("LT(" + i + ") gives negative index");
		if (index >= this.n) return this.tokens[this.n - 1];
		return this.tokens[index];
	}
	LA(i) {
		return this.LT(i).type;
	}
	getText() {
		return "";
	}
	getTextFromContext(ctx) {
		return this.getTextFromInterval(ctx.getSourceInterval());
	}
	getTextFromInterval(interval) {
		const bufferStartIndex = this.getBufferStartIndex();
		const bufferStopIndex = bufferStartIndex + this.tokens.length - 1;
		const start = interval.start;
		const stop = interval.stop;
		if (start < bufferStartIndex || stop > bufferStopIndex) throw new Error("interval " + interval + " not in token buffer window: " + bufferStartIndex + ".." + bufferStopIndex);
		const a = start - bufferStartIndex;
		const b = stop - bufferStartIndex;
		let result = "";
		for (let i = a; i <= b; i++) {
			const t = this.tokens[i];
			result += t.text;
		}
		return result;
	}
	getTextFromRange(start, stop) {
		return this.getTextFromInterval(Interval.of(start.tokenIndex, stop.tokenIndex));
	}
	consume() {
		if (this.LA(1) === Token.EOF) throw new Error("cannot consume EOF");
		this.lastToken = this.tokens[this.p];
		if (this.p === this.n - 1 && this.numMarkers === 0) {
			this.n = 0;
			this.p = -1;
			this.lastTokenBufferStart = this.lastToken;
		}
		this.p++;
		this.currentTokenIndex++;
		this.sync(1);
	}
	/**
	* Return a marker that we can release later.
	*
	* The specific marker value used for this class allows for some level of
	* protection against misuse where `seek()` is called on a mark or
	* `release()` is called in the wrong order.
	*/
	mark() {
		if (this.numMarkers === 0) this.lastTokenBufferStart = this.lastToken;
		const mark = -this.numMarkers - 1;
		this.numMarkers++;
		return mark;
	}
	release(marker) {
		if (marker !== -this.numMarkers) throw new Error("release() called with an invalid marker.");
		this.numMarkers--;
		if (this.numMarkers === 0) {
			if (this.p > 0) {
				this.tokens.copyWithin(0, this.p, this.n);
				this.n = this.n - this.p;
				this.p = 0;
			}
			this.lastTokenBufferStart = this.lastToken;
		}
	}
	get index() {
		return this.currentTokenIndex;
	}
	seek(index) {
		if (index === this.currentTokenIndex) return;
		if (index > this.currentTokenIndex) {
			this.sync(index - this.currentTokenIndex);
			index = Math.min(index, this.getBufferStartIndex() + this.n - 1);
		}
		const bufferStartIndex = this.getBufferStartIndex();
		const i = index - bufferStartIndex;
		if (i < 0) throw new Error("cannot seek to negative index " + index);
		else if (i >= this.n) throw new Error("seek to index outside buffer: " + index + " not in " + bufferStartIndex + ".." + (bufferStartIndex + this.n));
		this.p = i;
		this.currentTokenIndex = index;
		if (this.p === 0) this.lastToken = this.lastTokenBufferStart;
		else this.lastToken = this.tokens[this.p - 1];
	}
	get size() {
		throw new Error("Unbuffered stream cannot know its size");
	}
	getSourceName() {
		return this.tokenSource.sourceName;
	}
	setLine(line) {
		this.tokenSource.line = line;
	}
	setColumn(column) {
		this.tokenSource.column = column;
	}
	/**
	* Make sure we have 'need' elements from current position {@link #p p}. Last valid
	* `p` index is `tokens.length-1`.  `p+need-1` is the tokens index 'need' elements
	* ahead.  If we need 1 element, `(p+1-1)==p` must be less than `tokens.length`.
	*/
	sync(want) {
		const need = this.p + want - 1 - this.n + 1;
		if (need > 0) this.fill(need);
	}
	/**
	* Add `n` elements to the buffer. Returns the number of tokens
	* actually added to the buffer. If the return value is less than `n`,
	* then EOF was reached before `n` tokens could be added.
	*/
	fill(n2) {
		for (let i = 0; i < n2; i++) {
			if (this.n > 0 && this.tokens[this.n - 1].type === Token.EOF) return i;
			const t = this.tokenSource.nextToken();
			this.add(t);
		}
		return n2;
	}
	add(t) {
		if (this.n >= this.tokens.length) this.tokens.length = this.tokens.length * 2;
		if (isWritableToken(t)) t.setTokenIndex(this.getBufferStartIndex() + this.n);
		this.tokens[this.n++] = t;
	}
	getBufferStartIndex() {
		return this.currentTokenIndex - this.p;
	}
};

//#endregion
export { ATN, ATNConfig, ATNConfigSet, ATNDeserializer, ATNSerializer, ATNSimulator, ATNState, AbstractParseTreeVisitor, AbstractPredicateTransition, ActionTransition, ArrayPredictionContext, AtomTransition, BailErrorStrategy, BaseErrorListener, BasicBlockStartState, BasicState, BitSet, BlockEndState, BlockStartState, BufferedTokenStream, CannotInvokeStartRuleError, CharStream, CharStreamImpl, Chunk, CodePointTransitions, CommonToken, CommonTokenFactory, CommonTokenStream, ConsoleErrorListener, DFA, DFASerializer, DFAState, DecisionInfo, DecisionState, DefaultErrorStrategy, DiagnosticErrorListener, DoubleDict, EmptyPredictionContext, EpsilonTransition, ErrorNode, FailedPredicateException, HashMap, HashSet, InputMismatchException, IntStream, InterpreterDataReader, InterpreterRuleContext, Interval, IntervalSet, LL1Analyzer, Lexer, LexerATNConfig, LexerATNSimulator, LexerActionExecutor, LexerActionType, LexerChannelAction, LexerCustomAction, LexerDFASerializer, LexerIndexedCustomAction, LexerInterpreter, LexerModeAction, LexerMoreAction, LexerNoViableAltException, LexerPopModeAction, LexerPushModeAction, LexerSkipAction, LexerTypeAction, ListTokenSource, LoopEndState, MurmurHash, NoViableAltException, NotSetTransition, OrderedATNConfigSet, OrderedHashMap, OrderedHashSet, ParseCancellationException, ParseInfo, ParseTreeMatch, ParseTreePattern, ParseTreePatternMatcher, ParseTreeWalker, Parser, ParserATNSimulator, ParserInterpreter, ParserRuleContext, PlusBlockStartState, PlusLoopbackState, PrecedencePredicateTransition, PredPrediction, PredicateTransition, PredictionContext, PredictionContextCache, PredictionMode, ProfilingATNSimulator, ProxyErrorListener, RangeTransition, RecognitionException, Recognizer, RuleStartState, RuleStopState, RuleTagToken, RuleTransition, RuntimeMetaData, SemanticContext, SetTransition, SingletonPredictionContext, StarBlockStartState, StarLoopEntryState, StarLoopbackState, StartRuleDoesNotConsumeFullPatternError, TagChunk, TerminalNode, TextChunk, Token, TokenStreamRewriter, TokenTagToken, TokensStartState, TraceListener, Transition, Trees, UnbufferedTokenStream, Vocabulary, WildcardTransition, XPath, XPathElement, XPathLexer, XPathLexerErrorListener, XPathRuleAnywhereElement, XPathRuleElement, XPathTokenAnywhereElement, XPathTokenElement, XPathWildcardAnywhereElement, XPathWildcardElement, arrayToString, combineCommonParents, createSingletonPredictionContext, equalArrays, equalNumberArrays, escapeWhitespace, getCachedPredictionContext, isComparable, isToken, isWritableToken, merge, mergeRoot, mergeSingletons, predictionContextFromRuleContext };