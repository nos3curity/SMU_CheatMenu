// Author:  NoSecurity
// GitHub:  https://github.com/nos3curity
// Website: https://nosecurity.blog

// Cheat preset selection. Change this value if you need to
const PRESET = "default";

// Printing information to the console
console.log("------------------------Spider-Man Unlimited Cheat Menu------------------------");
console.log("[!] Made with love by NoSecurity");
console.log("[!] Visit https://nosecurity.blog/");
console.log("\n---------------------------------Cheat Presets---------------------------------");
console.log("default  - Unlock all Spiderman, gain Vials, ISO-8 and energy");
console.log("gameplay - Gain invincibility and the unlimited combo counter");
console.log("\n[i] Select your preset by editing the PRESET variable in the script");
console.log("-------------------------------------------------------------------------------");
console.log(`\n[+] Running the ${PRESET} cheat preset`);

// Game library base address in memory
const libAddress = Module.findBaseAddress('libSpidermanI.so');

// Cheat function offsets from libSpidermanI.so in 1.9.0f arm32
const gainVialsOffset           = 0x00234b8c;
const gainIso8Offset            = 0x00234c48;
const maxEnergyOffset           = 0x00234d70;
const unlockAllSpideyOffset     = 0x00238590;
const levelUpCurrentSpidey      = 0x00236630;
const maxOutCurrentSpideyOffset = 0x00240f5c;
const rankUpCurrentSpideyOffset = 0x002365d8;
const invincibilityModeOffset   = 0x0023784c;
const unlimitedComboOffset      = 0x002378d4;
const increaseSpideySpeedOffset = 0x002384d0;
const decreaseSpideySpeedOffset = 0x00238530;
const skipTutorialOffset        = 0x00244720;
const gotoIssue1Offset          = 0x002410d8;
const gotoIssue2Offset          = 0x00241730;
const gotoIssue3Offset          = 0x00241e50;
const gotoIssue4Offset          = 0x00242810;
const gotoIssue5Offset          = 0x002431f0;
const gotoIssue6Offset          = 0x00243c0c;

// Open a message box with provided text
function openMessageBox(message) {
    // Function and variable offsets from libSpidermanI.so in 1.9.0f arm32
    const uiManagerVarOffset        = 0x0125e9d4;
    const uiInitializerFuncOffset   = 0x001b5938;
    const uiStateFuncOffset         = 0x001a8d74;
    const createMessageFuncOffset   = 0x001bab24;
    const populateMessageFuncOffset = 0x00230518;

    // Function prototypes
    const uiInitializerFunc         = new NativeFunction(libAddress.add(uiInitializerFuncOffset),   'void',     ['uint32', 'uint32']);
    const uiStateFunc               = new NativeFunction(libAddress.add(uiStateFuncOffset),         'uint32',   ['uint32', 'uint32']);
    const createMessageBoxFunc      = new NativeFunction(libAddress.add(createMessageFuncOffset),   'uint32',   ['uint32', 'uint32']);
    const populateMessageBoxFunc    = new NativeFunction(libAddress.add(populateMessageFuncOffset), 'void',     ['int', 'pointer', 'uint32', 'uint32']);

    // Message Box text
    const messageString = Memory.allocUtf8String(message); 

    // Retrieve the UI manager and state
    const uiManagerVarFunc = ptr(libAddress.add(uiManagerVarOffset).readUInt() + 0x6e8);
    const uiManagerVar = uiManagerVarFunc.readS32();
    uiInitializerFunc(uiManagerVar, 0x13);
    const uiState = uiStateFunc(uiManagerVar, 0xc);

    // Create and populate the message box
    createMessageBoxFunc(uiManagerVar, 0xc);
    populateMessageBoxFunc(uiState, messageString, 0, 0);
}

// Call function with void return and no arguments by its offset from libSpidermanI.so base
function callCheatFuncByOffset(offset) {
    const functionPointer = new NativeFunction(libAddress.add(offset), 'void', []);
    functionPointer();
}

// Intercept the internet check function to allow offline play
const checkInternetOffset = 0x00189c58
const checkInternet = new NativeFunction(libAddress.add(checkInternetOffset), 'void', ['uint32', 'uint32']);
Interceptor.attach(checkInternet, {
    onEnter: function(args) {
        args[1] = ptr(1);
    }
});

// Running the selected cheat preset
switch(PRESET) {
    case "default":
        callCheatFuncByOffset(gainVialsOffset);
        callCheatFuncByOffset(gainIso8Offset);
        callCheatFuncByOffset(maxEnergyOffset);
        callCheatFuncByOffset(unlockAllSpideyOffset);
    case "gameplay":
        callCheatFuncByOffset(invincibilityModeOffset);
        callCheatFuncByOffset(unlimitedComboOffset);
  }

console.log("\n[+] Cheat complete. Enjoy.");
openMessageBox(`Successfully executed the ${PRESET} cheat preset. Enjoy and remember to visit https://nosecurity.blog/`);