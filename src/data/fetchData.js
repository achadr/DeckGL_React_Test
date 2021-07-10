import activities from"./activities.json" 
import tripLayer from "./triplayer.json"

export const getTripLayer =() => {

    return tripLayer.features.map(t => t.geometry.coordinates )
}



export const getActivities = () => {
   console.log("fetch data activities", activities)
   
    return activities
}
