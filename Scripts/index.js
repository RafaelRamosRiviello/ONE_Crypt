const output = document.getElementById("output-area");
const input = document.getElementById("input-area");
var encryptionLevel = "low";
var lastGeneratedMessage;

const newAlphabet1 = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
]

const newAlphabet2 = [
    ["a", "Za"], ["A", "z1"],
    ["b", "Yb"], ["B", "y2"],
    ["c", "Xc"], ["C", "x3"],
    ["d", "Wd"], ["D", "w4"],
    ["e", "Ve"], ["E", "v5"],
    ["f", "Uf"], ["F", "u6"],
    ["g", "Tg"], ["G", "t7"],
    ["h", "Sh"], ["H", "s8"],
    ["i", "Ri"], ["I", "r9"],
    ["j", "Qj"], ["J", "q10"],
    ["k", "Pk"], ["K", "p11"],
    ["l", "Ol"], ["L", "o12"],
    ["m", "Nm"], ["M", "n13"],
    ["n", "Mn"], ["N", "m14"],
    ["o", "Lo"], ["O", "l15"],
    ["p", "Kp"], ["P", "k16"],
    ["q", "Jq"], ["Q", "j17"],
    ["r", "Ir"], ["R", "i18"],
    ["s", "Hs"], ["S", "h19"],
    ["t", "Gt"], ["T", "g20"],
    ["u", "Fu"], ["U", "f21"],
    ["v", "Ev"], ["V", "e22"],
    ["w", "Dw"], ["W", "d23"],
    ["x", "Cx"], ["X", "c24"],
    ["y", "By"], ["Y", "b25"],
    ["z", "Az"], ["Z", "a26"],
    [" ", "0"]
]

const commands = {
    cmds: () => {
        output.value += `

/cmds -> Shows a list of commands.
/encrypt -> Converts your message to an encrypted message.
/decrypt -> Converts your encrypted message to a readable message.
/copy -> Copies the last generated message.
/clear -> Clears the output deleting all texts.
/cryptLevel -> Changes the encryption level.
Encryption levels: low(default)/high.
`;
    },

    encrypt: (message) => {
        var encrypted = "";

        if(encryptionLevel === "low"){
            message = message.toLowerCase();

            for(var i=0; i < message.length; i++){
                for(var n=0; n < newAlphabet1.length; n++){
                    if(message[i] === newAlphabet1[n][0]){
                        encrypted += newAlphabet1[n][1];
                        break
                    }else if(n == newAlphabet1.length-1){
                        encrypted += message[i];
                    }
                }
            }
        }else if(encryptionLevel === "high"){
            for(var i=0; i < message.length; i++){
                for(var n=0; n < newAlphabet2.length; n++){
                    if(message[i] === newAlphabet2[n][0]){
                        encrypted += newAlphabet2[n][1];
                        break;
                    }else if(n == newAlphabet2.length-1){
                        encrypted += message[i]
                    }
                }
            }
        }

        lastGeneratedMessage = encrypted
        output.value += "\n" + encrypted;
    },

    decrypt: (message) => {
        if(encryptionLevel === "low"){
            for(var i=0; i < newAlphabet1.length; i++){
                message = message.replaceAll(newAlphabet1[i][1], newAlphabet1[i][0]);
            }
        }else if(encryptionLevel === "high"){
            for(var i=0; i < newAlphabet2.length; i++){
                message = message.replaceAll(newAlphabet2[i][1], newAlphabet2[i][0]);
            }
        }

        lastGeneratedMessage = message
        output.value += "\n" + message;
    },

    copy: () => {
        navigator.clipboard.writeText(lastGeneratedMessage)
    },

    clear: () => {
        output.value = "Type \"/cmds\" to view a list of commands";
    },

    cryptLevel: (level) => {
        if(level === "low" || level === "high"){
            encryptionLevel = level;

            output.value += "\n Encryption level is now " + level + "!";
        }else{
            output.value += "\n Encryption level incorrect!\n Encryption levels: low/high";
        }
    }
}

function CommandExecuted(event) {
    if(event.key === "Enter" && !event.repeat){
        if(input.value.startsWith("/")){

            if(input.value.startsWith("cmds", 1)){
                output.value += "\n" + input.value;
                commands.cmds();
            }else if(input.value.startsWith("cryptLevel ", 1)){
                var message = input.value.slice(12);

                output.value += "\n" + input.value;
                commands.cryptLevel(message);
            }else if(input.value.startsWith("encrypt ", 1)){
                var message = input.value.slice(9);

                output.value += "\n" + input.value;
                commands.encrypt(message);
            }else if(input.value.startsWith("decrypt ", 1)){
                var message = input.value.slice(9);

                output.value += "\n" + input.value;
                commands.decrypt(message);
            }else if(input.value.startsWith("copy", 1)){
                output.value += "\n" + input.value;
                commands.copy();
            }else if(input.value.startsWith("clear", 1)){
                output.value += "\n" + input.value;
                commands.clear();
            }else if(input.value.startsWith("cryptLevel ", 1)){
                var message = input.value.slice(12);

                output.value += "\n" + input.value;
                commands.cryptLevel(message);
            }
        }

        event.preventDefault();
        input.value = "";
    }
}

input.addEventListener("keydown", CommandExecuted)