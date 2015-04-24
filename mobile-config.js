App.info({
  name: 'Simplist',
  description: 'Lists made simple.',
  version: '0.2.2'
});

App.icons({
  'android_ldpi': 'private/assets/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'private/assets/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'private/assets/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'private/assets/drawable-xhdpi/ic_launcher.png'
});

App.launchScreens({
  'android_hdpi_portrait': 'private/assets/portrait800.png',
  'android_hdpi_landscape': 'private/assets/landscape800.png',
  'android_xhdpi_portrait': 'private/assets/portrait1280.png',
  'android_xhdpi_landscape': 'private/assets/landscape1280.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#35524A');
