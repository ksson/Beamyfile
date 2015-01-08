// first, remove configuration entry in case service is already configured

ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "1003739263681-f2at289i2ksb8i5e166bbgsqegn30070.apps.googleusercontent.com",
  secret: "b2D1AFw7rmopAnKp-sHM0NCl"
});