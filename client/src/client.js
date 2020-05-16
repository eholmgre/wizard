const sock = io();

const chatEvent = (msg) => {
    const parent = document.querySelector("#chat ul");

    const el = document.createElement("li");
    el.innerHTML = msg;

    parent.appendChild(el);

    parent.scrollTop = 100;
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const input = document.querySelector("#chat-input");
    const text = input.value;
    input.value = "";

    sock.emit("chat", text);
}

chatEvent("helo from the client")
sock.on("chat", chatEvent);

document
    .querySelector("#chat-form")
    .addEventListener("submit", onFormSubmit);
