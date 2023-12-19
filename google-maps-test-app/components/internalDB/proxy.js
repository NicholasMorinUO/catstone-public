import { db } from "@/components/internalDB/db";
import {extract, transform, load} from '@/components/data-pipeline/proxy';
import isDexieDBOutdated from '@/components/internalDB/isDBOutdated';
import {queryEntireDexieTable} from '@/components/internalDB/queries';

// Throw param value related  errors in the concrete functions
// Throw return value related errors in the proxy function

function isDBOutdated(dbRef) {
    try {
        //TODO & concrete

        return true; // Placeholder value while implementation incomplete


    } catch (error) {
        console.error(error);
    }
}

// Updates or Adds values to the internal database
export async function update(dbRef) {
    //var username = prompt("What is your username?");
    //var password = prompt("What is your password? ");
    const url = `https://us04b.sheltermanager.com/service?method=json_report
                &username=REDACTED
                &password=REDACTED
                &account=oscatr
                &title=test6`
    try {
        //replace url with env variable
        load( transform( await extract(url) ), dbRef );

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function queryEntireTable() {
    try {
        let result;
        if ( isDBOutdated(db) ){
            await update(db);
            result = queryEntireDexieTable(db);
        }
        else {
            result = queryEntireDexieTable(db);
        }

        // result should be a promise object
        if ( typeof(result) === 'undefined' )
            throw new Error('Undefined return type');
        else if (typeof(result) != 'object')
            throw new Error('Unexpected return type');
        
        return result; // Promise

    } catch (error) {
        console.error(error);
        return false;
    }
}
