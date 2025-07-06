import { RegisteredCharacters } from "@drincs/pixi-vn";
import Character from "../models/Character";

export const mc = new Character("mc", {
    name: "Liam",
});

export const alice = new Character("alice", {
    name: "Alice",
    age: 25,
    icon: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/icon/Alice.webp",
    color: "#5a129e",
});

RegisteredCharacters.add([mc, alice]);
