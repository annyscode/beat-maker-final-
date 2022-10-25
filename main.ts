namespace SpriteKind {
    export const Measure1 = SpriteKind.create()
    export const Measure2 = SpriteKind.create()
    export const Measure3 = SpriteKind.create()
    export const Measure4 = SpriteKind.create()
    export const Hand = SpriteKind.create()
    export const Measure = SpriteKind.create()
    export const RecordArea = SpriteKind.create()
    export const RecordButton = SpriteKind.create()
    export const RecordingArm = SpriteKind.create()
    export const PlayButton = SpriteKind.create()
    export const deco = SpriteKind.create()
}
function start_countdown () {
    beat_length = 60 / tempo * 1000
    timer.background(function () {
        music.baDing.play()
        blockRecording = true
        countdown1 = textsprite.create("1", 0, 10)
        countdown1.setMaxFontHeight(15)
        countdown1.z = 20
        pause(beat_length)
        countdown1.destroy()
    })
    timer.after(beat_length * 1, function () {
        music.baDing.play()
        countdown2 = textsprite.create("2", 0, 10)
        countdown2.setMaxFontHeight(15)
        countdown2.z = 20
        countdown2.z = 20
        pause(beat_length)
        countdown2.destroy()
    })
    timer.after(beat_length * 2, function () {
        music.baDing.play()
        countdown1 = textsprite.create("3", 0, 10)
        countdown1.setMaxFontHeight(15)
        countdown1.z = 20
        pause(beat_length)
        countdown1.destroy()
    })
    timer.after(beat_length * 3, function () {
        music.baDing.play()
        countdown2 = textsprite.create("4", 0, 10)
        countdown2.setMaxFontHeight(15)
        countdown2.z = 20
        pause(beat_length)
        countdown2.destroy()
    })
    return beat_length * 4
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isRecording) {
        recording.push(game.runtime())
    }
})
sprites.onOverlap(SpriteKind.Measure, SpriteKind.Hand, function (sprite, otherSprite) {
    if (controller.A.isPressed() && !(isSelecting)) {
        isSelecting = true
        controller.moveSprite(hand, 0, 0)
        story.showPlayerChoices("I", "IV", "V", "vi")
        sprites.setDataString(sprite, "chord", story.getLastAnswer())
        positionText()
        pause(500)
        controller.moveSprite(hand)
        isSelecting = false
    }
})
function getNote (measure: number) {
    thisMeasure = measureButtons[measure]
    theChord = sprites.readDataString(thisMeasure, "chord")
    if (theChord == "I") {
        chordNotes = [
        chordLookup.lookupNote("C", 4, 0),
        chordLookup.lookupNote("C", 4, 2),
        chordLookup.lookupNote("C", 4, 4),
        chordLookup.lookupNote("C", 4, 5),
        chordLookup.lookupNote("C", 4, 7),
        chordLookup.lookupNote("C", 4, 9),
        chordLookup.lookupNote("C", 4, 11),
        chordLookup.lookupNote("C", 4, 12)
        ]
    } else if (theChord == "IV") {
        chordNotes = [
        chordLookup.lookupNote("F", 4, 0),
        chordLookup.lookupNote("F", 4, 2),
        chordLookup.lookupNote("F", 4, 4),
        chordLookup.lookupNote("F", 4, 5),
        chordLookup.lookupNote("F", 4, 7),
        chordLookup.lookupNote("F", 4, 9),
        chordLookup.lookupNote("F", 4, 11),
        chordLookup.lookupNote("F", 4, 12)
        ]
    } else if (theChord == "V") {
        chordNotes = [
        chordLookup.lookupNote("G", 4, 0),
        chordLookup.lookupNote("G", 4, 2),
        chordLookup.lookupNote("G", 4, 4),
        chordLookup.lookupNote("G", 4, 5),
        chordLookup.lookupNote("G", 4, 7),
        chordLookup.lookupNote("G", 4, 9),
        chordLookup.lookupNote("G", 4, 11),
        chordLookup.lookupNote("G", 4, 12)
        ]
    } else {
        chordNotes = [
        chordLookup.lookupNote("A", 4, 0),
        chordLookup.lookupNote("A", 4, 2),
        chordLookup.lookupNote("A", 4, 3),
        chordLookup.lookupNote("A", 4, 5),
        chordLookup.lookupNote("A", 4, 7),
        chordLookup.lookupNote("A", 4, 9),
        chordLookup.lookupNote("A", 4, 11),
        chordLookup.lookupNote("A", 4, 12)
        ]
    }
    return chordNotes._pickRandom()
}
sprites.onOverlap(SpriteKind.RecordButton, SpriteKind.Hand, function (sprite, otherSprite) {
    if (controller.A.isPressed() && !(blockRecording)) {
        timer.after(start_countdown(), function () {
            isRecording = true
            recordButton.setImage(img`
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ..........ccccccccccccc.........
                .........c3333333333333c........
                ........c333333333333333c.......
                ........c333222333222333c.......
                ........c332222232222233c.......
                ........c332222222212233c.......
                ........c332222222221233c.......
                ........c332222222222233c.......
                ........c333222222222333c.......
                ........c333322222223333c.......
                ........c333332222233333c.......
                ........c333333222333333c.......
                ........c333333323333333c.......
                ........c333333333333333c.......
                .........c3333333333333c........
                ..........ccccccccccccc.........
                ................................
                ...........222.222.222..........
                ...........2.2.2...2.2..........
                ...........22..22..2............
                ...........2.2.2...2.2..........
                ...........2.2.222.222..........
                ................................
                ................................
                ................................
                ................................
                `)
            hand.setPosition(141, 63)
            recordingStartTime = game.runtime()
            recording = []
            noteEndTimes = []
            recordingArmSprite = sprites.create(img`
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                2 
                `, SpriteKind.RecordingArm)
            recordingArmSprite.left = recordArea.left
            recordArea.setImage(img`
                ccccc11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ccccc
                c11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ccc
                11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c
                11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111f1f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111f1f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                d1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d
                dd111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d
                ddd1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111dd
                `)
            recordingLength = 60 / tempo * 16 * 1000
            timer.background(function () {
                story.startCutscene(function () {
                    story.spriteMoveToLocation(recordingArmSprite, recordArea.right, 60, recordArea.width / (recordingLength / 1000))
                })
            })
            timer.after(recordingLength, function () {
                recordingArmSprite.destroy()
                recordButton.setImage(img`
                    ................................
                    ................................
                    ................................
                    ................................
                    ................................
                    ................................
                    ..........ccccccccccccc.........
                    .........c1111111111111c........
                    ........c111111111111111c.......
                    ........c111222111222111c.......
                    ........c112222212222211c.......
                    ........c112222222212211c.......
                    ........c112222222221211c.......
                    ........c112222222222211c.......
                    ........c111222222222111c.......
                    ........c111122222221111c.......
                    ........c111112222211111c.......
                    ........c111111222111111c.......
                    ........c111111121111111c.......
                    ........c111111111111111c.......
                    .........c1111111111111c........
                    ..........ccccccccccccc.........
                    ................................
                    ...........222.222.222..........
                    ...........2.2.2...2.2..........
                    ...........22..22..2............
                    ...........2.2.2...2.2..........
                    ...........2.2.222.222..........
                    ................................
                    ................................
                    ................................
                    ................................
                    `)
                noteEndTimes.push(game.runtime())
                isRecording = false
                blockRecording = false
            })
        })
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (isRecording) {
        noteEndTimes.push(game.runtime())
    }
})
sprites.onOverlap(SpriteKind.PlayButton, SpriteKind.Hand, function (sprite, otherSprite) {
    if (controller.A.isPressed() && !(isPlaying)) {
        sprite.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ..........ccccccccccccc.........
            .........c3333333333333c........
            ........c333333333333333c.......
            ........c333333333333333c.......
            ........c333333333333333c.......
            ........c333311333113333c.......
            ........c333311333113333c.......
            ........c333311333113333c.......
            ........c333311333113333c.......
            ........c333311333113333c.......
            ........c333311333113333c.......
            ........c333333333333333c.......
            ........c333333333333333c.......
            ........c333333333333333c.......
            .........c3333333333333c........
            ..........ccccccccccccc.........
            ................................
            .........333.3...333.3.3........
            .........3.3.3...3.3.3.3........
            .........333.3...333.333........
            .........3...3...3.3..3.........
            .........3...333.3.3..3.........
            ................................
            ................................
            ................................
            ................................
            `)
        isPlaying = true
        console.log(noteEndTimes)
        console.log(recording)
        for (let index = 0; index <= recording.length - 1; index++) {
            play_the_song(index)
        }
        timer.after(recordingLength, function () {
            sprite.setImage(img`
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ..........ccccccccccccc.........
                .........c3333333333333c........
                ........c333333333333333c.......
                ........c333113333333333c.......
                ........c333111133333333c.......
                ........c333111111133333c.......
                ........c333111111113333c.......
                ........c333111111111133c.......
                ........c333111111111133c.......
                ........c333111111113333c.......
                ........c333111111133333c.......
                ........c333111133333333c.......
                ........c333113333333333c.......
                ........c333333333333333c.......
                .........c3333333333333c........
                ..........ccccccccccccc.........
                ................................
                .........333.3...333.3.3........
                .........3.3.3...3.3.3.3........
                .........333.3...333.333........
                .........3...3...3.3..3.........
                .........3...333.3.3..3.........
                ................................
                ................................
                ................................
                ................................
                `)
            isPlaying = false
        })
    }
})
function positionText () {
    for (let value of sprites.allOfKind(SpriteKind.Measure)) {
        tempNumber = measureButtons.indexOf(value)
        tempTextSprite = chordTextSprites[tempNumber]
        tempTextSprite.setText(sprites.readDataString(value, "chord"))
        tempTextSprite.setPosition(value.x, value.y)
        tempTextSprite.z = 10
    }
}
function play_the_song (index: number) {
    timer.after(recording[index] - recordingStartTime, function () {
        note = getNote(Math.floor((recording[index] - recordingStartTime) / (recordingLength / 4)))
        music.playTone(note, noteEndTimes[index] - recording[index])
    })
}
let note = 0
let tempTextSprite: TextSprite = null
let tempNumber = 0
let isPlaying = false
let recordingLength = 0
let recordingArmSprite: Sprite = null
let noteEndTimes: number[] = []
let recordingStartTime = 0
let chordNotes: number[] = []
let theChord = ""
let thisMeasure: Sprite = null
let isSelecting = false
let recording: number[] = []
let isRecording = false
let countdown2: TextSprite = null
let countdown1: TextSprite = null
let blockRecording = false
let beat_length = 0
let recordButton: Sprite = null
let recordArea: Sprite = null
let measureButtons: Sprite[] = []
let hand: Sprite = null
let chordTextSprites: TextSprite[] = []
let tempo = 0
music.setVolume(20)
tempo = 120
scene.setBackgroundImage(sprites.background.moon)
chordTextSprites = []
let measure1ChordButton = sprites.create(img`
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    `, SpriteKind.Measure)
let textSprite = textsprite.create("I")
textSprite.setOutline(1, 15)
chordTextSprites.push(textSprite)
sprites.setDataSprite(measure1ChordButton, "text", textSprite)
sprites.setDataString(measure1ChordButton, "chord", "I")
measure1ChordButton.setPosition(21, 100)
let measure2ChordButton = sprites.create(img`
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    `, SpriteKind.Measure)
sprites.setDataString(measure2ChordButton, "chord", "I")
textSprite = textsprite.create("I")
textSprite.setOutline(1, 15)
chordTextSprites.push(textSprite)
measure2ChordButton.setPosition(51, 100)
sprites.setDataSprite(measure2ChordButton, "text", textSprite)
let measure3ChordButton = sprites.create(img`
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    `, SpriteKind.Measure)
sprites.setDataString(measure3ChordButton, "chord", "I")
textSprite = textsprite.create("I")
chordTextSprites.push(textSprite)
textSprite.setOutline(1, 15)
measure3ChordButton.setPosition(81, 100)
sprites.setDataSprite(measure3ChordButton, "text", textSprite)
let measur4ChordButton = sprites.create(img`
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    ccc111111111111111111111111ccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccc
    `, SpriteKind.Measure)
sprites.setDataString(measur4ChordButton, "chord", "I")
measur4ChordButton.setPosition(111, 100)
textSprite = textsprite.create("I")
chordTextSprites.push(textSprite)
textSprite.setOutline(1, 15)
hand = sprites.create(img`
    . . . . . 3 . . . . . . . . . . 
    . . . . 3 1 3 . . . . . . . . . 
    . . . . 3 1 1 3 . . . . . . . . 
    . . . . 3 1 1 1 3 . . . . . . . 
    . . . . 3 1 1 1 1 3 . . . . . . 
    . . . . 3 1 1 1 1 1 3 . . . . . 
    . . . . 3 1 1 1 1 1 1 3 . . . . 
    . . . . 3 1 1 1 1 1 1 1 3 . . . 
    . . . . 3 1 1 1 1 1 1 1 1 3 . . 
    . . . . 3 1 1 1 1 1 3 3 3 3 3 . 
    . . . . 3 1 1 3 1 1 3 . . . . . 
    . . . . 3 1 3 . 3 1 1 3 . . . . 
    . . . . 3 3 . . 3 1 1 3 . . . . 
    . . . . 3 . . . . 3 1 1 3 . . . 
    . . . . . . . . . 3 1 1 3 . . . 
    . . . . . . . . . . 3 3 . . . . 
    `, SpriteKind.Hand)
hand.z = 15
sprites.setDataSprite(measur4ChordButton, "text", textSprite)
measureButtons = [
measure1ChordButton,
measure2ChordButton,
measure3ChordButton,
measur4ChordButton
]
controller.moveSprite(hand)
positionText()
recordArea = sprites.create(img`
    ccccc11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ccccc
    c11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111ccc
    11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c
    11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111f1f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111f1f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    f11111111111111111111111111111f11111111111111111111111111111f11111111111111111111111111111f1111111111111111111111111f11f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    d1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d
    dd111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d
    ddd1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111dd
    `, SpriteKind.RecordArea)
recordArea.left = 6
recordButton = sprites.create(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ..........ccccccccccccc.........
    .........c1111111111111c........
    ........c111111111111111c.......
    ........c111222111222111c.......
    ........c112222212222211c.......
    ........c112222222212211c.......
    ........c112222222221211c.......
    ........c112222222222211c.......
    ........c111222222222111c.......
    ........c111122222221111c.......
    ........c111112222211111c.......
    ........c111111222111111c.......
    ........c111111121111111c.......
    ........c111111111111111c.......
    .........c1111111111111c........
    ..........ccccccccccccc.........
    ................................
    ...........222.222.222..........
    ...........2.2.2...2.2..........
    ...........22..22..2............
    ...........2.2.2...2.2..........
    ...........2.2.222.222..........
    ................................
    ................................
    ................................
    ................................
    `, SpriteKind.RecordButton)
recordButton.setPosition(17, 21)
let playButton = sprites.create(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ..........ccccccccccccc.........
    .........c3333333333333c........
    ........c333333333333333c.......
    ........c333113333333333c.......
    ........c333111133333333c.......
    ........c333111111133333c.......
    ........c333111111113333c.......
    ........c333111111111133c.......
    ........c333111111111133c.......
    ........c333111111113333c.......
    ........c333111111133333c.......
    ........c333111133333333c.......
    ........c333113333333333c.......
    ........c333333333333333c.......
    .........c3333333333333c........
    ..........ccccccccccccc.........
    ................................
    .........333.3...333.3.3........
    .........3.3.3...3.3.3.3........
    .........333.3...333.333........
    .........3...3...3.3..3.........
    .........3...333.3.3..3.........
    ................................
    ................................
    ................................
    ................................
    `, SpriteKind.PlayButton)
playButton.setPosition(37, 21)
let heartdeco1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . f f f f f . f f f f f . . 
    . . f f 3 3 3 f f f 3 3 3 f f . 
    . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
    . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
    . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
    . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
    . . f f 3 3 3 b b b 3 3 3 f f . 
    . . . f f 3 b b b b b 3 f f . . 
    . . . . f f b b b b b f f . . . 
    . . . . . f f b b b f f . . . . 
    . . . . . . f f b f f . . . . . 
    . . . . . . . f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.deco)
heartdeco1.setPosition(119, 27)
let heartdeco2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . f f f f f . f f f f f . . 
    . . f f 3 3 3 f f f 3 3 3 f f . 
    . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
    . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
    . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
    . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
    . . f f 3 3 3 b b b 3 3 3 f f . 
    . . . f f 3 b b b b b 3 f f . . 
    . . . . f f b b b b b f f . . . 
    . . . . . f f b b b f f . . . . 
    . . . . . . f f b f f . . . . . 
    . . . . . . . f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.deco)
heartdeco2.setPosition(139, 13)
game.onUpdate(function () {
    if (isRecording && controller.A.isPressed()) {
        spriteutils.drawTransparentImage(img`
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            3 
            `, recordArea.image, Math.floor(recordingArmSprite.x - recordArea.left), 5)
    }
})
