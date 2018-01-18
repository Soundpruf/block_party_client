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
        let data={}
        const genres = []
        const genre_data = {}
        const narrow_genre_data = [
                {
                value: 0,
                name: 'indie',
                className: 'indie',
                meta: 'indie'
              },
              {
                value: 0,
                name: 'rock',
                className: 'rock',
                meta: 'rock'
              },{
                value: 0,
                name: 'r&b',
                className: 'rAndb',
                meta: 'rAndb'
              },
              {
                value: 0,
                name: 'rap',
                className: 'rap',
                meta: 'rap'
              },
              {
                value: 0,
                name: 'pop',
                className: 'pop',
                meta: 'pop'
              },
              {
                value: 0,
                name: 'dance',
                className: 'dance',
                meta: 'dance'
              },
              {
                value: 0,
                name: 'hip hop',
                className: 'hipHop',
                meta: 'hip hop'
              },
              {
                value: 0,
                name: 'folk',
                className: 'folk',
                meta: 'folk'
              }
            ]

        const narrow_genre_keys = narrow_genre_data.map((g_data) => g_data.name)

        top_artists.forEach((artist) => genres.push(...artist.genres))
        genres.forEach((genre) => {
            if(genre_data.hasOwnProperty(genre)) {
                genre_data[genre] ++
            } else {
                genre_data[genre] = 1
            }
            narrow_genre_keys.forEach((genre_key) => {
                if(genre.indexOf(genre_key) !== -1) {
                    let that_specific_genre_object = narrow_genre_data.find((g_object) => g_object.name === genre_key)
                    narrow_genre_data[narrow_genre_data.indexOf(that_specific_genre_object)].value ++
                }
            })
        })
        // data.genre_data = genre_data
        console.log(genre_data)
        data.narrow_genre_data = narrow_genre_data
        return data
    },
    analyzeTopArtistListens: (stream_data) => {
        
        const artists = Object.keys(stream_data)
        let formatted_data = artists.map((artist) => {
            return {
                value: stream_data[artist].userTimeListened,
                name: artist,
                className: 'graph-artist',
                meta: 'graph-'+ artist
            }
        })
        
        return formatted_data
        
    }
}