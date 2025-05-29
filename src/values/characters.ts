import { RegisteredCharacters } from "@drincs/pixi-vn";
import Character from "../models/Character";

export const mc = new Character("mc", {
    name: "Me",
});

export const alice = new Character("alice", {
    name: "Liam",
    surname: "Smith",
    age: 25,
    icon: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/icon/Alice.webp",
    color: "#5a129e",
});

RegisteredCharacters.add([mc, alice]);
