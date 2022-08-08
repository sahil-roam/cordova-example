## NOTE

Add the below code in `MainActivity` to prevent crashing in terminated state

```java
@Override
    public void onDestroy() {
        CDVRoam.safeRemoveCallback();
        super.onDestroy();
    }
```

***The business logic for terminated state can be added in `onLocationUpdated` method in `RoamCordovaReceiver` class in `CDVROAM.java`***