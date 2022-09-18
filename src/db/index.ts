import Gun from "gun";
import "gun/sea";
import "gun/axe";

const SEA = Gun.SEA;

let gun = Gun({ localStorage:false, radisk: false }).get("succus-soccor").get("testing").get("noctisatrae").get("astro");

function HashNamespace (string) {
    return window.btoa(string);
}

export { gun, SEA, HashNamespace }
