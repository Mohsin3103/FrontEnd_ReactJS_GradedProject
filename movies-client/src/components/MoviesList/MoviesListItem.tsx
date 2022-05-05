import React, { useState } from 'react';
import { Button, Card, Toast, ToastContainer } from 'react-bootstrap';
import IMovie from '../../Model/IMovie';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons'; 
import { addMovieToFavourite, getMovies, deleteMovieById} from '../../services/movies';
import { ResponseState } from '../../Utils/types';
import Rating from "../common/Rating";
import {Link, useHistory} from 'react-router-dom';

type Props = {
    movie : IMovie
    path: string
    onRemove:(title:string) => void
}

const MovieListItem = ( {movie, path, onRemove} : Props) => {
    const {id,
        title,
        ratings,
        genres,
        storyline,
        posterurl,
    } = movie;

    const [ favMovies ,setFavMovies ] =useState<IMovie[]>([]);
    const [ responseState ,setResponseState ] =useState<ResponseState>('initial');
    const [ toastMessage ,setToastMessage ] =useState<string>('');
    const [ show ,setShow ] =useState<boolean>(false);
    const isFavouritePage = path === "favourite";
    const average = (arr : number[]) => arr.reduce((a,b) => a + b, 0) / arr.length;
    var rating = parseInt(average(ratings).toFixed(2), 10) / 2;
    var cardText = storyline.length > 100 ? storyline.substring(0, 100) + '...' : storyline;
    var toPath = `${path}/${title}`
    const history = useHistory();
  
    const routeChange = () =>{
        history.push(toPath);
    }


    
    async function removeFavourite(this: any, movie:IMovie) {
        const fetchFavMovies = async () => {
            try{
                const data:IMovie[] = await getMovies("favourite");
                if (!data) {
                    throw new Error("Data not found ");
                }
                window.location.reload();
                
            }catch(error){
                setResponseState('error');
                setToastMessage(`Unable to update favourites`);
                setShow(true);  
            }
        };
        
        try{
            const data = await deleteMovieById(movie.id);
            setResponseState('success');
            setToastMessage(`Movie ${movie.title} has been deleted successfully from favourites`);
            setShow(true);
            fetchFavMovies();
        }catch(error){
            setResponseState('error');
            setToastMessage(`Unable to delete Movie ${movie.title} please try again later`);
            setShow(true);  
        }  
    };
    

    async function addFavourite(this: any, movie:IMovie) {
        const fetchFavouriteMovies = async () => {
                try{
                    const data:IMovie[] = await getMovies("favourite");
                    if (!data) {
                        throw new Error("Data not found ");
                    }
                    setFavMovies(data);
                }catch(error){
                    setResponseState('error');
                    setToastMessage(`Unable to update favourites`);
                    setShow(true);  
                }
        };
        fetchFavouriteMovies();
        
        if(favMovies.filter(mov => mov.id === movie.id).length > 0){
            setResponseState('error');
            setToastMessage(`Movie ${movie.title} is already in favourites`);
            setShow(true);  
        }else{
            const data = await addMovieToFavourite(movie);
            setResponseState('success');
            setToastMessage(`Movie ${data.title} has been added successfully to favourites`);
            setShow(true);   
        }
        fetchFavouriteMovies();  
    }

    return (

        <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '18rem' }}>
        <Card.Img variant="top" height={350} src={`${posterurl}`} alt={`${title} Movie Poster`} onClick={routeChange}/>
        <Card.Header className="text-md text-center font-weight-bold" onClick={routeChange}>
            {title}
        </Card.Header>
        <Card.Body onClick={routeChange}>
            <Card.Title className="d-flex justify-content-between">
                <div className="text-xs">
                    <div>
                        <Rating rating={rating}/>
                        {rating} ({ratings.length} rated)
                    </div>
                </div>
            </Card.Title>
            <Card.Text>
                <span>
                    <strong>Story Line</strong>: {cardText}
                </span>
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
            <Button hidden={isFavouritePage} onClick={() => addFavourite(movie)} variant="primary">Add to favourite</Button>
            <Button hidden={!isFavouritePage} onClick={() => removeFavourite(movie)} variant="danger">Remove from favourite</Button>
        </Card.Footer>
    </Card>

    
        // <>
        // <Card style={{ width: '18rem' }}>
        // <Card.Img variant="top" className="hgt" src={`${posterurl}`} />
        // <div className="text-xs-2 text-center me-2" >
        //      <Card.Title>{title}</Card.Title>
        //      {
        //      category !== 'favourite' ?
        //      <Card.Link href={`/movies/${category}/movie/${movie.id}`} className="normal-text inline-blk">Details</Card.Link>  
        //         :''
        //     }
        // </div>
        // {category !== 'favourite' ?
        //     <div className="align-self-end text-xs me-2 inline-blk">
               
        //         <button onClick={() => addFavourite(movie)}>Add to Favourites</button>
        //             <span  className = "me-2 cls-red">
        //                 <FontAwesomeIcon 
        //                 icon = {faHeart}          
        //             />
        //             </span>                   
        //     </div> 
        //     :
        //     <div className="align-self-end text-xs me-2 inline-blk">
        //         <button onClick={() => removeFavourite(movie)}>Remove from Favourites</button>                   
        //     </div> 
        // } 
        // </Card>
        // {
        //     responseState !== 'initial' && (
        //         <ToastContainer className="p-3" position="top-end">
        //             <Toast
        //                 bg={responseState === 'success' ? 'success' : 'danger'}
        //                 show={show}
        //                 autohide
        //                 delay={5000}
        //                 onClose={() => setShow(false)}
        //             >
        //                 <Toast.Header closeButton={false}>
        //                     { responseState === 'success' ? 'Success' : 'Error'}
        //                 </Toast.Header>
        //                 <Toast.Body>
        //                     {toastMessage}
        //                 </Toast.Body>
        //             </Toast>
        //         </ToastContainer>
        //     )
        // }
        // </>
    );
};

export default MovieListItem;