/* eslint no-unused-vars:0 */

const SERVICE_UUID = "1805";
const CHARACTERISTIC_UUID = "2a2b";

const standardUuid = uuid => `0000${uuid}-0000-1000-8000-00805f9b34fb`;

let data;

function onStartNotify() {
  navigator.bluetooth
    .requestDevice({
      filters: [
        {
          services: [standardUuid(SERVICE_UUID)]
        }
      ]
    })
    .then(device => {
      console.log("デバイスを選択しました。接続します。");
      console.log("デバイス名 : " + device.name);
      return device.gatt.connect();
    })
    .then(server => {
      console.log("デバイスへの接続に成功しました。サービスを取得します。");
      return server.getPrimaryService(standardUuid(SERVICE_UUID));
    })
    .then(service => {
      console.log(
        "サービスの取得に成功しました。キャラクタリスティックを取得します。"
      );
      return service.getCharacteristic(standardUuid(CHARACTERISTIC_UUID));
    })
    .then(characteristic => {
      data = characteristic;
      console.log(
        data.readValue().then(value => {
          console.log(value.getUint16());
          document.getElementById("data").innerHTML = value.getUint16();
        })
      );
      console.log("BLE接続が完了しました。");

      // characteristic.startNotifications();
    })
    .catch(error => {
      console.log("Error : " + error);
    });
}
