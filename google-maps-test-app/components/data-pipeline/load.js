export default function cacheData(jsonLiterals, dbInstance) {    
        
        if ( typeof(jsonLiterals) != 'object' )
                throw new Error('Unexpected parameter type for jsonLiterals');

        if ( typeof(dbInstance) != 'object' )
                throw new Error('Unexpected parameter type for dbInstance');
        
        // if a bulkput fails mid-execution, wipe the table
        try {
                dbInstance.cats.bulkPut(jsonLiterals);   
        } catch (error) {
                console.log('clearing cats table')
                dbInstance.cats.clear();
                throw new Error('bulkPut failed');
        }     

}



