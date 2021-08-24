const API_KEY       = 'b5261e9a3f637bfc4d8f7b28e2257d5f';
const API_BASE      = 'https://api.themoviedb.org/3';

const basicFetch = async(endpoint) => {
    const req    =  await fetch(`${API_BASE}${endpoint}`);
    const json   = await req.json();

    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
               items: await basicFetch(`/discover/movie?with_genres=27&with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&with_network=213&language=pt-BR&api_key=${API_KEY}`)
            }
        ];
    },

    GetMovieInfo: async (movieId, type) => {
        let info    = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info    = await basicFetch(`/movie/${movieId}?with_network=213&language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info    = await basicFetch(`/tv/${movieId}?with_network=213&language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info    = null;
                break;
            }
        }

        return info;
    }
}