const output = document.getElementById("output-area");
const input = document.getElementById("input-area");
var lastGeneratedMessage;

const NewAlphabet = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
]

const commands = {
    cmds: () => {
        output.value += `

/cmds -> Shows a list of commands.
/encrypt -> Converts your message to an encrypted message.
/decrypt -> Converts your encrypted message to a readable message.
/copy -> Copies the last generated message.
/clear -> Clears the output deleting all texts.
`;
    },

    encrypt: (message) => {
        message = message.toLowerCase();

        for(var i=0; i < NewAlphabet.length; i++){
            message = message.replaceAll(NewAlphabet[i][0], NewAlphabet[i][1]);
        }

        lastGeneratedMessage = message
        output.value += "\n" + message;
    },

    decrypt: (message) => {
        for(var i=0; i < NewAlphabet.length; i++){
            message = message.replaceAll(NewAlphabet[i][1], NewAlphabet[i][0]);
        }

        lastGeneratedMessage = message
        output.value += "\n" + message;
    },

    copy: () => {
        navigator.clipboard.writeText(lastGeneratedMessage)
    },

    clear: () => {
        output.value = "Type \"/cmds\" to view a list of commands";
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
            }
        }

        event.preventDefault();
        input.value = "";
    }
}

input.addEventListener("keydown", CommandExecuted)