export const UTILS = {
    convertTime: (mill) => mill/1000/60,
    aggregateTotalListens: (user_streams) => {
        let data = {
            
        }
        user_streams.forEach((stream) => {
            let artist = stream.artist
            // artist.userTimeListened = 0
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
    }
}