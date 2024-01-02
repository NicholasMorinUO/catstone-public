// The collection of jsons literals is fetched in extract.js
export default function transformJSONliterals(jsonLiterals) {
    // jsonLiterals = [ {a:'b', ... , m:'n'}, ... , {x:'y', ... , g:'h'} ]

    if ( typeof(jsonLiterals) != 'object' )
            throw new Error('Unexpected parameter type');

    let currentID;
    try {
        for (const jsonLiteral of jsonLiterals){
            currentID = jsonLiteral.ANIMAL_ID;
            
            // Add transformations here
            if(jsonLiteral.ORIGINAL_OWNERNAME){
                jsonLiteral.ORIGINAL_OWNERPOSTCODE = 'N/A';
                jsonLiteral.ORIGINAL_OWNERNAME = jsonLiteral.ORIGINAL_OWNERNAME.trim();
            }
            if(jsonLiteral.CURRENT_OWNERNAME){
                jsonLiteral.CURRENT_OWNERPOSTCODE = 'N/A';
                jsonLiteral.CURRENT_OWNERNAME = jsonLiteral.CURRENT_OWNERNAME.trim();
            }
        }
    } catch (error) {
        throw new Error(`Transformation failed after ANIMAL_ID: ${currentID}`)
    }

    return jsonLiterals;
}
/* 
    We iterate jsonLiterals and mutate the jsonLiteral 
    which risks partially modifying the collection.
    The non-mutual approach using map mutates a copy of jsonLiterals.
    This avoids the issue but mean is less performant.

    It would be more efficient to load it into the internalDB then
    update the data immediately, but possibly exposing sensitive data.
*/