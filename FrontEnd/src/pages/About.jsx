import Footer from "../components/Footer";
import "../css/About.css";

const About = () => {
    return (
        <>
            <div className="section1 bg-cat2 bg-cover bg-center">
                <div className="content">
                    <h1 class="text-7xl md:text-9xl text-slate-1000 font-bold text-center">About Us</h1>
                </div>
            </div>
            <div className="row-home">
                <div className="imgWrapper">
                    <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className="contentWrapper">
                    <div className="content-img">
                        <h2>
                            About Us
                        </h2>
                        <p> BitCat was founded with a simple yet profound goal – to be the bridge that brings together cats in search of a forever home and individuals seeking the joy and companionship that only a cat can provide.
                            As avid cat lovers ourselves, we understand the unique bond that forms between humans and felines, and we are committed to fostering these connections.
                        </p>
                        <p>
                            Our vision is to create a world where every cat has a warm and loving home.
                            We believe that every cat deserves a chance to experience the comfort and security of a forever family.
                            By facilitating adoptions and providing a platform for cat enthusiasts,
                            we hope to make a positive impact on the lives of both cats and their new human companions.
                        </p>
                    </div>
                </div>
            </div>
            <div className="section3">
                <div className="content">
                    <h1 className="Head">Members</h1>
                </div>
                <div className="box">
                    <div className="card">
                        <div className="member">
                            <img src="https://cdn.discordapp.com/attachments/988168701989765160/1186637376643158026/410528324_1335352380432016_3246775920249158811_n.png?ex=6593f92d&is=6581842d&hm=7c1bfb161d01fa25acb4f3f4147e7663ab87a934e3354c85c98334082f0f4f7b&" alt="" />
                            <p>Teekamol Chaiwongwutthikul</p>
                            <p>65090500409</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="member">
                            <img src="https://media.discordapp.net/attachments/806864849488707587/1186093924352266260/IMG_3652.jpg?ex=6591ff0c&is=657f8a0c&hm=d3e057f1e9d20560baf63ca3af487465adfe34a4dc0cd5f3be812d43651be664&=&format=webp&width=561&height=702" alt="" />
                            <p>Chaithawat Saklang</p>
                            <p>65090500432</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="member">
                            <img src="https://i.pinimg.com/236x/23/40/89/234089bc5eb6d79757f86b7ad4757cb5.jpg" alt="" />
                            <p>Panicha Kunanuntapong</p>
                            <p>64090500454</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
