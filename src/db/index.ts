import Gun from "gun";

let gun = Gun({ peers: [
    'https://gun-manhattan.herokuapp.com/gun', 
    'https://gun-us.herokuapp.com/gun', 
    "https://gunpoint.herokuapp.com/gun"
], localStorage:false, radisk: false }).get("succus-soccor").get("testing").get("noctisatrae").get("astro");

function HashNamespace (string) {
    return window.btoa(string);
}

export { gun, HashNamespace }
