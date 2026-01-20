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

## For App Icon : -

## Go to icon.kitchen or appicon.co and create your icon and download.

## Steps to add icon for Android

-> unzip the above file and copy the files which is on android/res
-> Paste it on android/app/src/main/res
-> Remove this from AndroidManifest.xml
----> android:roundIcon="@mipmap/ic_launcher"
-> Refresh the app and you will see the icon

## OR

Open project on android studio and then go to res and click new and select image assets and paste the image path there.

## Steps to add icon for ios

-> unzip the above file and go to ios
-> cd ios
-> xed .
-> click on AwesomeProject dropdown and go AwesomeProject/Images
-> Click on appicon
-> According to their pt, set the image on that box.
-> In 1024pt, send the marketing image.
-> Uninstall the app and run the app again.

# **\_\_**END**\_\_\_**
