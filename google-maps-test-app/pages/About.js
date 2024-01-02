import Layout from "@/components/layout";
import Image from "next/image";

export default function About() {
    return <Layout>
            <div className="about-container">
                <div className="about-header">What is CatMaps?</div>
                <div className="about-text"> 
                    CatMaps is an interactive mapping website. It allows 
                    users to view historical data on cats which were found
                    or surrendered to the Ottawa Stray Cat Rescue (OSCatR). 
                    Users can view the profiles of specific cats or see the 
                    cats found in an area.
                </div>
                <div className="about-sub-header">Intended uses</div>
                <div className="about-text">
                    The app is designed for volunteers of OSCatR to
                    analyze cat movement in certain areas or monitor 
                    the activities of a specific cat. The app can be used
                    to help report a found cat. However, the app is NOT meant 
                    to help individuals find their lost pets. If you have 
                    lost your cat, please contact <a className="about-link" 
                    href="https://www.oscatr.ca/lost-cat">OSCatR</a> or the&nbsp;
                    <a className="about-link" href="https://ottawahumane.ca/services/lost-and-found/">
                    Ottawa Humane Society</a> for help and resources.
                    
                </div>
                <div className="about-sub-header">Ottawa Stray cat rescue</div>
                <div className="about-text">
                    The Ottawa Stray Cat Rescue was founded in 2011 with a 
                    mission to getting adoptable cats off the streets and 
                    into homes in addition to supporting stray cat colonies 
                    in the Ottawa region. They are 100% volunteer based with 
                    three core programs which they use to achieve their mission: 
                    Adoption Program, Trap-Neuter-Release (TNR) and Feral Cat 
                    Relocation.
                </div>
                <div className="about-sub-header">Team behind the project</div>
                <Image className="team" src={'/images/team.svg'} height={500} width={1000}/>
            </div>
        </Layout>
}