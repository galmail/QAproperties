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

## Pending Tasks

- Native Push-Notifications
- The Cartoon of the week Screen

To Fix:

- Add notifications when someone post a comment: notify admin and the person who asked the question and all the users who commented on the post.

- Finish the styles

Extras:

- Latest News Screen
- Google Analytics
- Mix Panel Analytics




