package com.example.project54;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Application;
import android.os.Bundle;

import com.pabbl.content.api.ContentConfiguration;
import com.pabbl.mx.android.DimensValue;
import com.pabbl.sdk.api.PabblSdk;
import com.pabbl.lockscreen.api.LockScreenConfiguration;
import com.pabbl.sdk.javalib.configuration.SdkConfiguration;

public class MainActivity extends AppCompatActivity {

//    PabblSdk pabblSdk;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        // Check if the SDK is ready to proceed with initialization
//        if (PabblSdk.busy(this)) return;
//
//        // Attach the app to the SDK service and get an interface to the SDK
//        Application application = new Application();
//        Application application = new Application();
//        PabblSdk sdk = PabblSdk.attach(application);
//
//        // Create the Lockscreen Configuration
//        LockScreenConfiguration lockscreenConfig = LockScreenConfiguration.createNew()
//
//                // The main application class
//                .setMainActivity(MainActivity.class)
//
//                // The Icon for unlocking the lockscreen
//                .setUnlockSliderIcon(R.drawable.roli_slider_icon)
//
//                // The size of the Icon
//                .setUnlockSliderIconSize(DimensValue.dp(56f))
//
//                // How to interact with lockscreen content
//                .setContentInteractionMode(LockScreenConfiguration.InteractionMode.CONTENT_TAP)
//                .setContentScrollMode(LockScreenConfiguration.ScrollMode.EDGE_SWIPE)
//
//                // Hide the Pabbl Content Like-button
//                .showContentLikeButton(false)
//
//                // Hide the Pabbl Content Feedback button
//                .showContentFeedbackButton(false)
//
//        // Enable background notifications to protect background services from being killed
//        // Alternatively, guide the user to the appropriate Dialog to whitelist the app
//                .enableBackgroundNotification(true);
//
//        // Create the Content Configuration
//        ContentConfiguration contentConfig = ContentConfiguration.createNew();
//
//        // Add both Configurations to the SDK config
//        SdkConfiguration sdkConfig = sdk.newConfiguration(lockscreenConfig, contentConfig);
//
//        // Initialize the SDK
//        sdk.initialize(sdkConfig);

}}









