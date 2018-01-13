/* eslint no-unused-vars:0 */

const SERVICE_UUID = "1805";
const CHARACTERISTIC_UUID = "2a2b";

const standardUuid = uuid => `0000${uuid}-0000-1000-8000-00805f9b34fb`;

async function onButtonClick() {
  try {
    console.log("Requesting any Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      //  filters: [
      //   {
      //     services: [standardUuid(SERVICE_UUID)]
      //   }
      // ]
      acceptAllDevices: true
      // optionalServices: optionalServices
    });

    console.log("デバイスを選択しました。接続します。");
    console.log("デバイス名 : " + device.name);
    const server = await device.gatt.connect();

    console.log("デバイスへの接続に成功しました。サービスを取得します。");
    // const service = await server.getPrimaryService(standardUuid(SERVICE_UUID));
    const services = await server.getPrimaryServices();
    console.log(services);

    for (const service of services) {
      console.log("> Service: " + service.uuid);
      console.log(
        "サービスの取得に成功しました。キャラクタリスティックを取得します。"
      );

      // const characteristic = await service.getCharacteristic(standardUuid(CHARACTERISTIC_UUID));
      const characteristics = await service.getCharacteristics();

      characteristics.forEach(characteristic => {
        console.log(
          ">> Characteristic: " +
            characteristic.uuid +
            " " +
            getSupportedProperties(characteristic)
        );
        addList(getSupportedProperties(characteristic));
      });

      console.log("BLE接続が完了しました。");
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}

function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
      supportedProperties.push(p.toUpperCase());
    }
  }
  return "[" + supportedProperties.join(", ") + "]";
}

function addList(data) {
  const ul = document.getElementById("data");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(data));
  ul.appendChild(li);
}
