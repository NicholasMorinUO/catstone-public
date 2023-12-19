import fetchData from "@/components/data-pipeline/extract";
import transformJSONliterals from "@/components/data-pipeline/transform";
import cacheData from "@/components/data-pipeline/load";

// Throw param value related  errors in the concrete functions
// Throw return value related errors in the proxy function

export async function extract(url) {
    try {
        const result = await fetchData(url);
        
        if ( typeof(result) === 'undefined' )
            throw new Error('Undefined return type');
        else if (typeof(result) != 'object')
            throw new Error('Unexpected return type');
            
        
        return result; // Promise

    } catch (error) {
        console.error(error); //bubbled up error
        return false;
    }
}

// execute on data from a resolved extract(url) call
export function transform(extractedData) {
    try {
        const result = transformJSONliterals(extractedData);

        if ( typeof(result) === 'undefined' )
            throw new Error('Undefined return type');
        else if (typeof(result) != 'object')
            throw new Error('Unexpected return type');

        return result;
       
    } catch (error) {
        console.error(error); //bubbled up error
        return false;
    }
}


// load data into the internalDB
export function load(data, dbRef) {
    try {
        
        cacheData(data, dbRef);
        
    } catch (error) {
        console.error(error); //bubbled up error
        return false;
    }
}

/* How to use load(data, dbRef)
    
async function test () {
        load(
            transform(
                await extract(
                    `${url}`
                )
            ),
            dbRef
        )
    }

    ...or...

    async function test () {
        load(
            await extract(
                `${url}`
            ),
            dbRef
        )
    }

*/