## Google font Setup for Android and ios

Create 'react-native.config.js' file in your project and then paste this code :

....
module.exports = {
project: {
ios: {},
android: {}
},
assets: ['./src/assets/fonts/']
}
....

# Run this Command

yarn dlx react-native-asset (for latest yarn)
OR
npx react-native-asset

# Reset cache and run the project again...

npx react-native start --reset-cache

## Icon SVG Setup

Read the doc of :-
react-native-svg
react-native-svg-transformer

##
