import http from "k6/http";
import { sleep, check } from "k6";
import runSmoke from "./smoke.js";
import runSoak from "./soak.js";
import runStress from "./stress.js";

export default function() {
    runSmoke();
    sleep(1);
    runSoak();
    sleep(2);
    runStress();
};
