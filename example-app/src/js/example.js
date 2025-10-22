import { NetworkInfo, getCurrentIp } from 'capacitor-network-info';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    NetworkInfo.echo({ value: inputValue })
}

// Startup test: call getCurrentIp when the page loads and log the result.
window.addEventListener('DOMContentLoaded', async () => {
    const write = (msg) => {
        let el = document.getElementById('ipResult');
        if (!el) {
            el = document.createElement('pre');
            el.id = 'ipResult';
            el.style.whiteSpace = 'pre-wrap';
            document.querySelector('main').appendChild(el);
        }
        el.textContent = msg;
    };

    // expose writer globally so other handlers can write to the page
    window.writeIpResult = write;

    try {
        const res = await getCurrentIp();
        write('getCurrentIpStrict result:\n' + JSON.stringify(res, null, 2));
    } catch (e) {
        write('getCurrentIpStrict error:\n' + (e && e.message ? e.message : String(e)));
    }
});
