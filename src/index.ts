import * as CryptoJs from "crypto-js";

/// maybe.. same to java of interface
interface HumanInterface {
    name: string,
    age: number,
    gender: string
}

/// Human class and implements HumanInterface
class Human implements HumanInterface {
    private _name: string;
    private _age: number;
    private _gender: string;

    constructor(name: string, age: number, gender: string) {
        this._name = name;
        this._age = age;
        this._gender = gender;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get gender(): string {
        return this._gender;
    }

    /// aged plus 1 age
    aged(): void {
        this._age += 1;
    }

    /// toString?
    sayHi(): void {
        console.log(`Hello ${this._name}, you are ${this._age}, you are a ${this._gender}`)
    }

}

const donghwan = new Human("donghwan", 29, "male");
// gender? => not require param, gender:string => require string type param
// function:void => return type is void
const sayHi = (person: HumanInterface): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}
console.log(sayHi(donghwan));
donghwan.aged()
donghwan.sayHi();

//////////////////////////////// block class stage

class Block {
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string => CryptoJs.SHA256(index + previousHash + timestamp + data).toString()

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string"

    private _index: number;
    private _hash: string;
    private _previousHash: string;
    private _data: string;
    private _timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this._index = index;
        this._hash = hash;
        this._previousHash = previousHash;
        this._data = data;
        this._timestamp = timestamp;
    }

    get index(): number {
        return this._index;
    }

    get hash(): string {
        return this._hash;
    }

    get previousHash(): string {
        return this._previousHash;
    }

    get data(): string {
        return this._data;
    }

    get timestamp(): number {
        return this._timestamp;
    }
}

const genesisBlock: Block = new Block(0, "202020202020202", "", "Hello", 123456);

let blockcahin: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blockcahin;
const getLatestBlock = (): Block => blockcahin[blockcahin.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimeStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp)
    return newBlock
}

const getHashforBlock = (aBlock : Block) : string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockcahin.push(candidateBlock)
    }
}

addBlock(createNewBlock("firstBlock"))
addBlock(createNewBlock("secondBlock"))

console.log(blockcahin)

export {} // know that 'it is module!'