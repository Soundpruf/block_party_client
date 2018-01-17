export const UTILS = {
    convertTime: (mill) => Math.floor((mill/1000)/60),
    aggregateTotalListens: (user_streams) => {
        let data = {}
        user_streams.forEach((stream) => {
            let artist = stream.artist
            if(data.hasOwnProperty(stream.artist.name)) {
                data[stream.artist.name].userTimeListened += stream.duration
            } else {
                data[stream.artist.name] = {
                    userTimeListened: stream.duration,
                    photo:stream.artist.photo
                }
            }
        })
        return data
    },
    analyzeUserGenres: (top_artists) => {
        const data={}
        const genres = []
        const genre_data = {}
        const narrow_genre_data = {
            indie: 1,
            rock: 1,
            rAndb: 1,
            rap: 1,
            pop: 1,
            dance: 1,
            hipHop: 1,
            folk: 1,

        }
        const narrow_genre_keys = Object.keys(narrow_genre_data)

        top_artists.forEach((artist) => genres.push(...artist.genres))
        genres.forEach((genre) => {
            if(genre_data.hasOwnProperty(genre)) {
                genre_data[genre] ++
            } else {
                genre_data[genre] = 1
            }
            narrow_genre_keys.forEach((genre_key) => {
                if(genre.indexOf(genre_key) !== -1) {
                    console.log(genre)
                    narrow_genre_data[genre_key] += 1
                }
            })
           
        })
        data.genre_data = genre_data
        data.narrow_genre_data = narrow_genre_data
        
        return data
    }
}