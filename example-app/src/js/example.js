import { NetworkInfo } from 'capacitor-network-info';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    NetworkInfo.echo({ value: inputValue })
}
