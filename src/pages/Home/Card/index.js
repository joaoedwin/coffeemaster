

const Card = () => {
    return (
        <>
            <div className="grid-4 card hidden p-0">
                <div className="thumb hidden">
                    <a href="" className="p-0">
                        <img src="img/ACC_3595.jpeg" alt=""/>
                    </a>
                </div>
                
                <div className="p-2">
                    
                        <a href="" className="link-title">
                            <h4 className="mt-1">Cafeicultores Mineiros lideram - Prêmio Ernesto Illy</h4>
                        </a>

                        <div className="mt-2 flex-space">
                            <div className="flex-start-row">
                                <div className="profile">
                                    <img src="profile/emily.svg" className="profile-img" alt="" />
                                </div>
                                <div className="ml-2">
                                    <h6 className="color-primary">Emily Grace</h6>
                                    <h6 className="color-gray">Autor</h6>
                                </div>
                            </div>
                        </div>
                        
                        <p className="my-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ornare urna pharetra ut ac, pellentesque.
                        </p>
                        <a href="" className="link p-0">Ler mais</a>
                </div>
            </div>
        </>
    );
}

export default Card;