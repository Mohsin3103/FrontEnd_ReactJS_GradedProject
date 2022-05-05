import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Alert, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import IMovie from "../../Model/IMovie";
import { getMovies } from "../../services/movies";
import { LoadingStatus } from "../../Utils/types";
import LoadingIndicator from "../common/Loading";
import NoData from "../global/NoData";
import NoMatch from "../global/NoMatch";
import MoviesListItem from "./MoviesListItem";

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    moviesToShow?: IMovie[],
    error?: Error,
    searchString: string
}

type Props = {
    moviesCategory : string
}

class MoviesList extends Component<RouteComponentProps<Props>, State> {
    state : State = {
        status: 'LOADING',
        searchString:''
    };
    
    updateValue = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { value } = event.target;

        this.setState(
            state => {
                return {
                    searchString : value
                }
            },
            () => {
                this.searchMovie(this.state.searchString);
            }
        )
    }

    searchMovie(searchString: string){
        this.setState({
            status: 'LOADING'
        });

        const moviesToShow = this.state.movies?.filter(x =>{
            return x.title.toLowerCase().includes(searchString.toLowerCase());
        })
        this.setState({
            status: 'LOADED',
            moviesToShow
        });
    }

    removeMovieFromFavourite = (title:string) => {
        
        this.setState({
            status: 'LOADING'
        });

        const movies = this.state.movies?.filter((movie) => movie.title !== title);
        const moviesToShow = this.state.moviesToShow?.filter((movie) => movie.title !== title);
        
        this.setState({
            status: 'LOADED',
            moviesToShow,
            movies
        });
     }
    

    render() {
        const { status, moviesToShow, error, searchString } = this.state;

        let el;

        switch( status ) {
            case 'LOADING':
                el = (
                    <LoadingIndicator size="large" message="Fetching..." />
                );
                break;
            case 'ERROR_LOADING':
                let msg = error?.message??'';

                if (msg?.indexOf("404") > -1){
                    el = (
                        <NoMatch/>
                    )
                } else {
                    el = (
                        <Alert variant="danger">
                            {error?.message}
                        </Alert>
                    )                
                }
                break;
            case 'LOADED':
                if (moviesToShow?.length??0 > 0){
                    el = (
                        <>
                            <FontAwesomeIcon icon={faSearch} className="me-2" />    
                            <input 
                                placeholder='Search movie' 
                                className='me-2' 
                                value={searchString}
                                onChange={this.updateValue}
                            />
                            <Row xs={2} md={3} lg={5}>
                                {
                                    moviesToShow?.map(
                                        (movie, idx) => (
                                            <Col key={idx} className="d-flex align-items-stretch my-3">
                                                <MoviesListItem movie={movie} path={this.props.match.params.moviesCategory} onRemove={this.removeMovieFromFavourite}/>
                                            </Col>
                                        )
                                    )
                                }
                            </Row>
                        </>
                    );
                } else {
                    el = (
                        <>
                            <FontAwesomeIcon icon={faSearch} className="me-2" />    
                                <input 
                                    placeholder='Search movie' 
                                    className='me-2' 
                                    value={searchString}
                                    onChange={this.updateValue}
                                />
                            <NoData/>
                        </>
                    );
                }

                break;
            default:
                break;
        }

        return el;
    }

    async componentDidMount() {
        await this.reloadMovieList();
    }

    async componentDidUpdate(prevProps : RouteComponentProps<Props>){
        if (this.props.match.params.moviesCategory !== prevProps.match.params.moviesCategory){
            await this.reloadMovieList();
        }
    }

    reloadMovieList = async() => {
        this.setState({
            status: 'LOADING'
        });

        try {
            const movies = await getMovies(this.props.match.params.moviesCategory);
            const moviesToShow = movies;
            this.setState({
                status: 'LOADED',
                movies,
                moviesToShow,
                searchString:''
            });
        } catch( error ) {
            this.setState({
                status: 'ERROR_LOADING',
                error: error as Error
            });
        }
    }
}

export default MoviesList;