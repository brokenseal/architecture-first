import test from 'ava';
import {getDb} from '../../../../src/data/persistency/db'


test('db should be able to save data in a persistent manner', (t)=>{
    const db = getDb();
    const dataTree = {a: 1, b: {c: 2, d: {e: 3}}};

    db.save(dataTree);
    t.deepEqual(db.retrieve(), dataTree);
});
