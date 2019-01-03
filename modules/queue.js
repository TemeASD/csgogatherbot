let data = [];

exports.addToQueue = (user) => {
    if (amountOfPlayers() <= 10) {
        if (checkIfInQueue(user.username)) {
            return false;
        } else {
            return true;
        }
    }
}
const amountOfPlayers = () => {
    return data.length;
}
exports.amountOfPlayers = () => {
    return data.length;
}
const checkIfInQueue = (user) => {
    for (let i = 0; i < 11; i++) {
        if (data[i] === user) {
            return true;
        }
    }
    data.push(user);
}
const remove = () => {
    this.data.pop();
}
const first = () => {
    return this.data[0];
}

const last = () => {
    return this.data[this.data.length - 1];
}

const size = () => {
    return this.data.length;
}