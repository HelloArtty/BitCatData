import Footer from "../components/Footer";
import "../css/About.css";

const About = () => {
    return (
        <>
            <div className="section1">
                <div className="content">
                    <h1 className="text-6xl font-bold">About Us</h1>
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
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid asperiores itaque sint minima ullam adipisci molestias, iste at facere pariatur? Labore maxime quae consequuntur distinctio enim possimus perspiciatis suscipit vero!
                            Ratione deleniti sed, excepturi iusto provident veniam reiciendis animi. Veritatis, perferendis porro. Delectus consequatur, neque animi repudiandae quis, beatae perferendis mollitia labore culpa esse hic expedita ducimus. Asperiores, eum sequi?
                            Voluptatibus amet repellat dolores provident quo quam facilis molestiae reiciendis. Odio doloremque repellat in, quos eveniet minus aperiam neque modi odit ratione. Deleniti eveniet laborum accusantium tempora natus velit saepe!
                            Alias magnam praesentium eaque eius facere, est nesciunt nulla consequatur explicabo officia repellat eligendi cumque ducimus possimus fuga nisi porro perspiciatis vero reprehenderit nihil aut aspernatur, quam minima omnis. Necessitatibus!
                            Consequuntur beatae minima, sed expedita minus at aut. Debitis perspiciatis fugiat id voluptatem similique explicabo reiciendis voluptatibus nesciunt nisi! Exercitationem, hic! Distinctio quis fuga dolor, quas delectus qui molestiae sed!</p>
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
                            <p>blablabla blablabalbla</p>
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
