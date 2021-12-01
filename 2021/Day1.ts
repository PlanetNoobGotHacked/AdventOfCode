//deno!

import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";

const file: string = Deno.args[0];
const textProto: TextProtoReader = new TextProtoReader(new BufReader(await Deno.open(file, {read: true})));

let count = 0;
let previousLine = 0;

while(true) {
    const line = await textProto.readLine();
    if(!line) break;
    const lineNumber = parseInt(line);

    if(!previousLine) { previousLine = lineNumber; continue; };

    if(lineNumber > previousLine) count++;

    previousLine = lineNumber;
}

console.log(count);