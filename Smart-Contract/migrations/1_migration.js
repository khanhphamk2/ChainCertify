let issuer = artifacts.require("Issuer");
let Ver = artifacts.require("VerifySignature");
let holder = artifacts.require("Holder");
let certi = artifacts.require("Certificates");

module.exports = function (deployer) {
  deployer.deploy(Ver);
  deployer.deploy(issuer).then(function () {
    return deployer.deploy(holder, issuer.address).then(function () {
      deployer.link(Ver, certi);
      return deployer.deploy(certi, issuer.address, holder.address);
    });
  })
};