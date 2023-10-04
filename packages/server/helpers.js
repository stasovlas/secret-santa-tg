function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [ array[currentIndex], array[randomIndex] ] = [
            array[randomIndex], array[currentIndex] ];
    }

    return array;
}

export function generatePairs(ids) {
    const randomizedIds = shuffle(ids.slice());

    const pairs = shuffle(randomizedIds.slice()).reduce((acc, id, index) => {
        const pair = acc.find((p) => p.length === 1 && p[0] !== id && !(index !== acc.length - 1 && acc.find((p1) => p1.length === 2 && p1[0] === id && p1[1] === p[0])));

        if (pair) {
            pair.push(id);
        }

        return acc;
    }, randomizedIds.map((id) => [ id ]));

    const isRegenerate = !!ids.find((id) => {
        const to = pairs.find((p) => p[1] === id);
        return !to;
    });

    if (isRegenerate) {
        return generatePairs(randomizedIds);
    }

    return pairs;
}