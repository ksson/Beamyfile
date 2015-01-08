// first, remove configuration entry in case service is already configured

ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "",
  secret: ""
});

