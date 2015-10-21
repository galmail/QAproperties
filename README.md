# [Q&A Properties App](http://qaproperties.meteor.com/)

Q&A Knowledge Base Mobile App for Properties in UK.

## Running the app

```
cp settings.json.example private/settings.dev.json
cp settings.json.example private/settings.prod.json
meteor
```

## To Deploy the app

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
meteor build iosbuild --server=qaproperties.meteor.com
```

## Pending Tasks

- Style notifications like the headlines...
- Style acceptPushNotifications like the signIn modal
- Style terms modal
- Style Welcome Screen


- Change logo in app.scss
- Enable Push in server/_settings.js
- Test Push Notifications Scenarios (fix bug when push repeat itself).

Extras:

- The Cartoon of the week Screen
- Latest News Screen




