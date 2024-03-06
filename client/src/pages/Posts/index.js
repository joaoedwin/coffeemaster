
// Header e Footer
import Header from "pages/Header";
import Footer from "pages/Footer";

// useParams
import { useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// API
import api from "../../services/api";


const Posts = () => {
    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            console.log("Iniciando fetchData...");
            try {
                if (id) {
                    const responsePost = await api.get(`/posts/${id}`);
                    

                    if (responsePost.data) {
                        const responseUser = await api.get(`/users/${responsePost.data.id_user}`);

                        setPosts(responsePost.data);
                        setUsers(responseUser.data);
                    } else {
                        // Define posts e users como objetos vazios
                        setPosts({});
                        setUsers({});
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                // Se ocorrer um erro, define posts e users como objetos vazios
                setPosts({});
                setUsers({});
            }
        };

        console.log("Executando useEffect...");

        fetchData(); // Chama a função fetchData imediatamente

        // Adiciona id como dependência para que o useEffect seja chamado sempre que id mudar
    }, [id]);

    if (posts === null || users === null) {
        // Aguarde até que os dados sejam carregados
        console.log("Aguardando dados...");
        return <p>Carregando...</p>;
    }

    console.log("Renderizando componente...");


    return (
        <>
        
            <Header />

            <section className="container-post">
                <h6 className="uppercase color-primary text-center">{posts.category}</h6>
                <h3 className="text-center"> {posts.title} </h3>

                <div className="flex-center my-3">
                    <div className="profile">
                        <img src={users.image_profile} className="profile-img" alt="" />
                    </div>
                    <div className="ml-2">
                        <h6 className="color-primary">{users.name}</h6>
                        <h6 className="color-gray">{users.user}</h6>
                    </div>
                    <p className="ml-4">{posts.date} - {posts.duration} min read</p>
                </div>

                <div className="img-banner hidden">
                    <img src={posts.imageUrl} alt="" />
                </div>

                <div className="row my-3">
                    <h4>{posts.resume}</h4>
                    <p className="mt-1">
                    {posts.content}
                    </p>
                </div>

                <div className="row">
                    <div className="grid-3 disappear"></div>
                    <div className="grid-6 card">
                        <div className="row">
                            <div className="grid-3 flex-center pl-1">
                                <div className="profile-big">
                                    <img src={users.image_profile} className="profile-img" alt="" />
                                </div>
                            </div>
                            <div className="grid-9">
                                <h6 className="color-primary">{users.name} {users.surname}</h6>
                                <h6 className="color-gray">{users.user}</h6>
                                <p className="mt-1">
                                    {users.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-3 disappear"></div>
                </div>

            </section>

            <Footer />

        </>
    );
};

export default Posts;