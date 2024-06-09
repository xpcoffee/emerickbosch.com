import React, {useState} from "react"

/**
 * A representation for a note that allows us to use math to calculate accidentals.
 */
type Note = {
    name: string,
    accidental: number,
}

function toNote(noteString: string): Note {
    const [noteName, ...modifiers] = noteString.split('')
    const modifierSymbol = modifiers[0] === "#" ? 1 : -1;
    const modifierValue = modifiers.length * modifierSymbol;

    return  {
        name: noteName.toUpperCase(),
        accidental: modifierValue
    }
}

function toNoteString({accidental, name}: Note) {
    if(accidental > 0) {
        return name + "#".repeat(accidental)
    } else {
        return name + "b".repeat(accidental * -1)
    }
}

/**
 * Basic information about musical notes & the distances between them
 */
const NOTES = [
    {note:"A", intervalFromPreviousNote:2},
    {note:"B", intervalFromPreviousNote:2},
    {note:"C", intervalFromPreviousNote:1},
    {note:"D", intervalFromPreviousNote:2},
    {note:"E", intervalFromPreviousNote:2},
    {note:"F", intervalFromPreviousNote:1},
    {note:"G", intervalFromPreviousNote:2},
]
/**
 * Provides the pattern of intervals between notes which results in a modal scale.
 */
const MODAL_SCALE_STRUCTURE = [2,2,1,2,2,2,1]
const MODES: Record<string, {degree: number, symbol: string, name: string, nickname?: string}> = {
    1: { degree: 1, symbol: "I", name: "Ionian", nickname: "major" },
    2: { degree: 1, symbol: "ii", name: "Dorian" },
    3: { degree: 1, symbol: "iii", name: "Phrygian" },
    4: { degree: 1, symbol: "IV", name: "Lydian" },
    5: { degree: 1, symbol: "V", name: "Myxolidian" },
    6: { degree: 1, symbol: "vi", name: "Aeolian", nickname: "natural minor" },
    7: { degree: 1, symbol: "vii", name: "Locrian" },
}

/**
 * "Rotates" the modal scale structure based on the degree of the mode (e.g. Ionian is degree 1)
 * https://en.wikipedia.org/wiki/Mode_(music)#Modern_modes
 */
function getStructureForScaleDegree(scaleDegree: number) {
    if(scaleDegree < 1 || scaleDegree > 7) {
        throw Error("unexpected scale degree " + scaleDegree);
    }
    return [...MODAL_SCALE_STRUCTURE.slice(scaleDegree-1), ...MODAL_SCALE_STRUCTURE.slice(0,scaleDegree - 1)]
}

/**
 * Western scales MUST have all 8 note names in them; this function prepares this base.
 */
function getScaleBaseForKey(keyIndex: number): typeof NOTES {
    return [...NOTES.slice(keyIndex), ...NOTES.slice(0,keyIndex)]
}

/** 
 * Returns a modal scale given the modal scale degree and a key.
 */
function getModalScale(scaleDegree: number, key: Note): string[] {
    const keyIndex = NOTES.findIndex(({note}) => note === key.name)

    const scaleBase = getScaleBaseForKey(keyIndex)
    const structure = getStructureForScaleDegree(scaleDegree)

    const scale: string[] = [toNoteString(key)];

    let currentModifier = key.accidental;
    for(let i = 0; i < scaleBase.length - 1; i++) {
        const {note, intervalFromPreviousNote} = scaleBase[i + 1]
        const intervalsForward = structure[i]
        console.log({currentModifier, intervalsForward, intervalFromPreviousNote})
        currentModifier = currentModifier + intervalsForward - intervalFromPreviousNote

        scale.push(toNoteString({
            name: note,
            accidental: currentModifier
        }))
    }

    return scale;
}



const ModalScale = () => {
    const [key, setKey] = useState(toNote("C"));
    const [scaleDegree, setScaleDegree] = useState("1");
    const modalScale = getModalScale(Number.parseInt(scaleDegree), key)
    const modalScaleThird = [...modalScale.slice(2), ...modalScale.slice(0, 2)]
    const modalScaleFifth = [...modalScale.slice(4), ...modalScale.slice(0, 4)]


    return (
        <div>
            <div className="table">
                <div className="table-row">
                    <label htmlFor="modeSelect" className="table-cell">
                        Scale degree
                    </label>
                    <select id="modeSelect" onChange={(event) => setScaleDegree(event.currentTarget.value)} className="ml-5 table-cell">
                        {Object.entries(MODES).map(
                            ([key, mode]) => <option value={key} key={"mode" + mode.symbol}>{`${mode.name} (${mode.symbol}) ${mode.nickname ?? ""}`}</option>
                        )}
                    </select>
                </div>
                <div className="table-row">
                    <label htmlFor="keyInput" className="table-cell">
                        Key
                    </label>
                    <input
                    className="ml-5 table-cell"
                        id="keyInput"
                        placeholder="C / Bb / G#"
                        pattern="^[A-Ga-g]{1}(b*|#*)$"
                        onInputCapture={(event) => event.currentTarget.checkValidity() && setKey(toNote(event.currentTarget.value || "C"))}
                    ></input>
                </div>
            </div>

            <table className="table-fixed mt-8">
                <caption>{MODES[scaleDegree].name} in the key of {toNoteString(key)}</caption>
                <thead>
                    <tr><td></td>{["I", "II", "III", "IV", "V", "VI", "VII"].map(val => <td>{val}</td>)}</tr>
                </thead>
                <tbody>
                    <tr><td>root</td>{modalScale.map(val => <td>{val}</td>)}</tr>
                    <tr><td>triad third</td>{modalScaleThird.map(val => <td>{val}</td>)}</tr>
                    <tr><td>triad fifth</td>{modalScaleFifth.map(val => <td>{val}</td>)}</tr>
                </tbody>
            </table>
        </div>
    )
}

export { ModalScale }
