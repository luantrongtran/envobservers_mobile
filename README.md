# EnvObserver

EnvObserver is an IOT project to record temperature, humidity, and soil moisture. This has 3 modules:

*   [EnvObserver_arduino](https://github.com/luantrongtran/envobserver_arduino): which is an Arduino project (Arduino wifi board + sensors) to record temperature, humidity and soil moisture
*   [EnvObserver](https://github.com/luantrongtran/envobserver): web services to which is the endpoint where Arduino units upload data
*  [EnvObserver\_mobile](https://github.com/luantrongtran/envobservers_mobile): a hybrid mobile app to see the data uploaded by Arduino
  

#### EnvObserver Mobile App
*   This project is a hybrid mobile application written using Angular 8 + Ionic 4 + Ionic Capacitor
##### Build the App
* May need to change the Web Service URL to make the app point to the correct endpoint. This can be done by changing the property API_SERVER in /src/environments/environment.prod.ts

      To Build the app:
      Step 1: Build the app with Ionic, run the following command
            ionic build --prod
      Step 2: Add Android platform, run the following command
            npx cap android
      Step 3: Open Android Studio to build, run and deploy, run the following command
            npx cap open android
      Step 4: Syncing Ionic app with Capacitor, which should be done after ionic build runs. Run the following command
            npx cap copy
