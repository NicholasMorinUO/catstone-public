// Can instead be refactored into a folder of many query files
export async function queryEntireDexieTable(dbInstance){
    
    if ( typeof(dbInstance) === 'undefined' )
        throw new Error('Undefined parameter type for dbInstance');
    else if ( typeof(dbInstance) != 'object' )
        throw new Error('Unexpected parameter type for dbInstance');

    const promise = dbInstance.cats.toArray();
    
    return promise

}