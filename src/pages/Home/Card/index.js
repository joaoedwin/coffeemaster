// API
import api from '../../../services/api';

// Hooks
import { useState, useEffect } from 'react';

// Link
import { Link } from 'react-router-dom';




const Card = ( {content} ) => {

    // Constante do User
    const [user, setUser] = useState([]);

    useEffect(() => {

        if(content) {
            api.get('/user/' + content.id_user)
            .then((response) => {
                setUser(response.data);
            })
        }

    }, [])

    return (
        <>
            <div className="grid-4 card hidden p-0">
                <div className="thumb hidden">
                    <Link to={"/posts/" + content.id} className="p-0">
                        <img src={content.imageUrl} alt=""/>
                    </Link>
                </div>
                
                <div className="p-2">

               
                    
                        <Link to={"/posts/" + content.id} className="link-title">
                            <h6 class="color-primary">{content.date}</h6>
                            <h4 className="mt-1">{content.title}</h4>
                        </Link>

                        <div className="mt-2 flex-space">
                            <div className="flex-start-row">
                                <div className="profile">
                                    <img src={user.ImageProfile} className="profile-img" alt="" />
                                </div>
                                <div className="ml-2">
                                    <h6 className="color-primary">{user.name} {user.surname}</h6>
                                    <h6 className="color-gray">{user.user}</h6>
                                </div>
                            </div>
                        </div>
                        
                        <p className="my-2">
                            {content.resume}
                        </p>
    
                </div>
            </div>
        </>
    );
}

export default Card;