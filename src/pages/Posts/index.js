
// Header e Footer
import Header from "pages/Header";
import Footer from "pages/Footer";

//Images
import profile from '../../svg/emily.svg';
import imagefive from '../../img/ACC_3595.jpeg'

// useParams
import { useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// API
import api from "services/api";


const Posts = () => {

    // Variável de estado
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);

    const { idPost } = useParams();

    useEffect(() => {

        if(idPost){
            api.get("/posts/" + idPost)
            .then((response) => {
                setPost(response.data);

                api.get("/user/" + response.data.id_user)
                .then ((r) => {
                    setUser(r.data);
                })
            })
        }

    }, [])


    return (
        <>
        
            <Header />

            <section class="container-post">
                <h6 class="uppercase color-primary text-center">{post.category}</h6>
                <h3 class="text-center"> {post.title} </h3>

                <div class="flex-center my-3">
                    <div class="profile">
                        <img src={user.ImageProfile} class="profile-img" alt="" />
                    </div>
                    <div class="ml-2">
                        <h6 class="color-primary">{user.name}</h6>
                        <h6 class="color-gray">{user.user}</h6>
                    </div>
                    <p class="ml-4">{post.date} - {post.duration} min read</p>
                </div>

                <div class="img-banner hidden">
                    <img src={post.imageUrl} alt="" />
                </div>

                <div class="row my-3">
                    <h4>{post.resume}</h4>
                    <p class="mt-1">
                    {post.content}
                    </p>
                </div>

                <div class="row">
                    <div class="grid-3 disappear"></div>
                    <div class="grid-6 card">
                        <div class="row">
                            <div class="grid-3 flex-center pl-1">
                                <div class="profile-big">
                                    <img src={user.ImageProfile} class="profile-img" alt="" />
                                </div>
                            </div>
                            <div class="grid-9">
                                <h6 class="color-primary">{user.name} {user.surname}</h6>
                                <h6 class="color-gray">{user.user}</h6>
                                <p class="mt-1">
                                    {user.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="grid-3 disappear"></div>
                </div>

            </section>

            <Footer />

        </>
    );
}

export default Posts;