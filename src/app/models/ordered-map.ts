export class OrderedValue<T> {
    constructor(public value: T, public rank: number) {}
}

export class OrderedMap<K, V> extends Map<any, any> {

    private rank = 0;

    set(key: K, value: V): this {

        super.set(key, new OrderedValue<V>(value, this.rank));
        this.rank += 1;

        return this;
    }

    get(key: K): V | undefined {
        let item = super.get(key) as OrderedValue<V>;
        return item.value;
    }
}
