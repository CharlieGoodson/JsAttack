// возвращает случайное целое число в диапазоне (т, п] (включительно)
function rand(m, n) {
	return m + Math.floor((n - m + 1) * Math.random()); }

// случайно возвращает строку, представляюшую одну из шести
// граней Короны и Якоря
function randFace() {
	return ["корона", "якорь", "чирвы", "пики", "трефы", "бубны"]
	[rand(0, 5)]; }

let funds = 50; // начальное условие, сумма денег
let round = 0; // для подсчета количества раундов игры

while (funds > 1 && funds < 100) {
	round++;
	console.log(`Раунд ${round}:`);
	console.log(`\tначальная сумма: ${funds}p`);
	// размещение ставок
	const bets = { "корона": 0, "якорь": 0, "чирвы": 0,
		"пики": 0, "трефы": 0, "бубны": 0, };
	// выбор суммы для текущей ставки
	let totalBet = rand(1, funds);
	// распределение суммы ставки по полям
	if (totalBet === 7) { // если 7 пенсов - ставка все на чирвы
		totalBet = funds;
		bets["чирвы"] = totalBet;
	} else { // если нет, случайным образом по всем полям
		let remaining = totalBet;
		do {
			let bet = rand(1, remaining);
			let face = randFace();
			bets[face] += bet;
			remaining -=bet;
		} while (remaining > 0);
	}
	// после распределения ставок, вычитаем сумму ставок из общих денег
	funds -= totalBet;
	console.log('\tставки: ' +
		Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') +
		` (всего: ${totalBet} реnсе)`);
	// бросаем кубики
	const hand = [];
	for (let roll = 0; roll < 3; roll++) {
		hand.push(randFace());
	}
	console.log(`\tвыпало: ${hand.join(', ')}`);
	// подсчет выигрыша или проигрыша
	let winnings = 0;
	for (let die = 0; die < hand.length; die++) {
		let face = hand[die];
		if (bets[face] > 0) {
			winnings += bets[face];
		}
	}
	funds += winnings;
	console.log(`\tвыигрыш составил: ${winnings}`);
}
console.log(`конец игры: ${funds} pence`);