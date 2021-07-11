/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
export const useActivitiesHandlers = (activities) => {
  const INITIAL_VIEW_STATE = {
    longitude: activities ? Number(activities[0].lon) : 0,
    latitude: activities ? Number(activities[0].lat) : 0,
    zoom: 10.50,
    pitch: 0,
    bearing: 0,
  };
  const BLUE_COLOR = [37, 52, 180];
  const GREEN_COLOR = [0, 172, 0];
  const YELLOW_COLOR = [255, 255, 0];
  const COLORS = [BLUE_COLOR, YELLOW_COLOR, GREEN_COLOR];

  const getColorValue = (hexabinActivities) => {
    const homeActivities = hexabinActivities.filter((a) => a.type === 'home');
    const leisureActivities = hexabinActivities.filter((a) => a.type === 'leisure');
    const otherActivities = hexabinActivities.filter((a) => a.type !== 'leisure' && a.type !== 'home');

    const activityWeigths = [homeActivities.length, leisureActivities.length, otherActivities.length];

    const majorityWeight = Math.max(...activityWeigths);
    const activityTypeIndex = activityWeigths.indexOf(majorityWeight);

    switch (activityTypeIndex) {
      case activityWeigths.indexOf(homeActivities.length):
        return COLORS.indexOf(BLUE_COLOR);
      case activityWeigths.indexOf(leisureActivities.length):
        return COLORS.indexOf(YELLOW_COLOR);
      case activityWeigths.indexOf(otherActivities.length):
        return COLORS.indexOf(GREEN_COLOR);
    }
  };

  return [getColorValue, INITIAL_VIEW_STATE, COLORS];
};
