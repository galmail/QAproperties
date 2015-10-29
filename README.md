# [Q&A Properties App](http://qaproperties.meteor.com/)

Q&A Knowledge Base Mobile App for Properties in UK.

## Running the app

```
cp settings.json.example private/settings.dev.json
cp settings.json.example private/settings.prod.json
meteor
```

## To Deploy the app

In mobile-config.js change Facebook APP Id to production

In XCode, build settings => Enable_Bitcode = NO

In XCode .plist file

<key>CFBundleURLTypes</key>
<array>
	<dict>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>fb1481888448806052</string>
		</array>
	</dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
	<string>fbauth</string>
	<string>fbapi</string>
</array>


```
meteor deploy qaproperties.meteor.com --settings private/settings.prod.json
```

## Cordova Plugins Installed

com.phonegap.plugins.facebookconnect@https://github.com/Wizcorp/phonegap-facebook-plugin/tarball/0e61babb65bc1716b957b6294c7fdef3ce6ace79
cordova-plugin-app-version@0.1.7
cordova-plugin-inappbrowser@1.0.1
cordova-plugin-x-socialsharing@5.0.4

## To Test on iPhone

```
meteor add-platform ios
meteor run ios-device --mobile-server qaproperties.meteor.com --settings private/settings.prod.json
```

## To Submit to App Store

```
meteor build iosbuild --server qaproperties.meteor.com --mobile-settings private/settings.prod.json
```

## Pending Tasks

auto-reload app after 8 seconds...
push notifications (don't ask everytime to send pushes...)

Debug in server the collection: Push.appCollection



Extras:

- The Cartoon of the week Screen
- Latest News Screen




