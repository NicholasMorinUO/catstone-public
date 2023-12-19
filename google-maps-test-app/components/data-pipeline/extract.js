export default async function fetchData(url) {
    return [{"ANIMAL_ID": 554, "ANIMALTYPEID": 15, "ANIMALNAME": "Stormy", "BREEDNAME": "Domestic Short Hair", "BASECOLOURID": 1, "MARKINGS": "", "SHELTERCODE": "1", "DATEBROUGHTIN": "2014-08-06T00:00:00", "OWNERID": null, "SEX": 1, "IDENTICHIPNUMBER": null, "AGEGROUP": "Baby", "DECEASEDDATE": null, "NEUTERED": 1, "NEUTEREDDATE": "2014-12-08T00:00:00", "ISGOODWITHCATS": 0, "ISGOODWITHDOGS": 2, "ISGOODWITHCHILDREN": 0, "ISHOUSETRAINED": 0, "ISNOTAVAILABLEFORADOPTION": 0, "SHELTERLOCATION": 15, "SIZE": 2, "ORIGINAL_OWNERPOSTCODE": null, "ORIGINAL_OWNERNAME": "Fake Name", "ORIGINAL_LATLONG": "45.32,-75.84", "CURRENT_OWNERPOSTCODE": null, "CURRENT_OWNERNAME": "Fake Name", "CURRENT_LATLONG": "45.31,-75.83"}]
    // try {
    //     // await until Promise obj (from fetch) is resolved to Response obj
    //     const res = await fetch(url, { cache: 'no-store' });

    //     // if HTTP status 200,...,299
    //     if (res.ok) {
    //         const data = res.json();
    //         return data; // json objects Promise
        
    //     } else {
    //         throw new Error('Network response was not OK');
    //     }
      
    // } catch (error) {
    //     // bubbling up error to the proxy
    //     throw new Error(error);
    // }
}