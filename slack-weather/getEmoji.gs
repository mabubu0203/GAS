function getEmoji(text) {
  switch (text) {
    case 'Clouds':
      return ":cloud:";
    case 'Snow':
      return ":snowflake:";
    case 'Rain':
      return ":rain_cloud:";
    case 'Clear':
      return ":sun_with_face:";
    case 'Fog':
    case 'Haze':
      return ":fog:";
    case 'Mist':
      return ":barely_sunny:";
    default:
      return ":mostly_sunny:";
  }
}
