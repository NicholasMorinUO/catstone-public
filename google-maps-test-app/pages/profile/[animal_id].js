import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/components/internalDB/db';
import Layout from '@/components/layout';
import Image from 'next/image'
import Link from 'next/link';


export default function ProfilePage(){
  const router = useRouter();
  const { animal_id } = router.query;
  
  const imageProperties = {
    src: `https://us04b.sheltermanager.com/service?account=zf0719&method=animal_image&animalid=${animal_id}`,
    height: 450,
    width: 400,
    alt: `Picture of cat #${animal_id}`
  }

  const includedCatAttributes = [
    'ANIMALNAME',
    'BREEDNAME',
    'MARKINGS',
    'DATEBROUGHTIN',
    'SEX',
    'IDENTICHIPNUMBER',
    'AGEGROUP',
    'DECEASEDDATE',
    'NEUTERED',
    'ISGOODWITHCATS',
    'ISGOODWITHDOGS',
    'ISGOODWITHCHILDREN',
    'ISHOUSETRAINED',
    'ISNOTAVAILABLEFORADOPTION',
    'SHELTERLOCATION',
    'SIZE',
  ]

  const [jsonObjectLiteral, setJsonObjectLiteral] = useState(null);

  useEffect(()=>{

    const query = async () => {
      try {
        const data = await db.cats.get(parseInt(animal_id));
        setJsonObjectLiteral(data);
      } catch (error) {
        console.error('Error querying db:', error);
      }
    };

    query()

  });
  
if(!jsonObjectLiteral)return;

  return (
    <Layout>
      <div className='center-div'>
        <div id='image-name-pair'>
          <Link href={imageProperties.src} target="_blank">
            <Image className='image-name-pair'
              src={imageProperties.src}
              height={imageProperties.height} 
              width={imageProperties.width}
              alt={imageProperties.alt}
            />
          </Link>
        </div>
        <div>
          <div className='cat-name'>{jsonObjectLiteral["ANIMALNAME"]}</div>
          {buildTable(jsonObjectLiteral, includedCatAttributes)}
        </div>
      </div>
    </Layout>
  );
};

function buildTable(jsonObjectLiteral, includedCatAttributes){

  const rowElements = [];
  for (const attribute in jsonObjectLiteral){

    if ( includedCatAttributes.includes(attribute) ){
      
      rowElements.push(
        buildRow(attribute, jsonObjectLiteral[attribute])
      );
    }
  }

  return (
    <div>
      {rowElements}
    </div>
  );
}


function buildRow(attrName, attrVal){

  return ( <div className={'table-row'}>
        <span className={'table-col-attribute-name'}>{formatAttributeName(attrName)}</span>
        <span className={'table-col-attribute-value'}>{attrVal}</span>
      </div>
  );
}

function formatAttributeName(attrName){
  switch(attrName){
    case 'ANIMALNAME':
      attrName='Animal Name: ';
      break;
    case 'BREEDNAME':
      attrName='Breed: ';
      break;
    case 'MARKINGS':
      attrName='Markings: ';
      break;
    case 'DATEBROUGHTIN':
      attrName='Date Brought In: ';
      break;
    case 'SEX':
      attrName='Sex: ';
      break;
    case 'IDENTICHIPNUMBER':
      attrName='Chip Number: ';
      break;
    case 'AGEGROUP':
      attrName='Age Group: ';
      break;
    case 'DECEASEDDATE':
      attrName='Deceased Date: ';
      break;
    case 'NEUTERED':
      attrName='Neutered Status: ';
      break;
    case 'ISGOODWITHCATS':
      attrName='Is Good With Cats: ';
      break;
    case 'ISGOODWITHDOGS':
      attrName='Is Good With Dogs: ';
      break;
    case 'ISGOODWITHCHILDREN':
      attrName='Is Good With Children: ';
      break;
    case 'ISHOUSETRAINED':
      attrName='Is House Trained: ';
      break;
    case 'ISNOTAVAILABLEFORADOPTION':
      attrName='Is Not Available For Adoption: ';
      break;
    case 'SHELTERLOCATION':
      attrName='Shelter Location: ';
      break;
    case 'SIZE':
      attrName='Size: ';
      break;
    default:
  }

  return attrName;
}