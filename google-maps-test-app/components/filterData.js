export default function filterData(filterCriteria, data) {
    let catArray = [
    ];
    
    for (var i=0; i < data.length; i++) {
        let myArray
        let lng
        let lat
        let tempOwner

        let isData;
        let filteredCriteriaEmpty = Object.keys(filterCriteria).length === 0 && filterCriteria.constructor === Object;
        let isOriginal = filterCriteria.location === ""; 
        let isCurrent = filterCriteria.location === "Current";
        if(filteredCriteriaEmpty)isData = data[i].ORIGINAL_LATLONG;
        if(isOriginal)isData = data[i].ORIGINAL_LATLONG;
        if(isCurrent)isData = data[i].CURRENT_LATLONG;

        if(isData){
            if ((isOriginal||filteredCriteriaEmpty) && data[i].ORIGINAL_LATLONG) {
                let latlongText = data[i].ORIGINAL_LATLONG;
                myArray = latlongText.split(",");
                lat = parseFloat(myArray[0]);
                lng= parseFloat(myArray[1]);
                tempOwner = data[i].ORIGINAL_OWNERNAME;
            }
            if (isCurrent && data[i].CURRENT_LATLONG) {
                let latlongText = data[i].CURRENT_LATLONG;
                myArray = latlongText.split(",");
                lat = parseFloat(myArray[0]);
                lng= parseFloat(myArray[1]);
                tempOwner = data[i].CURRENT_OWNERNAME;
            }

            let deceasedTemp=false;
            if(data[i].DECEASEDDATE!=null){
                deceasedTemp=true;
            }

            let tempAgeCategory=data[i].AGEGROUP;
            let tempAgeGroup="";
            switch (tempAgeCategory) {
                case "":
                    tempAgeGroup="";
                    break;
                case "Baby":
                    tempAgeGroup="1-3";
                    break;
                case "Young Adult":
                    tempAgeGroup="4-10";
                    break;
                case "Adult":
                    tempAgeGroup="10-15";
                    break;
                case "Senior":
                    tempAgeGroup="15-20";
                    break;
                default:
                    tempAgeGroup="";
            }

            let tempDate=new Date(data[i].DATEBROUGHTIN);
            let catFromJSON={
                key:String.fromCharCode(65+i),//start at 'A',
                gender: data[i].SEX?"Male":"Female",
                dateBroughtIn: tempDate,
                position: {lat: lat, lng: lng},
                availableForAdoption: data[i].ISNOTAVAILABLEFORADOPTION?"Yes":"No",
                deceased:deceasedTemp?"Yes":"No",
                ageGroup: tempAgeGroup,
                ownerName: tempOwner,
                animalName: data[i].ANIMALNAME,
                animal_id: data[i].ANIMAL_ID
            };

            catArray.push(catFromJSON);
        }
    }
    const filteredCats = catArray.filter((cat) => (
        (!filterCriteria.timeFrom ||  cat.dateBroughtIn.getTime() >= (new Date(filterCriteria.timeFrom)).getTime() ) &&
        (!filterCriteria.timeTo || cat.dateBroughtIn.getTime() <= (new Date(filterCriteria.timeTo)).getTime())&&
        (!filterCriteria.gender || cat.gender === filterCriteria.gender) &&
        (!filterCriteria.ageGroup || cat.ageGroup === filterCriteria.ageGroup)&&
        (!filterCriteria.ownerName || cat.ownerName.toLowerCase().includes(filterCriteria.ownerName.toLowerCase()))&&
        (!filterCriteria.animalName || cat.animalName.toLowerCase().includes(filterCriteria.animalName.toLowerCase()))
    ));
    return filteredCats;
}
