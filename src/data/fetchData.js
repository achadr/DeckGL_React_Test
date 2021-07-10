import activities from"./activities.json" 
import tripLayer from "./triplayer.json"

export const getTripLayer =() => {

    return tripLayer.features.map(t => t.geometry.coordinates )
}

// const getExtrusionHeight = (activity) => {
//     const tripsInActivity = tripLayer.features.filter(trip => trip.geometry.coordinates[0][0] === Number(activity.lon) && trip.geometry.coordinates[0][1] === Number(activity.lat))
//     console.log("extrusion length", tripsInActivity.length)
//     return tripsInActivity.length
// }

export const getActivities = () => {
   console.log("fetch data activities", activities)
   
    return activities //.slice(0,100).map(a => ({...a,extrusion_height : getExtrusionHeight(a)}))
}
