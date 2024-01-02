// db.js
import Dexie from 'dexie';
import { catAttributes, dbName } from "@/components/internalDB/model";

export const db = new Dexie(dbName); // Singleton
db.version(1).stores({
    cats: catAttributes
});