import axios from 'axios';

async function searchMovies(query = "return", page = 1) {
        const response = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params: {
                    query: query,
                    include_adult: false,
                    language: 'en-US',
                    page: page,
                },
                headers: {
                    accept: 'api/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNlY2Y5ZGM3MDRhNDg0NTA3NGMyY2FhMjg4NmM2OSIsIm5iZiI6MTc0NDgwMDU3Ny40MDcsInN1YiI6IjY3ZmY4YjQxYzc3ZmQxZGY3NGFjZTFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S142TnPj-uvtcZAE-ZfpeFejCwLet1qY0x2ltK1tEx8',
                },
            }
        );
        return response.data;
}

async function guestSession(){
    const response = await axios.get(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNlY2Y5ZGM3MDRhNDg0NTA3NGMyY2FhMjg4NmM2OSIsIm5iZiI6MTc0NDgwMDU3Ny40MDcsInN1YiI6IjY3ZmY4YjQxYzc3ZmQxZGY3NGFjZTFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S142TnPj-uvtcZAE-ZfpeFejCwLet1qY0x2ltK1tEx8'
            }
        }

    )
    return response.data;
}
async function getGenres(){
    const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNlY2Y5ZGM3MDRhNDg0NTA3NGMyY2FhMjg4NmM2OSIsIm5iZiI6MTc0NDgwMDU3Ny40MDcsInN1YiI6IjY3ZmY4YjQxYzc3ZmQxZGY3NGFjZTFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S142TnPj-uvtcZAE-ZfpeFejCwLet1qY0x2ltK1tEx8'
            }
        }

    )
    return response.data;
}


async function ratedMovie(sessionId,page){
    const response = await axios.get(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies`,
        {
            params: {
                language: 'en-US',
                page: page,
                sort_by: "created_at.asc",
            },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNlY2Y5ZGM3MDRhNDg0NTA3NGMyY2FhMjg4NmM2OSIsIm5iZiI6MTc0NDgwMDU3Ny40MDcsInN1YiI6IjY3ZmY4YjQxYzc3ZmQxZGY3NGFjZTFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S142TnPj-uvtcZAE-ZfpeFejCwLet1qY0x2ltK1tEx8'
            }
        }

    )
    return response.data;
}
async function addRating(movieId, sessionId, rating) {
    const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating`,
        { value: rating },
        {
            params: {
                guest_session_id: sessionId,
            },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNlY2Y5ZGM3MDRhNDg0NTA3NGMyY2FhMjg4NmM2OSIsIm5iZiI6MTc0NDgwMDU3Ny40MDcsInN1YiI6IjY3ZmY4YjQxYzc3ZmQxZGY3NGFjZTFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S142TnPj-uvtcZAE-ZfpeFejCwLet1qY0x2ltK1tEx8'
            }
        }
    );
    return response.data;
}

export { searchMovies, guestSession ,ratedMovie,addRating,getGenres};