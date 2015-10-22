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
	<string>fb1481888448806052</string>
</array>


```
meteor deploy qaproperties.meteor.com --settings private/settings.prod.json
```

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


Extras:

- The Cartoon of the week Screen
- Latest News Screen




