'use strict';
namespace MyUtil {
    export type Maybe<T> = T | null | undefined;
    export type ArrayKind<T> = Iterable<T> | ArrayLike<T>;
    export type MapKind<K, V> = Map<K, V> | ReadonlyMap<K, V>;
    export type SetKind<T> = Set<T> | ReadonlySet<T>;
    export type ElemProperty = { styles?: string, classes?: string[], id?: string, name?: string, textContent?: string, innerText?: string, innerHtml?: string, children?: readonly Element[], type?: string, checked?: boolean, htmlFor?: string, attribute?: KeyValuePair<string, string>[], oninput?: (e: Event) => void, onclick?: (e: MouseEvent) => void, onpointerdown?: (e: PointerEvent) => void };
    /**なにもしない関数です*/
    export const nothing = (): void => { };
    /**elemをそのまま返します*/
    export const identity = <T>(elem: T): T => elem;
    /**elemをcastして返します*/
    export const cast = <T1, T2>(elem: T1, castTypeConstructor: new () => T2): Maybe<T1 & T2> => elem instanceof castTypeConstructor ? elem : null;
    /**elemにfuncを適用して返します*/
    export const apply = <T, U>(elem: T, func: (elem: T) => U): U => func(elem);
    /**elemがnullでもundefinedでもない時にだけfuncを適用して返します*/
    export const maybeApply = <T, U>(elem: Maybe<T>, func: (elem: NonNullable<T>) => U): Maybe<U> => MyUtil.isJust(elem) ? MyUtil.apply(elem, func) : null;
    /**valueがnullでもundefinedでもないかを取得します TypeGuardが効きます*/
    export const isJust = <T>(value: T): value is NonNullable<T> => value != null;
    /**range(実数)未満の乱数を生成して返します*/
    export const random = (range: number): number => Math.random() * range;
    /**threshold(0~1の実数)の確率でtrueを返します*/
    export const judge = (threshold: number): boolean => Math.random() < threshold;
    /**重複を除きます*/
    export const unique = <T>(array: Readonly<ArrayKind<T>>): T[] => Array.from(new Set(Array.from(array)).values());
    /**指定した要素数を持つ指定したインデックスからの変換関数を適用したarrayを返します*/
    export const rangedArray = <T>(length: number, valueCreator: (index: number) => T): T[] => Array(length).fill(null).map((_, i) => i).map(valueCreator);
    /**arrayLikeの配列表現でのシャローコピーを返します 入力された配列やSetは変更されません*/
    export const toArray = <T>(arrayLike: ArrayKind<T>): T[] => Array.from(arrayLike);
    /**arrayの先頭からtakeNum長の要素の配列を取得します 入力された配列は変更されません*/
    export const take = <T>(array: Readonly<ArrayKind<T>>, takeNum: number): T[] => Array.from(array).slice(0, takeNum);
    /**arrayの先頭からtakeNum長の要素を除いた要素の配列を取得します 入力された配列は変更されません*/
    export const drop = <T>(array: Readonly<ArrayKind<T>>, dropNum: number): T[] => Array.from(array).slice(dropNum);
    /**arrayの数値合計を返します 入力された配列は変更されません*/
    export const sum = (array: Readonly<ArrayKind<number>>): number => Array.from(array).reduce((sum, element) => sum + element, 0);
    /**baseArrayのaddPosition番目にaddArrayを挿入して返します 入力された配列は変更されません*/
    export const insertArray = <T>(baseArray: Readonly<ArrayKind<T>>, addPosition: number, addArray: T[]): T[] => MyUtil.take(baseArray, addPosition).concat(addArray).concat(MyUtil.drop(baseArray, addPosition));
    /**arrayからnullとundefinedの要素を取り除いて返します 入力された配列は変更されません*/
    export const dropNull = <T>(array: Readonly<ArrayKind<Maybe<T>>>): T[] => Array.from(array).filter((item): item is T => MyUtil.isJust(item));
    /**mapのシャローコピーを返します 入力されたmapは変更されません*/
    export const copyMap = <K, V>(map: MapKind<K, V>): MapKind<K, V> => new Map(map);
    /**mapの指定したキーに対応する値に変換関数を適用したmapを返します 入力されたmapが変更されます*/
    export const changeMap = <K, V>(map: Map<K, V>, key: K, convertFunc: (arg: V) => V): Map<K, V> => MyUtil.maybeApply(map.get(key), elem => map.set(key, convertFunc(elem))) ?? map;
    /**mapの指定したキーに対応する値に変換関数を適用したmapを返します 入力されたmapは変更されません*/
    export const updateMap = <K, V>(map: MapKind<K, V>, key: K, convertFunc: (arg: V) => V): MapKind<K, V> => MyUtil.changeMap(new Map(map), key, convertFunc);
    /**mapの指定したキー配列に対応する値に変換関数を適用したmapを返します 入力されたmapは変更されません*/
    export const updatesMap = <K, V>(map: MapKind<K, V>, keys: Readonly<ArrayKind<K>>, convertFunc: (arg: V) => V): MapKind<K, V> => Array.from(keys).reduce((map, key) => MyUtil.changeMap(map, key, convertFunc), new Map(map));
    /**setの指定した値を取り除いたsetを返します 入力されたsetは変更されません*/
    export const removeSet = <T>(baseSet: SetKind<T>, removeElemsSet: SetKind<T>): SetKind<T> => new Set([...baseSet].filter(item => !removeElemsSet.has(item)));
    /**mapの指定したキーを取り除いたmapを返します 入力されたmapは変更されません*/
    export const removeMap = <K, V>(baseMap: MapKind<K, V>, removeKeysSet: SetKind<K>): MapKind<K, V> => new Map([...baseMap].filter(([key]) => !removeKeysSet.has(key)));
    /**指定したset配列を結合したsetを返します 入力されたsetは変更されません*/
    export const unionSet = <T>(baseSet: SetKind<T>, ...addSets: readonly SetKind<T>[]): SetKind<T> => new Set([...baseSet].concat(addSets.map(item => [...item]).flat()));
    /**指定したmap配列を結合したmapを返します 入力されたmapは変更されません*/
    export const unionMap = <K, V>(baseMap: MapKind<K, V>, ...addMaps: readonly MapKind<K, V>[]): MapKind<K, V> => new Map([...baseMap].concat(addMaps.map(item => [...item]).flat()));
    /**mapの指定したポジションに指定したmapを挿入したmapを返します 入力されたmapは変更されません*/
    export const insertMap = <K, V>(baseMap: MapKind<K, V>, position: number, addMap: MapKind<K, V>): MapKind<K, V> => new Map(MyUtil.insertArray([...baseMap], position, [...addMap]));
    export const ToReadonlyMap = <K, V>(elems: Readonly<MapKind<K, V>> | Readonly<ArrayKind<[K, V]>>): ReadonlyMap<K, V> => new Map(Array.from(elems));
    export const ToReadonlySet = <V>(elems: Readonly<SetKind<V>> | Readonly<ArrayKind<V>>): ReadonlySet<V> => new Set(Array.from(elems));
    /**2つのarrayをzipして返します 入力されたarrayは変更されません*/
    export const zip = <T1, T2>(array1: Readonly<ArrayKind<T1>>, array2: Readonly<ArrayKind<T2>>): [Maybe<T1>, Maybe<T2>][] => MyUtil.rangedArray(Math.max(Array.from(array1).length, Array.from(array2).length), (index) => [Array.from(array1).at(index), Array.from(array2).at(index)] as const);
    export const scan = <T1, T2>(scanArray: Readonly<ArrayKind<T1>>, scanFunc: (previousValue: T2, currentValue: T1) => T2, initValue: T2) => Array.from(scanArray).map((_, index) => MyUtil.take(scanArray, index + 1).reduce(scanFunc, initValue));
    /**arrayの先頭を返します 入力されたarrayは変更されません*/
    export const pickHead = <T>(array: Readonly<ArrayKind<T>>): Maybe<T> => Array.from(array).at(0);
    /**arrayの末尾を返します 入力されたarrayは変更されません*/
    export const pickTail = <T>(array: Readonly<ArrayKind<T>>): Maybe<T> => Array.from(array).at(-1);
    /**arrayの要素のうちランダムに一つを返します 入力されたarrayは変更されません*/
    export const pickAny = <T>(array: Readonly<ArrayKind<T>>): KeyValuePair<boolean, T> => MyUtil.apply(Array.from(array).at(Math.floor(MyUtil.random(Array.from(array).length))), item => item != null ? new KeyValuePair(true, item) : new KeyValuePair(false, null!));
    /**arrayの要素から指定した要素と等価のもの最初の1つを除いたものを返します 入力されたarrayは変更されません*/
    export const removeOne = <T>(array: Readonly<ArrayKind<T>>, removeElem: T): T[] => Array.from(array).toSpliced(Array.from(array).findIndex(elem => elem == removeElem), 1);
    /**arrayの要素から指定した要素と等価のもの全てを除いたものを返します 入力されたarrayは変更されません*/
    export const removeAll = <T>(array: Readonly<ArrayKind<T>>, removeElem: T): T[] => Array.from(array).filter(elem => elem != removeElem);    
    /**arrayの要素から指定した要素と等価のもの最初の1つを除いたものを返します 入力されたarrayは変更されません*/
    export const removeOnes = <T>(array: Readonly<ArrayKind<T>>, removeElems: Readonly<ArrayKind<T>>): T[] => Array.from(array).toSpliced(Array.from(array).findIndex(elem => Array.from(removeElems).includes(elem)), 1);
    /**arrayの要素から指定した要素と等価のもの全てを除いたものを返します 入力されたarrayは変更されません*/
    export const removeAlls = <T>(array: Readonly<ArrayKind<T>>, removeElems: Readonly<ArrayKind<T>>): T[] => Array.from(array).filter(elem => !Array.from(removeElems).includes(elem));
    /**オブジェクトのfreezeを内部まで行います*/
    export const deepFreeze = <T>(elem: T): Readonly<T> => ((elem: unknown): elem is object => !Object.isFrozen(elem))(elem) ? (elem => { for (const propName of Reflect.ownKeys(elem) as (keyof typeof elem)[]) { deepFreeze(elem[propName]); } return Object.freeze(elem); })(elem) : elem;
    /**ミリ秒単位で指定した期間プログラム実行を待機します*/
    export const wait = async (waitTimeMillisecond: number): Promise<void> => new Promise(resolve => setTimeout(resolve, waitTimeMillisecond));
    export const fractionTextToNumber = (fractionText: string) => MyUtil.apply(fractionText.split('/'), ([numerator, denominator]) => Number(numerator) / Number(denominator));
    export class CreateElem {
        private static setStyles = <T extends HTMLElement>(elem: T, styles: Maybe<string>): T => { if (styles != null) { elem.style.cssText = styles; } return elem; }
        private static setClasses = <T extends HTMLElement>(elem: T, classes: Maybe<string[]>): T => { if (classes != null) { elem.className = classes.join(' '); } return elem; }
        private static setId = <T extends HTMLElement>(elem: T, id: Maybe<string>): T => { if (id != null) { elem.id = id; } return elem; }
        private static setName = <T extends HTMLElement>(elem: T, name: Maybe<string>): T => { if (name != null && 'name' in elem) { elem.name = name; } return elem; }
        private static setTextcontent = <T extends HTMLElement>(elem: T, text: Maybe<string>): T => { if (text != null) { elem.textContent = text; } return elem; }
        private static setInnertext = <T extends HTMLElement>(elem: T, text: Maybe<string>): T => { if (text != null) { elem.innerText = text; } return elem; }
        private static setInnerHtml = <T extends HTMLElement>(elem: T, text: Maybe<string>): T => { if (text != null) { elem.innerHTML = text; } return elem; }
        private static setChildren = <T extends HTMLElement>(elem: T, items: Maybe<Readonly<ArrayKind<Node>>>): T => { if (items != null) { elem.replaceChildren(...Array.from(items)); } return elem; }
        private static setType = <T extends HTMLElement>(elem: T, type: Maybe<string>): T => { if (type != null && 'type' in elem) { elem.type = type; } return elem; }
        private static setChecked = <T extends HTMLElement>(elem: T, checked: Maybe<boolean>): T => { if (checked != null && 'checked' in elem) { elem.checked = checked; } return elem; }
        private static setHtmlfor = <T extends HTMLElement>(elem: T, htmlfor: Maybe<string>): T => { if (htmlfor != null && 'htmlfor' in elem) { elem.htmlfor = htmlfor; } return elem; }
        private static setAttribute = <T extends HTMLElement>(elem: T, attributes: Maybe<KeyValuePair<string, string>[]>): T => { if (attributes != null) { attributes.map(attribute => elem.setAttribute(attribute.key, attribute.value)); } return elem; }
        private static setOninput = <T extends HTMLElement>(elem: T, oninput: Maybe<(e: Event) => void>): T => { if (oninput != null) { elem.oninput = oninput; } return elem; }
        private static setOnclick = <T extends HTMLElement>(elem: T, onclick: Maybe<(e: MouseEvent) => void>): T => { if (onclick != null) { elem.onclick = onclick; } return elem; }
        private static setOnpointerdown = <T extends HTMLElement>(elem: T, onpointerdown: Maybe<(e: PointerEvent) => void>): T => { if (onpointerdown != null) { elem.onpointerdown = onpointerdown; } return elem; }
        private static sets = <T extends HTMLElement>(elem: T, prop: ElemProperty) => {
            CreateElem.setStyles(elem, prop.styles), CreateElem.setClasses(elem, prop.classes); CreateElem.setId(elem, prop.id); CreateElem.setName(elem, prop.name); CreateElem.setTextcontent(elem, prop.textContent); CreateElem.setInnertext(elem, prop.innerText); CreateElem.setInnerHtml(elem, prop.innerHtml);
            CreateElem.setChildren(elem, prop.children); CreateElem.setType(elem, prop.type); CreateElem.setChecked(elem, prop.checked); CreateElem.setHtmlfor(elem, prop.htmlFor); CreateElem.setAttribute(elem, prop.attribute);
            CreateElem.setOninput(elem, prop.oninput); CreateElem.setOnclick(elem, prop.onclick); CreateElem.setOnpointerdown(elem, prop.onpointerdown); return elem;
        };
        public static label = (elemProperty: ElemProperty): HTMLLabelElement => CreateElem.sets(document.createElement('label'), elemProperty);
        public static panel = (elemProperty: ElemProperty): HTMLDivElement => CreateElem.sets(document.createElement('div'), elemProperty);
        public static button = (elemProperty: ElemProperty): HTMLButtonElement => CreateElem.sets(document.createElement('button'), elemProperty);
        public static input = (elemProperty: ElemProperty): HTMLInputElement => CreateElem.sets(document.createElement('input'), elemProperty);
        public static check = (elemProperty: ElemProperty): HTMLDivElement => CreateElem.panel({ styles: elemProperty.styles, classes: elemProperty.classes, attribute: elemProperty.attribute, children: [CreateElem.input({ id: elemProperty.id, type: 'checkbox', checked: elemProperty.checked, oninput: elemProperty.oninput, name: elemProperty.name }), CreateElem.label({ textContent: elemProperty.textContent, innerText: elemProperty.innerText, innerHtml: elemProperty.innerHtml, htmlFor: elemProperty.id })] });
        public static radio = (elemProperty: ElemProperty): HTMLDivElement => CreateElem.panel({ styles: elemProperty.styles, classes: elemProperty.classes, attribute: elemProperty.attribute, children: [CreateElem.input({ id: elemProperty.id, type: 'radio', checked: elemProperty.checked, oninput: elemProperty.oninput, name: elemProperty.name }), CreateElem.label({ textContent: elemProperty.textContent, innerText: elemProperty.innerText, innerHtml: elemProperty.innerHtml, htmlFor: elemProperty.id })] });
        public static slider = (elemProperty: ElemProperty): HTMLInputElement => CreateElem.input({ ...elemProperty, type: 'range' });
        public static select = (elemProperty: ElemProperty): HTMLSelectElement => CreateElem.sets(document.createElement('select'), elemProperty);
        public static selectorOption = (elemProperty: ElemProperty): HTMLOptionElement => CreateElem.sets(document.createElement('option'), elemProperty);
        public static textarea = (elemProperty: ElemProperty) => CreateElem.sets(document.createElement('textarea'), elemProperty);
    }
    export class KeyValuePair<T1, T2> {
        public readonly key: T1;
        public readonly value: T2;
        constructor(key: T1, value: T2) {
            this.key = key;
            this.value = value;
        }
    }
}
class WrapText {
    public readonly text: string;
    constructor(text: string) {
        this.text = text;
    }
}
class Cell extends WrapText { }
class Country extends WrapText { }
class Person extends WrapText { }
class AttackJudge extends WrapText { }
class GameInfo {
    public static readonly name = '悲愴三国志Zero バージョン3';
    public static readonly version = '1.6';
}
class GameSetting {
    public static scaleLevel = 0;
    public static isLogOpen = false;
    public static isInfoOpen = false;
    public static isHideOther = false;
    public static isShowTurnLog = true;
    public static isAutoSave = false;
}
class GameParam {
     public countryInfoMap: Map<Country, CountryInfo> = new Map();
    public countryPersonMap: Map<Country, Map<Person, PersonInfo>> = new Map();
    public cellCountryMap: Map<Cell, Country> = new Map();
    public cellPersonMap: Map<Cell, MyUtil.Maybe<Person>> = new Map();
    public playTurn: MyUtil.Maybe<number> = null;
    public maybePlayCountry: MyUtil.Maybe<Country> = null;
    public isTurnProcessing: boolean = false;
    public playerMaxCellNum: number = 0;
    public turnLog: string[] = [];
    public gameLog: string = '';
    constructor() {
        this.init();
    }
    init() {
        this.countryInfoMap = new Map(Countrys.list.map(country => [country, new CountryInfo(null, null, 0)]));
        this.countryPersonMap = new Map();
        this.cellCountryMap = new Map(ConstData.cellCountryMap);
        this.cellPersonMap = new Map();
        this.playTurn = null;
        this.maybePlayCountry = null;
        this.isTurnProcessing = false;
        this.playerMaxCellNum = 0;
        this.turnLog = [];
        this.gameLog = '';
    }
}
class CountryInfo {
    public readonly attackTarget: MyUtil.Maybe<Cell>;
    public readonly attackPerson: MyUtil.Maybe<Person>;
    public readonly sleepTurnNum: number;
    constructor(attackTarget: Readonly<MyUtil.Maybe<Cell>>, attackPerson: MyUtil.Maybe<Person>, sleepTurnNum: number) {
        this.attackTarget = attackTarget;
        this.attackPerson = attackPerson;
        this.sleepTurnNum = sleepTurnNum;
    }
}
class CellInfo {
    public readonly position: CellPosition;
    public readonly roadConnection: RoadConnection;
    constructor(position: Readonly<CellPosition>, roadConnection: Readonly<RoadConnection>) {
        this.position = position;
        this.roadConnection = roadConnection;
    }
}
class CellPosition {
    static readonly xMin = -20;
    static readonly yMin = -20;
    static readonly xMax = 450;
    static readonly yMax = 400;
    static readonly gameElemWidthScale = 100 / (CellPosition.xMax - CellPosition.xMin);
    static readonly gameElemHeightScale = 100 / (CellPosition.yMax - CellPosition.yMin);
    public readonly left: number;
    public readonly top: number;
    public readonly width: number;
    public readonly height: number;
    constructor(left: number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
class RoadConnection {
    public readonly values: readonly Cell[];
    constructor(values: readonly Readonly<Cell>[]) {
        this.values = values;
    }
}

class PersonInfo {
    public readonly rank: number;
    public readonly birthYear: number;
    public readonly deathYear: number;
    public readonly overrideJoinYear: MyUtil.Maybe<number>;
    constructor(rank: number, birthYear: number, deathYear: number, overrideJoinYear?: number) {
        this.rank = rank;
        this.birthYear = birthYear;
        this.deathYear = deathYear;
        this.overrideJoinYear = overrideJoinYear;
    }
}
class Cells {
    public static readonly yuusyuu = new Cell('幽州');
    public static readonly kihei = new Cell('冀并');
    public static readonly seizyo = new Cell('青徐');
    public static readonly sisyuu = new Cell('司州');
    public static readonly enyo = new Cell('兗豫');
    public static readonly youryou = new Cell('雍涼');
    public static readonly keihoku = new Cell('荊北');
    public static readonly keinan = new Cell('荊南');
    public static readonly youhoku = new Cell('揚北');
    public static readonly younan = new Cell('揚南');
    public static readonly kousyuuhigashi = new Cell('広州');
    public static readonly kousyuunishi = new Cell('交州');
    public static readonly ekihoku = new Cell('益北');
    public static readonly ekityuu = new Cell('益中');
    public static readonly ekinan = new Cell('益南');
    public static readonly nanban = new Cell('南蛮');
    public static readonly isyuu = new Cell('夷州');
    public static readonly kitakyoudo = new Cell('北匈奴');
    public static readonly kyou = new Cell('羌');
    public static readonly tei = new Cell('氐');
    public static readonly minamikyoudo = new Cell('南匈奴');
    public static readonly senpinishi = new Cell('鮮卑西');
    public static readonly senpihigashi = new Cell('鮮卑東');
    public static readonly ugan = new Cell('烏丸');
    public static readonly list = MyUtil.deepFreeze([
        this.yuusyuu, this.kihei, this.seizyo, this.sisyuu, this.enyo, this.youryou, this.keihoku, this.keinan, this.youhoku, this.younan, this.kousyuuhigashi, this.kousyuunishi, this.ekihoku, this.ekityuu, this.ekinan,
        this.nanban, this.isyuu, this.kitakyoudo, this.kyou, this.tei, this.minamikyoudo, this.senpinishi, this.senpihigashi, this.ugan
    ]);
}
class Countrys {
    public static readonly gi = new Country('魏');
    public static readonly go = new Country('呉');
    public static readonly syokukan = new Country('蜀漢');
    public static readonly en = new Country('燕');
    public static readonly si = new Country('士氏');
    public static readonly nanban = new Country('南蛮');
    public static readonly toui = new Country('東夷');
    public static readonly kitakyoudo = new Country('北匈奴');
    public static readonly kyou = new Country('羌');
    public static readonly tei = new Country('氐');
    public static readonly minamikyoudo = new Country('南匈奴');
    public static readonly senpi = new Country('鮮卑');
    public static readonly ugan = new Country('烏丸');
    public static readonly list = MyUtil.deepFreeze([this.gi, this.go, this.syokukan, this.en, this.si, this.nanban, this.toui, this.kitakyoudo, this.kyou, this.tei, this.minamikyoudo, this.senpi, this.ugan]);
}
class AttackJudges {
    public static readonly crushing = new AttackJudge('大勝');
    public static readonly win = new AttackJudge('辛勝');
    public static readonly defeat = new AttackJudge('惜敗');
    public static readonly rout = new AttackJudge('大敗');
    public static readonly list = MyUtil.deepFreeze([this.crushing, this.win, this.defeat, this.rout]);
}
class ConstData {
    public static readonly startYear = 225;
    public static readonly endYear = 275;
    public static readonly joinAge = 16;
    public static readonly yearItems = MyUtil.deepFreeze(['春', '夏', '秋', '冬']);
    public static readonly blockBattleJudges = MyUtil.ToReadonlyMap([
        new MyUtil.KeyValuePair(-3, [4, 5, 58, 100]),
        new MyUtil.KeyValuePair(-2, [6, 10, 62, 100]),
        new MyUtil.KeyValuePair(-1, [8, 15, 66, 100]),
        new MyUtil.KeyValuePair(0, [10, 20, 70, 100]),
        new MyUtil.KeyValuePair(1, [12, 25, 74, 100]),
        new MyUtil.KeyValuePair(2, [14, 30, 78, 100]),
        new MyUtil.KeyValuePair(3, [16, 35, 82, 100])
    ].map((threshold => [threshold.key, MyUtil.zip(AttackJudges.list, threshold.value).map(([attackJudge, threshold]) => new MyUtil.KeyValuePair(attackJudge, threshold))])));
    public static readonly normalBattleJudgesMap = MyUtil.ToReadonlyMap([
        new MyUtil.KeyValuePair(-3, [4, 10, 84, 100]),
        new MyUtil.KeyValuePair(-2, [6, 20, 86, 100]),
        new MyUtil.KeyValuePair(-1, [8, 30, 88, 100]),
        new MyUtil.KeyValuePair(0, [10, 40, 90, 100]),
        new MyUtil.KeyValuePair(1, [12, 50, 92, 100]),
        new MyUtil.KeyValuePair(2, [14, 60, 94, 100]),
        new MyUtil.KeyValuePair(3, [16, 70, 96, 100])
    ].map((threshold => [threshold.key, MyUtil.zip(AttackJudges.list, threshold.value).map(([attackJudge, threshold]) => new MyUtil.KeyValuePair(attackJudge, threshold))])));
    public static readonly personMap = MyUtil.ToReadonlyMap([
        [new Person('徐晃'), new PersonInfo(1, 165, 228)],
        [new Person('張郃'), new PersonInfo(1, 167, 231)],
        [new Person('許褚'), new PersonInfo(1, 169, 226)],
        [new Person('曹洪'), new PersonInfo(1, 169, 232)],
        [new Person('田豫'), new PersonInfo(1, 171, 252)],
        [new Person('曹休'), new PersonInfo(1, 174, 228)],
        [new Person('王異'), new PersonInfo(1, 177, 235)],
        [new Person('司馬懿'), new PersonInfo(3, 179, 251)],
        [new Person('郝昭'), new PersonInfo(1, 185, 229)],
        [new Person('曹真'), new PersonInfo(2, 185, 231)],
        [new Person('王基'), new PersonInfo(1, 190, 261)],
        [new Person('鄧艾'), new PersonInfo(2, 197, 264)],
        [new Person('毌丘倹'), new PersonInfo(1, 202, 255)],
        [new Person('王濬'), new PersonInfo(1, 206, 285)],
        [new Person('張特'), new PersonInfo(1, 209, 265)],
        [new Person('羊祜'), new PersonInfo(2, 221, 278)],
        [new Person('杜預'), new PersonInfo(2, 222, 284)],
        [new Person('文鴦'), new PersonInfo(1, 222, 285)],
        [new Person('鍾会'), new PersonInfo(2, 225, 264)],
        [new Person('胡烈'), new PersonInfo(1, 225, 272)],
        [new Person('馬隆'), new PersonInfo(1, 231, 303)],
        [new Person('呂岱'), new PersonInfo(1, 161, 256)],
        [new Person('賀斉'), new PersonInfo(1, 171, 227)],
        [new Person('趙達'), new PersonInfo(1, 171, 230)],
        [new Person('呉範'), new PersonInfo(1, 176, 226)],
        [new Person('徐盛'), new PersonInfo(1, 177, 228)],
        [new Person('歩騭'), new PersonInfo(1, 177, 247)],
        [new Person('朱然'), new PersonInfo(1, 182, 249)],
        [new Person('陸遜'), new PersonInfo(2, 183, 245)],
        [new Person('留賛'), new PersonInfo(1, 183, 255)],
        [new Person('凌統'), new PersonInfo(1, 189, 237)],
        [new Person('丁奉'), new PersonInfo(1, 190, 271)],
        [new Person('諸葛恪'), new PersonInfo(2, 203, 253)],
        [new Person('全端'), new PersonInfo(1, 204, 261)],
        [new Person('鍾離牧'), new PersonInfo(1, 214, 269)],
        [new Person('陸抗'), new PersonInfo(2, 226, 274)],
        [new Person('陶璜'), new PersonInfo(1, 232, 290)],
        [new Person('吾彦'), new PersonInfo(1, 235, 297)],
        [new Person('趙雲'), new PersonInfo(1, 168, 229)],
        [new Person('李厳'), new PersonInfo(1, 168, 234)],
        [new Person('廖化'), new PersonInfo(1, 170, 264)],
        [new Person('魏延'), new PersonInfo(2, 175, 234)],
        [new Person('諸葛亮'), new PersonInfo(3, 181, 234)],
        [new Person('馬忠'), new PersonInfo(1, 187, 249)],
        [new Person('張翼'), new PersonInfo(1, 188, 264)],
        [new Person('馬謖'), new PersonInfo(1, 190, 228)],
        [new Person('張嶷'), new PersonInfo(1, 190, 254)],
        [new Person('張苞'), new PersonInfo(1, 198, 229)],
        [new Person('関興'), new PersonInfo(1, 199, 234)],
        [new Person('姜維'), new PersonInfo(2, 202, 264, 227)],
        [new Person('羅憲'), new PersonInfo(1, 218, 270)],
        [new Person('卑衍'), new PersonInfo(1, 196, 238)],
        [new Person('綸直'), new PersonInfo(1, 197, 237)],
        [new Person('賈範'), new PersonInfo(1, 202, 237)],
        [new Person('衛演'), new PersonInfo(1, 220, 238)],
        [new Person('士燮'), new PersonInfo(2, 137, 226)],
        [new Person('士徽'), new PersonInfo(1, 165, 226)],
        [new Person('桓鄰'), new PersonInfo(1, 173, 226)],
        [new Person('甘醴'), new PersonInfo(1, 180, 227)],
        [new Person('雍闓'), new PersonInfo(1, 181, 225)],
        [new Person('孟獲'), new PersonInfo(1, 186, 250)],
        [new Person('朱褒'), new PersonInfo(1, 187, 225)],
        [new Person('高定'), new PersonInfo(1, 188, 251)],
        [new Person('東夷長'), new PersonInfo(1, 210, 260)],
        [new Person('白虎文'), new PersonInfo(1, 210, 275)],
        [new Person('薬蘭泥'), new PersonInfo(1, 220, 280)],
        [new Person('迷当'), new PersonInfo(1, 202, 253)],
        [new Person('治無戴'), new PersonInfo(1, 200, 247)],
        [new Person('餓何'), new PersonInfo(1, 210, 247)],
        [new Person('焼戈'), new PersonInfo(1, 215, 247)],
        [new Person('強端'), new PersonInfo(1, 168, 237)],
        [new Person('千万'), new PersonInfo(1, 174, 263)],
        [new Person('劉豹'), new PersonInfo(1, 185, 279)],
        [new Person('劉猛'), new PersonInfo(1, 200, 272)],
        [new Person('劉淵'), new PersonInfo(2, 251, 310)],
        [new Person('軻比能'), new PersonInfo(2, 172, 235)],
        [new Person('歩度根'), new PersonInfo(1, 170, 233)],
        [new Person('泄帰泥'), new PersonInfo(1, 192, 255)],
        [new Person('鬱築鞬'), new PersonInfo(1, 200, 228)],
        [new Person('樹機能'), new PersonInfo(3, 230, 279)],
        [new Person('護留'), new PersonInfo(1, 180, 240)],
        [new Person('寇婁敦'), new PersonInfo(1, 180, 245)],
        [new Person('阿羅槃'), new PersonInfo(1, 185, 250)],
    ]);
    public static readonly cellCountryMap = MyUtil.ToReadonlyMap([
        [Cells.yuusyuu, Countrys.en],
        [Cells.kihei, Countrys.gi],
        [Cells.seizyo, Countrys.gi],
        [Cells.sisyuu, Countrys.gi],
        [Cells.enyo, Countrys.gi],
        [Cells.youryou, Countrys.gi],
        [Cells.keihoku, Countrys.gi],
        [Cells.keinan, Countrys.go],
        [Cells.youhoku, Countrys.go],
        [Cells.younan, Countrys.go],
        [Cells.kousyuuhigashi, Countrys.go],
        [Cells.kousyuunishi, Countrys.si],
        [Cells.ekihoku, Countrys.syokukan],
        [Cells.ekityuu, Countrys.syokukan],
        [Cells.ekinan, Countrys.syokukan],
        [Cells.nanban, Countrys.nanban],
        [Cells.isyuu, Countrys.toui],
        [Cells.kitakyoudo, Countrys.kitakyoudo],
        [Cells.kyou, Countrys.kyou],
        [Cells.tei, Countrys.tei],
        [Cells.minamikyoudo, Countrys.minamikyoudo],
        [Cells.senpinishi, Countrys.senpi],
        [Cells.senpihigashi, Countrys.senpi],
        [Cells.ugan, Countrys.ugan],
    ]);
    static readonly cellInfoMap = new Map([
        [Cells.yuusyuu, new CellInfo(new CellPosition(330, 40, 120, 55), new RoadConnection([Cells.kihei, Cells.senpihigashi, Cells.ugan]))],
        [Cells.kihei, new CellInfo(new CellPosition(240, 40, 85, 85), new RoadConnection([Cells.yuusyuu, Cells.seizyo, Cells.sisyuu, Cells.enyo, Cells.minamikyoudo, Cells.senpihigashi]))],
        [Cells.seizyo, new CellInfo(new CellPosition(325, 115, 75, 75), new RoadConnection([Cells.kihei, Cells.enyo, Cells.youhoku]))],
        [Cells.sisyuu, new CellInfo(new CellPosition(135, 110, 105, 65), new RoadConnection([Cells.kihei, Cells.enyo, Cells.keihoku, Cells.youryou, Cells.minamikyoudo]))],
        [Cells.enyo, new CellInfo(new CellPosition(245, 130, 75, 60), new RoadConnection([Cells.kihei, Cells.seizyo, Cells.sisyuu, Cells.youhoku]))],
        [Cells.youryou, new CellInfo(new CellPosition(50, 40, 80, 115), new RoadConnection([Cells.sisyuu, Cells.ekihoku, Cells.kitakyoudo, Cells.kyou, Cells.tei, Cells.minamikyoudo, Cells.senpinishi]))],
        [Cells.keihoku, new CellInfo(new CellPosition(135, 180, 110, 60), new RoadConnection([Cells.sisyuu, Cells.keinan, Cells.youhoku, Cells.ekihoku]))],
        [Cells.keinan, new CellInfo(new CellPosition(135, 245, 120, 70), new RoadConnection([Cells.keihoku, Cells.younan, Cells.kousyuunishi, Cells.ekityuu, Cells.ekinan]))],
        [Cells.youhoku, new CellInfo(new CellPosition(250, 195, 135, 55), new RoadConnection([Cells.seizyo, Cells.enyo, Cells.keihoku, Cells.younan]))],
        [Cells.younan, new CellInfo(new CellPosition(260, 255, 125, 55), new RoadConnection([Cells.keinan, Cells.youhoku, Cells.kousyuuhigashi, Cells.isyuu]))],
        [Cells.kousyuuhigashi, new CellInfo(new CellPosition(245, 315, 105, 55), new RoadConnection([Cells.younan, Cells.kousyuunishi, Cells.isyuu]))],
        [Cells.kousyuunishi, new CellInfo(new CellPosition(135, 320, 105, 70), new RoadConnection([Cells.keinan, Cells.kousyuuhigashi, Cells.ekinan, Cells.nanban]))],
        [Cells.ekihoku, new CellInfo(new CellPosition(50, 160, 80, 60), new RoadConnection([Cells.youryou, Cells.keihoku, Cells.ekityuu, Cells.tei]))],
        [Cells.ekityuu, new CellInfo(new CellPosition(-20, 225, 150, 55), new RoadConnection([Cells.keinan, Cells.ekihoku, Cells.ekinan, Cells.tei]))],
        [Cells.ekinan, new CellInfo(new CellPosition(-20, 285, 150, 55), new RoadConnection([Cells.keinan, Cells.kousyuunishi, Cells.ekityuu, Cells.nanban]))],
        [Cells.nanban, new CellInfo(new CellPosition(-20, 345, 150, 55), new RoadConnection([Cells.kousyuunishi, Cells.ekinan]))],
        [Cells.isyuu, new CellInfo(new CellPosition(380, 325, 70, 75), new RoadConnection([Cells.younan, Cells.kousyuuhigashi]))],
        [Cells.kitakyoudo, new CellInfo(new CellPosition(-20, -20, 100, 55), new RoadConnection([Cells.youryou, Cells.kyou, Cells.senpinishi]))],
        [Cells.kyou, new CellInfo(new CellPosition(-20, 40, 65, 90), new RoadConnection([Cells.youryou, Cells.kitakyoudo, Cells.tei]))],
        [Cells.tei, new CellInfo(new CellPosition(-20, 135, 65, 85), new RoadConnection([Cells.youryou, Cells.ekihoku, Cells.ekityuu, Cells.kyou]))],
        [Cells.minamikyoudo, new CellInfo(new CellPosition(135, 40, 100, 65), new RoadConnection([Cells.kihei, Cells.sisyuu, Cells.youryou, Cells.senpinishi]))],
        [Cells.senpinishi, new CellInfo(new CellPosition(85, -20, 130, 55), new RoadConnection([Cells.youryou, Cells.kitakyoudo, Cells.minamikyoudo, Cells.senpihigashi]))],
        [Cells.senpihigashi, new CellInfo(new CellPosition(220, -20, 130, 55), new RoadConnection([Cells.yuusyuu, Cells.kihei, Cells.senpinishi, Cells.ugan]))],
        [Cells.ugan, new CellInfo(new CellPosition(355, -20, 95, 55), new RoadConnection([Cells.yuusyuu, Cells.senpihigashi]))],
    ]);
    static readonly countryPersonMap = MyUtil.apply(new Map([
        [Countrys.gi, 21],
        [Countrys.go, 17],
        [Countrys.syokukan, 13],
        [Countrys.en, 4],
        [Countrys.si, 4],
        [Countrys.nanban, 4],
        [Countrys.toui, 1],
        [Countrys.kitakyoudo, 2],
        [Countrys.kyou, 4],
        [Countrys.tei, 2],
        [Countrys.minamikyoudo, 3],
        [Countrys.senpi, 5],
        [Countrys.ugan, 3],
    ]), countryPersonNum => new Map(Array.from(countryPersonNum).map(([country,personNum],index)=>[country,MyUtil.dropNull(MyUtil.rangedArray(personNum, i =>  Array.from(ConstData.personMap).at(MyUtil.sum(Array.from(countryPersonNum.values()).slice(0, index))+i)))])));
}
class UIOperation {
    private static readonly getElementById = (...texts: string[]) => document.getElementById(texts.join(''));
    private static readonly getElementsByClassName = (...texts: string[]) =>Array.from(document.getElementsByClassName(texts.join(''))).map(v=>MyUtil.cast(v,HTMLElement));
    private static readonly logCaptionPressedAction = () => {
        if (GameSetting.isLogOpen) {
            UIOperation.maybeLogScrollPanel?.classList.add('hide');
            GameSetting.isLogOpen = false;
        } else {
            UIOperation.maybeLogScrollPanel?.classList.remove('hide');
            GameSetting.isLogOpen = true;
            UIOperation.maybeInfoScrollPanel?.classList.add('hide');
            GameSetting.isInfoOpen = false;
        }
    }
    private static readonly infoCaptionPressedAction = () => {
        if (GameSetting.isInfoOpen) {
            UIOperation.maybeInfoScrollPanel?.classList.add('hide');
            GameSetting.isInfoOpen = false;
        } else {
            UIOperation.maybeInfoScrollPanel?.classList.remove('hide');
            GameSetting.isInfoOpen = true;
            UIOperation.maybeLogScrollPanel?.classList.add('hide');
            GameSetting.isLogOpen = false;
        }
    }
    private static readonly captionPressedAction = (elem:HTMLElement) => {
        const target=MyUtil.cast(elem.parentElement?.lastElementChild,HTMLElement);
        if(target?.classList.contains('hide')){
            target?.classList.remove('hide');
        }else{
            target?.classList.add('hide');
        }
    }
    private static readonly hideOtherPressedAction = () => {
        const maybeOperationsPanel = UIOperation.getElementById('operationsPanel');
        const maybeExplainPanel = UIOperation.getElementById('explainPanel');
        const maybePersonDataPanel = UIOperation.getElementById('personDataPanel');
        const maybeChangeLogPanel = UIOperation.getElementById('changeLogPanel');
        const maybeParentDocHead = MyUtil.pickHead(window.parent.document.getElementsByTagName('header'));
        const maybeParentDocFoot = MyUtil.pickHead(window.parent.document.getElementsByTagName('footer'));
        const maybeParentDocGameVersionSelectorPanel = window.parent.document.getElementById('gameVersionSelectorPanel');
        if (GameSetting.isHideOther) {
            maybeOperationsPanel?.classList.remove('hide');
            maybeExplainPanel?.classList.remove('hide');
            maybePersonDataPanel?.classList.remove('hide');
            maybeChangeLogPanel?.classList.remove('hide');
            document.documentElement?.classList.replace('fit', 'fix');
            MyUtil.maybeApply(UIOperation.maybeBoardPanel, boardPanel => boardPanel.classList.replace('fit', 'fix'));
            MyUtil.maybeApply(UIOperation.maybeMapScrollPanel, boardPanel => boardPanel.classList.replace('fit', 'fix'));
            MyUtil.maybeApply(UIOperation.maybePieceStockContentPanel, boardPanel => boardPanel.classList.replace('fit', 'fix'));
            MyUtil.maybeApply(UIOperation.maybeHideOtherButton, hideOtherButton => hideOtherButton.textContent = '▲');
            MyUtil.maybeApply(maybeParentDocHead, parentDocHead => parentDocHead.style.display = '');
            MyUtil.maybeApply(maybeParentDocFoot, parentDocFoot => parentDocFoot.style.display = '');
            MyUtil.maybeApply(maybeParentDocGameVersionSelectorPanel, gameVersionSelectorPanel => gameVersionSelectorPanel.style.display = '');
            document.body.classList.add('clampWidth');
            GameSetting.isHideOther = false;
        } else {
            maybeOperationsPanel?.classList.add('hide');
            maybeExplainPanel?.classList.add('hide');
            maybePersonDataPanel?.classList.add('hide');
            maybeChangeLogPanel?.classList.add('hide');
            document.documentElement.classList.replace('fix', 'fit');
            MyUtil.maybeApply(UIOperation.maybeBoardPanel, boardPanel => boardPanel.classList.replace('fix', 'fit'));
            MyUtil.maybeApply(UIOperation.maybeMapScrollPanel, boardPanel => boardPanel.classList.replace('fix', 'fit'));
            MyUtil.maybeApply(UIOperation.maybePieceStockContentPanel, boardPanel => boardPanel.classList.replace('fix', 'fit'));
            MyUtil.maybeApply(UIOperation.maybeHideOtherButton, hideOtherButto => hideOtherButto.textContent = '▼');
            MyUtil.maybeApply(maybeParentDocHead, parentDocHead => parentDocHead.style.display = 'none');
            MyUtil.maybeApply(maybeParentDocFoot, parentDocFoot => parentDocFoot.style.display = 'none');
            MyUtil.maybeApply(maybeParentDocGameVersionSelectorPanel, gameVersionSelectorPanel => gameVersionSelectorPanel.style.display = 'none');
            document.body.classList.remove('clampWidth');
            MyUtil.maybeApply(MyUtil.pickHead(window.parent.document.documentElement.getElementsByTagName('iframe')), iframe => {iframe.style.height = `100svh`; iframe.style.width = `100svw`;});
            GameSetting.isHideOther = true;
        }
    }
    private static readonly maybeLoadingPanel = UIOperation.getElementById('loadingPanel');
    private static readonly maybeBoardPanel = UIOperation.getElementById('boardPanel');
    private static readonly maybeMapScrollPanel = UIOperation.getElementById('mapScrollPanel');
    private static readonly maybeMapRoadPanel = UIOperation.getElementById('mapRoadPanel');
    private static readonly maybeMapCellPanel = UIOperation.getElementById('mapCellPanel');
    private static readonly maybePieceStockContentPanel = UIOperation.getElementById('pieceStockContentPanel');
    private static readonly maybeMapExPanel = UIOperation.getElementById('mapExPanel');
    private static readonly maybeGameExPanel = UIOperation.getElementById('gameExPanel');
    private static readonly maybeInitButton = UIOperation.getElementById('initButton');
    private static readonly maybeLogScrollPanel = UIOperation.getElementById('logScrollPanel');
    private static readonly maybeLogContentPanel = UIOperation.getElementById('logContentPanel');
    private static readonly maybeInfoScrollPanel = UIOperation.getElementById('infoScrollPanel');
    private static readonly maybeStateInfoPanel = UIOperation.getElementById('stateInfoPanel');
    private static readonly maybePlayerCountryInfoPanel = UIOperation.getElementById('playerCountryInfoPanel');
    private static readonly maybeGameCalendarInfoPanel = UIOperation.getElementById('gameCalendarInfoPanel');
    private static readonly maybePlayerCountryCellNumInfoPanel = UIOperation.getElementById('playerCountryCellNumInfoPanel');
    private static readonly maybeGameEndCalendarInfoPanel = UIOperation.getElementById('gameEndCalendarInfoPanel');
    private static readonly maybeLogCaptionPanel = UIOperation.getElementById('logCaptionPanel');
    private static readonly maybeInfoCaptionPanel = UIOperation.getElementById('infoCaptionPanel');
    private static readonly maybeHideOtherButton = UIOperation.getElementById('hideOtherButton');
    private static readonly captionClassName = 'caption';
    private static readonly cellButtonClassName = 'cellButton';
    private static readonly processingCellButtonClassName = 'processingCellButton';
    private static readonly idlingCellButtonClassName = 'idlingCellButton';
    private static readonly hideClassName = 'hide';
    private static readonly getCalendar = (turnNum: MyUtil.Maybe<number>) => `西暦${ConstData.startYear + Math.floor((turnNum ?? 0) / ConstData.yearItems.length)}年${ConstData.yearItems.at((turnNum ?? 0) % ConstData.yearItems.length)}`;
    public static readonly loadComplete = () => UIOperation.maybeLoadingPanel?.classList.add(UIOperation.hideClassName);
    public static readonly attachInitButtonAction = (initPressedAction: () => void) => MyUtil.maybeApply(UIOperation.maybeInitButton, initButton => initButton.onclick = initPressedAction);
    public static readonly attachLogCaptionPanelAction = () => MyUtil.maybeApply(UIOperation.maybeLogCaptionPanel, logCaption => logCaption.onclick = UIOperation.logCaptionPressedAction);
    public static readonly attachInfoCaptionPanelAction = () => MyUtil.maybeApply(UIOperation.maybeInfoCaptionPanel, infoCaption => infoCaption.onclick = UIOperation.infoCaptionPressedAction);
    public static readonly attachCaptionPanelAction = () => UIOperation.getElementsByClassName(UIOperation.captionClassName).map(captions => MyUtil.maybeApply(captions, caption=>caption.onclick = () => UIOperation.captionPressedAction(caption)));
    public static readonly attachHideOtherPressedAction = () => MyUtil.maybeApply(UIOperation.maybeHideOtherButton, hideOtherButton => hideOtherButton.onclick = UIOperation.hideOtherPressedAction);
    public static readonly getCountryCells = (gameParam: GameParam, targetCountry: Readonly<Country>): Cell[] => Array.from(gameParam.cellCountryMap).filter(([, country]) => country == targetCountry).map(([cell]) => cell);
    public static readonly getCountryCellNum = (gameParam: GameParam, targetCountry: Readonly<Country>): number => UIOperation.getCountryCells(gameParam, targetCountry).length;
    public static readonly getCellAdjacentOtherCountryCells = (gameParam: GameParam, targetCountry: Readonly<Country>, targetCell: Readonly<Cell>) => MyUtil.apply(UIOperation.getCountryCells(gameParam, targetCountry), countryCells => (ConstData.cellInfoMap.get(targetCell)?.roadConnection.values ?? []).filter(adjacentCell => !countryCells.includes(adjacentCell)));
    public static readonly getCountryEachCellAdjacentOtherCountryCells = (gameParam: GameParam, targetCountry: Readonly<Country>) => Array.from(gameParam.cellCountryMap).filter(([, country]) => country == targetCountry).map(([cell]) => UIOperation.getCellAdjacentOtherCountryCells(gameParam, targetCountry, cell) ?? []).flat();
    public static readonly getCountryAdjacentOtherCountryCells = (gameParam: GameParam, targetCountry: Readonly<Country>) => MyUtil.unique(UIOperation.getCountryEachCellAdjacentOtherCountryCells(gameParam, targetCountry));
    public static readonly Message = class Message {
        private static readonly replaceState = (message: string) => MyUtil.maybeApply(UIOperation.maybeStateInfoPanel, v => v.textContent = message);
        private static readonly replacePlayerCountry = (message: string) => MyUtil.maybeApply(UIOperation.maybePlayerCountryInfoPanel, v => v.textContent = message);
        private static readonly replaceGameCalendar = (message: string) => MyUtil.maybeApply(UIOperation.maybeGameCalendarInfoPanel, v => v.textContent = message);
        private static readonly replaceCountryCellNum = (message: string) => MyUtil.maybeApply(UIOperation.maybePlayerCountryCellNumInfoPanel, v => v.textContent = message);
        private static readonly replaceGameEndCalendar = (message: string) => MyUtil.maybeApply(UIOperation.maybeGameEndCalendarInfoPanel, v => v.textContent = message);
        public static readonly init = () => {
            Message.replaceState('ゲーム開始前 勢力を選んでゲーム開始');
            Message.replacePlayerCountry('(未選択)');
            Message.replaceGameCalendar(UIOperation.getCalendar(0));
            Message.replaceCountryCellNum(`0 / ${Cells.list.length}`);
            Message.replaceGameEndCalendar(`西暦${ConstData.endYear}年${MyUtil.pickHead(ConstData.yearItems)}`);
        }
        public static readonly start = (playerCountryName: MyUtil.Maybe<string>) => {
            Message.replaceState('ゲーム中 行動先を選択でターン進行');
            Message.replacePlayerCountry(playerCountryName ?? '');
        }
        public static readonly turn = (playTurn: number, countryCellNum: MyUtil.Maybe<number>) => {
            Message.replaceGameCalendar(UIOperation.getCalendar(playTurn));
            Message.replaceCountryCellNum(`${countryCellNum} / ${Cells.list.length}`);
        }
        public static readonly win = (playerCountryName: MyUtil.Maybe<string>) => Message.replaceState(`ゲーム終了 制覇勝利(プレイヤー勢力${playerCountryName}による統一)`);
        public static readonly lose = (playerCountryName: MyUtil.Maybe<string>) => Message.replaceState(`ゲーム終了 敗北(プレイヤー勢力${playerCountryName}の滅亡)`);
        public static readonly end = (playerCountryName: MyUtil.Maybe<string>) => Message.replaceState(`ゲーム終了 存続勝利(プレイヤー勢力${playerCountryName}が存続)`);
    }
    public static readonly Log = class Log {
        private static readonly append = (message: string) => {
            const isAlreadyScrollBottom = MyUtil.maybeApply(UIOperation.maybeLogScrollPanel, logScrollPanel => logScrollPanel.scrollTop == logScrollPanel.scrollHeight - logScrollPanel.clientHeight) ?? false;
            UIOperation.maybeLogContentPanel?.appendChild(MyUtil.CreateElem.panel({ textContent: message }));
            isAlreadyScrollBottom ? MyUtil.maybeApply(UIOperation.maybeLogScrollPanel, logScrollPanel => logScrollPanel.scrollTop = logScrollPanel.scrollHeight - logScrollPanel.clientHeight) : MyUtil.nothing();
        }
        public static readonly init = () => { UIOperation.maybeLogContentPanel?.replaceChildren(); Log.append(`${GameInfo.name} ver.${GameInfo.version}`); };
        public static readonly start = (playerCountryName: MyUtil.Maybe<string>) => Log.append(`${playerCountryName}でプレイ開始`);
        public static readonly turn = (playTurn: number) => Log.append(`--------${UIOperation.getCalendar(playTurn)}--------`);
        public static readonly join = (joinPersonMap: Map<Country, [Person, PersonInfo][]>) => Array.from(joinPersonMap).forEach(([country, personInfos]) => personInfos.length > 0 ? Log.append(`${country.text}に${personInfos.map(([person]) => person.text).join(',')}が登場`) : MyUtil.nothing());
        public static readonly leave = (leavePersonMap: Map<Country, Person[]>) => Array.from(leavePersonMap).forEach(([country, personInfos]) => personInfos.length > 0 ? Log.append(`${country.text}の${personInfos.map(person => person.text).join(',')}が死去`) : MyUtil.nothing());
        public static readonly failAttackDrop = (countryName: string, attackPersonName: MyUtil.Maybe<string>, targetCellName: string) => Log.append(`${countryName}の${attackPersonName ?? '無名武官'}が${targetCellName}攻略に失敗し退却できず戦死`);
        public static readonly failDefenceDrop = (targetCountryName: string, defencePersonName: MyUtil.Maybe<string>, targetCellName: string) => Log.append(`${targetCountryName}の${defencePersonName ?? '無名武官'}が${targetCellName}防衛に失敗し脱出できず戦死`);
        public static readonly thinkPhase = () => Log.append(`----戦略フェイズ----`);
        public static readonly sleepCountry = (countryName: string, sleepTurnNum: number) => Log.append(`${countryName}は国力回復中(残り${sleepTurnNum}ターン)`);
        public static readonly attackCountry = (countryName: string, maybeTarget: MyUtil.Maybe<string>) => Log.append(maybeTarget == null ? `${countryName}は防衛に専念` : `${countryName}は${maybeTarget}へ侵攻`);
        public static readonly executePhase = () => Log.append(`----行動フェイズ----`);
        public static readonly failAttack = (countryName: string) => Log.append(`${countryName}の軍事行動は${countryName}滅亡により実行されませんでした`);
        public static readonly attack = (countryName: string, targetCountryName: string, targetCellName: string, targetIsDefence: boolean, maybeAttackSidePersonName: MyUtil.Maybe<string>, maybeAttackSidePersonRank: MyUtil.Maybe<number>, maybeDefenceSidePersonName: MyUtil.Maybe<string>, maybeDefenceSidePersonRank: MyUtil.Maybe<number>, battleJudgeName: MyUtil.Maybe<string>, battleRandomValue: number) => Log.append(`${countryName}の${maybeAttackSidePersonName ?? '無名武官'}(ランク${maybeAttackSidePersonRank ?? 0})による${targetCountryName}の${maybeDefenceSidePersonName ?? '無名武官'}(ランク${maybeDefenceSidePersonRank ?? 0})の${targetCellName}${targetIsDefence ? '(防)' : ''}侵攻戦：${countryName}の${battleJudgeName} 乱数${battleRandomValue}`);
        public static readonly get = (countryName: string, targetCellName: string) => Log.append(`${targetCellName}は${countryName}領となりました`);
        public static readonly perish = (countryName: string, fromCountryName: string, leavePersons: Person[]) => Log.append(`${countryName}は${fromCountryName}により滅亡しました${leavePersons.length > 0 ? `(${leavePersons.map(leavePerson => leavePerson.text).join(',')}が死去)` : ''}`);
        public static readonly win = (playerCountryName: MyUtil.Maybe<string>) => Log.append(`--------${playerCountryName}統一：勝利--------`);
        public static readonly lose = (playerCountryName: MyUtil.Maybe<string>) => Log.append(`--------${playerCountryName}滅亡：敗北--------`);
    }
    public static readonly TrunLog = class TrunLog {
        private static readonly turnLogCheckboxId = MyUtil.cast(UIOperation.getElementById('turnLogCheckbox'), HTMLInputElement);
        private static readonly turnLogBackPanelId = 'turnLogBackPanel';
        private static readonly turnLogPanelId = 'turnLogPanel';
        private static readonly turnLogId = 'turnLog';
        private static readonly append = (gameParam: GameParam, appendLogLine: string) => gameParam.turnLog.push(appendLogLine);
        private static readonly clear = (gameParam: GameParam) => gameParam.turnLog = [];
        public static readonly show = (gameParam: GameParam) => {
            if (TrunLog.turnLogCheckboxId?.checked == true) {
                UIOperation.maybeMapExPanel?.appendChild(MyUtil.CreateElem.panel({ id: TrunLog.turnLogBackPanelId, children: [MyUtil.CreateElem.panel({ id: TrunLog.turnLogPanelId, children: [MyUtil.CreateElem.panel({ children: gameParam.turnLog.map(logItem => MyUtil.CreateElem.panel({ textContent: logItem })), id: TrunLog.turnLogId })] })] }));
            }
            TrunLog.clear(gameParam);
        }
        public static readonly start = (gameParam: GameParam, playerCountryName: string,) => TrunLog.append(gameParam, `${playerCountryName}でプレイ開始`);
        public static readonly join = (gameParam: GameParam, joinPersonMap: Map<Country, [Person, PersonInfo][]>) => Array.from(joinPersonMap).forEach(([country, personInfos]) => personInfos.length > 0 ? TrunLog.append(gameParam, `${country.text}に${personInfos.map(([person]) => person.text).join(',')}が登場`) : MyUtil.nothing());
        public static readonly leave = (gameParam: GameParam, leavePersonMap: Map<Country, Person[]>) => Array.from(leavePersonMap).forEach(([country, personInfos]) => personInfos.length > 0 ? TrunLog.append(gameParam, `${country.text}の${personInfos.map(person => person.text).join(',')}が死去`) : MyUtil.nothing());
        public static readonly failAttackDrop = (gameParam: GameParam, countryName: string, attackPersonName: MyUtil.Maybe<string>, targetCellName: string) => TrunLog.append(gameParam, `${countryName}の${attackPersonName ?? '無名武官'}が${targetCellName}攻略に失敗し退却できず戦死`);
        public static readonly failDefenceDrop = (gameParam: GameParam, targetCountryName: string, defencePersonName: MyUtil.Maybe<string>, targetCellName: string) => TrunLog.append(gameParam, `${targetCountryName}の${defencePersonName ?? '無名武官'}が${targetCellName}防衛に失敗し脱出できず戦死`);
        public static readonly get = (gameParam: GameParam, targetCountryName: string, targetCellName: string) => TrunLog.append(gameParam, `${targetCountryName}の${targetCellName}を攻略`);
        public static readonly otherCountryGet = (gameParam: GameParam, countryName: string, targetCountryName: string, targetCellName: string) => TrunLog.append(gameParam, `${countryName}が${targetCountryName}の${targetCellName}を攻略`);
        public static readonly perish = (gameParam: GameParam, countryName: string, fromCountryName: string) => TrunLog.append(gameParam, `${countryName}が${fromCountryName}により滅亡`);
    }
    public static readonly GameLog = class GameLog {
        private static readonly append = (gameParam: GameParam, appendLogLine: string) => gameParam.gameLog += `${appendLogLine}\n`;
        public static readonly start = (gameParam: GameParam, playerCountryName: string,) => GameLog.append(gameParam, `${playerCountryName}でプレイ開始`);
        public static readonly failAttackDrop = (gameParam: GameParam, countryName: string, attackPersonName: MyUtil.Maybe<string>, targetCellName: string) => GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：${countryName}の${attackPersonName ?? '無名武官'}が${targetCellName}攻略に失敗し退却できず戦死`);
        public static readonly failDefenceDrop = (gameParam: GameParam, targetCountryName: string, defencePersonName: MyUtil.Maybe<string>, targetCellName: string) => GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：${targetCountryName}の${defencePersonName ?? '無名武官'}が${targetCellName}防衛に失敗し脱出できず戦死`);
        public static readonly get = (gameParam: GameParam, targetCountryName: string, targetCellName: string, playerCellNum: number) => GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：${targetCountryName}の${targetCellName}を攻略して最大領土数を${playerCellNum}に更新`);
        public static readonly perish = (gameParam: GameParam, countryName: string, fromCountryName: string) => GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：${countryName}が${fromCountryName}により滅亡`);
        public static readonly win = (gameParam: GameParam) => {
            GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：制覇勝利`);
            GameLog.append(gameParam, `最終陣営所属人物 ${MyUtil.apply(MyUtil.maybeApply(gameParam.maybePlayCountry,playCountry=>Array.from(gameParam.countryPersonMap.get(playCountry) ?? []))?.map(([person])=>person.text).join(',')??'',rawText=>rawText.length!=0?rawText:'なし')}`);
        }
        public static readonly lose = (gameParam: GameParam) => GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：敗北`);
        public static readonly end = (gameParam: GameParam) => {
            GameLog.append(gameParam, `${UIOperation.getCalendar(gameParam.playTurn)}：存続勝利`);
            GameLog.append(gameParam, `最終領土数 ${MyUtil.maybeApply(gameParam.maybePlayCountry,playCountry=>UIOperation.getCountryCellNum(gameParam,playCountry))}`);
        }
    }
    public static readonly GameComment = class GameComment {
        private static readonly gameCommentSendBackPanelId = 'gameCommentSendBackPanel';
        private static readonly gameCommentSendPanelId = 'gameCommentSendPanel';
        private static readonly gameCommentSendTitleId = 'gameCommentSendTitle';
        private static readonly gameCommentSendLogId = 'gameCommentSendLog';
        private static readonly gameCommentButtonClassName = 'gameCommentButton';
        public static readonly show = (gameLogText: string, sendButtonAction: (gameLog: string) => void) => UIOperation.maybeGameExPanel?.appendChild(MyUtil.CreateElem.panel({
            id: GameComment.gameCommentSendBackPanelId, children: [
                MyUtil.CreateElem.panel({
                    id: GameComment.gameCommentSendPanelId, children: [
                        MyUtil.CreateElem.panel({ id: GameComment.gameCommentSendTitleId, textContent: 'ゲームログ' }),
                        MyUtil.CreateElem.panel({ innerText: gameLogText, id: GameComment.gameCommentSendLogId }),
                        MyUtil.CreateElem.panel({
                            classes: ['flex-row w-100'], children: [
                                MyUtil.CreateElem.button({ textContent: 'ゲームログとコメントを投稿', classes: [GameComment.gameCommentButtonClassName], onclick: () => sendButtonAction(gameLogText) }),
                                MyUtil.CreateElem.panel({ classes: ['m-2'] }),
                                MyUtil.CreateElem.button({ textContent: '投稿しないで閉じる', classes: [GameComment.gameCommentButtonClassName], onclick: () => UIOperation.maybeGameExPanel?.replaceChildren() })
                            ]
                        })
                    ],
                })]
        }));
    }
    public static readonly GameMap = class GameMap {
        private static cellCountryNameLabelMap: ReadonlyMap<Cell, HTMLDivElement>;
        private static cellDefenceLabelMap: ReadonlyMap<Cell, HTMLDivElement>;
        private static cellSleepLabelMap: ReadonlyMap<Cell, HTMLDivElement>;
        private static cellButtonMap: ReadonlyMap<Cell, HTMLButtonElement>;
        private static cellRoadSet: ReadonlySet<HTMLDivElement>;
        private static readonly enableButton = (filter: (elem: [Cell, HTMLButtonElement]) => boolean) => Array.from(GameMap.cellButtonMap).filter(filter).forEach(([, button]) => { button.disabled = false; button.classList.replace(UIOperation.processingCellButtonClassName, UIOperation.idlingCellButtonClassName); });
        public static readonly attachCellButtonAction = (cellPressedAction: (arg: Cell) => void) => GameMap.cellButtonMap.forEach((cellButton, cell) => cellButton.onclick = () => cellPressedAction(cell));
        public static readonly disableAllButton = () => GameMap.cellButtonMap.forEach(button => { button.disabled = true; button.classList.replace(UIOperation.idlingCellButtonClassName, UIOperation.processingCellButtonClassName); });
        public static readonly enableAllButton = () => GameMap.enableButton(() => true);
        public static readonly enableTargetButton = (targetCells: Cell[]) => GameMap.enableButton(([cell,]) => targetCells.includes(cell));
        public static readonly initCell = () => GameMap.cellCountryNameLabelMap.forEach((countryNameLabel, cell) => {
            MyUtil.maybeApply(ConstData.cellCountryMap.get(cell), country => {
                countryNameLabel.textContent = country.text;
                countryNameLabel.className = country.text;
                MyUtil.maybeApply(GameMap.cellButtonMap.get(cell), cellButton => cellButton.className = [UIOperation.cellButtonClassName, UIOperation.idlingCellButtonClassName, country.text].join(' '));
            });
            MyUtil.maybeApply(GameMap.cellDefenceLabelMap.get(cell), defenceLabel => defenceLabel.textContent = '');
            MyUtil.maybeApply(GameMap.cellSleepLabelMap.get(cell), sleepLabel => sleepLabel.textContent = '');
        });
        public static readonly changeCellCountryLabel = (targetCell: Readonly<Cell>, prevCountry: Readonly<Country>, setCountry: Readonly<Country>) => {
            MyUtil.maybeApply(GameMap.cellCountryNameLabelMap.get(targetCell), targetCellLabel => targetCellLabel.textContent = setCountry.text);
            GameMap.cellButtonMap.get(targetCell)?.classList?.replace(prevCountry.text, setCountry.text);
        }
        public static readonly refreshCellStateText = (gameParam: Readonly<GameParam>, isInTurn: boolean) => {
            gameParam.cellCountryMap.forEach((country, cell) => {
                const maybeSeepTurnNum = gameParam.countryInfoMap.get(country)?.sleepTurnNum;
                const isDefence = gameParam.countryInfoMap.get(country)?.attackTarget == null;
                MyUtil.maybeApply(GameMap.cellDefenceLabelMap.get(cell), defenceLabel => defenceLabel.textContent = isInTurn && (maybeSeepTurnNum == 0) && isDefence ? '(防)' : '');
                if (!isInTurn) {
                    MyUtil.maybeApply(GameMap.cellSleepLabelMap.get(cell), sleepLabel => MyUtil.maybeApply(maybeSeepTurnNum, seepTurnNum => sleepLabel.textContent = seepTurnNum > 0 ? `休み${seepTurnNum}` : ''));
                }
            });
        }
        static {
            const createButtonHtml = (cell: Readonly<Cell>, cellPos: Readonly<CellPosition>, countryNameLabel: MyUtil.Maybe<Readonly<HTMLDivElement>>, defenceLabel: MyUtil.Maybe<Readonly<HTMLDivElement>>, sleepLabel: MyUtil.Maybe<Readonly<HTMLDivElement>>) => {
                const [left, top, width, height] = [(cellPos.left - CellPosition.xMin) * CellPosition.gameElemWidthScale, (cellPos.top - CellPosition.yMin) * CellPosition.gameElemHeightScale, cellPos.width * CellPosition.gameElemWidthScale, cellPos.height * CellPosition.gameElemHeightScale];
                return MyUtil.CreateElem.button({
                    styles: `position:absolute;left:${left}%;top:${top}%;width:${width}%;height:${height}%;`, children: [
                        MyUtil.CreateElem.panel({
                            classes: ['buttonText'],
                            children: [MyUtil.CreateElem.panel({ textContent: cell.text, classes: [`cellPlace`] }), MyUtil.CreateElem.panel({ classes: ['m-2'] }), countryNameLabel, MyUtil.CreateElem.panel({ textContent: '領' })].filter(elem => elem != null)
                        }),
                        MyUtil.CreateElem.panel({ id: `${cell.text}PiecePanel`, classes: ['buttonPiecePanel'] }),
                        MyUtil.CreateElem.panel({
                            classes: ['buttonText'],
                            children: [defenceLabel, sleepLabel].filter(elem => elem != null)
                        })
                    ]
                });
            }
            const createRoadHtmls = (cellInfo: CellInfo): HTMLDivElement[] => {
                const aspectRatio = MyUtil.maybeApply(UIOperation.getElementById('mapContentPanel'), mapPanel => MyUtil.fractionTextToNumber(getComputedStyle(mapPanel).aspectRatio)) ?? 1;
                return cellInfo.roadConnection.values.map(roadConnectionTo => ConstData.cellInfoMap.get(roadConnectionTo)).filter(cellInfo => cellInfo != null).map(toRoadCellInfo => {
                    const left = (cellInfo.position.left + cellInfo.position.width / 2 - CellPosition.xMin) * CellPosition.gameElemWidthScale;
                    const top = (cellInfo.position.top + cellInfo.position.height / 2 - CellPosition.yMin) * CellPosition.gameElemHeightScale;
                    const rotate = Math.atan2(((toRoadCellInfo.position.top + toRoadCellInfo.position.height / 2) - (cellInfo.position.top + cellInfo.position.height / 2)) * CellPosition.gameElemHeightScale / aspectRatio, ((toRoadCellInfo.position.left + toRoadCellInfo.position.width / 2) - (cellInfo.position.left + cellInfo.position.width / 2)) * CellPosition.gameElemWidthScale);
                    const length = Math.sqrt(Math.pow(((cellInfo.position.left + cellInfo.position.width / 2) - (toRoadCellInfo.position.left + toRoadCellInfo.position.width / 2)) * CellPosition.gameElemWidthScale, 2) + Math.pow((((cellInfo.position.top + cellInfo.position.height / 2) - (toRoadCellInfo.position.top + toRoadCellInfo.position.height / 2))) * CellPosition.gameElemHeightScale / aspectRatio, 2));
                    return MyUtil.CreateElem.panel({ classes: ['road'], styles: `position:absolute;left:${left}%;top:${top}%;width:${length}%;transform:rotate(${rotate}rad);transform-origin:left;` });
                });
            }
            GameMap.cellCountryNameLabelMap = MyUtil.ToReadonlyMap(Array.from(ConstData.cellInfoMap).map(([cell]) => [cell, MyUtil.CreateElem.panel({ id: `${cell.text}CountryNameLabel`, classes: ['countryNameLabel'] })]));
            GameMap.cellDefenceLabelMap = MyUtil.ToReadonlyMap(Array.from(ConstData.cellInfoMap).map(([cell]) => [cell, MyUtil.CreateElem.panel({ id: `${cell.text}DefenceLabel`, classes: ['defenceLabel'] })]));
            GameMap.cellSleepLabelMap = MyUtil.ToReadonlyMap(Array.from(ConstData.cellInfoMap).map(([cell]) => [cell, MyUtil.CreateElem.panel({ id: `${cell.text}SleepLabel`, classes: ['sleepLabel'] })]));
            GameMap.cellButtonMap = MyUtil.ToReadonlyMap(Array.from(ConstData.cellInfoMap).map(([cell, cellInfo]) => [cell, createButtonHtml(cell, cellInfo.position, GameMap.cellCountryNameLabelMap.get(cell), GameMap.cellDefenceLabelMap.get(cell), GameMap.cellSleepLabelMap.get(cell))]));
            GameMap.cellRoadSet = MyUtil.ToReadonlySet(Array.from(ConstData.cellInfoMap).map(([, value]) => createRoadHtmls(value)).flat());
            UIOperation.maybeMapRoadPanel?.replaceChildren(...GameMap.cellRoadSet);
            UIOperation.maybeMapCellPanel?.replaceChildren(...GameMap.cellButtonMap.values());
        };
    }
    public static readonly PersonPiece = class PersonPiece {
        private static personButtonMap: Map<Person, HTMLDivElement>;
        private static readonly boardExElem = UIOperation.getElementById('gameExPanel');
        private static readonly pieceStockPanel = UIOperation.getElementById(`pieceStockContentPanel`);
        private static readonly createPieceHtml = (gameParam: GameParam, country: Readonly<Country>, person: Readonly<Person>, personInfo: Readonly<PersonInfo>, pointerdownPiece: MyUtil.Maybe<(e: PointerEvent, gameParam: GameParam) => void>) => {
            return MyUtil.CreateElem.panel({
                classes: ['personPiecePanel', pointerdownPiece ? 'grab' : '', country.text], onpointerdown: (event) => pointerdownPiece?.(event, gameParam), children: [
                    MyUtil.CreateElem.panel({
                        styles: `;width:100%;height:100%;background:rgba(0,0,0,${personInfo?.rank != null ? 1 - Math.pow(0.88, personInfo.rank) : 0});pointer-events:none;`, children: [
                            MyUtil.CreateElem.panel({ classes: ['piecePanelRank'], textContent: personInfo?.rank.toString() }),
                            MyUtil.CreateElem.panel({ classes: ['piecePanelName', person.text.length >= 3 ? 'length3' : ''], textContent: person.text })
                        ]
                    })
                ]
            });
        }
        private static readonly pointerdownPiece = (event: PointerEvent, gameParam: GameParam) => {
            if (!gameParam.isTurnProcessing) {
                const senderPiece = MyUtil.cast(event.currentTarget, HTMLDivElement);
                const pieceParentElem = MyUtil.cast(senderPiece?.parentNode, HTMLElement);
                if (UIOperation.maybeBoardPanel != null && pieceParentElem != null && senderPiece != null) {
                    pointerdownPieceAction(UIOperation.maybeBoardPanel, pieceParentElem, senderPiece);
                }
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
            }
            function pointerdownPieceAction(boardElem: HTMLElement, pieceParentElem: HTMLElement, senderPiece: HTMLDivElement) {
                const playerCountryCells = MyUtil.maybeApply(gameParam.maybePlayCountry, playerCountry => UIOperation.getCountryCells(gameParam, playerCountry)) ?? [];
                const notPlayerCountryCells = Cells.list.filter(cells => !playerCountryCells.includes(cells));
                const cellPiecePanelMap = new Map(playerCountryCells.map(playerCountryCell => [MyUtil.cast(UIOperation.getElementById(playerCountryCell.text, 'PiecePanel'), HTMLElement), playerCountryCell]));
                let notMoving = true;
                boardElem.onpointermove = pointerMove;
                boardElem.onpointerup = (event: PointerEvent) => pointerUp(event, senderPiece);
                function pointerMove(event: PointerEvent) {
                    if (notMoving) {
                        pieceParentElem.removeChild(senderPiece);
                        senderPiece.style.position = 'absolute';
                        PersonPiece.boardExElem?.appendChild(senderPiece);
                        notMoving = false;
                        notPlayerCountryCells.forEach(NPCCell => MyUtil.maybeApply(UIOperation.getElementById(NPCCell.text, 'PiecePanel'), v => v.style.background = '#0004'));
                    }
                    const boardRect = boardElem.getBoundingClientRect();
                    senderPiece.style.left = `calc(${(event.clientX - boardRect.left) / boardElem.offsetWidth * 100}% - ${senderPiece.clientWidth}px / 2)`;
                    senderPiece.style.top = `calc(${(event.clientY - boardRect.top) / boardElem.offsetHeight * 100}% - ${senderPiece.clientHeight}px / 2)`;
                }
                function pointerUp(event: PointerEvent, senderPiece: HTMLDivElement) {
                    boardElem.onpointermove = null;
                    boardElem.onpointerup = null;
                    if (!notMoving) {
                        const pointerElement = MyUtil.cast(document.elementFromPoint(event.clientX, event.clientY), HTMLElement);
                        senderPiece.style.position = '';
                        senderPiece.style.left = '';
                        senderPiece.style.top = '';
                        notPlayerCountryCells.map(NPCCell => MyUtil.maybeApply(UIOperation.getElementById(NPCCell.text, 'PiecePanel'), v => v.style.background = ''));
                        PersonPiece.boardExElem?.removeChild(senderPiece);
                        if (pointerElement != null && Array.from(cellPiecePanelMap.keys()).concat([PersonPiece.pieceStockPanel]).includes(pointerElement)) {
                            putPieceToCell(pointerElement, senderPiece);
                        } else if (pointerElement?.parentElement != null && pointerElement.classList.contains('personPiecePanel')) {
                            putPieceToCell(pointerElement.parentElement, senderPiece);
                        } else {
                            putPieceToPiecePanel();
                        }
                    }

                    document.removeEventListener('touchmove', handleTouchMove);
                    function putPieceToCell(targetCellPiecePanel: HTMLElement, senderPiece: HTMLDivElement) {
                        const [cellChild] = targetCellPiecePanel.children;
                        const [senderPiecePerson] = Array.from(PersonPiece.personButtonMap).find(([, button]) => button == senderPiece) ?? [];
                        const [prevPieceCell] = Array.from(gameParam.cellPersonMap).find(([, person]) => person == senderPiecePerson) ?? [];
                        if (cellChild != null && targetCellPiecePanel != PersonPiece.pieceStockPanel) {
                            targetCellPiecePanel.removeChild(cellChild);
                            pieceParentElem.appendChild(cellChild);
                        }
                        targetCellPiecePanel.appendChild(senderPiece);
                        MyUtil.maybeApply(prevPieceCell, prevPieceCell => gameParam.cellPersonMap.set(prevPieceCell, null));
                        if (targetCellPiecePanel != PersonPiece.pieceStockPanel) {
                            MyUtil.maybeApply(cellPiecePanelMap.get(targetCellPiecePanel), cell => gameParam.cellPersonMap.set(cell, senderPiecePerson));
                        }
                    }
                    function putPieceToPiecePanel() {
                        pieceParentElem.appendChild(senderPiece);
                    }
                }
            }
            function handleTouchMove(event:TouchEvent): void {
                event.preventDefault();
            }
        }
        public static readonly init = (gameParam: Readonly<GameParam>, playerCountry: Readonly<Country>) => {
            PersonPiece.personButtonMap = new Map(Array.from(ConstData.countryPersonMap).map(([country, personInfo]) => personInfo.map(([person, info]) => [person, PersonPiece.createPieceHtml(gameParam, country, person, info, country == playerCountry ? PersonPiece.pointerdownPiece : null)] as const)).flat());
        }
        public static readonly resetMap = () => {
            Cells.list.forEach(cell => UIOperation.getElementById(cell.text, 'PiecePanel')?.replaceChildren());
        }
        public static readonly resetPlayerStock = () => {
            UIOperation.maybePieceStockContentPanel?.replaceChildren();
        }
        public static readonly refreshMap = (gameParam: Readonly<GameParam>) => {
            Cells.list.forEach(cell => {
                const personButton = MyUtil.maybeApply(gameParam.cellPersonMap.get(cell), cellPerson => MyUtil.dropNull([PersonPiece.personButtonMap.get(cellPerson)])) ?? [];
                UIOperation.getElementById(cell.text, 'PiecePanel')?.replaceChildren(...personButton);
            });
        }
        public static readonly refreshPlayerStock = (gameParam: Readonly<GameParam>, playerCountry: Readonly<Country>) => {
            const playerCountryPersons = Array.from(gameParam.countryPersonMap.get(playerCountry) ?? []);
            const allDeployedPersons = MyUtil.dropNull(Array.from(gameParam.cellPersonMap.values()));
            const playerStockPersonButtons = MyUtil.dropNull(playerCountryPersons.filter(([person]) => !allDeployedPersons.includes(person)).map(([person]) => PersonPiece.personButtonMap.get(person)));
            UIOperation.maybePieceStockContentPanel?.replaceChildren(...playerStockPersonButtons);
        }
    }
    public static readonly PersonData = class PersonData {
        private static readonly maybePersonDataContentPanelElem = UIOperation.getElementById('personDataContentPanel');
        public static readonly show = () => {
            const [giPersonInfos, goPersonInfos, syokukanPersonInfos, enPersonInfos, siPersonInfos, nanbanPersonInfos, ...remainPersonInfos] = Array.from(ConstData.countryPersonMap);
            const personDataContentHeadHtml = `<div style='border:solid 0.05em #AAA;'>
                <div style='flex-direction:row;'>${`
                    <div style='flex-direction:row;'>
                        <div class='personInfoCell' style='width:3.1em;'>国</div>
                        <div class='personInfoCell' style='width:3.1em;'>人物名</div>
                        <div class='personInfoCell' style='width:2.5em;'><div style='width:2.4em;transform:scale(0.8,1);text-wrap:nowrap;'>ランク</div></div>
                        <div class='personInfoCell' style='width:2.5em;'>登場</div>
                        <div class='personInfoCell' style='width:2.5em;'>没年</div>
                    </div>`.repeat(4)
                }</div>
                <div style='flex-direction:row;align-items:start;background:#AAA;'>`;
            const line1 = `<div class='align-items-stretch'>${[giPersonInfos].map(([countryName, countryPerson]) => personInfoToHtml(countryName, countryPerson)).join('')}</div>`;
            const line2 = `<div class='align-items-stretch'>${[goPersonInfos, siPersonInfos].map(([countryName, countryPerson]) => personInfoToHtml(countryName, countryPerson)).join('')}</div>`;
            const line3 = `<div class='align-items-stretch'>${[syokukanPersonInfos, enPersonInfos, nanbanPersonInfos].map(([countryName, countryPerson]) => personInfoToHtml(countryName, countryPerson)).join('')}</div>`;
            const line4 = `<div class='align-items-stretch'>${remainPersonInfos.map(([countryName, countryPerson]) => personInfoToHtml(countryName, countryPerson)).join('')}</div>`;
            const personDataContentFootHtml = `</div></div>`;
            MyUtil.maybeApply(PersonData.maybePersonDataContentPanelElem, maybePersonDataContentPanelElem => maybePersonDataContentPanelElem.innerHTML = personDataContentHeadHtml + line1 + line2 + line3 + line4 + personDataContentFootHtml);
            function personInfoToHtml(countryName: Country, countryPersons: [Person, PersonInfo][]) {
                const head = `<div class='flex-row align-items-stretch ${countryName.text}'>
                    <div class='personInfoCell' style='justify-content:center;width:3.1em;'>${countryName.text}</div>
                    <div class='flex-grow-1 align-items-stretch'>`;
                const main = (countryPersons.length == 0) ? `<div class='personInfoCell'>(なし)</div>` : Array.from(countryPersons).map(([person, personInfo]) => {
                    const joinYear = personInfo.overrideJoinYear ?? (personInfo.birthYear + ConstData.joinAge);
                    return `<div style='flex-direction:row;'>
                            <div class='personInfoCell' style='width:3.1em;text-align:start;'><div style='width:3em;transform:scale(${person.text.length > 3 ? 3 / person.text.length : 1},1);transform-origin:left;'>${person.text}</div></div>
                            <div class='personInfoCell' style='width:2.5em;'>${personInfo.rank}</div>
                            <div class='personInfoCell' style='width:2.5em;'>${joinYear >= ConstData.startYear ? joinYear : '現役'}</div>
                            <div class='personInfoCell' style='width:2.5em;'>${personInfo.deathYear}</div>
                        </div>`;
                }).join('');
                const foot = `</div></div>`;
                return head + main + foot;
            }
        }
        public static readonly set = (gameParam: Readonly<GameParam>) => {
            const startingPersonFilter = (personInfo: PersonInfo) => (personInfo.overrideJoinYear ?? (personInfo.birthYear + ConstData.joinAge)) < ConstData.startYear;
            Countrys.list.forEach(country => {
                const setPersons = Array.from(ConstData.countryPersonMap.get(country) ?? []).filter(([, personInfo]) => startingPersonFilter(personInfo));
                gameParam.countryPersonMap.set(country, new Map(setPersons));
            });
        }
        public static readonly getJoinYearPerson = (gameParam: Readonly<GameParam>) => {
            const addPersonFilter = (playTurnNum: number, personInfo: PersonInfo) => (personInfo.overrideJoinYear ?? (personInfo.birthYear + ConstData.joinAge)) == (ConstData.startYear + (playTurnNum - Math.floor(ConstData.yearItems.length / 2)) / ConstData.yearItems.length);
            return new Map(Countrys.list.filter(country => UIOperation.getCountryCellNum(gameParam, country) != 0).map(country => [country, MyUtil.dropNull(Array.from(ConstData.countryPersonMap.get(country) ?? []).filter(([, personInfo]) => addPersonFilter(gameParam.playTurn ?? 0, personInfo)))]));
        }
        public static readonly getLeaveYearPerson = (gameParam: Readonly<GameParam>) => {
            const leavePersonFilter = (playTurnNum: number, personInfo: PersonInfo) => personInfo.deathYear <= (ConstData.startYear + (playTurnNum - Math.floor(ConstData.yearItems.length / 2)) / ConstData.yearItems.length);
            return new Map(Countrys.list.filter(country => UIOperation.getCountryCellNum(gameParam, country) != 0).map(country => [country, MyUtil.dropNull(Array.from(gameParam.countryPersonMap.get(country) ?? []).filter(([, personInfo]) => leavePersonFilter(gameParam.playTurn ?? 0, personInfo)))]));
        }
        public static readonly update = (gameParam: Readonly<GameParam>, joinPersonMap: Map<Country, [Person, PersonInfo][]>, leavePersonMap: Map<Country, Person[]>) => {
            Countrys.list.forEach(country => {
                joinPersonMap.get(country)?.forEach(([person, personInfo]) => gameParam.countryPersonMap.get(country)?.set(person, personInfo));
                leavePersonMap.get(country)?.forEach(person => gameParam.countryPersonMap.get(country)?.delete(person));
                Array.from(gameParam.cellPersonMap).filter(([, person]) => person != null && leavePersonMap.get(country)?.includes(person)).map(([cell]) => cell).forEach(cell => gameParam.cellPersonMap.set(cell, null));
            });
        }
    }
    public static readonly CopyInfo = class CopyInfo {
        private static readonly operationsPanel = UIOperation.getElementById('operationsPanel');
        private static readonly explainPanel = UIOperation.getElementById('explainPanel');
        private static readonly personDataPanel = UIOperation.getElementById('personDataPanel');
        private static readonly changeLogPanel = UIOperation.getElementById('changeLogPanel');
        private static readonly infoOperationsPanel = UIOperation.getElementById('infoOperationsPanel');
        private static readonly infoExplainPanel = UIOperation.getElementById('infoExplainPanel');
        private static readonly infoPersonDataPanel = UIOperation.getElementById('infoPersonDataPanel');
        private static readonly infoChangeLogPanel = UIOperation.getElementById('infoChangeLogPanel');
        public static readonly exeCopy = () => {
            CopyInfo.infoOperationsPanel?.replaceChildren(...Array.from(CopyInfo.operationsPanel?.children ?? []).map(explainChild => explainChild.cloneNode(true)));
            CopyInfo.infoExplainPanel?.replaceChildren(...Array.from(CopyInfo.explainPanel?.children ?? []).map(explainChild => explainChild.cloneNode(true)));
            CopyInfo.infoPersonDataPanel?.replaceChildren(...Array.from(CopyInfo.personDataPanel?.children ?? []).map(explainChild => explainChild.cloneNode(true)));
            CopyInfo.infoChangeLogPanel?.replaceChildren(...Array.from(CopyInfo.changeLogPanel?.children ?? []).map(explainChild => explainChild.cloneNode(true)));
        }
    }
    public static readonly Instruction = class Instruction {
        private static readonly instructionTextId = 'instructionText';
        private static readonly instructionImageId = 'instructionImage';
        private static readonly instructionButtonId = 'instructionButton';
        private static readonly getInstructionPersonName = (country: Country) => country == Countrys.gi ? '杜畿' : country == Countrys.go ? '韓当' : country == Countrys.syokukan ? '簡雍' : '武官';
        private static readonly createTalkFrameSvg = (width: number, height: number) => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svg.setAttributeNS(null, 'viewBox', `-0.1 -0.1 ${width + 2.2} ${height + 1.2}`);
            path.setAttributeNS(null, 'stroke', '#000');
            path.setAttributeNS(null, 'stroke-width', '0.05');
            path.setAttributeNS(null, 'fill', '#EEE');
            path.setAttributeNS(null, 'd', `M ${width + 1} ${height} A 1 1 0 0 1 ${width} ${height + 1} L 1 ${height + 1} A 1 1 0 0 1 0 ${height} L 0 1 A 1 1 0 0 1 1 0 L ${width} 0 A 1 1 0 0 1 ${width + 1} 1 L ${width + 1} ${height - 1} A 1 1 0 0 0 ${width + 2} ${height - 1} A 1 1 0 0 1 ${width + 1} ${height}`);
            svg.replaceChildren(path);
            return svg;
        }
        private static readonly getInstructionPersonImage = (instructionPersonName: string) => {
            const srcImagePath = `${instructionPersonName}.png`;
            const personImg = MyUtil.apply(document.createElement('img'), img => { img.src = srcImagePath; img.style.width = '6em'; return img; });
            return personImg;
        }
        private static readonly create = () => {
            const elem = MyUtil.CreateElem.panel({
                classes: ['w-100 h-100 position-absolute pe-auto'], children: [
                    MyUtil.CreateElem.panel({
                        styles: 'width:26em;height:13em;background:#DDD;align-items:start;', children: [
                            MyUtil.CreateElem.panel({
                                classes: ['flex-row w-100'], children: [
                                    MyUtil.CreateElem.panel({ id: Instruction.instructionTextId, classes: ['align-items-start'], children: [] }),
                                    MyUtil.CreateElem.panel({ id: Instruction.instructionImageId })
                                ]
                            }),
                            MyUtil.CreateElem.panel({ id: Instruction.instructionButtonId, classes: ['flex-row justify-content-evenly w-100'] }),
                        ]
                    })
                ]
            });
            return elem;
        }
        public static readonly init = () => UIOperation.maybeMapExPanel?.replaceChildren();
        public static readonly show1 = (country: Country) => {
            const instructionPersonName = Instruction.getInstructionPersonName(country);
            const personImg = Instruction.getInstructionPersonImage(instructionPersonName);
            const elem = Instruction.create();
            UIOperation.maybeMapExPanel?.appendChild(elem);
            start();
            function start() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: 'ゲームの説明を聞きますか？\n勝利条件・敗北条件と\n戦闘のルールの説明があります', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${14 + 2}em;`, children: [Instruction.createTalkFrameSvg(14, 4)] })
                );
                UIOperation.getElementById(Instruction.instructionImageId)?.replaceChildren(
                    personImg,
                    MyUtil.CreateElem.panel({ textContent: instructionPersonName })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: 'はい', styles: 'height:3em;width:7em;', onclick: instructionListen1 }),
                    MyUtil.CreateElem.button({ textContent: 'いいえ', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                );
            }
            function instructionListen1() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: '勝利条件は2種類あります\n275年春までに全領域制覇で制覇勝利\n275年春まで存続で存続勝利\nとなります\nどちらも勝利ではありますが\n区別があることに留意してください', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: 'つぎへ', styles: 'height:3em;width:7em;', onclick: instructionListen2 }),
                    MyUtil.CreateElem.button({ textContent: 'もういい', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                );
                function instructionListen2() {
                    UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                        MyUtil.CreateElem.panel({ innerText: '敗北条件は1種類で\n全領土失陥、つまり滅亡です\n我々の命運も共にありますので\nどうかできるだけ多くの生存者を\n後まで導いて頂きますよう', classes: ['position-absolute m-2'] }),
                        MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                    );
                    UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                        MyUtil.CreateElem.button({ textContent: 'つぎへ', styles: 'height:3em;width:7em;', onclick: instructionListen3 }),
                        MyUtil.CreateElem.button({ textContent: 'もういい', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                    );
                    function instructionListen3() {
                        UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                            MyUtil.CreateElem.panel({ innerText: '戦闘のうち攻撃は\n中枢所属のうち能力が一番高い者、\n同等の者が複数ならそのうち年長者\nが指揮し、能力が勝敗率に影響します\n侵攻先が防衛に専念していると\n分が悪くなります', classes: ['position-absolute m-2'] }),
                            MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                        );
                        UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                            MyUtil.CreateElem.button({ textContent: 'つぎへ', styles: 'height:3em;width:7em;', onclick: instructionListen4 }),
                            MyUtil.CreateElem.button({ textContent: 'もういい', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                        );
                        function instructionListen4() {
                            UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                                MyUtil.CreateElem.panel({ innerText: '戦闘のうち防衛は\n侵攻された場所を担当している者が\n防衛にあたり、少し有利ながら\n能力が勝敗率に影響します\n我らが防衛に専念していると\n分が良くなります', classes: ['position-absolute m-2'] }),
                                MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                            );
                            UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                                MyUtil.CreateElem.button({ textContent: 'わかった', styles: 'height:3em;width:15em;', onclick: instructionNoListen })
                            );
                        }
                    }
                }
            }
            function instructionNoListen() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: 'ご武運を', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${14 + 2}em;`, children: [Instruction.createTalkFrameSvg(14, 4)] })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: '閉じる', styles: 'height:3em;width:15em;', onclick: instructionEnd })
                );
            }
            function instructionEnd() {
                MyUtil.maybeApply(UIOperation.maybeMapExPanel, mapEx => mapEx.removeChild(elem));
            }
        }
        public static readonly show2 = (country: Country) => {
            const instructionPersonName = Instruction.getInstructionPersonName(country);
            const personImg = Instruction.getInstructionPersonImage(instructionPersonName);
            const elem = Instruction.create();
            UIOperation.maybeMapExPanel?.appendChild(elem);
            start();
            function start() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: '次の説明を聞きますか？\n人物の加入・脱落と\n寿命の説明があります', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${14 + 2}em;`, children: [Instruction.createTalkFrameSvg(14, 4)] })
                );
                UIOperation.getElementById(Instruction.instructionImageId)?.replaceChildren(
                    personImg,
                    MyUtil.CreateElem.panel({ textContent: instructionPersonName })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: 'はい', styles: 'height:3em;width:7em;', onclick: instructionListen1 }),
                    MyUtil.CreateElem.button({ textContent: 'いいえ', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                );
            }
            function instructionListen1() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: '人物の加入は陣営ごとに決まっており\n時期が来れば人物が自動で加入します\n人物の脱落は不確定要素で\n戦死と寿命経過の要因があり\n戦死は防衛失敗と攻撃失敗のうち\n大敗すると可能性があります', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: 'つぎへ', styles: 'height:3em;width:7em;', onclick: instructionListen2 }),
                    MyUtil.CreateElem.button({ textContent: 'もういい', styles: 'height:3em;width:7em;', onclick: instructionNoListen })
                );
                function instructionListen2() {
                    UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                        MyUtil.CreateElem.panel({ innerText: '寿命は人物ごとにありますが\n必ずその時に死去ではなく\n寿命を過ぎるごとに確率が高くなり\n生存していればその確率による\n死去判定があります', classes: ['position-absolute m-2'] }),
                        MyUtil.CreateElem.panel({ styles: `width:${17 + 2}em;`, children: [Instruction.createTalkFrameSvg(17, 6)] })
                    );
                    UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                        MyUtil.CreateElem.button({ textContent: 'わかった', styles: 'height:3em;width:15em;', onclick: instructionNoListen })
                    );
                }
            }
            function instructionNoListen() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: '詳しいことは\n情報のルール説明に\n記してあります\nご武運を・・', classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${14 + 2}em;`, children: [Instruction.createTalkFrameSvg(14, 4)] })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: '閉じる', styles: 'height:3em;width:15em;', onclick: instructionEnd })
                );
            }
            function instructionEnd() {
                MyUtil.maybeApply(UIOperation.maybeMapExPanel, mapEx => mapEx.removeChild(elem));
            }
        }
        public static readonly show3 = (country: Country) => {
            const instructionPersonName = '文官';
            const personImg = Instruction.getInstructionPersonImage(instructionPersonName);
            const elem = Instruction.create();
            UIOperation.maybeMapExPanel?.appendChild(elem);
            start();
            function start() {
                UIOperation.getElementById(Instruction.instructionTextId)?.replaceChildren(
                    MyUtil.CreateElem.panel({ innerText: `これまで説明に来られていた\n${Instruction.getInstructionPersonName(country)}がお亡くなりになりました`, classes: ['position-absolute m-2'] }),
                    MyUtil.CreateElem.panel({ styles: `width:${14 + 2}em;`, children: [Instruction.createTalkFrameSvg(14, 4)] })
                );
                UIOperation.getElementById(Instruction.instructionImageId)?.replaceChildren(
                    personImg,
                    MyUtil.CreateElem.panel({ textContent: instructionPersonName })
                );
                UIOperation.getElementById(Instruction.instructionButtonId)?.replaceChildren(
                    MyUtil.CreateElem.button({ textContent: '閉じる', styles: 'height:3em;width:15em;', onclick: instructionEnd })
                );
            }
            function instructionEnd() {
                MyUtil.maybeApply(UIOperation.maybeMapExPanel, mapEx => mapEx.removeChild(elem));
            }
        }
    }
}
function game() {
    const gameParam = new GameParam();
    UIOperation.PersonData.show();
    UIOperation.CopyInfo.exeCopy();
    attachEvent();
    initGameData();
    UIOperation.loadComplete();
    function attachEvent() {
        UIOperation.attachInitButtonAction(initGameData);
        UIOperation.attachLogCaptionPanelAction();
        UIOperation.attachInfoCaptionPanelAction();
        UIOperation.attachHideOtherPressedAction();
        UIOperation.attachCaptionPanelAction();
        UIOperation.GameMap.attachCellButtonAction(cellPressed);
        async function cellPressed(pressedCell: Readonly<Cell>): Promise<void> {
            UIOperation.GameMap.disableAllButton();
            if (gameParam.playTurn == null) {
                start(pressedCell);
                nextTurn();
            } else {
                thinkTurnCommandPhase(pressedCell);
                await executeTurnCommandPhase();
                if (MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.getCountryCellNum(gameParam, playCountry)) == Cells.list.length) {
                    UIOperation.Log.win(gameParam.maybePlayCountry?.text);
                    UIOperation.Message.win(gameParam.maybePlayCountry?.text);
                    UIOperation.GameLog.win(gameParam);
                    UIOperation.GameComment.show(gameParam.gameLog, sendButtonAction);
                    return;
                } else if (MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.getCountryCellNum(gameParam, playCountry)) == 0) {
                    UIOperation.Log.lose(gameParam.maybePlayCountry?.text);
                    UIOperation.Message.lose(gameParam.maybePlayCountry?.text);
                    UIOperation.GameLog.lose(gameParam);
                    UIOperation.GameComment.show(gameParam.gameLog, sendButtonAction);
                    return;
                } else {
                    nextTurn();
                }
            }
            MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.GameMap.enableTargetButton(UIOperation.getCountryAdjacentOtherCountryCells(gameParam, playCountry).concat(UIOperation.getCountryCells(gameParam, playCountry))));
            function start(pushCell: Readonly<Cell>): void {
                const pushCountry = gameParam.cellCountryMap.get(pushCell);
                if (pushCountry != null) {
                    gameParam.maybePlayCountry = pushCountry;
                    gameParam.playerMaxCellNum = UIOperation.getCountryCellNum(gameParam, pushCountry);
                    UIOperation.Message.start(pushCountry.text);
                    UIOperation.Log.start(pushCountry.text);
                    UIOperation.TrunLog.start(gameParam, pushCountry.text);
                    UIOperation.GameLog.start(gameParam, pushCountry.text);
                    UIOperation.PersonData.set(gameParam);
                    UIOperation.PersonPiece.init(gameParam, pushCountry);
                    UIOperation.PersonPiece.refreshPlayerStock(gameParam, pushCountry);
                    showIntroduction();
                }
                function showIntroduction() {
                    //
                }
            }
            function thinkTurnCommandPhase(pushCell: Readonly<Cell>): void {
                const prevThinkCellPersonMap = new Map(gameParam.cellPersonMap);
                UIOperation.Log.thinkPhase();
                gameParam.countryInfoMap.forEach((_, thinkCountry) => (gameParam.maybePlayCountry != thinkCountry) ? deployPerson(thinkCountry) : MyUtil.nothing());
                gameParam.countryInfoMap.forEach((_, thinkCountry) => instructionTurnCommand(thinkCountry, (gameParam.maybePlayCountry != thinkCountry) ? thinkNPC(thinkCountry) : pushCell));
                function deployPerson(npcCountry: Country) {
                    const countryCells = UIOperation.getCountryCells(gameParam, npcCountry);
                    const countryCellsAdjacentOtherCountryCells = countryCells.map(v => new MyUtil.KeyValuePair(v, UIOperation.getCellAdjacentOtherCountryCells(gameParam, npcCountry, v)));
                    const cellsAdjacentCellPersonPressure = countryCellsAdjacentOtherCountryCells.map(adjacentAnotherCountryCells => new MyUtil.KeyValuePair(adjacentAnotherCountryCells.key, adjacentAnotherCountryCells.value.map(cell => (MyUtil.maybeApply(gameParam.cellCountryMap.get(cell), cellCountry => MyUtil.maybeApply(prevThinkCellPersonMap.get(cell), cellperson => gameParam.countryPersonMap.get(cellCountry)?.get(cellperson)?.rank)) ?? 0) + 1)));
                    const sortedCellPressure = cellsAdjacentCellPersonPressure.map(v => new MyUtil.KeyValuePair(v.key, MyUtil.sum(v.value))).sort((a, b) => b.value - a.value);
                    sortedCellPressure.forEach(cellPressure => {
                        const cellPersons = Array.from(gameParam.cellPersonMap.values());
                        const [maybeSetPerson] = MyUtil.pickHead(Array.from(gameParam.countryPersonMap.get(npcCountry)?.entries() ?? []).sort(([, personInfo1], [, personInfo2]) => personInfo2.rank - personInfo1.rank).filter(([person]) => !cellPersons.includes(person))) ?? [];
                        gameParam.cellPersonMap.set(cellPressure.key, maybeSetPerson);
                    });
                }
                UIOperation.PersonPiece.refreshMap(gameParam);
                function thinkNPC(thinkCountry: Country):MyUtil.Maybe<Cell> {
                    const attackableTargetCells = UIOperation.getCountryEachCellAdjacentOtherCountryCells(gameParam, thinkCountry);
                    const attackTargetCellNumCounts = new Map(attackableTargetCells.map(cell => [cell, attackableTargetCells.filter(v => v == cell).length]));
                    const weightAttackTargetCells = Array.from(attackTargetCellNumCounts).map(([cell,num])=>MyUtil.rangedArray(num*num,_=>cell)).flat();
                    return MyUtil.judge(0.2) ? null : MyUtil.pickAny(weightAttackTargetCells).value;
                }
                function instructionTurnCommand(srcCountry: Country, selectedTarget: MyUtil.Maybe<Cell>): void {
                    const maybeTarget = selectedTarget == null || gameParam.cellCountryMap.get(selectedTarget) == srcCountry ? null : selectedTarget;
                    const countryInfo = gameParam.countryInfoMap.get(srcCountry);
                    if (countryInfo != null) {
                        if (countryInfo.sleepTurnNum > 0) {
                            UIOperation.Log.sleepCountry(srcCountry.text, countryInfo.sleepTurnNum);
                        } else {
                            const attackCountryPersonInfos = Array.from(gameParam.countryPersonMap.get(srcCountry) ?? []);
                            const attackCountryCellPersons = MyUtil.dropNull(UIOperation.getCountryCells(gameParam, srcCountry).map(srcCountryCell => gameParam.cellPersonMap.get(srcCountryCell)));
                            const attackCountryCentralPersons = attackCountryPersonInfos.filter(([person]) => !attackCountryCellPersons.includes(person));
                            const [maybeAttackPerson] = MyUtil.pickHead(attackCountryCentralPersons.toSorted(([, personInfo1], [, personInfo2]) => personInfo2.rank - personInfo1.rank)) ?? [];
                            UIOperation.Log.attackCountry(srcCountry.text, maybeTarget?.text);
                            gameParam.countryInfoMap.set(srcCountry, new CountryInfo(maybeTarget, maybeAttackPerson, countryInfo.sleepTurnNum));
                        }
                    }
                }
            }
            async function executeTurnCommandPhase(): Promise<void> {
                const reduceInitialValue: [Country, CountryInfo][] = [];
                gameParam.isTurnProcessing=true;
                UIOperation.GameMap.refreshCellStateText(gameParam, true);
                await MyUtil.wait(200);
                UIOperation.Log.executePhase();
                executeTurnCommand();
                UIOperation.GameMap.refreshCellStateText(gameParam, false);
                gameParam.isTurnProcessing=false;
                function executeTurnCommand(){                
                    gameParam.countryInfoMap = new Map(Array.from(gameParam.countryInfoMap).reduce((foldCountryInfoMap, [srcCountry, countryInfo]) => {
                        const maybeTargetCell = countryInfo.attackTarget;
                        const maybeTargetCountry = MyUtil.maybeApply(maybeTargetCell, targetCell => gameParam.cellCountryMap.get(targetCell));
                        if (countryInfo.sleepTurnNum > 0) {
                            return foldCountryInfoMap.concat([[srcCountry, new CountryInfo(null, null, countryInfo.sleepTurnNum - 1)]]);
                        } else if (maybeTargetCountry != null && maybeTargetCell != null) {
                            if (UIOperation.getCountryCellNum(gameParam, srcCountry) == 0) {
                                UIOperation.Log.failAttack(srcCountry.text);
                            } else {
                                const maybeTargetCountryInfo = gameParam.countryInfoMap.get(maybeTargetCountry);
                                const targetIsDefence = maybeTargetCountryInfo?.sleepTurnNum == 0 && maybeTargetCountryInfo.attackTarget == null;
                                const maybeAttackSidePerson = countryInfo.attackPerson;
                                const maybeDefenceSidePerson = gameParam.cellPersonMap.get(maybeTargetCell);
                                const maybeAttackSidePersonInfo = MyUtil.maybeApply(maybeAttackSidePerson, attackPerson => gameParam.countryPersonMap.get(srcCountry)?.get(attackPerson));
                                const maybeDefenceSidePersonInfo = MyUtil.maybeApply(maybeDefenceSidePerson, defencePerson => gameParam.countryPersonMap.get(maybeTargetCountry)?.get(defencePerson));
                                const attackRandomValue = Math.floor(MyUtil.random(100));
                                const maybeAttackJudge = getAttackJudge(attackRandomValue, targetIsDefence, maybeAttackSidePersonInfo, maybeDefenceSidePersonInfo);
                                const routPersonDropPercent = 30;
                                UIOperation.Log.attack(srcCountry.text, maybeTargetCountry.text, maybeTargetCell.text, targetIsDefence, maybeAttackSidePerson?.text, maybeAttackSidePersonInfo?.rank, maybeDefenceSidePerson?.text, maybeDefenceSidePersonInfo?.rank, maybeAttackJudge?.text, attackRandomValue);
                                if (maybeAttackJudge == AttackJudges.crushing) {
                                    const isDrop = MyUtil.random(100) < routPersonDropPercent;
                                    if (isDrop) {
                                        if (maybeTargetCountry == gameParam.maybePlayCountry) {
                                            UIOperation.GameLog.failDefenceDrop(gameParam, maybeTargetCountry.text, maybeDefenceSidePerson?.text, maybeTargetCell.text);
                                        }
                                        UIOperation.TrunLog.failDefenceDrop(gameParam, maybeTargetCountry.text, maybeDefenceSidePerson?.text, maybeTargetCell.text);
                                        UIOperation.Log.failDefenceDrop(maybeTargetCountry.text, maybeDefenceSidePerson?.text, maybeTargetCell.text);
                                        UIOperation.PersonData.update(gameParam, new Map(), new Map([[maybeTargetCountry, MyUtil.dropNull([maybeDefenceSidePerson])]]));
                                    }
                                }
                                if (maybeAttackJudge == AttackJudges.rout) {
                                    const isDrop = MyUtil.random(100) < routPersonDropPercent;
                                    if (isDrop) {
                                        if (srcCountry == gameParam.maybePlayCountry) {
                                            UIOperation.GameLog.failAttackDrop(gameParam, srcCountry.text, maybeAttackSidePerson?.text, maybeTargetCell.text);
                                        }
                                        UIOperation.TrunLog.failAttackDrop(gameParam, srcCountry.text, maybeAttackSidePerson?.text, maybeTargetCell.text);
                                        UIOperation.Log.failAttackDrop(srcCountry.text, maybeAttackSidePerson?.text, maybeTargetCell.text);
                                        UIOperation.PersonData.update(gameParam, new Map(), new Map([[srcCountry, MyUtil.dropNull([maybeAttackSidePerson])]]));
                                    }
                                }
                                if (maybeAttackJudge == AttackJudges.crushing || maybeAttackJudge == AttackJudges.win) {
                                    gameParam.cellPersonMap.set(maybeTargetCell, null);
                                    UIOperation.GameMap.changeCellCountryLabel(maybeTargetCell, maybeTargetCountry, srcCountry);
                                    UIOperation.Log.get(srcCountry.text, maybeTargetCell.text);
                                    if (srcCountry == gameParam.maybePlayCountry) {
                                        const playerCellNum = UIOperation.getCountryCellNum(gameParam, gameParam.maybePlayCountry);
                                        UIOperation.TrunLog.get(gameParam, maybeTargetCountry.text, maybeTargetCell.text);
                                        if (gameParam.playerMaxCellNum < playerCellNum) {
                                            gameParam.playerMaxCellNum = playerCellNum;
                                            UIOperation.GameLog.get(gameParam, maybeTargetCountry.text, maybeTargetCell.text, playerCellNum);
                                        }
                                    } else {
                                        UIOperation.TrunLog.otherCountryGet(gameParam, srcCountry.text, maybeTargetCountry.text, maybeTargetCell.text);
                                    }
                                    gameParam.cellCountryMap.set(maybeTargetCell, srcCountry);
                                    if (UIOperation.getCountryCellNum(gameParam, maybeTargetCountry) == 0) {
                                        const leavePersons = Array.from(gameParam.countryPersonMap.get(maybeTargetCountry)?.keys() ?? []);
                                        UIOperation.PersonData.update(gameParam, new Map(), new Map([[maybeTargetCountry, leavePersons]]));
                                        UIOperation.Log.perish(maybeTargetCountry.text, srcCountry.text, leavePersons);
                                        UIOperation.TrunLog.perish(gameParam, maybeTargetCountry.text, srcCountry.text);
                                        UIOperation.GameLog.perish(gameParam, maybeTargetCountry.text, srcCountry.text);
                                    }
                                }
                                return foldCountryInfoMap.concat([[srcCountry, new CountryInfo(null, null, (maybeAttackJudge == AttackJudges.win || maybeAttackJudge == AttackJudges.defeat) ? 1 : (maybeAttackJudge == AttackJudges.rout) ? 3 : 0)]]);
                            }
                        }
                        return foldCountryInfoMap.concat([[srcCountry, new CountryInfo(null, null, 0)]]);
                    }, reduceInitialValue).filter(([country]) => UIOperation.getCountryCellNum(gameParam, country) != 0));
                }
                function getAttackJudge(battleRandomValue: number, targetIsDefence: boolean, maybeAttackSidePerson: MyUtil.Maybe<PersonInfo>, maybeDefenceSidePerson: MyUtil.Maybe<PersonInfo>): MyUtil.Maybe<AttackJudge> {
                    const attackJudges = (targetIsDefence ? ConstData.blockBattleJudges : ConstData.normalBattleJudgesMap).get((maybeAttackSidePerson?.rank ?? 0) - (maybeDefenceSidePerson?.rank ?? 0)) ?? [];
                    const maybeAttackJudge = attackJudges.find(attackJudge => MyUtil.maybeApply(attackJudge.value,v=>v>battleRandomValue));
                    return maybeAttackJudge?.key;
                }
            }
            function nextTurn() {
                gameParam.playTurn = getNextTurn();
                continueJudge(gameParam.playTurn);
                showInstruction(gameParam.playTurn);
                function getNextTurn() {
                    return (gameParam.playTurn == null) ? 0 : gameParam.playTurn + 1;
                }
                function continueJudge(playTurn: number) {
                    if (ConstData.endYear <= ConstData.startYear + playTurn / ConstData.yearItems.length) {
                        gameEnd();
                    } else {
                        turnStart(playTurn);
                        if (playTurn % ConstData.yearItems.length == Math.floor(ConstData.yearItems.length / 2)) {
                            personShiftTurnStart();
                        }
                        UIOperation.TrunLog.show(gameParam);
                        UIOperation.PersonPiece.refreshMap(gameParam);
                        MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.PersonPiece.refreshPlayerStock(gameParam, playCountry));
                    }
                }
                function gameEnd() {
                    UIOperation.Message.end(gameParam.maybePlayCountry?.text);
                    UIOperation.GameLog.end(gameParam);
                    UIOperation.GameComment.show(gameParam.gameLog, sendButtonAction);
                }
                function turnStart(playTurn: number) {
                    UIOperation.Log.turn(playTurn);
                    UIOperation.Message.turn(playTurn, MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.getCountryCellNum(gameParam, playCountry)));

                }
                function personShiftTurnStart() {
                    const joinPersonMap = UIOperation.PersonData.getJoinYearPerson(gameParam);
                    const leaveYearPersonMap = UIOperation.PersonData.getLeaveYearPerson(gameParam);
                    const leavePersonMap = new Map(Array.from(leaveYearPersonMap).map(([person, personInfos]) => [person, personInfos.filter(([, personInfo]) => leaveJudge(-personInfo.deathYear + ConstData.startYear + (gameParam.playTurn ?? 0 - Math.floor(ConstData.yearItems.length / 2)) / ConstData.yearItems.length)).map(([person]) => person)]));
                    UIOperation.TrunLog.join(gameParam, joinPersonMap);
                    UIOperation.TrunLog.leave(gameParam, leavePersonMap);
                    UIOperation.Log.join(joinPersonMap);
                    UIOperation.Log.leave(leavePersonMap);
                    UIOperation.PersonData.update(gameParam, joinPersonMap, leavePersonMap);
                    function leaveJudge(overYear: number) {
                        return MyUtil.random(100) < overYear * 9 + 10;
                    }
                }
                function showInstruction(playTurn: number) {
                    if (playTurn == 0) {
                        MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.Instruction.show1(playCountry));
                    } else if (playTurn == 1) {
                        MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.Instruction.show2(playCountry));
                    } else if (playTurn == 2) {
                        MyUtil.maybeApply(gameParam.maybePlayCountry, playCountry => UIOperation.Instruction.show3(playCountry));
                    }
                }
            }
            function sendButtonAction(gameLog:string): void {
                MyUtil.maybeApply(top, window => window.location.href = `/siteContents/gameComment.php?caption=${GameInfo.name} ver.${GameInfo.version}&comment=${encodeURI(gameLog)}`);
            }
        }
    }
    function initGameData(): void {
        gameParam.init();
        UIOperation.Log.init();
        UIOperation.Message.init();
        UIOperation.Instruction.init();
        UIOperation.GameMap.initCell();
        UIOperation.GameMap.enableAllButton();
        UIOperation.PersonPiece.resetPlayerStock();
        UIOperation.PersonPiece.resetMap();
    }
}
game();