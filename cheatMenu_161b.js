// Author:  NoSecurity
// GitHub:  https://github.com/nos3curity
// Website: https://nosecurity.blog
// Version: 1.6.1b

// Cheat preset selection. Change this value if you need to
const PRESET = "default";

// Printing information to the console
console.log("------------------------Spider-Man Unlimited Cheat Menu------------------------");
console.log("[!] Made with love by NoSecurity for SMU 1.6.1b");
console.log("[!] Visit https://nosecurity.blog/");
console.log("\n---------------------------------Cheat Presets---------------------------------");
console.log("default  - Unlock all Spiderman, gain Vials, ISO-8 and energy");
console.log("gameplay - Gain invincibility and the unlimited combo counter");
console.log("\n[i] Select your preset by editing the PRESET variable in the script");
console.log("-------------------------------------------------------------------------------");
console.log(`\n[+] Running the ${PRESET} cheat preset`);

// Game library base address in memory
const libAddress = Module.findBaseAddress('libSpidermanI.so');

// Cheat function offsets from libSpidermanI.so in 1.6.1b arm32
const gainVialsOffset           = 0x0022ffb8;
const gainIso8Offset            = 0x0022ff74;
// const maxEnergyOffset        = 0x00234d70; Doesn't exist in 1.6.1
const unlockAllSpideyOffset     = 0x00233138; 
const levelUpCurrentSpidey      = 0x002316ac; 
const maxOutCurrentSpideyOffset = 0x0023318c;
const rankUpCurrentSpideyOffset = 0x00231654;
const invincibilityModeOffset   = 0x002328fc;
const unlimitedComboOffset      = 0x00232984;
const increaseSpideySpeedOffset = 0x00233074;
const decreaseSpideySpeedOffset = 0x002330d8;
const skipTutorialOffset        = 0x0023ec2c;
const gotoIssue1Offset          = 0x0023b7d0;
const gotoIssue2Offset          = 0x0023bdcc;
const gotoIssue3Offset          = 0x0023c490;
const gotoIssue4Offset          = 0x0023ce04;
const gotoIssue5Offset          = 0x0023d798;
const gotoIssue6Offset          = 0x0023e150;

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
        // callCheatFuncByOffset(maxEnergyOffset);
        callCheatFuncByOffset(unlockAllSpideyOffset);
    case "gameplay":
        callCheatFuncByOffset(invincibilityModeOffset);
        callCheatFuncByOffset(unlimitedComboOffset);
  }

console.log("\n[+] Cheat complete. Enjoy.");